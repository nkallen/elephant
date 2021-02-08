(function(){
    function MoIOutput()
    {
        // this.minsize = [70, 0];
        this.size = [164, 84];
        this.boxcolor = "#F05";
        this.addInput("","objectlist");
        this.flags = { isOutput: true };
        this.properties = {style:["--", "--"], edges:["On", "Off", "On"], displayMode: ["Normal", "Normal", "FaintWireframe"]};
        this.sIndex = -1;
        this.tempobjects = moi.geometryDatabase.createObjectList();

        this.addProperty("text", "click me");
        this.addProperty("font_size", 30);
        this.size = [164, 84];
        this.clicked = false;
    }
    
    MoIOutput.title = "Output";
    MoIOutput.desc = "Output";
    
    MoIOutput.prototype.onClear = function()
    {
        moi.geometryDatabase.removeObjects(this.tempobjects);
        this.tempobjects = moi.geometryDatabase.createObjectList();
    }
    
    MoIOutput.prototype.onAdded = function()
    {
        if ( !this.properties ) { this.properties = {style:["--", "--"]} } else { if (!this.properties.style) this.properties.style = ["--", "--"]}
        this.properties.style = this.properties.style.slice(0,2);
        var styles = moi.geometryDatabase.getObjectStyles();
        for ( var n=0; n<styles.length; n++ ) this.properties.style.push(styles.item(n).name);
        this.updateStyles();
    }
    
    MoIOutput.prototype.onRemoved = function()
    {
        this.onClear();
    }
    
    MoIOutput.prototype.updateStyles = function()
    {
        var styles = moi.geometryDatabase.getObjectStyles();
        this.sIndex = -1;
        for ( var x=0; x<styles.length; x++ ) if ( this.properties.style[0] === styles.item(x).name ) { this.sIndex = x; break; }
    }
    
    MoIOutput.prototype.updateObjects = function()
    {
        this.onClear();
        var changeStyle = (this.properties.style[0] !== this.properties.style[1] && this.sIndex !== -1);
        var inObj = this.getInputData(0, moi.geometryDatabase.createObjectList());
        // if (!inObj) {
        //     console.log("ERRROR");
        //     return;
        // }
        switch (this.properties.displayMode) {
            case "Normal":
                inObj.setProperty('displayMode', 0);
                break;
            case "FaintWireFrame":
                inObj.setProperty('displayMode', 1);
                break;
        }
        for ( var i = 0; i<inObj.length; i++) this.tempobjects.addObject(changeStyle?inObj.item(i).clone():inObj.item(i));
        for ( var i = this.tempobjects.length; i > 0; ) this.tempobjects.item(--i).setHitTest(0);
        if (changeStyle) this.tempobjects.setProperty( 'styleIndex', this.sIndex);
        if (this.properties.edges[0] === "Off") for ( var breps = this.tempobjects.getBReps(), i = breps.length; i > 0; ) { breps.item(--i).getEdges().setProperty( 'hidden', true ); }
        moi.geometryDatabase.addObjects(this.tempobjects);
    }
    
    MoIOutput.prototype.onPropertyChange = function(property)
    {
        this.updateStyles();
        this.updateObjects();
        if ( property === "edges" ) if (this.properties.edges[0] === "On") for ( var breps = this.tempobjects.getBReps(), i = breps.length; i > 0; ) { breps.item(--i).getEdges().setProperty( 'hidden', false ); }
    }
    
    MoIOutput.prototype.onApply = function()
    {
        var newobjects = moi.geometryDatabase.createObjectList();
        for ( var i=0; i<this.tempobjects.length; i++) { newobjects.addObject(this.tempobjects.item(i).clone()); newobjects.item(i).styleIndex = this.tempobjects.item(i).styleIndex; }
        moi.geometryDatabase.addObjects(newobjects);
        moi.geometryDatabase.removeObjects(this.tempobjects);
        this.tempobjects = moi.geometryDatabase.createObjectList();
    }
    
    MoIOutput.prototype.onExecute = function()
    {
        console.log("moioutput");
        this.updateObjects();
        if(this.inputs[0].link !== null) { if (this.tempobjects.length === 0) {this.boxcolor = "#F80"} else {this.boxcolor = "#0F5"}} else {this.boxcolor = "#F05"}
    }
    
    MoIOutput.prototype.onGetCreatedObjects = function()
    {
        var list = [];
        for ( var i=0; i<this.tempobjects.length; i++) list.push(this.tempobjects.item(i).id);
        return list;
    }
    
    MoIOutput.prototype.getExtraMenuOptions = function(graphcanvas) { var that = this, thatgraph = this.graph; return [{content:lang.getTranslation("Clear"), callback: function() { that.onAdded(); that.onClear(); that.graph.setisChangedFlag(that.id); }}]; }
    
    MoIOutput.prototype.onDrawForeground = function(ctx)
    {
        if (this.flags.collapsed) {
            return;
        }
        var margin = 10;
        ctx.fillStyle = "black";
        ctx.fillRect(
            margin + 1,
            margin + 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = "#AAF";
        ctx.fillRect(
            margin - 1,
            margin - 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = this.clicked
            ? "white"
            : this.mouseOver
            ? "#668"
            : "#334";
        ctx.fillRect(
            margin,
            margin,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );

        var text = (this.tempobjects.length > 0)?this.tempobjects.length.toFixed(0):"--";
        var font_size = this.properties.font_size || 30;
        ctx.textAlign = "center";
        ctx.fillStyle = this.clicked ? "black" : "white";
        ctx.font = font_size + "px " + "Arial";
        ctx.fillText(
            text,
            this.size[0] * 0.5,
            this.size[1] * 0.5 + font_size * 0.3
        );
        ctx.textAlign = "left";
    }
    LiteGraph.registerNodeType("Basic/Output", MoIOutput);    
}());
