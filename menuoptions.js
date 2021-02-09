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
                content: "Select Edge", callback: function() {
                    var edge = LiteGraph.createNode("Classes/Edge");
                    edge.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(edge);
                    that.connect(slot.slot, edge, 0);
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
                    var point = LiteGraph.createNode("Commands/point");
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
                    var point = LiteGraph.createNode("Commands/XXX");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    point.connect(0, that, slot.slot);
                }
            });
        } else if (_slot.type == "pointarray") {
            menu_info.push({
                content: "Expand point constant", callback: function() {
                    var point = LiteGraph.createNode("basic/point");
                    point.pos = [that.pos[0] - point.size[0] - 30, that.pos[1]];
                    that.graph.add(point);
                    if (that.properties[_slot.name]) {
                        point.loadValue(that.properties[_slot.name]);
                    }
                    point.connect(0, that, slot.slot);
                }
            });  
            menu_info.push({
                content: "From point", callback: function() {
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
                    var point = LiteGraph.createNode("Commands/PickPoint");
                    point.pos = [that.pos[0] + that.size[0] + 30, that.pos[1]];
                    that.graph.add(point);
                    that.connect(slot.slot, point, 0);
                }
            });
        }

    }
    return menu_info;
}
})(this);