(function(){
    LiteGraph.createNodeFromFactory = function(factory) {
        var node = LiteGraph.createNode(Elephant.api.factories[factory.name].category + "/" + factory.name);
        node.createFromFactory(factory);
        return node;
    }
    
    function mapType(type) {
        switch (type) {
            case "CoordinateFrame": return "pointarray";
            case "Point": return "pointarray";
            case "float": return "numarray";
            case "ObjectList": return "objectlist";
            case "GeomObject": return "objectlist";
        }
        return type;
    }
    
    function makeNodeType(name, input, output, options) {
        options = options || {};
        var node = function() {
            this.internal = {};
            this.mode = options.mode || LiteGraph.ALWAYS;
            for (var i = 0; i < input.length; i++) {
                var arg = input[i];
                var type = mapType(arg.type);
                this.addInput(arg.name, type);
                var ptype = (type == "string" && arg.options) ? "enum" : type;
                this.addProperty(arg.name, arg.default, ptype, {values: arg.options, original_type: arg.type});
            }
            if (output == null) { output = [{name: "Out", type: "ObjectList"}] }
            for (var i = 0; i < output.length; i++) {
                this.addOutput(output[i].name, mapType(output[i].type));
            }
            this.args = input;
            this.output = output;
            this.name = name;
            this.boxcolor = "#F05";
        };
        node.title = name;
        node.desc = name;
        node.prototype.onExecute = function() { // FIXME nk move into loop
            var call = [[name]];
            for (var i = 0; i < input.length; i++) {
                var type = input[i].type;
                var value = this.getInputData(i, this.properties[input[i].name]);
                console.log(">");
                console.json(value);
                if (value != null) {
                    switch (type) {
                        case "ObjectList":
                            value = [value];
                            break;
                        case "GeomObject":
                            var tmp = [];
                            for (var j = 0; j < value.length; j++) {
                                tmp.push(value.item(j));
                            }
                            value = tmp;
                            break;
                        case "CoordinateFrame":
                            value = [value.getFrame()];
                            break;
                        case "Point":
                            var tmp = [];
                            for (var j = 0; j < value.length; j++) {
                                tmp.push(value.getPoint(j));
                            }
                            value = tmp;
                            break;
                        case "float":
                        case "int":
                        case "boolean":
                        case "string":
                            if (!Array.isArray(value)) value = [value];
                            break;
                        default:
                            value = [value];
                            break;
                    }
                } else value = [null];
                call.push(value);
            }
            console.json(call);
            var calls = unroll(call);
    
            var acc = moi.geometryDatabase.createObjectList();
            for (var i = 0; i < calls.length; i++) {
                var temp = factory.apply(null, calls[i]);
                for (var j = 0; j < temp.length; j++) {
                    acc.addObject(temp.item(j));
                }
            }
            this.boxcolor = acc.length == 0 ? "#F80" : "#0F5";
            this.setOutputData(0, acc);
            this.setDirtyCanvas(true);
        }
    
        function unroll(call) {
            if (call.length == 0) return [];
            if (call.length == 1) return call[0];
    
            var first = call.shift();
            var rest = unroll(call);
            var result = [];
            for (var i = 0; i < first.length; i++) {
                for (var j = 0; j < rest.length; j++) {
                    result.push([first[i]].concat(rest[j]));
                }
            }
            return result;
        }
    
        node.prototype.createFromFactory = function(factory) { // FIXME nk move into loop
            for (var i = 0; i < input.length; i++) {
                var arg = input[i];
                var type = arg.type;
                var rawValue;
                try {
                    rawValue = factory.getInput(i).getValue();
                } catch (e) {
                    rawValue = null;
                }
                var value = rawValue;
                switch (type) {
                    case "CoordinateFrame":
                        if (rawValue != null) {
                            value = new pointArray();
                            value.pushFrame(rawValue);
                        }
                        break;
                    case "Point":
                        if (rawValue != null) {
                            value = new pointArray();
                            value.pushPoint(rawValue);
                        }
                        break;
                    case "int":
                    case "float":
                    case "boolean":
                    case "string":
                        break;
                }
                this.properties[arg.name] = value;
            }
        };
        node.prototype.configure = function(info) {
            LGraphNode.prototype.configure.call(this, info);
            for (var i = 0; i < input.length; i++) {
                var value;
                var arg = input[i];
                var type = arg.type;
                var rawValue = this.properties[arg.name];
                if (rawValue == null) continue;
                switch (type) {
                    case "CoordinateFrame":
                    case "Point":
                        value = new pointArray();
                        value.concat(rawValue);
                        break;
                    default:
                        value = rawValue;
                }
                this.properties[arg.name] = value;
            }
        };
        node.prototype.getExtraMenuOptions = function() {
            var that = this;
            var menu_info = [];
            if (that.createdObjectIds) {
                for (var i = 0; i < that.createdObjectIds.length; i++) {
                    var obj = moi.geometryDatabase.findObject(that.createdObjectIds[i]);
                    if (obj != null) {
                        menu_info.push({
                            content: lang.getTranslation("Select"), callback: function() {
                                for (var i = 0; i < that.createdObjectIds.length; i++) {
                                    var obj = moi.geometryDatabase.findObject(that.createdObjectIds[i]);
                                    obj.selected = true;
                                }
                            }
                        });
                    }
                }
            }
            return menu_info;
        };
        node.prototype.getSlotMenuOptions = Elephant.getSlotMenuOptions;
        node.prototype.serialize = function(includeIO) {
            var o = LGraphNode.prototype.serialize.call(this, includeIO);
            o.boxcolor = "#F05";
            return o;
        }
    
        return node;
    }
    
    for (var name in Elephant.api.factories) {
        var info = Elephant.api.factories[name];
        var node = makeNodeType(name, info.in);
        LiteGraph.registerNodeType(info.category + "/" + node.title, node);
    }
    
    /// Some exceptional cases:
    
    var polyline = [
        {
            "pos": 0,
            "name": "Pts",
            "type": "pointarray"
        }
    ];
    var polyline = makeNodeType("polyline", polyline);
    polyline.onStart = function() {
        this.boxcolor = "#F80";
    }
    polyline.prototype.createFromFactory = function(factory) {
        var points = new pointArray();
        for (var i = 0; i < factory.numInputs; i++) {
            var input = factory.getInput(i);
            var value = input.getValue();
            switch (input.type) {
                case 1:
                    points.pushPoint(value);
                    break;
                case 3:
                    break;
            }
        }
        this.properties["Pts"] = points;
    }
    polyline.prototype.onExecute = function() {
        this.boxcolor = "#F80";
        var output = moi.geometryDatabase.createObjectList();
        this.setOutputData(0, output);
    
        var points = this.getInputData(0, this.properties["Pts"]);
        if (points == null) return;
    
        var factory = moi.command.createFactory( 'polyline' );
        for (var i = 0; i < points.length; i++) {
            factory.createInput('point');
            factory.setInput(i, points.getPoint(i));
        }
        var output = factory.calculate();
        if (output.length > 0) this.boxcolor = "#0F5";
        factory.cancel();
        this.setOutputData(0, output);
    }
    LiteGraph.registerNodeType("Commands/polyline", polyline);
    
    ////////////////////////////////////////////////////////////////
    /// Basic Object-Oriented node wrappers. An ONM if you will ///
    
    var ins = [{
        "pos": 0,
        "name": "Objects",
        "type": "ObjectList"
    }];
    var geomobjects = Elephant.api.geomobjects;
    for (var name in geomobjects) {
        var outs = [];
        for (var i = 0; i < geomobjects[name].out.length; i++) {
            var out = geomobjects[name].out[i];
            if (out.slot == "method" && (!out.name.startsWith("get") || out.arguments != "")) continue;
            var clone = {};
            for (var k in out) { clone[k] = out[k] }
            clone.originalName = out.name;
            clone.name = out.name.replace(/^get/, '');
            outs.push(clone);
        }
        var node = makeNodeType(name, ins, outs);
        node.prototype.onExecute = function() {
            this.boxcolor = "#F80";
            var outs = this.output;
            var enm = geomobjects[this.name].enum; // FIXME nk this is ugly
            var objects = this.getInputData(0, this.properties["Objects"]);
            var outputDatas = [];
            for (var i = 0; i < outs.length; i++) {
                switch (outs[i].type) {
                    case "Point":
                        outputDatas.push(new pointArray());
                        break;
                    case "ObjectList":
                        outputDatas.push(moi.geometryDatabase.createObjectList());
                        break;
                    default:
                        outputDatas.push([]);
                        break;
                }
                this.setOutputData(i, outputDatas[outputDatas.length-1]);
            }
    
            if (objects == null) return;
            for (var i = 0; i < objects.length; i++) {
                var object = objects.item(i);
                if (object.type == enm || enm == null) {
                    for (var j = 0; j < outs.length; j++) {
                        var outData = outputDatas[j];
                        // using call/apply doesn't seem to work with MoI's javascript host, so use eval instead
                        console.log("object." + outs[j].originalName + (outs[j].slot == "method" ? "()" : ""));
                        var result = eval("object." + outs[j].originalName + (outs[j].slot == "method" ? "()" : ""));
                        if (result == null) continue;
                        switch (outs[j].type) {
                            case "Point":
                                outData.pushPoint(result);
                                break;
                            case "ObjectList":
                                for (var k = 0; k < result.length; k++) {
                                    outData.addObject(result.item(k));
                                }
                                break;
                            default:
                                outData.push(result);
                                break;
                        }
                        this.boxcolor = "#0F5";
                    }
                }
            }
        }
        LiteGraph.registerNodeType("Classes/" + name, node);
    }
    
    var classes = Elephant.api.classes;
    for (var name in classes) {
        var ins = [{
            "pos": 0,
            "name": name,
            "type": name
        }];
        var outs = [];
        for (var i = 0; i < classes[name].out.length; i++) {
            var out = classes[name].out[i];
            if (out.slot == "method" && (!out.name.startsWith("get") || out.arguments != "")) continue;
            var clone = {};
            for (var k in out) { clone[k] = out[k] }
            clone.originalName = out.name;
            clone.name = out.name.replace(/^get/, '');
            outs.push(clone);
        }
        var node = makeNodeType(name, classes[name].singleton ? [] : ins, outs, classes[name]);
        node.prototype.onExecute = function() {
            var outs = this.output;
            var singleton = classes[this.name].singleton;
            var objects;
            if (!singleton) {
                objects = this.getInputData(0); // used by eval below
                if (objects == undefined) return;
            }
            var outputDatas = [];
            for (var i = 0; i < outs.length; i++) {
                switch (outs[i].type) {
                    case "Point":
                    case "CoordinateFrame":
                        outputDatas.push(new pointArray());
                        break;
                    case "ObjectList":
                        outputDatas.push(moi.geometryDatabase.createObjectList());
                        break;
                    default:
                        outputDatas.push([]);
                        break;
                }
                this.setOutputData(i, outputDatas[outputDatas.length-1]);
            }
            this.boxcolor = "#F80";

            for (var i = 0; i < outs.length; i++) {
                var outData = outputDatas[i];
                // using call/apply doesn't seem to work with MoI's javascript host, so use eval instead
                var result = eval((singleton ? singleton : "objects") + '.' + outs[i].originalName + (outs[i].slot == "method" ? "()" : ""));
                if (result == null) continue;
                switch (outs[i].type) {
                    case "Point":
                        outData.pushPoint(result);
                        break;
                    case "CoordinateFrame":
                        outData.pushFrame(result);
                    case "ObjectList":
                        for (var k = 0; k < result.length; k++) {
                            outData.addObject(result.item(k));
                        }
                        break;
                    default:
                        outData.push(result);
                        break;
                }
                this.boxcolor = "#0F5";
            }
        }
        LiteGraph.registerNodeType("Classes/" + name, node);
    }
    LiteGraph.getNodeType("Classes/PointPicker").prototype.onAdded = function() {
        this.properties.pointPicker = moi.ui.createPointPicker();
        var that = this;
        this.addWidget("button", "Pick", "", function(w, canvas, node, pos, event) {
            if (event.type !== "mousedown") return;

            while (true) {
                var pointpicker = that.properties.pointPicker;
                if (!pointpicker.waitForEvent())
                    return false;
                if (pointpicker.event == 'finished') {
                    that.markChanged();
                    break;
                }
            }
        });
    }
    LiteGraph.getNodeType("Classes/GeometryDatabase").prototype.hasChanged = function() {
        var revChange = moi.geometryDatabase.revision != this.prevRev;
        this.prevRev = moi.geometryDatabase.revision;
        var selection = moi.geometryDatabase.getSelectedObjects();
        var ids = [];
        var selectionChange = false;
        for (var i = 0; i < selection.length; i++) {
            ids.push(selection[i].id);
            if (!selectionChange && this.prevSelection.length > i - 1 && this.prevSelection[i] != selection[i].id);
                selectionChange = true;
        }
        this.prevSelection = ids;
        return revChange || selectionChange;
    }
    /////////////////////// Finally /////////////////////
    /// Exceptional cases that may be replaced ///
    
    var subobjectdesc = [
        {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
        },
        {
            "pos": 1,
            "name": "Index",
            "type": "numarray"
        }
    ];
    var subobject = makeNodeType("subobject", subobjectdesc);
    subobject.prototype.onExecute = function() {
        var objects = this.getInputData(0, this.properties["Objects"]);
        var index = this.getInputData(1, this.properties["Index"]);
        var output = moi.geometryDatabase.createObjectList();
    
        for (var i = 0; i < objects.length; i++) {
            var subobjects = objects.item(i).getSubObjects();
            for (var j = 0; j < index.length; j++) {
                var subobj = subobjects.item(index[j]);
                output.addObject(subobj);
            }
        }
        this.setOutputData(0, output);
        this.boxcolor = output.length == 0 ? "#F80" : "#0F5";
    }
    LiteGraph.registerNodeType("Commands/subobject", subobject);
    
    var loopbegindesc = {
        in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
        ],
        out: [
            { name: "Object", type: "ObjectList" },
            { name: "Loop", type: "token" },
        ]
    };
    var loopbegin = makeNodeType("loopbegin", loopbegindesc.in, loopbegindesc.out);
    loopbegin.prototype.onStart = function() {
        this.onPropertyChanged();
    }
    loopbegin.prototype.onPropertyChanged = function() {
        this.internal.i = 0;
    }
    loopbegin.prototype.onExecute = function() {
        this.boxcolor = "#F80";
        var objects = this.getInputData(0, this.properties["Objects"]);
        if (objects == null || objects.length == 0) return;
    
        if (this.internal.i < objects.length) {
            var object = objects.item(this.internal.i);
            var down = moi.geometryDatabase.createObjectList();
            down.addObject(object);
            this.setOutputData(0, down);
            this.setOutputData(1, this.internal.i == 0 ? "start" : "continue");
    
            this.internal.i++;
            var body = this.outputs[0];
            this.isChanged = true;
            for (var i = 0; i < body.links.length; i++) {
                var link_id = body.links[i];
                var link = this.graph.links[link_id];
                if (!link) continue;
                this.graph.setisChangedFlag(link.target_id);
            }
        } else if (this.internal.i == objects.length) {
            console.log("loopbegin done!");
            var end = this.outputs[1];
            for (var i = 0; i < end.links.length; i++) {
                var link_id = end.links[i];
                var link = this.graph.links[link_id];
                if (!link) continue;
                this.graph.setisChangedFlag(link.target_id);
            }
            this.internal.i = 0; // prepare for future invocations if someone else triggers change
            this.setOutputData(1, "end");
            this.boxcolor = "#0F5";
        }
    }
    LiteGraph.registerNodeType("Macros/loopbegin", loopbegin); // FIXME nk not macros
    
    var loopenddesc = {
        in: [
            {
                "pos": 0,
                "name": "Acc",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Loop",
                "type": "token"
            },
        ],
        out: [
            { name: "Out", type: "ObjectList" },
        ]
    };
    var loopend = makeNodeType("loopend", loopenddesc.in, loopenddesc.out);
    loopend.prototype.onExecute = function() {
        console.log("in loopend");
        this.boxcolor = "#F80";
        var state = this.getInputData(1, this.properties["Loop"]);
        switch (state) {
            case "start":
                console.log("case start");
                this.internal.finished = false;
                this.internal.acc = moi.geometryDatabase.createObjectList();
            case "continue":
                console.log("case continue");
                var objects = this.getInputData(0, this.properties["Objects"]);
                for (var i = 0; i < objects.length; i++) {
                    this.internal.acc.addObject(objects[i]);
                }
                break;
            case "end":
                console.log("case end");
                if (!this.internal.finished) {
                    var output = this.internal.acc;
                    this.setOutputData(0, output);
                    this.boxcolor = output.length == 0 ? "#F80" : "#0F5";
                    this.internal.finished = true;
                } else {
                    var begin = this.inputs[1];
                    var link = this.graph.links[begin.link];
                    if (!link) return;
                    this.graph.setisChangedFlag(link.origin_id);
                }
                break;
        }
    }
    LiteGraph.registerNodeType("Macros/loopend", loopend); // FIXME nk not macros
})();
