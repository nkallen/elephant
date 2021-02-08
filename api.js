(function(){
    LiteGraph.createNodeFromFactory = function(factory) {
        var node = LiteGraph.createNode("Commands/" + factory.name);
        node.createFromFactory(factory);
        return node;
    }
    
    var factories = {
        "addpoint": [
            {
            "pos": 0,
            "name": "Is corner",
            "type": "boolean"
            }
        ],
        "booleanunion": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "ellipsediameter": [
            {
            "pos": 0,
            "name": "First axis start",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "First axis end",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Second axis pt",
            "type": "Point"
            }
        ],
        "planarsrf": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "rotateaxis": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Axis start",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Axis end",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Angle",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Ref A",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Ref B",
            "type": "Point"
            },
            {
            "pos": 6,
            "name": "Make copies",
            "type": "boolean"
            }
        ],
        "align": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Alignment pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Align mode",
            "type": "string"
            }
        ],
        "box": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Extrusion",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Extrusion pt",
            "type": "Point"
            }
        ],
        "extend": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Boundaries",
            "type": "ObjectList"
            }
        ],
        "plane": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            }
        ],
        "scale": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Origin",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Scale factor",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Ref A",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Ref B",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Make copies",
            "type": "boolean"
            }
        ],
        "alignbackgroundimage": [
            {
            "pos": 0,
            "name": "P1",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "P2",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "P3",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "P4",
            "type": "Point"
            }
        ],
        "box3pts": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Extrusion",
            "type": "float"
            },
            {
            "pos": 6,
            "name": "Extrusion pt",
            "type": "Point"
            }
        ],
        "extrude": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Distance pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Distance",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Dir A",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Dir B",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Cap ends",
            "type": "boolean"
            },
            {
            "pos": 6,
            "name": "Both sides",
            "type": "boolean"
            },
            {
            "pos": 7,
            "name": "Path",
            "type": "GeomObject"
            },
            {
            "pos": 8,
            "name": "Path reversed",
            "type": "boolean"
            }
        ],
        "plane3pts": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Height",
            "type": "float"
            }
        ],
        "scale1d": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Origin",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Scale factor",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Ref A",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Ref B",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Make copies",
            "type": "boolean"
            }
        ],
        "arc3pt": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Style",
            "type": "string"
            }
        ],
        "boxcenter": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Extrusion",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Extrusion pt",
            "type": "Point"
            }
        ],
        "fillet": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Straight corners",
            "type": "boolean"
            },
            {
            "pos": 2,
            "name": "Corners",
            "type": "List"
            },
            {
            "pos": 3,
            "name": "Radius",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Shape",
            "type": "string"
            },
            {
            "pos": 5,
            "name": "BlendScale",
            "type": "float"
            }
        ],
        "planecenter": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            }
        ],
        "scale2d": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Origin",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Scale factor",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Ref A",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Ref B",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Make copies",
            "type": "boolean"
            }
        ],
        "arccenter": [
            {
            "pos": 0,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Start",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "End",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Angle",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Elliptical",
            "type": "boolean"
            }
        ],
        "chamfer": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Straight corners",
            "type": "boolean"
            },
            {
            "pos": 2,
            "name": "Corners",
            "type": "List"
            },
            {
            "pos": 3,
            "name": "Dist A",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Dist B",
            "type": "float"
            }
        ],
        "flip": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "point": [
            {
            "pos": 0,
            "name": "Pt",
            "type": "Point"
            }
        ],
        "separate": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "arccontinue": [
            {
            "pos": 0,
            "name": "Start pt",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "End pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Angle",
            "type": "float"
            }
        ],
        "circle": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Radius pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Radius",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Vertical",
            "type": "boolean"
            }
        ],
        "helix": [
            {
            "pos": 0,
            "name": "Base point",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "End point",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Helix start point",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Start radius",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "End radius point",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "End radius",
            "type": "float"
            },
            {
            "pos": 6,
            "name": "Num turns",
            "type": "float"
            },
            {
            "pos": 7,
            "name": "Pitch",
            "type": "float"
            },
            {
            "pos": 8,
            "name": "Mode",
            "type": "string"
            },
            {
            "pos": 9,
            "name": "Reverse twist",
            "type": "boolean"
            }
        ],
        "polygon": [
            {
            "pos": 0,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Radius",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Num sides",
            "type": "int"
            }
        ],
        "shell": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Distance",
            "type": "float"
            },
            {
            "pos": 2,
            "name": "Direction",
            "type": "string"
            },
            {
            "pos": 3,
            "name": "Flip",
            "type": "boolean"
            }
        ],
        "arctangent": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Radius",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Side pt",
            "type": "Point"
            }
        ],
        "circle3pt": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt C",
            "type": "Point"
            }
        ],
        "interpcurve": [],
        "polygonedge": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Num sides",
            "type": "int"
            },
            {
            "pos": 3,
            "name": "Flip",
            "type": "boolean"
            }
        ],
        "shrinktrimmedsrf": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "arraycircular": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Center pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Num items",
            "type": "int"
            },
            {
            "pos": 3,
            "name": "Angle",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Vertical step",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Radial step",
            "type": "float"
            },
            {
            "pos": 6,
            "name": "Angle mode",
            "type": "string"
            }
        ],
        "circlediameter": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Vertical",
            "type": "boolean"
            }
        ],
        "intersect": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "polygonstar": [
            {
            "pos": 0,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Radius",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Num sides",
            "type": "int"
            },
            {
            "pos": 3,
            "name": "Second radius",
            "type": "Point"
            }
        ],
        "sketchcurve": [],
        "arraycurve": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Path",
            "type": "GeomObject"
            },
            {
            "pos": 2,
            "name": "Mode",
            "type": "string",
            "options": ["NumItems", "NumItems", "Distance"]
            },
            {
            "pos": 3,
            "name": "Num items",
            "type": "int",
            "default": 10,
            },
            {
            "pos": 4,
            "name": "Distance",
            "type": "float",
            "default": 1.0,
            },
            {
            "pos": 5,
            "name": "Rotation mode",
            "type": "string",
            "options": ["Freeform", "Freeform", "Flat", "None"],
            },
            {
            "pos": 6,
            "name": "Orientation",
            "type": "List"
            },
            {
            "pos": 7,
            "name": "Alignment surface",
            "type": "GeomObject"
            }
        ],
        "circletangent": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Radius",
            "type": "float"
            }
        ],
        "join": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "sphere": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Radius pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Radius",
            "type": "float"
            }
        ],
        "arraydir": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Num items",
            "type": "int"
            },
            {
            "pos": 2,
            "name": "BasePt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "OffsetPt",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "ExtentPt",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Mode",
            "type": "string"
            }
        ],
        "cone": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Radius pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Radius",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "End pt",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Height",
            "type": "float"
            }
        ],
        "line": [
            {
            "pos": 0,
            "name": "Start",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "End",
            "type": "Point"
            }
        ],
        "project": [
            {
            "pos": 0,
            "name": "BaseObjects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "TargetObjects",
            "type": "ObjectList"
            },
            {
            "pos": 2,
            "name": "Mode",
            "type": "string"
            },
            {
            "pos": 3,
            "name": "Direction start pt",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Direction end pt",
            "type": "Point"
            }
        ],
        "sweep": [
            {
            "pos": 0,
            "name": "Profiles",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Rails",
            "type": "ObjectList"
            },
            {
            "pos": 2,
            "name": "Orientations",
            "type": "List"
            },
            {
            "pos": 3,
            "name": "RailOrientations",
            "type": "List"
            },
            {
            "pos": 4,
            "name": "Pointy ends",
            "type": "string"
            },
            {
            "pos": 5,
            "name": "Twist",
            "type": "string"
            },
            {
            "pos": 6,
            "name": "Maintain height",
            "type": "boolean"
            },
            {
            "pos": 7,
            "name": "Cap ends",
            "type": "boolean"
            },
            {
            "pos": 8,
            "name": "Maintain tangent",
            "type": "boolean"
            },
            {
            "pos": 9,
            "name": "Scaling rail",
            "type": "GeomObject"
            },
            {
            "pos": 10,
            "name": "Profile synch type",
            "type": "string"
            },
            {
            "pos": "11",
            "name": "Num Profile Points",
            "type": "int"
            }
        ],
        "arraygrid": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Extrusion",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Extrusion pt",
            "type": "Point"
            },
            {
            "pos": 6,
            "name": "NumCopies X",
            "type": "int"
            },
            {
            "pos": 7,
            "name": "NumCopies Y",
            "type": "int"
            },
            {
            "pos": 8,
            "name": "NumCopies Z",
            "type": "int"
            },
            {
            "pos": 9,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "copy": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Base pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Offset pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Make copies",
            "type": "boolean"
            },
            {
            "pos": 4,
            "name": "Distance from edge",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "From edge cplane",
            "type": "CoordinateFrame"
            }
        ],
        "loft": [
            {
            "pos": 0,
            "name": "Sections",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Orientations",
            "type": "List"
            },
            {
            "pos": 2,
            "name": "Style",
            "type": "string",
            "options": ["normal", "normal", "loose", "straight"]
            },
            {
            "pos": 3,
            "name": "Cap ends",
            "type": "boolean",
            "default": true,
            },
            {
            "pos": 4,
            "name": "Closed",
            "type": "boolean",
            "default": false
            },
            {
            "pos": 5,
            "name": "Profile synch type",
            "type": "string", 
            "options": ["Auto", "Auto", "Exact", "Refit", "NumPoints"]
            },
            {
            "pos": 6,
            "name": "Num Profile Points",
            "type": "int",
            "default": 10
            }
        ],
        "railrevolve": [
            {
            "pos": 0,
            "name": "Profile",
            "type": "GeomObject"
            },
            {
            "pos": 1,
            "name": "Rail",
            "type": "GeomObject"
            },
            {
            "pos": 2,
            "name": "Axis start",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Axis end",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Cap ends",
            "type": "boolean"
            }
        ],
        "text": [
            {
            "pos": 0,
            "name": "Base point",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Text",
            "type": "string"
            },
            {
            "pos": 2,
            "name": "Font",
            "type": "string"
            },
            {
            "pos": 3,
            "name": "Bold",
            "type": "boolean"
            },
            {
            "pos": 4,
            "name": "Italic",
            "type": "boolean"
            },
            {
            "pos": 5,
            "name": "Type",
            "type": "string"
            },
            {
            "pos": 6,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 7,
            "name": "Extrusion",
            "type": "float"
            },
            {
            "pos": 8,
            "name": "PreviewMode",
            "type": "boolean"
            }
        ],
        "backgroundimage": [
            {
            "pos": 0,
            "name": "FileName",
            "type": "string"
            },
            {
            "pos": 1,
            "name": "Base",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Corner",
            "type": "Point"
            }
        ],
        // "curve": [],
        "merge": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "rect3pts": [
            {
            "pos": 0,
            "name": "Pt A",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "Pt B",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Pt C",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "Rounded",
            "type": "boolean"
            },
            {
            "pos": 6,
            "name": "Round pt",
            "type": "Point"
            },
            {
            "pos": 7,
            "name": "Round radius",
            "type": "float"
            }
        ],
        "trim": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Cutters",
            "type": "ObjectList"
            },
            {
            "pos": 2,
            "name": "Fragments",
            "type": "ObjectList"
            },
            {
            "pos": 3,
            "name": "Mode",
            "type": "string"
            },
            {
            "pos": 4,
            "name": "Extend lines",
            "type": "boolean"
            },
            {
            "pos": 5,
            "name": "Use proj intersections",
            "type": "boolean"
            },
            {
            "pos": 6,
            "name": "Trim pts",
            "type": "List"
            }
        ],
        "blend": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Orientations",
            "type": "List"
            },
            {
            "pos": 2,
            "name": "Continuity",
            "type": "string"
            },
            {
            "pos": 3,
            "name": "Bulge",
            "type": "float"
            }
        ],
        "cylinder": [
            {
            "pos": 0,
            "name": "Is radius",
            "type": "boolean"
            },
            {
            "pos": 1,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Radius pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Radius",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "End pt",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Height",
            "type": "float"
            }
        ],
        "mirror": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "End pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Delete inputs",
            "type": "boolean"
            }
        ],
        "rectangle": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Rounded",
            "type": "boolean"
            },
            {
            "pos": 5,
            "name": "Round pt",
            "type": "Point"
            },
            {
            "pos": 6,
            "name": "Round radius",
            "type": "float"
            }
        ],
        "booleandifference": [
            {
            "pos": 0,
            "name": "Base objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Cutting objects",
            "type": "ObjectList"
            },
            {
            "pos": 2,
            "name": "Keep cutting objects",
            "type": "boolean"
            }
        ],
        "delete": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "move": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Base pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Offset pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Make copies",
            "type": "boolean"
            },
            {
            "pos": 4,
            "name": "Distance from edge",
            "type": "float"
            },
            {
            "pos": 5,
            "name": "From edge cplane",
            "type": "CoordinateFrame"
            }
        ],
        "rectcenter": [
            {
            "pos": 0,
            "name": "Base pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Corner pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Rounded",
            "type": "boolean"
            },
            {
            "pos": 5,
            "name": "Round pt",
            "type": "Point"
            },
            {
            "pos": 6,
            "name": "Round radius",
            "type": "float"
            }
        ],
        "booleanintersection": [
            {
            "pos": 0,
            "name": "Base objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Intersectors",
            "type": "ObjectList"
            }
        ],
        "ellipse": [
            {
            "pos": 0,
            "name": "Center pt",
            "type": "Point"
            },
            {
            "pos": 1,
            "name": "First axis pt",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Second axis pt",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Height",
            "type": "float"
            }
        ],
        "network": [
            {
            "pos": 0,
            "name": "U curves",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "V curves",
            "type": "ObjectList"
            },
            {
            "pos": 2,
            "name": "U orientations",
            "type": "List"
            },
            {
            "pos": 3,
            "name": "V orientations",
            "type": "List"
            }
        ],
        "revolve": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Axis start",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Axis end",
            "type": "Point"
            },
            {
            "pos": 3,
            "name": "Angle",
            "type": "float"
            },
            {
            "pos": 4,
            "name": "Cap ends",
            "type": "boolean"
            }
        ],
        "booleanmerge": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ],
        "ellipsecorner": [
            {
            "pos": 0,
            "name": "Base corner",
            "type": "CoordinateFrame"
            },
            {
            "pos": 1,
            "name": "Other corner",
            "type": "Point"
            },
            {
            "pos": 2,
            "name": "Width",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Height",
            "type": "float"
            }
        ],
        "offset": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Distance",
            "type": "float"
            },
            {
            "pos": 2,
            "name": "Offset pt",
            "type": "CoordinateFrame"
            },
            {
            "pos": 3,
            "name": "Corner type",
            "type": "string"
            },
            {
            "pos": 4,
            "name": "Trim",
            "type": "boolean"
            },
            {
            "pos": 5,
            "name": "Flip",
            "type": "boolean"
            },
            {
            "pos": 6,
            "name": "Both sides",
            "type": "boolean"
            },
            {
            "pos": 7,
            "name": "Cap ends",
            "type": "boolean"
            }
        ],
        "rotate": [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            },
            {
            "pos": 1,
            "name": "Center",
            "type": "CoordinateFrame"
            },
            {
            "pos": 2,
            "name": "Angle",
            "type": "float"
            },
            {
            "pos": 3,
            "name": "Ref A",
            "type": "Point"
            },
            {
            "pos": 4,
            "name": "Ref B",
            "type": "Point"
            },
            {
            "pos": 5,
            "name": "Make copies",
            "type": "boolean"
            }
        ],
        "isocurve": [
            {
                "pos": 0,
                "name": "Face",
                "type": "GeomObject"
            },
            {
                "pos": 1,
                "name": "Point",
                "type": "Point"
            },
            {
                "pos": 2,
                "name": "Direction",
                "type": "string",
                "options": ["both", "both", "u", "v"]
            },
        ],
        "rebuildcurve": [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Mode",
                "type": "String"
            },    
            {
                "pos": 2,
                "name": "Tolerance",
                "type": "float"
            },
            {
                "pos": 3,
                "name": "Num points",
                "type": "int"
            },
            {
                "pos": 4,
                "name": "Delete",
                "type": "boolean"
            },
            {
                "pos": 5,
                "name": "Keep Corners",
                "type": "Boolean"
            },
            {
                "pos": 6,
                "name": "Break angle",
                "type": "float"
            }
        ]
        };
    
    function mapType(type) {
        switch (type) {
            case "CoordinateFrame":
                return "pointarray";
            case "Point":
                return "pointarray";
            case "float":
                return "numarray";
            case "ObjectList":
                return "objectlist";
            case "GeomObject":
                return "objectlist";
        }
        return type;
    }
    
    function makeNodeType(name, args, output) {
        var node = function() {
            this.internal = {};
            this.properties = {};
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                var type = mapType(arg.type);
                this.addInput(arg.name, type);
                this.properties[arg.name] = null; // this is necessary for saving/loading
                switch (arg.type) {
                    case "boolean":
                        this.properties[arg.name] == [arg.default ? "On" : "Off", "On", "Off"];
                        break;
                    case "string":
                        this.properties[arg.name] = arg.options;
                        break;
                    default:
                        if ("default" in arg)
                            this.properties[arg.name] = [arg.default];
                        break;
                    }
            }
            if (output == null) { output = [{name: "Out", type: "ObjectList"}] }
            for (var i = 0; i < output.length; i++) {
                this.addOutput(output[i].name, mapType(output[i].type));
            }
            this.args = args;
            this.output = output;
            this.name = name;
            this.boxcolor = "#F05";
        };
        node.title = name;
        node.desc = name;
        node.prototype.onExecute = function() { // FIXME nk move into loop
            console.log("onExecute " + name);
            var call = [[name]];
            for (var i = 0; i < args.length; i++) {
                var value = this.getInputData(i, this.properties[args[i].name]);
                var type = args[i].type;
                console.log("i: " + value + " " + type);
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
                            console.log(value.getPoint(j).toString());
                            value = tmp;
                            break;
                        case "float":
                        case "int":
                            value = value.length == 0 ? [null] : value;
                            break;
                        case "boolean":
                            value = [value[0] == "On"];
                            break;
                        case "string":
                            value = [value[0]];
                            break;
                        default:
                            value = [value];
                            break;
                    }
                }
                if (value == null) value = [null];
                call.push(value);
                console.log(-1);
            }
            var calls = unroll(call);
    
            var acc = moi.geometryDatabase.createObjectList();
            for (var i = 0; i < calls.length; i++) {
                console.log("calling fac");
                var temp = factory.apply(null, calls[i]);
                console.log("/calling fac");
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
    
        node.prototype.createFromFactory = function(factory) {
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
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
                        value = value == null ? [] : [value];
                        break;
                    case "boolean":
                        value = [value ? "On" : "Off", "On", "Off"];
                    case "string":
                        value = [value].concat(arg.options || []);
                }
                this.properties[arg.name] = value;
            }
        };
        node.prototype.configure = function(info) {
            LGraphNode.prototype.configure.call(this, info);
            for (var i = 0; i < args.length; i++) {
                var value;
                var arg = args[i];
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
        node.prototype.getSlotMenuOptions = function(slot) {
            var that = this;
            menu_info = [];
            var _slot = slot.input || slot.output;
            if (slot.output) {
                if (_slot.type == "objectlist") {
                    menu_info.push({
                        content: "Add output", callback: function() {
                            var output = LiteGraph.createNode("Basic/Output");
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
        node.prototype.serialize = function(includeIO) {
            var o = LGraphNode.prototype.serialize.call(this, includeIO);
            o.boxcolor = "#F05";
            return o;
        }
    
    
        return node;
    }
    
    var sorted = Object.keys(factories).sort();
    for (var i = 0; i < sorted.length; i++) {
        var name = sorted[i];
        var args = factories[name];
        var node = makeNodeType(name, args);
        LiteGraph.registerNodeType("Commands/" + node.title, node);
    }
    
    /// Some exceptional cases:
    
    factories.polyline = [
        {
            "pos": 0,
            "name": "Pts",
            "type": "pointarray"
        }
    ];
    var polyline = makeNodeType("polyline", factories.polyline);
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
        console.log("polyline output: " + output.length);
        factory.cancel();
        this.setOutputData(0, output);
    }
    LiteGraph.registerNodeType("Commands/polyline", polyline);
    
    ////////////////////////////////////////////////////////////////
    /// Basic Object-Oriented node wrappers. An ONM if you will ///
    
    var geomobjects = {
        "GeomObject": {
            "out": [
              {
                "name": "databaseRevision",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
              },
              {
                "name": "databaseState",
                "type": "ObjectDatabaseStateEnum",
                "arguments": "read only",
                "slot": "property"
              },
              {
                "name": "displayMode",
                "type": "DisplayModeEnum",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "hidden",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "id",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
              },
              {
                "name": "locked",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "name",
                "type": "string",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "selected",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "showPoints",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "styleIndex",
                "type": "int",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "type",
                "type": "GeomObjectEnum",
                "arguments": "read only",
                "slot": "property"
              },
              {
                "name": "updateWithHistory",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              },
              {
                "name": "clone",
                "type": "GeomObject",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "deleteHistoryData",
                "type": "",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getBoundingBox",
                "type": "BoundingBox",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getHistoryChildren",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getHistoryData",
                "type": "string",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getHistoryParents",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getSubObjects",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "setHitTest",
                "type": "",
                "arguments": " boolean newHitTest ",
                "slot": "method"
              }
            ]
          },
        "BRep": {
            enum: 3,
            "out": [
              {
                "name": "getEdges",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getFaces",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getJoinedEdges",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getNakedEdges",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              },
              {
                "name": "getSeamEdges",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
              }
            ]
          },
        "Curve": {
            enum: 2,
            "out": [
                {
                  "name": "isClosed",
                  "type": "boolean",
                  "arguments": "read only",
                  "slot": "property"
                },
                {
                  "name": "getEndPt",
                  "type": "Point",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getFacesOfEdge",
                  "type": "ObjectList",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getLength",
                  "type": "float",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getStartPt",
                  "type": "Point",
                  "arguments": "",
                  "slot": "method"
                }
              ]
        },
        "PointObject": {
            enum: 6,
            "out": [
                {
                  "name": "pt",
                  "type": "Point",
                  "arguments": "read only",
                  "slot": "property"
                }
            ]
          },
          "ConstructionLine": {
            enum: 5,
            "out": [
              {
                "name": "isTemporary",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
              }
            ]
          },
        "Face": {
            enum: 4,
            "out": [
                {
                  "name": "getEdges",
                  "type": "ObjectList",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getJoinedEdges",
                  "type": "ObjectList",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getNakedEdges",
                  "type": "ObjectList",
                  "arguments": "",
                  "slot": "method"
                },
                {
                  "name": "getSeamEdges",
                  "type": "ObjectList",
                  "arguments": "",
                  "slot": "method"
                }
            ]
        }
    }
    var ins = [{
        "pos": 0,
        "name": "Objects",
        "type": "ObjectList"
    }];
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
            console.log("onExecute: " + this.name);
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
    
    var classes = {
        "PointPicker": {
            singleton: "this.properties.pointPicker",
            "out": [
                /*
            {
                "name": "allowMidObjectSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "altDown",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "basept",
                "type": "PickedPoint",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "controlDown",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "cplane",
                "type": "CoordinateFrame",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "disableBasePt",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "disableObjectSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "disableSnapToBasePt",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "disableStraightSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "disableTanPerpObjectSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "disableVerticalStraightSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "enableOnObjectSnap",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "finishOnMouseDown",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "finishOnMouseUp",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "hasRelocatedBasePt",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "inMouseDown",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "inMouseUp",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "onlyUseSnapFunc",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "orientedptframe",
                "type": "CoordinateFrame",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "param",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            */
           {
                "name": "pt",
                "type": "PickedPoint",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "ptframe",
                "type": "CoordinateFrame",
                "arguments": "read only",
                "slot": "property"
            },
            /*
            {
                "name": "relocatedBasePt",
                "type": "Point",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "resetOnMouseLeave",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "shiftDown",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "stickToSurfacesMode",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "addSnapFunc",
                "type": "",
                "arguments": " object pdispFunc,string funcName = \"\" ",
                "slot": "method"
            },
            {
                "name": "addSnapPoint",
                "type": "",
                "arguments": " Point point,string textLabel ",
                "slot": "method"
            },
            {
                "name": "addSnapPostFunc",
                "type": "",
                "arguments": " object pdispFunc,string funcName = \"\" ",
                "slot": "method"
            },
            {
                "name": "addStraightSnapAngle",
                "type": "",
                "arguments": " float angleInDegrees,string label ",
                "slot": "method"
            },
            {
                "name": "bindBasePt",
                "type": "",
                "arguments": " object target ",
                "slot": "method"
            },
            {
                "name": "bindFunc",
                "type": "",
                "arguments": " object target,string funcName = \"\" ",
                "slot": "method"
            },
            {
                "name": "bindFuncPostUpdate",
                "type": "",
                "arguments": " object target,string funcName = \"\" ",
                "slot": "method"
            },
            {
                "name": "bindResultCPlane",
                "type": "",
                "arguments": " object target ",
                "slot": "method"
            },
            {
                "name": "bindResultFrame",
                "type": "",
                "arguments": " object target ",
                "slot": "method"
            },
            {
                "name": "bindResultOrientation",
                "type": "",
                "arguments": " object target ",
                "slot": "method"
            },
            {
                "name": "bindResultPt",
                "type": "",
                "arguments": " object target ",
                "slot": "method"
            },
            {
                "name": "clearBasePt",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearBindings",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearCurrentSnaps",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearSnapFuncPoint",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearSnapFuncs",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearSnapPoints",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "clearStraightSnapAngles",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "disableStraightSnapAngle",
                "type": "",
                "arguments": " float angleInDegrees ",
                "slot": "method"
            },
            {
                "name": "reset",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "restrictToLinePtDir",
                "type": "",
                "arguments": " Point basePt,Point dir,boolean projectAll ",
                "slot": "method"
            },
            {
                "name": "restrictToLinePtPt",
                "type": "",
                "arguments": " Point startPt,Point endpt,boolean projectAll ",
                "slot": "method"
            },
            {
                "name": "restrictToObject",
                "type": "",
                "arguments": " GeomObject obj ",
                "slot": "method"
            },
            {
                "name": "restrictToPlane",
                "type": "",
                "arguments": " CoordinateFrame plane,boolean projectAll ",
                "slot": "method"
            },
            {
                "name": "restrictToPlaneThroughPt",
                "type": "",
                "arguments": " Point point,boolean projectAll ",
                "slot": "method"
            },
            {
                "name": "setAngleConstraint",
                "type": "",
                "arguments": " float angleDegrees ",
                "slot": "method"
            },
            {
                "name": "setBasePt",
                "type": "",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "setDistanceConstraint",
                "type": "",
                "arguments": " float distance ",
                "slot": "method"
            },
            {
                "name": "setPt",
                "type": "",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "setRadialIntersection",
                "type": "",
                "arguments": " CoordinateFrame frame,Point point ",
                "slot": "method"
            },
            {
                "name": "setSnapFuncPoint",
                "type": "",
                "arguments": " Point point,string textLabel ",
                "slot": "method"
            },
            {
                "name": "setX",
                "type": "",
                "arguments": " float x ",
                "slot": "method"
            },
            {
                "name": "setY",
                "type": "",
                "arguments": " float y ",
                "slot": "method"
            },
            {
                "name": "setZ",
                "type": "",
                "arguments": " float z ",
                "slot": "method"
            }
            */
            ]
        },
        "BoundingBox": {
            "out": [
            {
                "name": "center",
                "type": "Point",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "diagonalLength",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "max",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "min",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "xLength",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "yLength",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "zLength",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "addBoundingBox",
                "type": "",
                "arguments": " BoundingBox box ",
                "slot": "method"
            },
            {
                "name": "addObject",
                "type": "",
                "arguments": " GeomObject obj,boolean useHighAccuracyBounds = 0 ",
                "slot": "method"
            },
            {
                "name": "addPoint",
                "type": "",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "clear",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "get",
                "type": "",
                "arguments": " float minX,float minY,float minZ,float maxX,float maxY,float maxZ ",
                "slot": "method"
            },
            {
                "name": "set",
                "type": "",
                "arguments": " float minX,float minY,float minZ,float maxX,float maxY,float maxZ ",
                "slot": "method"
            }
            ]
        },
        "FilesystemOM": {
            "out": [
            {
                "name": "getCompactPath",
                "type": "string",
                "arguments": " string fileName,int numChars ",
                "slot": "method"
            },
            {
                "name": "getFileNameFromPath",
                "type": "string",
                "arguments": " string fullPath ",
                "slot": "method"
            },
            {
                "name": "getOpenFileName",
                "type": "string",
                "arguments": " string title,string filters ",
                "slot": "method"
            },
            {
                "name": "getSaveFileName",
                "type": "string",
                "arguments": " string title,string filters ",
                "slot": "method"
            },
            {
                "name": "incrementFileName",
                "type": "string",
                "arguments": " string fileName ",
                "slot": "method"
            }
            ]
        },
        "Moi": {
            singleton: "moi",
            "out": [
            {
                "name": "command",
                "type": "CommandOM",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "drawingAids",
                "type": "DrawingAids",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "expireDate",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "filesystem",
                "type": "FilesystemOM",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "geometryDatabase",
                "type": "GeometryDatabase",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "grid",
                "type": "Grid",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "selection",
                "type": "Selection",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "settings",
                "type": "Settings",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "ui",
                "type": "UI",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "vectorMath",
                "type": "VectorMath",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "version",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "view",
                "type": "View",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "copyTextToClipboard",
                "type": "",
                "arguments": " string text ",
                "slot": "method"
            },
            {
                "name": "createList",
                "type": "List",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "exit",
                "type": "",
                "arguments": " boolean noQuerySaveChanges = 0 ",
                "slot": "method"
            },
            {
                "name": "getLog",
                "type": "string",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "launchHelp",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "log",
                "type": "",
                "arguments": " string toLog ",
                "slot": "method"
            },
            {
                "name": "test",
                "type": "",
                "arguments": " string test ",
                "slot": "method"
            }
            ]
        },
        "VectorMath": {
            "out": [
            {
                "name": "add",
                "type": "object",
                "arguments": " object pointA,object pointB ",
                "slot": "method"
            },
            {
                "name": "average",
                "type": "object",
                "arguments": " object pointA,object pointB ",
                "slot": "method"
            },
            {
                "name": "createBoundingBox",
                "type": "BoundingBox",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "createFrame",
                "type": "CoordinateFrame",
                "arguments": " Point origin = NULL,Point xAxis = NULL,Point yAxis = NULL ",
                "slot": "method"
            },
            {
                "name": "createFrontFrame",
                "type": "CoordinateFrame",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "createPoint",
                "type": "Point",
                "arguments": " float x = 0.0,float y = 0.0,float z = 0.0 ",
                "slot": "method"
            },
            {
                "name": "createRightFrame",
                "type": "CoordinateFrame",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "createTopFrame",
                "type": "CoordinateFrame",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "distance",
                "type": "float",
                "arguments": " object pointA,object pointB ",
                "slot": "method"
            },
            {
                "name": "pointsAreEqual",
                "type": "boolean",
                "arguments": " object pointA,object pointB ",
                "slot": "method"
            },
            {
                "name": "pointsWithinTolerance",
                "type": "boolean",
                "arguments": " object pointA,object pointB ",
                "slot": "method"
            }
            ]
        },
        "CommandOM": {
            singleton: "moi.command",
            "out": [
            {
                "name": "lastCommandRevisionEnd",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "lastCommandRevisionStart",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "nonRepeatingCommands",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "cancel",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "createFactory",
                "type": "GeometryFactory",
                "arguments": " string factoryName ",
                "slot": "method"
            },
            {
                "name": "execCommand",
                "type": "",
                "arguments": " string commandName ",
                "slot": "method"
            },
            {
                "name": "execCommandSet",
                "type": "",
                "arguments": " string commandSetName ",
                "slot": "method"
            },
            {
                "name": "getOption",
                "type": "any",
                "arguments": " string option,boolean fromIni = 0 ",
                "slot": "method"
            },
            {
                "name": "redo",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "registerCommandSpecificShortcutKey",
                "type": "",
                "arguments": " string shortcut ",
                "slot": "method"
            },
            {
                "name": "repeatLastCommand",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "setCommandSpecificUndo",
                "type": "",
                "arguments": " boolean newCommandSpecificUndo ",
                "slot": "method"
            },
            {
                "name": "setOption",
                "type": "",
                "arguments": " string option,any varValue,boolean toIni = 0 ",
                "slot": "method"
            },
            {
                "name": "undo",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },
        "View": {
            "out": [
            {
                "name": "allowRotationTilt3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "axisLabels",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "backgroundImageDrawOrder",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "backgroundImageShowIn",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "backgroundImageTransparency",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "customFillLightLevel",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "customKeyLightLevel",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "edgeColorMode",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "edgeFixedColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "fixedLightPositions",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "hiddenLineOpacity",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "hiddenLineStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lightDirection",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lightingStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lineWidth",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "linkOrthoViews",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lockedObjectsColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lockedObjectsUseAlternateColor",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "meshAngle",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "meshDetailedInflections",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "metallicLighting",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "panButtonSensitivity",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "panSpeed3dx",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reversePan3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reversePanButton",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseRotateButton",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseRotateMouse",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseRotation3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseScrollWheel",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseZoom3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "reverseZoomButton",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "rotateButtonSensitivity",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "rotateMiddleButton",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "rotationSpeed3dx",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "rotationStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "shadeMode",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "showAxisIcon",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "showEditFrame",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "showHiddenLines",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "showViewControls",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "specularBrightness",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "specularFocusSize",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "specularHighlights",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "surfaceColorMode",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "surfaceFixedColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "swapPanZoom3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "swapTwistTilt3dx",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "viewportBackgroundColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "zoomButtonSensitivity",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "zoomSpeed3dx",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "getBackgroundImages",
                "type": "List",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getCPlane",
                "type": "CoordinateFrame",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "resetAll",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "resetCPlane",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "screenshot",
                "type": "Image",
                "arguments": " string area,boolean includeCursor ",
                "slot": "method"
            },
            {
                "name": "setCPlane",
                "type": "",
                "arguments": " CoordinateFrame frame,boolean applyToAllViews = -1,boolean orientOrthoViews = -1 ",
                "slot": "method"
            },
            {
                "name": "setCPlaneInteractive",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },
        "ObjectList": {
            "out": [
            {
                "name": "length",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numBReps",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numConstructionLines",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numCurves",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numEdges",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numFaces",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numOpenBReps",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numPoints",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numSingleFaceBReps",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numSolids",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numStandaloneCurves",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "numTopLevelObjects",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "addObject",
                "type": "",
                "arguments": " GeomObject obj ",
                "slot": "method"
            },
            {
                "name": "callMethod",
                "type": "",
                "arguments": " string methodName ",
                "slot": "method"
            },
            {
                "name": "getBReps",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getBoundingBox",
                "type": "BoundingBox",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getConstructionLines",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getCurves",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getEdges",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getFaces",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getHighAccuracyBoundingBox",
                "type": "BoundingBox",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getOpenBReps",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getPoints",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getSingleFaceBReps",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getSolids",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getStandaloneCurves",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getTopLevelObjects",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "invertProperty",
                "type": "",
                "arguments": " string propName ",
                "slot": "method"
            },
            {
                "name": "item",
                "type": "GeomObject",
                "arguments": " int index ",
                "slot": "method"
            },
            {
                "name": "lockSelection",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "removeObject",
                "type": "",
                "arguments": " GeomObject obj ",
                "slot": "method"
            },
            {
                "name": "removeObjectAt",
                "type": "",
                "arguments": " int index ",
                "slot": "method"
            },
            {
                "name": "setProperty",
                "type": "",
                "arguments": " string propName,any pvarValue ",
                "slot": "method"
            },
            {
                "name": "sortBySelectionOrder",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "unlockSelection",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },
        "GeometryDatabase": {
            singleton: "moi.geometryDatabase",
            "out": [
            {
                "name": "Units",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "currentFileName",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "currentFileNameDir",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "defaultUnits",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "generatedObjectsInheritStyle",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "revision",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "scaleOnImportDifferentUnits",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "scaleOnUnitChange",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "startupTemplate",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "tolerance",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "unitsShortLabel",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "addObject",
                "type": "",
                "arguments": " GeomObject object ",
                "slot": "method"
            },
            {
                "name": "addObjects",
                "type": "",
                "arguments": " ObjectList objects ",
                "slot": "method"
            },
            {
                "name": "addStyle",
                "type": "ObjectStyle",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "calculateCurveOrientations",
                "type": "List",
                "arguments": " ObjectList curveList ",
                "slot": "method"
            },
            {
                "name": "copyToClipboard",
                "type": "",
                "arguments": " ObjectList objects ",
                "slot": "method"
            },
            {
                "name": "copyToClipboardCommand",
                "type": "",
                "arguments": " ObjectList objects ",
                "slot": "method"
            },
            {
                "name": "createObjectList",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "deleteAll",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "deselectAll",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "fileExport",
                "type": "",
                "arguments": " string fileName,string options = \"\" ",
                "slot": "method"
            },
            {
                "name": "fileImport",
                "type": "",
                "arguments": " string fileName ",
                "slot": "method"
            },
            {
                "name": "fileNew",
                "type": "",
                "arguments": " boolean noQuerySaveChanges = 0 ",
                "slot": "method"
            },
            {
                "name": "findObject",
                "type": "GeomObject",
                "arguments": " string id ",
                "slot": "method"
            },
            {
                "name": "findStyle",
                "type": "ObjectStyle",
                "arguments": " string styleName,boolean createIfNotFound = 0 ",
                "slot": "method"
            },
            {
                "name": "getObjectStyles",
                "type": "List",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getObjects",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getOpenFileName",
                "type": "string",
                "arguments": " string dialogTitle = \"\",boolean isTemplate = 0 ",
                "slot": "method"
            },
            {
                "name": "getSaveFileName",
                "type": "string",
                "arguments": " string default = \"\" ",
                "slot": "method"
            },
            {
                "name": "getSelectedObjects",
                "type": "ObjectList",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "hide",
                "type": "",
                "arguments": " boolean unused = 0 ",
                "slot": "method"
            },
            {
                "name": "incrementalSave",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "invertSelection",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "isolate",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "isolateLock",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "lock",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "open",
                "type": "",
                "arguments": " string fileName,boolean noQuerySaveChanges = 0 ",
                "slot": "method"
            },
            {
                "name": "openTemplate",
                "type": "",
                "arguments": " string fileName,boolean noQuerySaveChanges = 0 ",
                "slot": "method"
            },
            {
                "name": "pasteFromClipboard",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "removeObject",
                "type": "",
                "arguments": " GeomObject object ",
                "slot": "method"
            },
            {
                "name": "removeObjects",
                "type": "",
                "arguments": " ObjectList objects ",
                "slot": "method"
            },
            {
                "name": "save",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "saveAs",
                "type": "",
                "arguments": " string fileName,string options = \"\" ",
                "slot": "method"
            },
            {
                "name": "selectAll",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "selectLastCreated",
                "type": "",
                "arguments": " boolean deselectOthers = 0 ",
                "slot": "method"
            },
            {
                "name": "selectNamed",
                "type": "",
                "arguments": " string name ",
                "slot": "method"
            },
            {
                "name": "selectVisible",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "showPoints",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "showSubset",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "sortCurves",
                "type": "",
                "arguments": " ObjectList curveList ",
                "slot": "method"
            },
            {
                "name": "styleEditorClosed",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "styleEditorOpened",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "unlockSubset",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },
        "ObjectPicker": {
            "out": [
            {
                "name": "finishOnPick",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "max",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "min",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "objects",
                "type": "ObjectList",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "allowBReps",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowCurves",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowEdgeCurves",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowEditPoints",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowFaces",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowPointObjects",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowStandaloneCurves",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "allowTopLevelObjects",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "disableWindowing",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "done",
                "type": "boolean",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "resetAllow",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },
        "Settings": {
            "out": [
            {
                "name": "igesJoinOnImport",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lwoScaleToMeters",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lwoVertexNormalsStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "meshExportCombineSameNamedObjects",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "objExportOrientation",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "objExportScaleFactor",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "objExportWriteMaterialAssignments",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "objExportWriteMtlFile",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "stlExportFileType",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "editIniFile",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "getIniPath",
                "type": "string",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "restoreDefaults",
                "type": "",
                "arguments": " string whichGroup = \"\" ",
                "slot": "method"
            }
            ]
        },
        "CoordinateFrame": {
            "out": [
            {
                "name": "origin",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "xaxis",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "yaxis",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "zaxis",
                "type": "Point",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "distancex",
                "type": "float",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "distancey",
                "type": "float",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "distancez",
                "type": "float",
                "arguments": " Point point ",
                "slot": "method"
            },
            {
                "name": "evaluate",
                "type": "Point",
                "arguments": " float x,float y,float z ",
                "slot": "method"
            },
            {
                "name": "get",
                "type": "",
                "arguments": " float originX,float originY,float originZ,float xAxisX,float xAxisY,float xAxisZ,float yAxisX,float yAxisY,float yAxisZ ",
                "slot": "method"
            },
            {
                "name": "set",
                "type": "",
                "arguments": " float newOriginX,float newOriginY,float newOriginZ,float newXAxisX,float newXAxisY,float newXAxisZ,float newYAxisX,float newYAxisY,float newYAxisZ ",
                "slot": "method"
            }
            ]
        },
        "Viewport": {
            "out": [
            {
                "name": "cameraFrame",
                "type": "CoordinateFrame",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "cameraPt",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "cplane",
                "type": "CoordinateFrame",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "is3DView",
                "type": "boolean",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "leftRightAngle",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "name",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "projection",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "targetFrame",
                "type": "CoordinateFrame",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "targetPt",
                "type": "Point",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "tiltAngle",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "upDownAngle",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "viewPanel",
                "type": "ViewPanel",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "interactiveViewChange",
                "type": "",
                "arguments": " string type ",
                "slot": "method"
            },
            {
                "name": "pan",
                "type": "",
                "arguments": " float rightLeft,float upDown,float backwardsForwards = 0.0 ",
                "slot": "method"
            },
            {
                "name": "renderToClipboard",
                "type": "",
                "arguments": " int width,int height ",
                "slot": "method"
            },
            {
                "name": "reset",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "rotate",
                "type": "",
                "arguments": " string direction,float angleDegrees = 0.0 ",
                "slot": "method"
            },
            {
                "name": "setAngles",
                "type": "",
                "arguments": " float upDownAngleDegrees = 0.0,float leftRightAngleDegrees = 0.0,float tiltAngleDegrees = 0.0 ",
                "slot": "method"
            },
            {
                "name": "setCameraAndTarget",
                "type": "",
                "arguments": " Point newCamera,Point newTarget ",
                "slot": "method"
            },
            {
                "name": "zoom",
                "type": "",
                "arguments": " float zoomFactor ",
                "slot": "method"
            }
            ]
        },
        "ObjectStyle": {
            "out": [
            {
                "name": "color",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "hexcolor",
                "type": "string",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "index",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "name",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "moveDown",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "moveUp",
                "type": "",
                "arguments": "",
                "slot": "method"
            },
            {
                "name": "remove",
                "type": "",
                "arguments": "",
                "slot": "method"
            }
            ]
        },

        "Grid": {
            "out": [
            {
                "name": "accentedLineColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "accentedLineFrequency",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "accentedLineStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "accentedLineWidth",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "display",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lineColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lineStyle",
                "type": "string",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "lineWidth",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "sections",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "showXYAxes",
                "type": "boolean",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "size",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "snapSize",
                "type": "float",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "xAxisColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            },
            {
                "name": "yAxisColor",
                "type": "int",
                "arguments": "",
                "slot": "property"
            }
            ]
        },
        "PickedPoint": {
            "out": [
            {
                "name": "numOsnaps",
                "type": "int",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "screenX",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "screenY",
                "type": "float",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "viewport",
                "type": "Viewport",
                "arguments": "read only",
                "slot": "property"
            },
            {
                "name": "osnap",
                "type": "Osnap",
                "arguments": " int index ",
                "slot": "method"
            }
            ]
        },
    }
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
        var node = makeNodeType(name, classes[name].singleton ? [] : ins, outs);
        node.prototype.onExecute = function() {
            console.log("onExecute: " + this.name);
            var outs = this.output;
            var singleton = classes[this.name].singleton;
            var objects;
            if (!singleton) {
                objects = this.getInputData(0); // used by eval below
                if (objects == undefined) return;
                console.log(objects.xLength);
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
                    that.hasChanged();
                    break;
                }
            }
        });
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
        this.setOutputData(0, output);
    
        for (var i = 0; i < objects.length; i++) {
            var subobjects = objects.item(i).getSubObjects();
            for (var j = 0; j < index.length; j++) {
                var subobj = subobjects.item(index[j]);
                output.addObject(subobj);
            }
        }
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
        console.log("in loopbegin + " + this.internal.i);
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
    
    
    // $.map($(tbody).find("tr td a"), function (item) {
    // 	var trs = $($("a[name='" + $(item).attr("href").substring(1,25) + "']")[0])
    //         .nextAll(".sectionb:first").find("tr.odd, tr.even");
    //     return {name: $(item).attr("href").substring(2,25), args: $.map(trs, function(tr) {
    //         var tds = $(tr).find("td");
    //         return {pos: $(tds[0]).text(), b: $(tds[1]).text(), c: $(tds[2]).text()} })};
    // })
    
    
    // $.map($(tbody).find("tr td a"), function (item) {
    // 	var trs = $($("a[name='" + $(item).attr("href").substring(1,25) + "']")[0])
    //         .nextAll(".sectionb:first").find("table:contains('Properties')")
    //         .find("tr.odd, tr.even");
    //     var props = $.map(trs, function(tr) {
    //             var tds = $(tr).find("td");
    //             return {name: $(tds[0]).text(), type: $(tds[1]).text(), arguments: $(tds[2]).find('.info').text(), slot: "property" }})
    //     var trs = $($("a[name='" + $(item).attr("href").substring(1,25) + "']")[0])
    //         .nextAll(".sectionb:first").find("table:contains('Methods')")
    //         .find("tr.odd, tr.even");
    //     var methods = $.map(trs, function(tr) {
    //             var tds = $(tr).find("td");
    //             return {name: $(tds[0]).text(), type: $(tds[1]).text(), arguments: $(tds[2]).find('.info').text(), slot: "method" }})
    
    //     return {name: $(item).attr("href").substring(2,25), out: $.extend({}, props, methods)}
    // })

    