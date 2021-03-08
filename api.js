Elephant.api = {
    factories: {
        "addpoint": {category: "edit", in: [
            {
            "pos": 0,
            "name": "Is corner",
            "type": "boolean"
            }
        ]},
        "addpointsrf": {category: "edit", in: [
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
            "name": "Isocurve direction",
            "type": "String",
            "options": ["both", "u", "v"],
            "default": "both"
            },
            {
            "pos": 3,
            "name": "Symmetrical",
            "type": "boolean"
            }
        ]},
        "booleanunion": {category: "construct", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "ellipsediameter": {category: "curve", in: [
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
        ]},
        "planarsrf": {category: "construct", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "rotateaxis": {category: "transform", in: [
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
        ]},
        "align": {category: "transform", in: [
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
        ]},
        "box": {category: "solid", in: [
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
        ]},
        "extend": {category: "edit", in: [
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
        ]},
        "plane": {category: "solid", in: [
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
        ]},
        "scale": {category: "transform", in: [
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
        ]},
        "alignbackgroundimage": {category: "factory", in: [
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
        ]},
        "box3pts": {category: "solid", in: [
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
        ]},
        "extrude": {category: "construct", in: [
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
            },
            {
            "pos": 9,
            "name": "To point",
            "type": "boolean"
            },
            {
            "pos": 10,
            "name": "Draft angle",
            "type": "float"
            },
            {
            "pos": 11,
            "name": "Flip",
            "type": "boolean"
            },
        ]},
        "plane3pts": {category: "solid", in: [
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
        ]},
        "scale1d": {category: "transform", in: [
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
        ]},
        "arc3pt": {category: "curve", in: [
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
        ]},
        "boxcenter": {category: "solid", in: [
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
        ]},
        "fillet": {category: "construct", in: [
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
        ]},
        "planecenter": {category: "solid", in: [
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
        ]},
        "scale2d": {category: "transform", in: [
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
        ]},
        "arccenter": {category: "curve", in: [
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
        ]},
        "chamfer": {category: "construct", in: [
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
        ]},
        "flip": {category: "factory", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "point": {category: "factory", in: [
            {
            "pos": 0,
            "name": "Pt",
            "type": "Point"
            }
        ]},
        "separate": {category: "edit", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "arccontinue": {category: "curve", in: [
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
        ]},
        "circle": {category: "curve", in: [
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
        ]},
        "helix": {category: "curve", in: [
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
        ]},
        "polygon": {category: "curve", in: [
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
        ]},
        "shell": {category: "construct", in: [
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
        ]},
        "arctangent": {category: "curve", in: [
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
        ]},
        "circle3pt": {category: "curve", in: [
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
        ]},
        "polygonedge": {category: "factory", in: [
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
        ]},
        "shrinktrimmedsrf": {category: "factory", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "arraycircular": {category: "transform", in: [
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
        ]},
        "circlediameter": {category: "curve", in: [
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
        ]},
        "intersect": {category: "construct", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "polygonstar": {category: "curve", in: [
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
        ]},
        "arraycurve": {category: "transform", in: [
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
        ]},
        "circletangent": {category: "curve", in: [
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
        ]},
        "join": {category: "edit", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "sphere": {category: "solid", in: [
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
        ]},
        "arraydir": {category: "transform", in: [
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
        ]},
        "cone": {category: "solid", in: [
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
        ]},
        "line": {category: "curve", in: [
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
        ]},
        "project": {category: "construct", in: [
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
        ]},
        "sweep": {category: "construct", in: [
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
            "pos": 11,
            "name": "Num Profile Points",
            "type": "int"
            }
        ]},
        "arraygrid": {category: "transform", in: [
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
        ]},
        "copy": {category: "edit", in: [
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
        ]},
        "loft": {category: "construct", in: [
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
            "options": ["normal", "loose", "straight"],
            "default": "normal"
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
            "options": ["Auto", "Exact", "Refit", "NumPoints"],
            "default": "Auto"
            },
            {
            "pos": 6,
            "name": "Num Profile Points",
            "type": "int",
            "default": 10
            }
        ]},
        "railrevolve": {category: "construct", in: [
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
        ]},
        "text": {category: "solid", in: [
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
        ]},
        "backgroundimage": {category: "view", in: [
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
        ]},
        "merge": {category: "construct", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "rect3pts": {category: "curve", in: [
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
        ]},
        "trim": {category: "edit", in: [
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
            },
            {
                "pos": 7,
                "name": "Delete cutting objects",
                "type": "boolean"
                },
            {
                "pos": 8,
                "name": "Keep all joined",
                "type": "boolean"
            }
        ]},
        "blend": {category: "construct", in: [
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
        ]},
        "cylinder": {category: "solid", in: [
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
        ]},
        "mirror": {category: "transform", in: [
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
        ]},
        "rectangle": {category: "curve", in: [
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
        ]},
        "booleandifference": {category: "construct", in: [
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
        ]},
        "delete": {category: "edit", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "move": {category: "transform", in: [
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
        ]},
        "rectcenter": {category: "curve", in: [
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
        ]},
        "booleanintersection": {category: "construct", in: [
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
        ]},
        "ellipse": {category: "curve", in: [
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
        ]},
        "network": {category: "construct", in: [
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
        ]},
        "revolve": {category: "construct", in: [
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
        ]},
        "booleanmerge": {category: "construct", in: [
            {
            "pos": 0,
            "name": "Objects",
            "type": "ObjectList"
            }
        ]},
        "ellipsecorner": {category: "curve", in: [
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
        ]},
        "offset": {category: "construct", in: [
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
        ]},
        "rotate": {category: "transform", in: [
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
        ]},
        "isocurve": {category: "construct", in: [
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
                "options": ["both", "u", "v"],
                "default": "both"
            },
        ]},
        "rebuildcurve": {category: "factory", in: [
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
        ]},
        "nsided": {category: "construct", in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Bulge",
                "type": "float"
            },
            {
                "pos": 2,
                "name": "Num U",
                "type": "int"
            },
            {
                "pos": 3,
                "name": "Num V",
                "type": "int"
            },
        ]},

        "silhouette": {category: "construct", in: [
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
                "name": "Forward",
                "type": "Point"
            },
            {
                "pos": 3,
                "name": "Is Perspective",
                "type": "boolean"
            },
            {
                "pos": 4,
                "name": "Include Edges",
                "type": "boolean"
            },
        ]},
        "orient": {category: "transform", in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Base Frame",
                "type": "CoordinateFrame"
            },
            {
                "pos": 2,
                "name": "New Frame",
                "type": "CoordinateFrame"
            },
            {
                "pos": 3,
                "name": "Make Copies",
                "type": "boolean"
            },
        ]},
        "flow": {category: "construct", in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Base Object",
                "type": "GeomObject"
            },
            {
                "pos": 2,
                "name": "Target Object",
                "type": "GeomObject"
            },
            {
                "pos": 3,
                "name": "Delete Inputs",
                "type": "boolean"
            },
            {
                "pos": 4,
                "name": "Flow Stretch",
                "type": "boolean"
            },
            {
                "pos": 5,
                "name": "Flow Rigid",
                "type": "boolean"
            },
            {
                "pos": 6,
                "name": "idk",
                "type": "idk"
            },
            {
                "pos": 7,
                "name": "Flow Straight",
                "type": "boolean"
            },
            {
                "pos": 6,
                "name": "idk",
                "type": "idk"
            },
            {
                "pos": 6,
                "name": "idk",
                "type": "idk"
            },
            {
                "pos": 10,
                "name": "Flip normal",
                "type": "boolean"
            },
            {
                "pos": 11,
                "name": "Projective",
                "type": "boolean"
            },
            {
                "pos": 12,
                "name": "Straight",
                "type": "boolean"
            },
        ]},
        "twist": {category: "transform", in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Axist Start",
                "type": "Point"
            },
            {
                "pos": 2,
                "name": "Axis End",
                "type": "Point"
            },
            {
                "pos": 3,
                "name": "Angle",
                "type": "float"
            },
            {
                "pos": 4,
                "name": "Limit to axis",
                "type": "boolean"
            },
            {
                "pos": 5,
                "name": "Ease in",
                "type": "float"
            },
            {
                "pos": 6,
                "name": "Ease out",
                "type": "float"
            },
        ]},
        "inset": {category: "construct", in: [
            {
                "pos": 0,
                "name": "Objects",
                "type": "ObjectList"
            },
            {
                "pos": 1,
                "name": "Thickness",
                "type": "float"
            },
            {
                "pos": 2,
                "name": "Direction",
                "type": "String",
                "options": ["Inwards", "Outwards"]
            },
            {
                "pos": 3,
                "name": "Expand",
                "type": "boolean"
            },
            {
                "pos": 4,
                "name": "Uses Separate Height",
                "type": "boolean"
            },
            {
                "pos": 5,
                "name": "Height",
                "type": "float"
            },
            {
                "pos": 6,
                "name": "Grooved",
                "type": "boolean"
            },
            {
                "pos": 6,
                "name": "Groove width",
                "type": "float"
            },
        ]},
    },
        
    geomobjects: {
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
                  "name": "domainMin",
                  "type": "float",
                  "arguments": "read only",
                  "slot": "property"
                },
                {
                  "name": "domainMax",
                  "type": "float",
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
    },

    geomethods: {
        "evaluatePoint": {
            enum: 2,
            "in": [
                {
                    "pos": 0,
                    "name": "t",
                    "type": "float",
                }
            ],
            "out": {
                "pos": 0,
                "name": "pt",
                "type": "Point",
              },
        }
    },

    classes: {
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
            singleton: "moi.filesystem",
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
            singleton: "moi.vectorMath",
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
            singleton: "moi.view",
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
            mode: LiteGraph.IMMORTAL,
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
            singleton: "moi.settings",
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

};