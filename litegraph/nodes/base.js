//basic nodes
(function(global) {
    var LiteGraph = global.LiteGraph;

    //Constant
    function Time() {
        this.addOutput("in ms", "numarray");
        this.addOutput("in sec", "numarray");
        this.mode == LiteGraph.IMMORTAL;
    }

    Time.title = "Time";
    Time.desc = "Time";

    Time.prototype.onExecute = function() {
        this.setOutputData(0, [this.graph.globaltime * 1000]);
        this.setOutputData(1, [this.graph.globaltime]);
    };

    LiteGraph.registerNodeType("basic/time", Time);

    //Subgraph: a node that contains a graph
    function Subgraph() {
        var that = this;
        this.size = [140, 80];
        this.properties = { enabled: true };
        this.enabled = true;

        //create inner graph
        this.subgraph = new LiteGraph.LGraph();
        this.subgraph._subgraph_node = this;
        this.subgraph._is_subgraph = true;

        this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this);

        //nodes input node added inside
        this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this);
        this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this);
        this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this);
        this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this);

        this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this);
        this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this);
        this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this);
        this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this);
    }

    Subgraph.title = "Subgraph";
    Subgraph.desc = "Graph inside a node";
    Subgraph.title_color = "#334";

    Subgraph.prototype.onGetInputs = function() {
        return [["enabled", "boolean"]];
    };

    /*
    Subgraph.prototype.onDrawTitle = function(ctx) {
        if (this.flags.collapsed) {
            return;
        }

        ctx.fillStyle = "#555";
        var w = LiteGraph.NODE_TITLE_HEIGHT;
        var x = this.size[0] - w;
        ctx.fillRect(x, -w, w, w);
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(x + w * 0.2, -w * 0.6);
        ctx.lineTo(x + w * 0.8, -w * 0.6);
        ctx.lineTo(x + w * 0.5, -w * 0.3);
        ctx.fill();
    };
    */

    Subgraph.prototype.onDblClick = function(e, pos, graphcanvas) {
        var that = this;
        setTimeout(function() {
            graphcanvas.openSubgraph(that.subgraph);
        }, 10);
    };

    /*
    Subgraph.prototype.onMouseDown = function(e, pos, graphcanvas) {
        if (
            !this.flags.collapsed &&
            pos[0] > this.size[0] - LiteGraph.NODE_TITLE_HEIGHT &&
            pos[1] < 0
        ) {
            var that = this;
            setTimeout(function() {
                graphcanvas.openSubgraph(that.subgraph);
            }, 10);
        }
    };
    */

    Subgraph.prototype.onAction = function(action, param) {
        this.subgraph.onAction(action, param);
    };

    Subgraph.prototype.onExecute = function() {
        this.enabled = this.getInputOrProperty("enabled");
        if (!this.enabled) {
            return;
        }

        //send inputs to subgraph global inputs
        if (this.inputs) {
            for (var i = 0; i < this.inputs.length; i++) {
                var input = this.inputs[i];
                var value = this.getInputData(i);
                this.subgraph.setInputData(input.name, value);
            }
        }

        //execute
        this.subgraph.runStep();

        //send subgraph global outputs to outputs
        if (this.outputs) {
            for (var i = 0; i < this.outputs.length; i++) {
                var output = this.outputs[i];
                var value = this.subgraph.getOutputData(output.name);
                this.setOutputData(i, value);
            }
        }
    };

    Subgraph.prototype.sendEventToAllNodes = function(eventname, param, mode) {
        if (this.enabled) {
            this.subgraph.sendEventToAllNodes(eventname, param, mode);
        }
    };

    Subgraph.prototype.onDrawBackground = function(ctx, graphcanvas, canvas, pos)
    {
        if(this.flags.collapsed)
            return;

        var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;

        //button
        var over = LiteGraph.isInsideRectangle(pos[0],pos[1],this.pos[0],this.pos[1] + y,this.size[0],LiteGraph.NODE_TITLE_HEIGHT);
        ctx.fillStyle = over ? "#555" : "#222";
        ctx.beginPath();
        if (this._shape == LiteGraph.BOX_SHAPE)
            ctx.rect(0, y, this.size[0]+1, LiteGraph.NODE_TITLE_HEIGHT);
        else
            ctx.roundRect( 0, y, this.size[0]+1, LiteGraph.NODE_TITLE_HEIGHT, 0, 8);
        ctx.fill();

        //button
        ctx.textAlign = "center";
        ctx.font = "24px Arial";
        ctx.fillStyle = over ? "#DDD" : "#999";
        ctx.fillText( "+", this.size[0] * 0.5, y + 24 );
    }

    Subgraph.prototype.onMouseDown = function(e, localpos, graphcanvas)
    {
        var y = this.size[1] - LiteGraph.NODE_TITLE_HEIGHT + 0.5;
        if(localpos[1] > y)
        {
            graphcanvas.showSubgraphPropertiesDialog(this);
        }
    }

    Subgraph.prototype.computeSize = function()
    {
        var num_inputs = this.inputs ? this.inputs.length : 0;
        var num_outputs = this.outputs ? this.outputs.length : 0;
        return [ 200, Math.max(num_inputs,num_outputs) * LiteGraph.NODE_SLOT_HEIGHT + LiteGraph.NODE_TITLE_HEIGHT ];
    }

    //**** INPUTS ***********************************
    Subgraph.prototype.onSubgraphTrigger = function(event, param) {
        var slot = this.findOutputSlot(event);
        if (slot != -1) {
            this.triggerSlot(slot);
        }
    };

    Subgraph.prototype.onSubgraphNewInput = function(name, type) {
        var slot = this.findInputSlot(name);
        if (slot == -1) {
            //add input to the node
            this.addInput(name, type);
        }
    };

    Subgraph.prototype.onSubgraphRenamedInput = function(oldname, name) {
        var slot = this.findInputSlot(oldname);
        if (slot == -1) {
            return;
        }
        var info = this.getInputInfo(slot);
        info.name = name;
    };

    Subgraph.prototype.onSubgraphTypeChangeInput = function(name, type) {
        var slot = this.findInputSlot(name);
        if (slot == -1) {
            return;
        }
        var info = this.getInputInfo(slot);
        info.type = type;
    };

    Subgraph.prototype.onSubgraphRemovedInput = function(name) {
        var slot = this.findInputSlot(name);
        if (slot == -1) {
            return;
        }
        this.removeInput(slot);
    };

    //**** OUTPUTS ***********************************
    Subgraph.prototype.onSubgraphNewOutput = function(name, type) {
        var slot = this.findOutputSlot(name);
        if (slot == -1) {
            this.addOutput(name, type);
        }
    };

    Subgraph.prototype.onSubgraphRenamedOutput = function(oldname, name) {
        var slot = this.findOutputSlot(oldname);
        if (slot == -1) {
            return;
        }
        var info = this.getOutputInfo(slot);
        info.name = name;
    };

    Subgraph.prototype.onSubgraphTypeChangeOutput = function(name, type) {
        var slot = this.findOutputSlot(name);
        if (slot == -1) {
            return;
        }
        var info = this.getOutputInfo(slot);
        info.type = type;
    };

    Subgraph.prototype.onSubgraphRemovedOutput = function(name) {
        var slot = this.findInputSlot(name);
        if (slot == -1) {
            return;
        }
        this.removeOutput(slot);
    };
    // *****************************************************

    Subgraph.prototype.getExtraMenuOptions = function(graphcanvas) {
        var that = this;
        return [
            {
                content: "Open",
                callback: function() {
                    graphcanvas.openSubgraph(that.subgraph);
                }
            }
        ];
    };

    Subgraph.prototype.onResize = function(size) {
        size[1] += 20;
    };

    Subgraph.prototype.serialize = function() {
        var data = LiteGraph.LGraphNode.prototype.serialize.call(this);
        data.subgraph = this.subgraph.serialize();
        return data;
    };
    //no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()

    Subgraph.prototype.clone = function() {
        var node = LiteGraph.createNode(this.type);
        var data = this.serialize();
        delete data["id"];
        delete data["inputs"];
        delete data["outputs"];
        node.configure(data);
        return node;
    };

    Subgraph.prototype.buildFromNodes = function(nodes)
    {
        //clear all?
        //TODO

        //nodes that connect data between parent graph and subgraph
        var subgraph_inputs = [];
        var subgraph_outputs = [];

        //mark inner nodes
        var ids = {};
        var min_x = 0;
        var max_x = 0;
        for(var i = 0; i < nodes.length; ++i)
        {
            var node = nodes[i];
            ids[ node.id ] = node;
            min_x = Math.min( node.pos[0], min_x );
            max_x = Math.max( node.pos[0], min_x );
        }
        
        var last_input_y = 0;
        var last_output_y = 0;

        for(var i = 0; i < nodes.length; ++i)
        {
            var node = nodes[i];
            //check inputs
            if( node.inputs )
                for(var j = 0; j < node.inputs.length; ++j)
                {
                    var input = node.inputs[j];
                    if( !input || !input.link )
                        continue;
                    var link = node.graph.links[ input.link ];
                    if(!link)
                        continue;
                    if( ids[ link.origin_id ] )
                        continue;
                    //this.addInput(input.name,link.type);
                    this.subgraph.addInput(input.name,link.type);
                    /*
                    var input_node = LiteGraph.createNode("graph/input");
                    this.subgraph.add( input_node );
                    input_node.pos = [min_x - 200, last_input_y ];
                    last_input_y += 100;
                    */
                }

            //check outputs
            if( node.outputs )
                for(var j = 0; j < node.outputs.length; ++j)
                {
                    var output = node.outputs[j];
                    if( !output || !output.links || !output.links.length )
                        continue;
                    var is_external = false;
                    for(var k = 0; k < output.links.length; ++k)
                    {
                        var link = node.graph.links[ output.links[k] ];
                        if(!link)
                            continue;
                        if( ids[ link.target_id ] )
                            continue;
                        is_external = true;
                        break;
                    }
                    if(!is_external)
                        continue;
                    //this.addOutput(output.name,output.type);
                    /*
                    var output_node = LiteGraph.createNode("graph/output");
                    this.subgraph.add( output_node );
                    output_node.pos = [max_x + 50, last_output_y ];
                    last_output_y += 100;
                    */
                }
        }

        //detect inputs and outputs
            //split every connection in two data_connection nodes
            //keep track of internal connections
            //connect external connections

        //clone nodes inside subgraph and try to reconnect them

        //connect edge subgraph nodes to extarnal connections nodes
    }

    LiteGraph.Subgraph = Subgraph;
    LiteGraph.registerNodeType("graph/subgraph", Subgraph);

    //Input for a subgraph
    function GraphInput() {
        this.addOutput("", "number");

        this.name_in_graph = "";
        this.properties = {
            name: "",
            type: "number",
            value: 0
        }; 

        var that = this;

        this.name_widget = this.addWidget(
            "text",
            "Name",
            this.properties.name,
            function(v) {
                if (!v) {
                    return;
                }
                that.setProperty("name",v);
            }
        );
        this.type_widget = this.addWidget(
            "text",
            "Type",
            this.properties.type,
            function(v) {
                that.setProperty("type",v);
            }
        );

        this.value_widget = this.addWidget(
            "number",
            "Value",
            this.properties.value,
            function(v) {
                that.setProperty("value",v);
            }
        );

        this.widgets_up = true;
        this.size = [180, 90];
    }

    GraphInput.title = "Input";
    GraphInput.desc = "Input of the graph";

    GraphInput.prototype.onConfigure = function()
    {
        this.updateType();
    }

    //ensures the type in the node output and the type in the associated graph input are the same
    GraphInput.prototype.updateType = function()
    {
        var type = this.properties.type;
        this.type_widget.value = type;

        //update output
        if(this.outputs[0].type != type)
        {
            if (!LiteGraph.isValidConnection(this.outputs[0].type,type))
                this.disconnectOutput(0);
            this.outputs[0].type = type;
        }

        //update widget
        if(type == "number")
        {
            this.value_widget.type = "number";
            this.value_widget.value = 0;
        }
        else if(type == "boolean")
        {
            this.value_widget.type = "toggle";
            this.value_widget.value = true;
        }
        else if(type == "string")
        {
            this.value_widget.type = "text";
            this.value_widget.value = "";
        }
        else
        {
            this.value_widget.type = null;
            this.value_widget.value = null;
        }
        this.properties.value = this.value_widget.value;

        //update graph
        if (this.graph && this.name_in_graph) {
            this.graph.changeInputType(this.name_in_graph, type);
        }
    }

    //this is executed AFTER the property has changed
    GraphInput.prototype.onPropertyChanged = function(name,v)
    {
        if( name == "name" )
        {
            if (v == "" || v == this.name_in_graph || v == "enabled") {
                return false;
            }
            if(this.graph)
            {
                if (this.name_in_graph) {
                    //already added
                    this.graph.renameInput( this.name_in_graph, v );
                } else {
                    this.graph.addInput( v, this.properties.type );
                }
            } //what if not?!
            this.name_widget.value = v;
            this.name_in_graph = v;
        }
        else if( name == "type" )
        {
            this.updateType();
        }
        else if( name == "value" )
        {
        }
    }

    GraphInput.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return this.properties.name;
        }
        return this.title;
    };

    GraphInput.prototype.onAction = function(action, param) {
        if (this.properties.type == LiteGraph.EVENT) {
            this.triggerSlot(0, param);
        }
    };

    GraphInput.prototype.onExecute = function() {
        var name = this.properties.name;
        //read from global input
        var data = this.graph.inputs[name];
        if (!data) {
            this.setOutputData(0, this.properties.value );
            return;
        }

        this.setOutputData(0, data.value !== undefined ? data.value : this.properties.value );
    };

    GraphInput.prototype.onRemoved = function() {
        if (this.name_in_graph) {
            this.graph.removeInput(this.name_in_graph);
        }
    };

    LiteGraph.GraphInput = GraphInput;
    LiteGraph.registerNodeType("graph/input", GraphInput);

    //Output for a subgraph
    function GraphOutput() {
        this.addInput("", "");

        this.name_in_graph = "";
        this.properties = {};
        var that = this;

        Object.defineProperty(this.properties, "name", {
            get: function() {
                return that.name_in_graph;
            },
            set: function(v) {
                if (v == "" || v == that.name_in_graph) {
                    return;
                }
                if (that.name_in_graph) {
                    //already added
                    that.graph.renameOutput(that.name_in_graph, v);
                } else {
                    that.graph.addOutput(v, that.properties.type);
                }
                that.name_widget.value = v;
                that.name_in_graph = v;
            },
            enumerable: true
        });

        Object.defineProperty(this.properties, "type", {
            get: function() {
                return that.inputs[0].type;
            },
            set: function(v) {
                if (v == "action" || v == "event") {
                    v = LiteGraph.ACTION;
                }
                if (!LiteGraph.isValidConnection(that.inputs[0].type,v))
                    that.disconnectInput(0);
                that.inputs[0].type = v;
                if (that.name_in_graph) {
                    //already added
                    that.graph.changeOutputType(
                        that.name_in_graph,
                        that.inputs[0].type
                    );
                }
                that.type_widget.value = v || "";
            },
            enumerable: true
        });

        this.name_widget = this.addWidget("text","Name",this.properties.name,"name");
        this.type_widget = this.addWidget("text","Type",this.properties.type,"type");
        this.widgets_up = true;
        this.size = [180, 60];
    }

    GraphOutput.title = "Output";
    GraphOutput.desc = "Output of the graph";

    GraphOutput.prototype.onExecute = function() {
        this._value = this.getInputData(0);
        this.graph.setOutputData(this.properties.name, this._value);
    };

    GraphOutput.prototype.onAction = function(action, param) {
        if (this.properties.type == LiteGraph.ACTION) {
            this.graph.trigger(this.properties.name, param);
        }
    };

    GraphOutput.prototype.onRemoved = function() {
        if (this.name_in_graph) {
            this.graph.removeOutput(this.name_in_graph);
        }
    };

    GraphOutput.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return this.properties.name;
        }
        return this.title;
    };

    LiteGraph.GraphOutput = GraphOutput;
    LiteGraph.registerNodeType("graph/output", GraphOutput);

    //Constant
    function ConstantNumber() {
        this.addOutput("value", "numarray");
        this.addProperty("value", 1.0);
        this.widget = this.addWidget("number","value",1,"value");
        this.widgets_up = true;
        this.size = [180, 30];
    }

    ConstantNumber.title = "Const Number";
    ConstantNumber.desc = "Constant number";

    ConstantNumber.prototype.onExecute = function() {
        this.setOutputData(0, parseFloat(this.properties["value"]));
    };

    ConstantNumber.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return this.properties.value;
        }
        return this.title;
    };

    ConstantNumber.prototype.setValue = function(v)
    {
        this.setProperty("value",[v]);
    }

    ConstantNumber.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.outputs[0].label = this.properties["value"].toFixed(3);
    };

    LiteGraph.registerNodeType("basic/const", ConstantNumber);

    function ConstantBoolean() {
        this.addOutput("", "boolean");
        this.addProperty("value", true);
        this.widget = this.addWidget("toggle","value",true,"value");
        this.widgets_up = true;
        this.size = [140, 30];
    }

    ConstantBoolean.title = "Const Boolean";
    ConstantBoolean.desc = "Constant boolean";
    ConstantBoolean.prototype.getTitle = ConstantNumber.prototype.getTitle;

    ConstantBoolean.prototype.onExecute = function() {
        this.setOutputData(0, [this.properties["value"]]);
    };

    ConstantBoolean.prototype.setValue = ConstantNumber.prototype.setValue;

    ConstantBoolean.prototype.onGetInputs = function() {
        return [["toggle", LiteGraph.ACTION]];
    };

    ConstantBoolean.prototype.onAction = function(action)
    {
        this.setValue( !this.properties.value );
    }

    LiteGraph.registerNodeType("basic/boolean", ConstantBoolean);

    function ConstantString() {
        this.addOutput("", "string");
        this.addProperty("value", "");
        this.widget = this.addWidget("text","value","","value");  //link to property value
        this.widgets_up = true;
        this.size = [180, 30];
    }

    ConstantString.title = "Const String";
    ConstantString.desc = "Constant string";

    ConstantString.prototype.getTitle = ConstantNumber.prototype.getTitle;

    ConstantString.prototype.onExecute = function() {
        this.setOutputData(0, [this.properties["value"]]);
    };

    ConstantString.prototype.setValue = ConstantNumber.prototype.setValue;

    ConstantString.prototype.onDropFile = function(file)
    {
        var that = this;
        var reader = new FileReader();
        reader.onload = function(e)
        {
            that.setProperty("value",e.target.result);
        }
        reader.readAsText(file);
    }

    LiteGraph.registerNodeType("basic/string", ConstantString);

    function ConstantPoint() {
        this.addOutput("", "pointarray");
        this.addProperty("pointarray", new pointArray());
        this.widgetX = this.addWidget("number","x",0,this.setValue.bind(this));
        this.widgetY = this.addWidget("number","y",0,this.setValue.bind(this));
        this.widgetZ = this.addWidget("number","z",0,this.setValue.bind(this));
        this.widgets_up = true;
        this.size = [180, 90];
    }

    ConstantPoint.title = "Const Point";
    ConstantPoint.desc = "Constant point";

    ConstantPoint.prototype.getTitle = ConstantNumber.prototype.getTitle;

    ConstantPoint.prototype.onExecute = function() {
        console.log("ContantPoint.onExecute: " + this.properties.pointarray.getPoint().toString());
        this.setOutputData(0, this.properties.pointarray);
    };

    ConstantPoint.prototype.loadValue = function(newValue) {
        this.setProperty("pointarray", newValue);
        var p = newValue.getPoint();
        this.widgetX.value = p.x;
        this.widgetY.value = p.y;
        this.widgetZ.value = p.z;
    };


    ConstantPoint.prototype.setValue = function() {
        var old = this.properties.pointarray.getFrame();
        old.set(this.widgetX.value, this.widgetY.value, this.widgetZ.value, old.xaxis.x, old.xaxis.y, old.xaxis.z, old.yaxis.x, old.yaxis.y, old.yaxis.z);
        var pa = new pointArray();
        pa.pushFrame(old);
        this.setProperty("pointarray", pa);
    };

    LiteGraph.registerNodeType("basic/point", ConstantPoint);
    function ConstantArray() {
        this._value = [];
        this.addInput("", "");
        this.addOutput("", "array");
        this.addOutput("length", "numarray");
        this.addProperty("value", "[]");
        this.widget = this.addWidget("text","array",this.properties.value,"value");
        this.widgets_up = true;
        this.size = [140, 50];
    }

    ConstantArray.title = "Const Array";
    ConstantArray.desc = "Constant Array";

    ConstantArray.prototype.onPropertyChanged = function(name, value) {
        this.widget.value = value;
        if (value == null || value == "") {
            return;
        }

        try {
            if(value[0] != "[")
                this._value = JSON.parse("[" + value + "]");
            else
                this._value = JSON.parse(value);
            this.boxcolor = "#AEA";
        } catch (err) {
            this.boxcolor = "red";
        }
    };

    ConstantArray.prototype.onExecute = function() {
        var v = this.getInputData(0);
        if(v && v.length) //clone
        {
            if(!this._value)
                this._value = new Array();
            this._value.length = v.length;
            for(var i = 0; i < v.length; ++i)
                this._value[i] = v[i];
        }
        this.setOutputData(0, this._value );
        this.setOutputData(1, this._value ? ( this._value.length || 0) : 0 );
    };

    ConstantArray.prototype.setValue = ConstantNumber.prototype.setValue;

    LiteGraph.registerNodeType("basic/array", ConstantArray);

    function SetArray()
    {
        this.addInput("arr", "array");
        this.addInput("value", "");
        this.addOutput("arr", "array");
        this.properties = { index: 0 };
        this.widget = this.addWidget("number","i",this.properties.index,"index");
    }

    SetArray.title = "Set Array";
    SetArray.desc = "Sets index of array";

    SetArray.prototype.onExecute = function() {
        var arr = this.getInputData(0);
        if(!arr)
            return;
        var v = this.getInputData(1);
        if(v === undefined )
            return;
        if(this.properties.index)
            arr[ Math.floor(this.properties.index) ] = v;
        this.setOutputData(0,arr);
    };

    LiteGraph.registerNodeType("basic/set_array", SetArray );

    function ArrayElement() {
        this.addInput("array", "numarray,objectlist,pointarray");
        this.addInput("index", "numarray");
        this.addProperty("index", 0);
    }

    ArrayElement.title = "Array[i]";
    ArrayElement.desc = "Returns an element from an array";

    ArrayElement.prototype.onExecute = function() {
        var type = this.properties.type;
        if (type == undefined) return;
        this.properties["index"] = this.getInputData(1, this.properties["index"]);

        if (type === "numarray") {
            var out = [];
            var source = this.getInputData(0);
            for (var i = 0; i < this.properties["index"].length; i++) {
                var idx = Math.round(this.properties["index"][i]);
                if (idx >= 0 && idx < source.length) out.push(source[idx]);
            }
        } else if (type === "pointarray") {
            var source = this.getInputData(0, new pointArray());
            var out = new pointArray(false);
            var sourceLen=source.getLength();
            for(var i=0; i<this.properties["index"].length;i++){
                var idx=Math.round(this.properties["index"][i]);
                if(idx>=0&&idx<sourceLen){
                var elemSource = source.getElement(idx);
                    out.push(elemSource.data[0],
                            elemSource.data[1],
                            elemSource.data[2],
                            elemSource.data[3],
                            elemSource.data[4],
                            elemSource.data[5],
                            elemSource.data[6]);
                            }
            }
        } else if (type === "objectlist") {
            var out = moi.geometryDatabase.createObjectList();
            var source = this.getInputData(0, moi.geometryDatabase.createObjectList());
            for (var i=0; i<this.properties["index"].length; i++) {
                var idx=Math.round(this.properties["index"][i]);
                if (idx>=0 && idx<source.length) {
                    out.addObject(source.item(idx));
                }            
            }
        }
        this.setOutputData(0, out);
        this.boxcolor = out.length == 0 ? "#F80" : "#0F5";
    };

    ArrayElement.prototype.onConnectInput = function(slot, type, link, source, source_slot) {
        if (slot == 0) this.addProperty("type", type);
        this.addOutput("value", type);
    }
    ArrayElement.prototype.getSlotMenuOptions = Elephant.getSlotMenuOptions;

    LiteGraph.registerNodeType("basic/array[]", ArrayElement);

    function Concat() {
        this.addInput("a", "numarray,objectlist,pointarray");
        this.addProperty("index",0);
    }

    Concat.title = "Concat";
    Concat.desc = "Concatenates an objectlist or pointarray";

    Concat.prototype.onExecute = function() {
        var out, i, j;
            if ( this.inputs[1].type === "numarray") {
            out = [];
            for ( i = 0; i<this.inputs.length; i++) out = out.concat(this.getInputData(i, []));
        } else if ( this.inputs[1].type === "pointarray") {
            out = new pointArray();
            for ( i = 0; i<this.inputs.length; i++) out.concat(this.getInputData(i, new pointArray()));
        } else if ( this.inputs[1].type === "objectlist") {
            var inObj;
            out = moi.geometryDatabase.createObjectList();
            for ( i = 0; i<this.inputs.length; i++) {
                inObj = this.getInputData(i, moi.geometryDatabase.createObjectList());
                for ( j = 0; j < inObj.length; j++ ) out.addObject( inObj.item(j) );
            }
        }
        this.setOutputData(0, out);
        this.boxcolor = out.length == 0 ? "#F80" : "#0F5";
    };
    Concat.prototype.getExtraMenuOptions = function() {
        var that = this;

    }
    Concat.prototype.onConnectInput = function(slot, type, link, source, source_slot) {
        if (slot == 0) this.addOutput("value", type);
        var name = "abcdefghijklmnop"[this.inputs.length];
        this.addInput(name, type);
    }

    LiteGraph.registerNodeType("basic/concat", Concat);

    function ObjectProperty() {
        this.addInput("obj", "");
        this.addOutput("", "");
        this.addProperty("value", "");
        this.widget = this.addWidget("text","prop.","",this.setValue.bind(this) );
        this.widgets_up = true;
        this.size = [140, 30];
        this._value = null;
    }
    ObjectProperty.title = "Object property";
    ObjectProperty.desc = "Outputs the property of an object";

    ObjectProperty.prototype.setValue = function(v) {
        this.properties.value = v;
        this.widget.value = v;
    };

    ObjectProperty.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return "in." + this.properties.value;
        }
        return this.title;
    };

    ObjectProperty.prototype.onPropertyChanged = function(name, value) {
        this.widget.value = value;
    };

    ObjectProperty.prototype.onExecute = function() {
        var data = this.getInputData(0);
        if (data != null) {
            this.setOutputData(0, data[this.properties.value]);
        }
    };

    LiteGraph.registerNodeType("basic/object_property", ObjectProperty);

    function ObjectKeys() {
        this.addInput("obj", "");
        this.addOutput("keys", "array");
        this.size = [140, 30];
    }

    ObjectKeys.title = "Object keys";
    ObjectKeys.desc = "Outputs an array with the keys of an object";

    ObjectKeys.prototype.onExecute = function() {
        var data = this.getInputData(0);
        if (data != null) {
            this.setOutputData(0, Object.keys(data) );
        }
    };

    LiteGraph.registerNodeType("basic/object_keys", ObjectKeys);


    //Watch a value in the editor
    function Watch() {
        this.size = [60, 30];
        this.addInput("value", 0, { label: "" });
        this.value = 0;
    }

    Watch.title = "Watch";
    Watch.desc = "Show value of input";

    Watch.prototype.onExecute = function() {
        if (this.inputs[0]) {
            this.value = this.getInputData(0);
        }
    };

    Watch.prototype.getTitle = function() {
        if (this.flags.collapsed) {
            return this.inputs[0].label;
        }
        return this.title;
    };

    Watch.toString = function(o) {
        if (o == null) {
            return "null";
        } else if (o.constructor === Number) {
            return o.toFixed(3);
        } else if (o.constructor === Array) {
            var str = "[";
            for (var i = 0; i < o.length; ++i) {
                str += Watch.toString(o[i]) + (i + 1 != o.length ? "," : "");
            }
            str += "]";
            return str;
        } else {
            return String(o);
        }
    };

    Watch.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.inputs[0].label = Watch.toString(this.value);
    };

    LiteGraph.registerNodeType("basic/watch", Watch);

    //Show value inside the debug console
    function Console() {
        this.mode = LiteGraph.ON_EVENT;
        this.size = [80, 30];
        this.addProperty("msg", "");
        this.addInput("log", LiteGraph.EVENT);
        this.addInput("msg", 0);
    }

    Console.title = "Console";
    Console.desc = "Show value inside the console";

    Console.prototype.onAction = function(action, param) {
        if (action == "log") {
            console.log(param);
        } else if (action == "warn") {
            console.warn(param);
        } else if (action == "error") {
            console.error(param);
        }
    };

    Console.prototype.onExecute = function() {
        var msg = this.getInputData(1);
        if (msg !== null) {
            this.properties.msg = msg;
        }
        console.log(msg);
    };

    Console.prototype.onGetInputs = function() {
        return [
            ["log", LiteGraph.ACTION],
            ["warn", LiteGraph.ACTION],
            ["error", LiteGraph.ACTION]
        ];
    };

    LiteGraph.registerNodeType("basic/console", Console);

    //Show value inside the debug console
    function Alert() {
        this.mode = LiteGraph.ON_EVENT;
        this.addProperty("msg", "");
        this.addInput("", LiteGraph.EVENT);
        var that = this;
        this.widget = this.addWidget("text", "Text", "", "msg");
        this.widgets_up = true;
        this.size = [200, 30];
    }

    Alert.title = "Alert";
    Alert.desc = "Show an alert window";
    Alert.color = "#510";

    Alert.prototype.onConfigure = function(o) {
        this.widget.value = o.properties.msg;
    };

    Alert.prototype.onAction = function(action, param) {
        var msg = this.properties.msg;
        setTimeout(function() {
            alert(msg);
        }, 10);
    };

    LiteGraph.registerNodeType("basic/alert", Alert);

    //Execites simple code
    function NodeScript() {
        this.size = [60, 30];
        this.addProperty("onExecute", ["return A;"]);
        this.addInput("A", "");
        this.addInput("B", "");
        this.addOutput("out", "");

        this._func = function(o) { return o };
        this.data = {};
    }

    NodeScript.prototype.onConfigure = function(o) {
        if (o.properties.onExecute && LiteGraph.allow_scripts)
            this.compileCode(o.properties.onExecute[0]);
        else
            console.warn("Script not compiled, LiteGraph.allow_scripts is false");
    };

    NodeScript.title = "Script";
    NodeScript.desc = "executes a code (max 100 characters)";

    NodeScript.widgets_info = {
        onExecute: { type: "code" }
    };

    NodeScript.prototype.onPropertyChanged = function(name, value) {
        if (name == "onExecute" && LiteGraph.allow_scripts)
            this.compileCode(value[0]);
        else
            console.warn("Script not compiled, LiteGraph.allow_scripts is false");
    };

    NodeScript.prototype.compileCode = function(code) {
        this._func = null;
        if (code.length > 256) {
            console.warn("Script too long, max 256 chars");
        } else {
            var code_low = code.toLowerCase();
            var forbidden_words = [
                "script",
                "body",
                "document",
                "eval",
                "nodescript",
                "function"
            ]; //bad security solution
            for (var i = 0; i < forbidden_words.length; ++i) {
                if (code_low.indexOf(forbidden_words[i]) != -1) {
                    console.warn("invalid script");
                    return;
                }
            }
            console.log("0");

            try {
                this._func = new Function("A", "B", "C", "DATA", "node", code);
                this.markChanged();
                console.log("1");

            } catch (err) {
                console.error("Error parsing script");
                console.error(err);
            }
        }
    };

    NodeScript.prototype.onExecute = function() {
        console.log("2");
        if (!this._func) {
            return;
        }

        console.log("3");
        // try {
            var A = this.getInputData(0);
            var B = this.getInputData(1);
            this.setOutputData(0, this._func(A, B, this.data, this));
        // } catch (err) {
        //     console.error("Error in script");
        //     console.error(err);
        // }
    };

    LiteGraph.registerNodeType("basic/script", NodeScript);
})(this);
