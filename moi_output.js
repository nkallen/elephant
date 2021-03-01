(function(){
    function MoIOutput() {
        this.size = [164, 84];
        this.addInput("","objectlist");
        var styles = moi.geometryDatabase.getObjectStyles();
        var names = []
        for ( var n=0; n<styles.length; n++ ) names.push(styles.item(n).name);
        this.addProperty("style", "Default", "enum", {values: names});
        this.addProperty("edges", true, "boolean");
        this.addProperty("displayMode", "Normal", "enum", {values: ["Normal", "FaintWireframe"]});
        this.addProperty("xOffset", 0.0, "number")
        this.addOutput("Out", "objectlist");
        this.sIndex = -1;
        this.tempobjects = moi.geometryDatabase.createObjectList();

        var that = this;
        this.unlockButton = this.addWidget("button", "Unlock", "value", function(w, canvas, node, pos, event) {
            if (event.type !== "mousedown") return;
            var origin_id = that.graph.links[that.inputs[0].link].origin_id;
            var origin = that.graph.getNodeById(origin_id);

            var unlocked = moi.geometryDatabase.createObjectList();
            var before = that.getInputData(0, moi.geometryDatabase.createObjectList());
            var created = [];
            for (var i = 0; i < before.length; i++) {
                var o = before[i].clone();
                unlocked.addObject(o);
                created.push(o);
                o.locked = false;
                o.setHitTest(true);
                o.name = origin.title + "_" + String(origin.id);
            }
            moi.geometryDatabase.addObjects(unlocked);
            that.graph.updateIndex(that.getInputNode(0), created);
            that.graph.remove(that);
            that.setDirtyCanvas(true, true);
        });
        this.unlockButton.disabled = true;
        this.offsetSlider = this.addWidget("slider", "x-offset", 0.0, function(n) {
            LGraphNode.prototype.onPropertyChanged.call(that, "xOffset", n);
            that.properties.xOffset = n;
        }, {min:-100, max:100});
    }
    
    MoIOutput.title = "Output";
    MoIOutput.desc = "Output";
    
    MoIOutput.prototype.onClear = function() {
        moi.geometryDatabase.removeObjects(this.tempobjects);
        this.tempobjects = moi.geometryDatabase.createObjectList();
    }

    MoIOutput.prototype.onPropertyChanged = function(name, value) {
        LGraphNode.prototype.onPropertyChanged.call(this, name, value);
        if (name != "xOffset") return;
        this.offsetSlider.value = value;
    };
    
    MoIOutput.prototype.onRemoved = function() {
        this.onClear();
    }
    
    MoIOutput.prototype.updateStyles = function() {
        var styles = moi.geometryDatabase.getObjectStyles();
        this.sIndex = -1;
        for ( var x=0; x<styles.length; x++ ) if ( this.properties.style === styles.item(x).name ) { this.sIndex = x; break; }
    }
    
    MoIOutput.prototype.updateObjects = function()
    {
        this.onClear();
        var inObj = this.getInputData(0, moi.geometryDatabase.createObjectList());

        for ( var i = 0; i<inObj.length; i++) {
            var object = inObj.item(i).clone();
            this.tempobjects.addObject(object);
        }
        console.trace("var input = objects;");
        console.trace("objects = moi.geometryDatabase.createObjectList();");
        console.trace("for (var i = 0; i < input.length; i++) {");
        console.trace("    var object = input.item(i).clone();");
        console.trace("    objects.addObject(object)");
        console.trace("}");

        if (this.properties.xOffset != 0.0) {
            var zero = moi.VectorMath.createPoint(0,0,0);
            var offset = moi.VectorMath.createPoint(this.properties.xOffset,0,0);
            this.tempobjects = factory('move', this.tempobjects, zero, offset, false);
        }

        switch (this.properties.displayMode) {
            case "Normal":
                this.tempobjects.setProperty('displayMode', 0);
                break;
            case "FaintWireframe":
                this.tempobjects.setProperty('displayMode', 1);
                break;
        }
        for ( var i = this.tempobjects.length; i > 0; ) this.tempobjects.item(--i).setHitTest(0);
        for (var i = 0; i < this.tempobjects.length; i++) {
            var object = this.tempobjects.item(i);
            object.locked = true;
            object.updateWithHistory = false;
        }
        console.trace("for (var i = 0; i < objects.length; i++) {");
        console.trace("    var object = objects.item(i);")
        console.trace("    object.locked = true;")
        console.trace("}");
        if (this.properties.edges[0] === "Off") for ( var breps = this.tempobjects.getBReps(), i = breps.length; i > 0; ) { breps.item(--i).getEdges().setProperty( 'hidden', true ); }
        var changeStyle = (this.properties.style[0] !== this.properties.style[1] && this.sIndex !== -1);
        if (changeStyle) this.tempobjects.setProperty( 'styleIndex', this.sIndex);

        moi.geometryDatabase.addObjects(this.tempobjects);
        this.graph.updateIndex(this, this.tempobjects);
        console.trace("moi.geometryDatabase.addObjects(objects)");
    }
    
    MoIOutput.prototype.onExecute = function() {
        this.unlockButton.disabled = true;
        this.updateObjects();
        if (this.inputs[0].link !== null) {
            if (this.tempobjects.length === 0) {
                this.boxcolor = "#F80"
            } else {
                this.unlockButton.disabled = false;
                this.boxcolor = "#0F5"
            }
        } else {
            this.boxcolor = "#F05"
        }
    }
    
    MoIOutput.prototype.getExtraMenuOptions = function(graphcanvas) { var that = this, thatgraph = this.graph; return [{content:lang.getTranslation("Clear"), callback: function() { that.onAdded(); that.onClear(); }}]; }
    
    MoIOutput.prototype.onDrawBackground = function(ctx) {
        if (!this.tempobjects) return;
        this.inputs[0].label = (this.tempobjects.length > 0) ? this.tempobjects.length.toFixed(0) : "--";
    };

    LiteGraph.registerNodeType("basic/Output", MoIOutput);    
}());
