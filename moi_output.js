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
        this.sIndex = -1;
        this.tempobjects = moi.geometryDatabase.createObjectList();

        var that = this;
        this.unlockButton = this.addWidget("button", "Unlock", "value", function(w, canvas, node, pos, event) {
            if (event.type !== "mousedown") return;

            var unlocked = moi.geometryDatabase.createObjectList();
            if (that.tempobjects) {
                var created = [];
                for (var i = 0; i < that.tempobjects.length; i++) {
                    var o = that.tempobjects[i].clone();
                    unlocked.addObject(o);
                    created.push(o);
                    o.locked = false;
                    o.setHitTest(true);
                }
                moi.geometryDatabase.addObjects(unlocked);
            }
            that.graph.updateIndex(that.getInputNode(0), created);
        });
        this.unlockButton.disabled = true;
        this.offsetSlider = this.addWidget("slider", "x-offset", 0.0, function(n) {
            that.onPropertyChanged("xOffset");
            that.properties.xOffset = n;
        }, {min:-100, max:100});
    }
    
    MoIOutput.title = "Output";
    MoIOutput.desc = "Output";
    
    MoIOutput.prototype.onClear = function() {
        moi.geometryDatabase.removeObjects(this.tempobjects);
        this.tempobjects = moi.geometryDatabase.createObjectList();
    }
        
    MoIOutput.prototype.onRemoved = function() {
        this.onClear();
    }
    
    MoIOutput.prototype.updateStyles = function()
    {
        var styles = moi.geometryDatabase.getObjectStyles();
        this.sIndex = -1;
        for ( var x=0; x<styles.length; x++ ) if ( this.properties.style === styles.item(x).name ) { this.sIndex = x; break; }
    }
    
    MoIOutput.prototype.updateObjects = function()
    {
        this.onClear();
        var changeStyle = (this.properties.style[0] !== this.properties.style[1] && this.sIndex !== -1);
        var inObj = this.getInputData(0, moi.geometryDatabase.createObjectList());
        switch (this.properties.displayMode) {
            case "Normal":
                inObj.setProperty('displayMode', 0);
                break;
            case "FaintWireFrame":
                inObj.setProperty('displayMode', 1);
                break;
        }

        for ( var i = 0; i<inObj.length; i++) {
            var object = changeStyle ? inObj.item(i).clone() : inObj.item(i);
            object.locked = true;
            this.tempobjects.addObject(object);
        }

        for ( var i = this.tempobjects.length; i > 0; ) this.tempobjects.item(--i).setHitTest(0);
        if (changeStyle) this.tempobjects.setProperty( 'styleIndex', this.sIndex);
        if (this.properties.xOffset != 0.0) {
            var zero = moi.VectorMath.createPoint(0,0,0);
            var offset = moi.VectorMath.createPoint(this.properties.xOffset,0,0);
            this.tempobjects = factory('move', this.tempobjects, zero, offset);
        }
        if (this.properties.edges[0] === "Off") for ( var breps = this.tempobjects.getBReps(), i = breps.length; i > 0; ) { breps.item(--i).getEdges().setProperty( 'hidden', true ); }
        moi.geometryDatabase.addObjects(this.tempobjects);
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
    
    MoIOutput.prototype.onGetCreatedObjects = function()
    {
        var list = [];
        for ( var i=0; i<this.tempobjects.length; i++) list.push(this.tempobjects.item(i).id);
        return list;
    }
    
    MoIOutput.prototype.getExtraMenuOptions = function(graphcanvas) { var that = this, thatgraph = this.graph; return [{content:lang.getTranslation("Clear"), callback: function() { that.onAdded(); that.onClear(); }}]; }
    
    MoIOutput.prototype.onDrawBackground = function(ctx) {
        if (!this.tempobjects) return;
        this.inputs[0].label = (this.tempobjects.length > 0) ? this.tempobjects.length.toFixed(0) : "--";
    };

    LiteGraph.registerNodeType("basic/Output", MoIOutput);    
}());
