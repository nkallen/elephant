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
            case "int": return "numarray";
            case "ObjectList": return "objectlist";
            case "GeomObject": return "objectlist";
        }
        return type;
    }
    
    function makeNodeType(name, input, output, options) {
        options = options || {};
        var node = function() {
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
            var calls = this.getCalls();
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
        node.prototype.getCalls = function () {
            var call = [[name]];
            for (var i = 0; i < input.length; i++) {
                var type = input[i].type;
                var value = this.getInputData(i, this.properties[input[i].name]);
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
                            value = tmp.length == 0 ? [null] : tmp;
                            break;
                        case "CoordinateFrame":
                            value = [value.getFrame()];
                            break;
                        case "Point":
                            var tmp = [];
                            for (var j = 0; j < value.length; j++) {
                                tmp.push(value.getPoint(j));
                            }
                            value = tmp.length == 0 ? [null] : tmp;
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
            // console.json(call);
            var calls = unroll(call);
            return calls;
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
            var output = that.getOutputData(0);
            if (output != null) {
                menu_info.push({
                    content: lang.getTranslation("Replace with live object"), callback: function() {
                        var unlocked = moi.geometryDatabase.createObjectList();
                        var before = output;
                        var created = [];
                        for (var i = 0; i < before.length; i++) {
                            var o = before[i].clone();
                            unlocked.addObject(o);
                            created.push(o);
                            o.locked = false;
                            o.setHitTest(true);
                            o.name = that.title + "_" + String(that.id);
                        }
                        moi.geometryDatabase.addObjects(unlocked);

                        var node = LiteGraph.createNode("basic/getnamed");
                        node.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                        node.properties.name = that.title + "_" + String(that.id)
                        that.graph.add(node);
                        var outputs = that.outputs[0].links;
                        if (outputs == null) return;
                        for (var i = 0; i < outputs.length; i++) {
                            var link = that.graph.links[outputs[i]];
                            var target = that.graph.getNodeById(link.target_id);
                            node.connect(0, target, link.target_slot);
                        }                                    
                    }
                });
            }
            var selectedObjects = moi.geometryDatabase.getSelectedObjects();
            if (selectedObjects.length > 0) {
                menu_info.push({
                    content: lang.getTranslation("Replace with selected object"), callback: function() {
                        var store = LiteGraph.createNode("basic/store");
                        store.title = "Replace node with selected object";
                        graph.add(store, false, true);
                        store.addInput("a", "objectlist");
                        var info = graph.nodeForObjects(selectedObjects);
                        var source = info[0], wasCreated = info[1];
                        source.connect(0, store, 0);
                        graph.addHistoryItem(wasCreated, store);
                        var outputs = that.outputs[0].links;
                        if (outputs == null) return;
                        for (var i = 0; i < outputs.length; i++) {
                            var link = that.graph.links[outputs[i]];
                            var target = that.graph.getNodeById(link.target_id);
                            store.connect(0, target, link.target_slot);
                        }
                    }
                });
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
    var polies = ["polyline", "curve", "interpcurve", "sketchcurve"];
    for (var i = 0; i < polies.length; i++) {
        var factoryname = polies[i];
        var polyline_in = [
            {
                "pos": 0,
                "name": "Pts",
                "type": "Point"
            },
            {
                "pos": 1,
                "name": "Closed",
                "type": "boolean",
                "default": false,
            }
        ];
        Elephant.api.factories[factoryname] = { category: "curve", in: polyline_in};
        var polyline = makeNodeType(factoryname, polyline_in);
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
        
            var factory = moi.command.createFactory( this.name );
            console.trace("var factory = moi.command.createFactory('" + this.title + "');");
            for (var i = 0; i < points.length; i++) {
                console.trace("factory.createInput('point')");
                factory.createInput('point');
                console.trace("factory.setInput(" + String(i) + ", " + pp(1, points.getPoint(i)) + ");");
                factory.setInput(i, points.getPoint(i));
            }
            if (this.getInputData(1, this.properties["Closed"])) {
                console.trace("factory.createInput('point')");
                factory.createInput('point');
                console.trace("factory.setInput(" + String(i) + ", " + pp(1, points.getPoint(i)) + ");");
                factory.setInput(i, points.getPoint(0));
            }
            console.trace("factory.calculate()");
            var output = factory.calculate();
            if (output.length > 0) this.boxcolor = "#0F5";
            console.trace("factory.cancel()");
            factory.cancel();
            this.setOutputData(0, output);
        }
        LiteGraph.registerNodeType("curve/" + factoryname, polyline);
    }
    LiteGraph.getNodeType("edit/trim").prototype.onExecute = function() {
        var input = Elephant.api.factories.trim.in;
        var factory = moi.command.createFactory('trim');
        for (var i = 0; i < input.length; i++) {
            var value = this.getInputData(i, this.properties[input[i].name]);
            factory.setInput(input[i].pos, value);
        }
        factory.generateFragments(); // this seems to be required unlike most factories
        var acc = factory.calculate();
        factory.cancel();
        
        this.boxcolor = acc.length == 0 ? "#F80" : "#0F5";
        this.setOutputData(0, acc);
        this.setDirtyCanvas(true);
    }
    // fillet (FIXME need to add variable fillets too)
    LiteGraph.getNodeType("construct/fillet").prototype.onExecute = function() {
        var acc = moi.geometryDatabase.createObjectList();
        var calls = this.getCalls();
        console.json(calls);
        for (var i = 0; i < calls.length; i++) {
            var objects = calls[i][0+1];
            var radius = calls[i][3+1];
            var maxRadius = evalMinR(objects, 100);
            if (radius > maxRadius) {
                calls[i][3+1] = maxRadius - 0.1;
            }
            var temp = factory.apply(null, calls[i]);
            for (var j = 0; j < temp.length; j++) {
                acc.addObject(temp.item(j));
            }
        }
        this.boxcolor = acc.length == 0 ? "#F80" : "#0F5";
        this.setOutputData(0, acc);
        this.setDirtyCanvas(true);
    }

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
                this.setOutputData(i, outputDatas[i]);
            }
    
            if (objects == null) return;
            for (var i = 0; i < objects.length; i++) {
                var object = objects.item(i);
                if (object.type == enm || enm == null) {
                    for (var j = 0; j < outs.length; j++) {
                        var outData = outputDatas[j];
                        // using call/apply doesn't seem to work with MoI's javascript host, so use eval instead
                        // console.log("object." + outs[j].originalName + (outs[j].slot == "method" ? "()" : ""));
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

    var outs = [
        {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
        }
    ];
    var geomethods = Elephant.api.geomethods;
    for (var name in geomethods) {
        var node = makeNodeType(name, outs.concat(geomethods[name].in), [geomethods[name].out]);
        node.prototype.onExecute = function() {
            this.boxcolor = "#F80";
            var enm = geomethods[this.name].enum; // FIXME nk this is ugly
            var objects = this.getInputData(0, this.properties["Objects"]);
            var outData;
            switch (this.output[0].type) {
                case "Point":
                    outData = new pointArray();
                    break;
                case "ObjectList":
                    outData = moi.geometryDatabase.createObjectList();
                    break;
                default:
                    outData = [];
                    break;
            }
            this.setOutputData(0, outData);

            if (objects == null) return;
            for (var i = 0; i < objects.length; i++) {
                var object = objects.item(i);
                if (object.type == enm || enm == null) {
                    var result = object.evaluatePoint(this.getInputData(1, this.properties.t)[0]);
                    if (result == null) continue;
                    switch (this.output[0].type) {
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
        LiteGraph.registerNodeType("Methods/" + name, node);
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
            for (var j = 0; j < outs.length; j++) {
                switch (outs[j].type) {
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
                this.setOutputData(j, outputDatas[outputDatas.length-1]);
            }
            this.boxcolor = "#F80";
            var that = this;

            if (Array.isArray(objects)) {
                for (var i = 0; i < objects.length; i++) {
                    processPropertiesAndGetters(objects[i])
                }
            } else {
                processPropertiesAndGetters(objects)
            }

            function processPropertiesAndGetters(variable) {
                for (var j = 0; j < outs.length; j++) {
                    var outData = outputDatas[j];
                    // using call/apply doesn't seem to work with MoI's javascript host, so use eval instead
                    var result = eval((singleton ? singleton : "variable") + '.' + outs[j].originalName + (outs[j].slot == "method" ? "()" : ""));
                    if (result == null) continue;
                    switch (outs[j].type) {
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
                    that.boxcolor = "#0F5";
                }
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
        var revChange = moi.geometryDatabase.revision != this.prevRev; // FIXME nk
        this.prevRev = moi.geometryDatabase.revision;
        if (this.prevSelection == null) this.prevSelection = [];
        var selection = moi.geometryDatabase.getSelectedObjects();
        var ids = [];
        var selectionChange = false;
        for (var i = 0; i < selection.length; i++) {
            ids.push(selection.item(i).id);
        }
        if (this.prevSelection.length == ids.length) {
            for (var i = 0; i < ids.length; i++) {
                if (ids[i] != this.prevSelection[i]) {
                    selectionChange = true;
                    break;
                }
            }
        } else {
            selectionChange = true;
        }
        this.prevSelection = ids;
        return selectionChange;
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
        },
        {
            "pos": 2,
            "name": "Type",
            "type": "string",
            "options": ["Curves", "Edges", "Faces", "BReps", "Points"],
        }
    ];
    var subobject = makeNodeType("subobject", subobjectdesc);
    subobject.prototype.onExecute = function() {
        var objects = this.getInputData(0, this.properties["Objects"]);
        var index = this.getInputData(1, this.properties["Index"]);
        var type = this.getInputData(2, this.properties["Type"]);
        var output = moi.geometryDatabase.createObjectList();
        this.setOutputData(0, output);

        if (index == null) return;

        for (var i = 0; i < objects.length; i++) {
            var subobjects = objects.item(i).getSubObjects();
            if (type != null) {
                subobjects = subobjects["get" + type]();
            }
            for (var j = 0; j < index.length; j++) {
                if (index[j] >= subobjects.length) continue;
                var subobj = subobjects.item(index[j]);
                output.addObject(subobj);
            }
        }
        this.boxcolor = output.length == 0 ? "#F80" : "#0F5";
    }
    LiteGraph.registerNodeType("basic/subobject", subobject);
    
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
            { name: "Loop End", type: LiteGraph.EVENT },
        ]
    };
    var loopbegin = makeNodeType("loopbegin", loopbegindesc.in, loopbegindesc.out);
    loopbegin.prototype.onAdded = function() {
        this.onPropertyChanged();
    }
    loopbegin.prototype.onPropertyChanged = function() {
        this.currentIteration = 0;
    }
    loopbegin.prototype.onConnectionsChange = function() {
        console.log("in here");
        this.onPropertyChanged();
        this.markChanged();
    }
    loopbegin.prototype.onExecute = function() {
        this.boxcolor = "#F80";
        var objects = this.getInputData(0, this.properties["Objects"]);
        if (objects == null || objects.length == 0) {
            this.setOutputData(0, moi.geometryDatabase.createObjectList());
            this.setOutputData(1, "empty");
            return;
        }
    
        if (this.currentIteration < objects.length) {
            var object = objects.item(this.currentIteration);
            var down = moi.geometryDatabase.createObjectList();
            down.addObject(object);
            this.setOutputData(0, down);
            this.setOutputData(1, this.currentIteration == 0 ? "start" : "continue");
    
            this.currentIteration++;
            this.markChanged();
        } else if (this.currentIteration == objects.length) {
            this.currentIteration = 0; // prepare for future invocations if someone else triggers change
            this.setOutputData(1, "end");
            this.boxcolor = "#0F5";
        }
    }
    LiteGraph.registerNodeType("advanced/loopbegin", loopbegin); // FIXME nk not macros
    
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
                "type": LiteGraph.EVENT
            },
        ],
        out: [
            { name: "Out", type: "ObjectList" },
        ]
    };
    var loopend = makeNodeType("loopend", loopenddesc.in, loopenddesc.out);
    loopend.prototype.onExecute = function() {
        this.boxcolor = "#F80";
        var state = this.getInputData(1, this.properties["Loop"]);
        switch (state) {
            case "empty":
                this.setOutputData(0, moi.geometryDatabase.createObjectList());
            case "start":
                this.isFinished = false;
                this.accumulator = moi.geometryDatabase.createObjectList();
                // no break on purpose
            case "continue":
                var objects = this.getInputData(0, this.properties["Objects"]);
                for (var i = 0; i < objects.length; i++) {
                    this.accumulator.addObject(objects[i]);
                }
                break;
            case "end":
                if (!this.isFinished) {
                    var output = this.accumulator;
                    this.setOutputData(0, output);
                    this.boxcolor = output.length == 0 ? "#F80" : "#0F5";
                    this.isFinished = true;
                } else {
                    var begin = this.inputs[1];
                    var link = this.graph.links[begin.link];
                    if (!link) return;
                    var source_node = this.graph.getNodeById(link.origin_id);
                    source_node.markChanged();
                }
                break;
        }
    }
    LiteGraph.registerNodeType("advanced/loopend", loopend); // FIXME nk not macros
})();
