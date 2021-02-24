/**
 * The code in this file changes the behavior of the LiteGraph library.
 * The goal is to keep all changes isolated so upgrading the library is
 * easier.
 */
(function(){

LGraphCanvas.link_type_colors = {
    "-1": LiteGraph.EVENT_LINK_COLOR,
    number: "#AAA",
    node: "#DCA",
    number:     "#399",
    numarray:   "#9CA",
    pointarray: "#B7A",
    objectlist: "#CA0",
    boolean:    "#9BC",
};
LGraphNode.prototype.getInputData = function(slot, defaultdata) {
    var type = this.inputs[slot].type;
    if (!defaultdata) {
        if (type == "objectlist") defaultdata = moi.geometryDatabase.createObjectList();
        if (type == "pointarray") defaultdata = new pointArray();
    }
    if (!this.inputs) return defaultdata;

    if (slot >= this.inputs.length || this.inputs[slot].link == null) {
        return defaultdata;
    }

    var link_id = this.inputs[slot].link;
    var link = this.graph.links[link_id];
    if (!link) {
        //bug: weird case but it happens sometimes
        return defaultdata;
    }

    if (link.data === undefined) return defaultdata;

    switch (this.inputs[slot].type) {
        case "pointarray":
            return link.data.clone();
        case "numarray":
            return link.data.slice(0);
        default:
            return link.data;
    }
};

LGraphNode.prototype.hasChanged = function() {
    return true;
}

////

LGraphNode.prototype.onAddPropertyToPanel = function(name, panel) {
    var value = this.properties[name];
    var info = this.getPropertyInfo(name);
    var options = info.options || {};
    var type = info.type;
    if (type == "boolean" || type == "enum" || type == "combo") return false;
    if (type == "pointarray" || type == "objectlist") return true;

    var str_value = String(value);
    if(type == "number")
        str_value = value.toFixed(3);

    var elem = document.createElement("div");
    elem.className = "property";
    elem.innerHTML = "<span class='property_name'></span><input type='text' class='property_value' />";
    elem.querySelector(".property_name").innerText = name;
    var value_element = elem.querySelector(".property_value");
    elem.dataset["property"] = name;
    elem.dataset["type"] = options.type || type;
    elem.options = options;
    value_element.value = value;
    panel.content.appendChild(elem);
    value_element.addEventListener("keydown", function(e) { 
        if (e.keyCode == 13) {
            e.preventDefault();
            this.blur();
        }
    });
    var node = this;
    value_element.addEventListener("blur", function() { 
        var v = this.value;
        if (type == "numarray" || type == "number")
            v = Number(v);
        node.setProperty(name, [v]);
    });
    return true;
}

// The execution model differs from vanilla LiteGraph. Most nodes are lazy and should only
// be executed when something upstream has changed. Only quartz/timer nodes are considered
// to always need updates; these are given an IMMORTAL mode to contrast with ALWAYS (which)
// will be lazy here.

var immortal = {};
var executable = [];
LiteGraph.IMMORTAL = 4;
LGraph.prototype.updateExecutionOrder = function() {
    executable = [];
    this._nodes_in_order = this.computeExecutionOrder(false);
    for (var i = 0; i < this._nodes_in_order.length; ++i) {
        var node = this._nodes_in_order[i];
        if (node.onExecute) executable.push(node);
        if (node.mode == LiteGraph.IMMORTAL) {
            immortal[node.id] = true;
        }
    }
};

var hasChanged = {};
LGraphNode.prototype.markChanged = function() {
    if (this.id == null) throw "Node not yet added to graph";
    hasChanged[this.id] = true;
}
LGraphNode.prototype.onPropertyChanged = function(prop) {
    if (this.id == null) return;
    hasChanged[this.id] = true;
}
LGraph.prototype.onNodeConnectionChange = function(io, node, slot, target_node, target_slot) {
    if (node.id == null) throw "Node not yet added to graph";
    if (io == LiteGraph.OUTPUT) {
        // Rather than re-executing the node when an output link changes,
        // just copy already computed data.
        var output_info = node.outputs[slot];
        if (!output_info) return;

        if (node.outputs[slot].links) {
            for (var i = 0; i < node.outputs[slot].links.length; i++) {
                var link_id = node.outputs[slot].links[i];
				var link = this.links[link_id];
				if (link) link.data = output_info._data;
            }
        }
    } else {
        hasChanged[node.id] = true;
    }
}
LGraph.prototype.onNodeAdded = function(node) {
    hasChanged[node.id] = true;
}
LGraph.prototype.onNodeRemoved = function(node) {
    delete hasChanged[node.id];
    delete immortal[node.id];
}
LGraph.prototype.onClear = function() {
    hasChanged = {};
    immortal = {};    
}

LGraph.prototype.runStep = function(num, do_not_catch_errors, limit ) {
    for (var id in immortal) {
        if (this.getNodeById(id).hasChanged())
            hasChanged[id] = true;
    }
    if (Object.keys(hasChanged).length == 0) return;

    var start = LiteGraph.getTime();
    this.globaltime = 0.001 * (start - this.starttime);

    // this is just a 
    var needsExecutionNow = this.computeNeedsExecution();
    hasChanged = {};
    var toExecuteNowSorted = [];
    for (var i = 0; i < executable.length; i++) {
        if (executable[i].id in needsExecutionNow) {
            toExecuteNowSorted.push(executable[i]);
        }
    }
    num = num || 1;

    var nodes = toExecuteNowSorted;

    limit = limit || nodes.length;

    if (do_not_catch_errors) {
        //iterations
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < limit; ++j) {
                var node = nodes[j];
                if ((node.mode == LiteGraph.ALWAYS || node.mode == LiteGraph.IMMORTAL) && node.onExecute) {
                    node.onExecute (); //hard to send elapsed time
                }
            }

            this.fixedtime += this.fixedtime_lapse;
            if (this.onExecuteStep) {
                this.onExecuteStep();
            }
        }

        if (this.onAfterExecute) {
            this.onAfterExecute();
        }
    } else {
        try {
            //iterations
            for (var i = 0; i < num; i++) {
                for (var j = 0; j < limit; ++j) {
                    var node = nodes[j];
                    console.log("// runStep: " + node.title);
                    if ((node.mode == LiteGraph.ALWAYS || node.mode == LiteGraph.IMMORTAL) && node.onExecute) {
                        var before = LiteGraph.getTime();
                        node.onExecute();
                        var after = LiteGraph.getTime();
                        var elapsed = after - before;
                        node.execution_time = 0.001 * elapsed;
                    }
                }

                this.fixedtime += this.fixedtime_lapse;
                if (this.onExecuteStep) {
                    this.onExecuteStep();
                }
            }

            if (this.onAfterExecute) {
                this.onAfterExecute();
            }
            this.errors_in_execution = false;
        } catch (err) {
            this.stop();
            this.errors_in_execution = true;
            if (LiteGraph.throw_errors) {
                throw err;
            }
            if (LiteGraph.debug) {
                console.log("Error during execution: " + err);
            }
        }
    }

    var now = LiteGraph.getTime();
    var elapsed = now - start;
    if (elapsed == 0) {
        elapsed = 1;
    }
    this.execution_time = 0.001 * elapsed;
    this.globaltime += 0.001 * elapsed;
    this.iteration += 1;
    this.elapsed_time = (now - this.last_update_time) * 0.001;
    this.last_update_time = now;
};

// Looks at all the hasChanged nodes and includes all dependencies
LGraph.prototype.computeNeedsExecution = function() {
    var result = {};
    var S = [];
    for (var id in hasChanged) {
        var node = this.getNodeById(id);
        S.push(node);
    }
    var visited_links = {};
    while (S.length > 0) {
        var node = S.shift();
        result[node.id] = true;
        if (node.outputs == null) continue;
        for (var i = 0; i < node.outputs.length; i++) {
            var output = node.outputs[i];
            if (output == null || output.links == null || output.links.length == 0)
                continue;

            //for every connection
            for (var j = 0; j < output.links.length; j++) {
                var link_id = output.links[j];
                var link = this.links[link_id];
                if (!link) continue;
                if (visited_links[link.id]) continue;

                var target_node = this.getNodeById(link.target_id);
                if (target_node == null) {
                    visited_links[link.id] = true;
                    continue;
                }
                
                visited_links[link.id] = true;
                S.push(target_node);
            }
        }
    }
    return result;
}

// Mouse events have been changed such that right click is drag/navigation
// The following two methods are only modified in a few tiny places
LGraphCanvas.prototype.processMouseDown = function(e) {

    if( this.set_canvas_dirty_on_mouse_event )
        this.dirty_canvas = true;
    
    if (!this.graph) {
        return;
    }

    this.adjustMouseEvent(e);

    var ref_window = this.getCanvasWindow();
    var document = ref_window.document;
    LGraphCanvas.active_canvas = this;
    var that = this;

    //move mouse move event to the window in case it drags outside of the canvas
    this.canvas.removeEventListener("mousemove", this._mousemove_callback);
    ref_window.document.addEventListener(
        "mousemove",
        this._mousemove_callback,
        true
    ); //catch for the entire window
    ref_window.document.addEventListener(
        "mouseup",
        this._mouseup_callback,
        true
    );

    var node = this.graph.getNodeOnPos(
        e.canvasX,
        e.canvasY,
        this.visible_nodes,
        5
    );
    var skip_dragging = false;
    var skip_action = false;
    var now = LiteGraph.getTime();
    var is_double_click = now - this.last_mouseclick < 300;
    this.mouse[0] = e.localX;
    this.mouse[1] = e.localY;
    this.graph_mouse[0] = e.canvasX;
    this.graph_mouse[1] = e.canvasY;
    this.last_click_position = [this.mouse[0],this.mouse[1]];

    this.canvas.focus();

    LiteGraph.closeAllContextMenus(ref_window);

    if (this.onMouse)
    {
        if (this.onMouse(e) == true)
            return;
    }

    //left button mouse
    if (e.which == 1)
    {
        var clicking_canvas_bg = false;

        //when clicked on top of a node
        //and it is not interactive
        if (node && this.allow_interaction && !skip_action && !this.read_only) {
            if (!this.live_mode && !node.flags.pinned) {
                this.bringToFront(node);
            } //if it wasn't selected?

            //not dragging mouse to connect two slots
            if (
                !this.connecting_node &&
                !node.flags.collapsed &&
                !this.live_mode
            ) {
                //Search for corner for resize
                if (
                    !skip_action &&
                    node.resizable !== false &&
                    LiteGraph.isInsideRectangle(
                        e.canvasX,
                        e.canvasY,
                        node.pos[0] + node.size[0] - 5,
                        node.pos[1] + node.size[1] - 5,
                        10,
                        10
                    )
                ) {
                    this.graph.beforeChange();						
                    this.resizing_node = node;
                    this.canvas.style.cursor = "se-resize";
                    skip_action = true;
                } else {
                    //search for outputs
                    if (node.outputs) {
                        for (
                            var i = 0, l = node.outputs.length;
                            i < l;
                            ++i
                        ) {
                            var output = node.outputs[i];
                            var link_pos = node.getConnectionPos(false, i);
                            if (
                                LiteGraph.isInsideRectangle(
                                    e.canvasX,
                                    e.canvasY,
                                    link_pos[0] - 15,
                                    link_pos[1] - 10,
                                    30,
                                    20
                                )
                            ) {
                                this.connecting_node = node;
                                this.connecting_output = output;
                                this.connecting_pos = node.getConnectionPos( false, i );
                                this.connecting_slot = i;

                                if (e.shiftKey) {
                                    node.disconnectOutput(i);
                                }

                                if (is_double_click) {
                                    if (node.onOutputDblClick) {
                                        node.onOutputDblClick(i, e);
                                    }
                                } else {
                                    if (node.onOutputClick) {
                                        node.onOutputClick(i, e);
                                    }
                                }

                                skip_action = true;
                                break;
                            }
                        }
                    }

                    //search for inputs
                    if (node.inputs) {
                        for (
                            var i = 0, l = node.inputs.length;
                            i < l;
                            ++i
                        ) {
                            var input = node.inputs[i];
                            var link_pos = node.getConnectionPos(true, i);
                            if (
                                LiteGraph.isInsideRectangle(
                                    e.canvasX,
                                    e.canvasY,
                                    link_pos[0] - 15,
                                    link_pos[1] - 10,
                                    30,
                                    20
                                )
                            ) {
                                if (is_double_click) {
                                    if (node.onInputDblClick) {
                                        node.onInputDblClick(i, e);
                                    }
                                } else {
                                    if (node.onInputClick) {
                                        node.onInputClick(i, e);
                                    }
                                }

                                if (input.link !== null) {
                                    var link_info = this.graph.links[
                                        input.link
                                    ]; //before disconnecting
                                    node.disconnectInput(i);

                                    if (
                                        this.allow_reconnect_links ||
                                        e.shiftKey
                                    ) {
                                        this.connecting_node = this.graph._nodes_by_id[
                                            link_info.origin_id
                                        ];
                                        this.connecting_slot =
                                            link_info.origin_slot;
                                        this.connecting_output = this.connecting_node.outputs[
                                            this.connecting_slot
                                        ];
                                        this.connecting_pos = this.connecting_node.getConnectionPos( false, this.connecting_slot );
                                    }

                                    this.dirty_bgcanvas = true;
                                    skip_action = true;
                                }
                            }
                        }
                    }
                } //not resizing
            }

            //it wasn't clicked on the links boxes
            if (!skip_action) {
                var block_drag_node = false;
                var pos = [e.canvasX - node.pos[0], e.canvasY - node.pos[1]];

                //widgets
                var widget = this.processNodeWidgets( node, this.graph_mouse, e );
                if (widget) {
                    block_drag_node = true;
                    this.node_widget = [node, widget];
                }

                //double clicking
                if (is_double_click && this.selected_nodes[node.id]) {
                    //double click node
                    if (node.onDblClick) {
                        node.onDblClick( e, pos, this );
                    }
                    this.processNodeDblClicked(node);
                    block_drag_node = true;
                }

                //if do not capture mouse
                if ( node.onMouseDown && node.onMouseDown( e, pos, this ) ) {
                    block_drag_node = true;
                } else {
                    //open subgraph button
                    if(node.subgraph && !node.skip_subgraph_button)
                    {
                        if ( !node.flags.collapsed && pos[0] > node.size[0] - LiteGraph.NODE_TITLE_HEIGHT && pos[1] < 0 ) {
                            var that = this;
                            setTimeout(function() {
                                that.openSubgraph(node.subgraph);
                            }, 10);
                        }
                    }

                    if (this.live_mode) {
                        clicking_canvas_bg = true;
                        block_drag_node = true;
                    }
                }

                if (!block_drag_node) {
                    if (this.allow_dragnodes) {
                        this.graph.beforeChange();
                        this.node_dragged = node;
                    }
                    if (e.ctrlKey) {
                        this.copyToClipboard();
                        var todeselect = [];
                        if ( !this.selected_nodes[node.id] ) for(var i in this.selected_nodes) if (this.selected_nodes[i] != n) todeselect.push(this.selected_nodes[i]);
                        //two passes to avoid problems modifying the container
                        for(var i in todeselect) this.processNodeDeselected(todeselect[i]);
                        this.pasteFromClipboard();
                    } else if (!this.selected_nodes[node.id]) {
                        this.processNodeSelected(node, e);
                    }
                }

                this.dirty_canvas = true;
            }
        } //clicked outside of nodes
        else {
            //search for link connector
            if(!this.read_only) 
                for (var i = 0; i < this.visible_links.length; ++i) {
                    var link = this.visible_links[i];
                    var center = link._pos;
                    if (
                        !center ||
                        e.canvasX < center[0] - 4 ||
                        e.canvasX > center[0] + 4 ||
                        e.canvasY < center[1] - 4 ||
                        e.canvasY > center[1] + 4
                    ) {
                        continue;
                    }
                    //link clicked
                    this.showLinkMenu(link, e);
                    this.over_link_center = null; //clear tooltip
                    break;
                }

            this.selected_group = this.graph.getGroupOnPos( e.canvasX, e.canvasY );
            this.selected_group_resizing = false;
            if (this.selected_group && !this.read_only ) {
                if (e.ctrlKey) {
                    this.dragging_rectangle = null;
                }

                var dist = distance( [e.canvasX, e.canvasY], [ this.selected_group.pos[0] + this.selected_group.size[0], this.selected_group.pos[1] + this.selected_group.size[1] ] );
                if (dist * this.ds.scale < 10) {
                    this.selected_group_resizing = true;
                } else {
                    this.selected_group.recomputeInsideNodes();
                }
            }

            if (is_double_click && !this.read_only && this.allow_searchbox) {
                this.showSearchBox(e);
            }

            clicking_canvas_bg = true;
        }

        if (!skip_action && clicking_canvas_bg) {
            this.dragging_rectangle = new Float32Array(4);
            this.dragging_rectangle[0] = e.canvasX;
            this.dragging_rectangle[1] = e.canvasY;
            this.dragging_rectangle[2] = 1;
            this.dragging_rectangle[3] = 1;
            skip_action = true;
        }
    } else if (e.which == 2) {
        //middle button
    } else if (e.which == 3) {
        //right button
        this.dragging_canvas = true;
    }

    //TODO
    //if(this.node_selected != prev_selected)
    //	this.onNodeSelectionChange(this.node_selected);

    this.last_mouse[0] = e.localX;
    this.last_mouse[1] = e.localY;
    this.last_mouseclick = LiteGraph.getTime();
    this.last_mouse_dragging = true;

    /*
if( (this.dirty_canvas || this.dirty_bgcanvas) && this.rendering_timer_id == null)
    this.draw();
*/

    this.graph.change();

    //this is to ensure to defocus(blur) if a text input element is on focus
    if (
        !ref_window.document.activeElement ||
        (ref_window.document.activeElement.nodeName.toLowerCase() !=
            "input" &&
            ref_window.document.activeElement.nodeName.toLowerCase() !=
                "textarea")
    ) {
        e.preventDefault();
    }
    e.stopPropagation();

    if (this.onMouseDown) {
        this.onMouseDown(e);
    }

    return false;
};

// It's easier to patch these:
var processMouseUp = LGraphCanvas.prototype.processMouseUp;
LGraphCanvas.prototype.processMouseUp = function(e) {
    processMouseUp.call(this, e);
    if (e.which == 3) {
        if (!this.canvas_moved) {
            var node = this.graph.getNodeOnPos(
                e.canvasX,
                e.canvasY,
                this.visible_nodes
            );
            this.processContextMenu(node, e);
        }
    }
	if (this.canvas_moved) delete this.canvas_moved;
};

var processMouseMove = LGraphCanvas.prototype.processMouseMove;
LGraphCanvas.prototype.processMouseMove = function(e) {
    processMouseMove.call(this, e);
    if (this.dragging_canvas) { this.canvas_moved = true}
}
})();

var getTitle = LGraphNode.prototype.getTitle;
LGraphNode.prototype.getTitle = function() {
    return getTitle.call(this) + (this.execution_time == null ? "" : " (" + this.execution_time.toFixed(2) + "s)");
}

LGraphNode.prototype.selectDependencies = function() {
    var S = [this];
    var L = [];
    var visited_links = {};

    while (true) {
        console.log("iter");
        if (S.length == 0) break;

        var node = S.shift();
        L.push(node);

        if (node.inputs == null) continue;
        for (var i = 0; i < node.inputs.length; i++) {
            console.log("link");
            var input = node.inputs[i];
            if (input == null) continue;
            console.log(1);
            var link_id = input.link;
            if (link_id == null) continue;
            console.log(2);
            var link = this.graph.links[link_id];
            if (link == null) continue;
            
            if (visited_links[link.id]) continue;
            console.log(3);
            visited_links[link.id] = true;

            console.json(link);
            var origin_node = this.graph.getNodeById(link.origin_id);
            if (origin_node == null) continue;
            console.log(4);
            S.push(origin_node);
        }
    }
    console.log(L.length);
    this.graph.sendActionToCanvas("selectNodes", [L]);
}

LGraphCanvas.prototype.invertSelection = function() {
    if (!this.graph) {
        return;
    }
    var nodes = this.graph._nodes;
    var toBeSelected = [];
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        if (!node.is_selected) {
            toBeSelected.push(node);
        }
    }
    this.deselectAllNodes();
    this.selectNodes(toBeSelected);
}