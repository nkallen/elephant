(function(global) {
var Elephant = (global.Elephant) = {};

Elephant.getSlotMenuOptions = function(slot) {
    var that = this;
    menu_info = [];
    var _slot = slot.input || slot.output;
    if (slot.output) {
        if (_slot.type == "objectlist") {
            menu_info.push({
                content: "Add output", callback: function() {
                    var output = LiteGraph.createNode("basic/Output");
                    output.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(output);
                    that.connect(slot.slot, output, 0);
                }}
            );
            menu_info.push({
                content: "Add ObjectList", callback: function() {
                    var output = LiteGraph.createNode("Classes/ObjectList");
                    output.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(output);
                    that.connect(slot.slot, output, 0);
                }
            });
            menu_info.push({
                content: "Add GeomObject", callback: function() {
                    var output = LiteGraph.createNode("Classes/GeomObject");
                    output.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(output);
                    that.connect(slot.slot, output, 0);
                }
            });
            menu_info.push({
                content: "Select Point", callback: function() {
                    var pointobject = LiteGraph.createNode("Classes/PointObject");
                    pointobject.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(pointobject);
                    that.connect(slot.slot, pointobject, 0);
                }
            });
            menu_info.push({
                content: "Select Curve", callback: function() {
                    var curve = LiteGraph.createNode("Classes/Curve");
                    curve.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(curve);
                    that.connect(slot.slot, curve, 0);
                }
            });
            menu_info.push({
                content: "Select Face", callback: function() {
                    var face = LiteGraph.createNode("Classes/Face");
                    face.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(face);
                    that.connect(slot.slot, face, 0);
                }
            });
            menu_info.push({
                content: "Select BRep", callback: function() {
                    var face = LiteGraph.createNode("Classes/BRep");
                    face.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(face);
                    that.connect(slot.slot, face, 0);
                }
            });
        } else if (_slot.type == "pointarray") {
            menu_info.push({
                content: "Make point", callback: function() {
                    var point = LiteGraph.createNode("factory/point");
                    point.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(point);
                    that.connect(slot.slot, point, 0);
                }
            });
        }
    } else {
        if (_slot.type == "objectlist") {
            menu_info.push({
                content: "Current selection", callback: function() {
                    var store = storeSelection();
                    store.pos = [that.pos[0] - store.size[0] - 30, that.pos[1]];
                    that.graph.add(store);
                    store.connect(0, that, slot.slot);
                }
            });
        } else if (_slot.type == "pointarray") {
            menu_info.push({
                content: "Expand point constant", callback: function() {
                    var point = LiteGraph.createNode("basic/point");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    if (that.properties[_slot.name] != null) {
                        point.loadValue(that.properties[_slot.name]);
                    } else {
                        var pa = new pointArray;
                        pa.push();
                        point.loadValue(pa);
                    }
                    point.connect(0, that, slot.slot);
                }
            });  
            menu_info.push({
                content: "From PointObject", callback: function() {
                    var point = LiteGraph.createNode("Classes/PointObject");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    point.connect(0, that, slot.slot);
                }
            });
            menu_info.push({
                content: "From bounding box", callback: function() {
                    var point = LiteGraph.createNode("Classes/BoundingBox");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    point.connect(0, that, slot.slot);
                }
            });
            menu_info.push({
                content: "Pick point(s)", callback: function() {
                    var point = LiteGraph.createNode("Classes/PointPicker");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    point.connect(0, that, slot.slot);
                }
            });
        } else if (_slot.type == "numarray") {
            menu_info.push({
                content: "Float slider", callback: function() {
                    var newnode = LiteGraph.createNode("widget/hslider");
                    newnode.pos = [that.pos[0] - newnode.size[0] - 30, that.pos[1]];
                    that.graph.add(newnode);
                    newnode.setProperty("value", that.properties[_slot.name]);
                    newnode.setProperty("min", Math.floor(that.properties[_slot.name]*0.5) || 0);
                    newnode.setProperty("max", Math.ceil(that.properties[_slot.name]*2) || 1);
                    newnode.title = _slot.name;
                    newnode.connect(0, that, slot.slot);
                }
            });
            menu_info.push({
                content: "Int counter", callback: function() {
                    var newnode = LiteGraph.createNode("widget/number");
                    newnode.pos = [that.pos[0] - newnode.size[0] - 30, that.pos[1]];
                    that.graph.add(newnode);
                    newnode.setProperty("value", that.properties[_slot.name] || 0);
                    newnode.title = _slot.name;
                    newnode.connect(0, that, slot.slot);
                }
            });
        }
    }
    return menu_info;
}

LGraphNode.prototype.getMenuOptions = function(canvas) {
    return [
        {
            content: "Title",
            callback: LGraphCanvas.onShowPropertyEditor
        },
        {
            content: "Collapse",
            callback: LGraphCanvas.onMenuNodeCollapse
        },
        {
            content: "Colors",
            has_submenu: true,
            callback: LGraphCanvas.onMenuNodeColors
        },
        {
            content: "Shapes",
            has_submenu: true,
            callback: LGraphCanvas.onMenuNodeShapes
        },
        null,
        {
            content: "Select node dependencies",
            has_submenu: true,
            callback: this.selectDependencies.bind(this)
        },
    ];
}

LGraphCanvas.prototype.getExtraMenuOptions = function(canvas) {
    var that = this;
    var options = [
        {
            content: "Arrange",
            callback: function() {
                that.graph.arrange();
            },
        }
    ];
    if (this.graph._nodes.length > 0) {
        options = options.concat([
            {
                content: "Clean-up unused nodes",
                callback: function(item, options, e, menu, node) {
                    var allobjects = moi.geometryDatabase.getObjects();
                    var info = that.graph.nodeForObjects(allobjects);
                    var source = info[0], created = info[1];
                    source.selectDependencies();
                    that.invertSelection();
                    that.deleteSelectedNodes();
                    for (var i = 0; i < created.length; i++) {
                        var c = created[i];
                        that.graph.remove(c);
                    }
                }
            },
        ]);
    }
    if (Object.keys(this.selected_nodes).length > 0) {
        options = options.concat([
            {
                content: "Invert Selection",
                callback: this.invertSelection.bind(this),
            },
            {
                content: "Delete selected nodes",
                callback: this.deleteSelectedNodes.bind(this),
            },
        ]);
    }
    if (moi.geometryDatabase.getSelectedObjects().length > 0) {
        options = options.concat([
            {
                content: "Store Selection",
                callback: window.storeSelection,
            },
        ]);
    }
    return options;
}

})(this);
