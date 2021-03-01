var numFeedback = [];
var ptFeedback = new pointArray(false);
var objFeedback = moi.geometryDatabase.createObjectList();
var runState = 1;

var docupath;
    //var docupath = document.URL.split(/moi:\/\/(.*\/).*/g)[1].replace("ui","")+"nodes\/extensions\/Documentation\/";
//            if ( document.URL.indexOf("appdata") > 0 ) { docupath ="\/" +document.URL.split(/moi:\/\/appdata\/(.*\/).*/g)[1]+"nodes\/extensions\/Documentation\/"; }
//					else { docupath = document.URL.split(/moi:\/\/(.*\/).*/g)[1].replace("ui","")+"nodes\/extensions\/Documentation\/"; }
 if ( document.URL.indexOf("appdata") > 0 ) { docupath = document.URL.replace("index.html","")+"nodes\/extensions\/Documentation\/"+lang.LANGUAGE + "\/"; }
					else { docupath = document.URL.split(/moi:\/\/(.*\/).*/g)[1].replace("ui","")+"nodes\/extensions\/Documentation\/"+lang.LANGUAGE + "\/"; }
function sigmoid(t)
{
    var x = 1 / (1 + Math.exp(-t));
    return x;
}
function createRainbow()
{
    var rainbowID = new Array();
    for (var i = 0; i < 255; i++)
    {
        var red = Math.round(255 * (1 - sigmoid(((i * 12) / 255) - 7)));
        var green = Math.round(255 * ((1 / (1 + Math.exp(-i * 6 / 255 + 3))) * (1 - (1 / (1 + Math.exp(-i * 6 / 255 + 3)))) * 4));
        var blue = Math.round(255 * (sigmoid((i * 12 / 255) - 9)));
        var style = moi.geometryDatabase.findStyle('rb_ ' + i, true);

        style.color = (red) << 16 | (green) << 8 | (blue);
        rainbowID.push(style.index);
    }
    return rainbowID;
}
function createWCS(){var cp = moi.vectorMath.createPoint(0, 0, 0); var xaxs = moi.vectorMath.createPoint(1, 0, 0);var yaxs = moi.vectorMath.createPoint(0, 1, 0); var wcs = moi.VectorMath.createFrame(cp, xaxs, yaxs);return wcs;}
function magnitude(vec){var mag= Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);return mag;}
function scaleVec(vec, fac){var s_vec = moi.vectorMath.createPoint(vec.x * fac,vec.y * fac,vec.z * fac); return s_vec;}
function addVec(vec1, vec2){var erg = moi.vectorMath.createPoint(vec1.x + vec2.x,vec1.y + vec2.y,vec1.z + vec2.z);return erg;}
function substrVec(vec1, vec2){ var erg = moi.vectorMath.createPoint(vec1.x - vec2.x,vec1.y - vec2.y,vec1.z - vec2.z);return erg;}
function dotProd(vec1, vec2){ var prod = vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;return prod;}
function crossProd(vec1, vec2){var prod = moi.vectorMath.createPoint(vec1.y * vec2.z - vec1.z * vec2.y,vec1.z * vec2.x - vec1.x * vec2.z,vec1.x * vec2.y - vec1.y * vec2.x);return prod;}
function calcAngle(vec1, vec2){var angle = Math.acos(dotProd(vec1, vec2) / (magnitude(vec1) * magnitude(vec2)));return angle;}
function invertPt(pt){return moi.vectorMath.createPoint(-pt.x,-pt.y,-pt.z);}
function normalizeVec(vec){var res=scaleVec(vec,1/magnitude(vec));return res;}
function transformPoints (pts,scs,tcs) 
{
    var transPts=[];
    var a1 = dotProd(scs.xaxis, tcs.xaxis);
    var b1 = dotProd(scs.xaxis, tcs.yaxis);
    var g1 = dotProd(scs.xaxis, tcs.zaxis);
    var a2 = dotProd(scs.yaxis, tcs.xaxis);
    var b2 = dotProd(scs.yaxis, tcs.yaxis);
    var g2 = dotProd(scs.yaxis, tcs.zaxis);
    var a3 = dotProd(scs.zaxis, tcs.xaxis);
    var b3 = dotProd(scs.zaxis, tcs.yaxis);
    var g3 = dotProd(scs.zaxis, tcs.zaxis);
    var ptsLen=pts.length;
    var dx=scs.origin.x;
    var dy=scs.origin.y;
    var dz=scs.origin.z;
    for (var i = 0; i < ptsLen; i++)
    {
        var help = moi.vectorMath.createPoint(
                (pts[i].x - dx) * a1 + (pts[i].y - dy) * b1 + (pts[i].z - dz) * g1,
                (pts[i].x - dx) * a2 + (pts[i].y - dy) * b2 + (pts[i].z - dz) * g2,
                (pts[i].x - dx) * a3 + (pts[i].y - dy) * b3 + (pts[i].z - dz) * g3);
        transPts.push(help);
    }
    return transPts;
}

function getUID(len) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            out = '';
    for (var i = 0, clen = chars.length; i < len; i++)
    {
        out += chars.substr(0 | Math.random() * clen, 1);
    }

// ensure that the uid is unique for this page
//    return getUID.uids[out] ? getUID(len) : (getUID.uids[out] = out);
return out;
}
// })();
function evalMinR(objects, numPts)
{
    var curves = moi.geometryDatabase.createObjectList();
    for (var z = 0; z < objects.length; z++) {
        var item = objects.item(z);
        if (item.type == 1 || item.type == 2) {
            curves.addObject(item);
        } else if (item.type == 4 || item.type == 3) {
            var subcurves = item.getSubObjects().getCurves();
            for (var j = 0; j < subcurves.length; j++) {
                curves.addObject(subcurves.item(j));
            }
        }
    }
    var inObjs = curves;

    var minR = 10000;
//    var inCurve = inObjs.getCurves();
//    for (var i = 0; i < inCurve.length; i++)
    for (var z = 0; z < inObjs.length; z++)
    {
        var crv = inObjs.item(z);
//        var crv = inCurve.item(i);
        var pointfactory = moi.command.createFactory('point');
        pointfactory.setInput(0, crv.getStartPt());
        var startPtObject = pointfactory.calculate();
        pointfactory.commit();
        var acFactory = moi.command.createFactory('arraycurve'); ///
        acFactory.setInput(0, startPtObject);	// object (list)
        acFactory.setInput(1, crv);		// path
        acFactory.setInput(2, 'NumItems');		// array mode
        acFactory.setInput(3, numPts);
        var arrayed_pts = acFactory.calculate();
        acFactory.commit();
        var pts = new Array();
        pts.push(startPtObject.item(0).pt);
        for (var iPts = 0; iPts < arrayed_pts.length; ++iPts)
        {
            pts.push(arrayed_pts.item(iPts).pt);
        }
        var vecA = new Array();
        var vecB = new Array();
        var vecC = new Array();
        var ptA = new Array();
        var ptB = new Array();
        var ptC = new Array();
        var dA = new Array();
        var dB = new Array();
        var dC = new Array();
        for (var i = 1; i < pts.length - 1; i++)
        {
            var idx = i - 1;
            vecA.push(moi.vectorMath.createPoint(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y, pts[i].z - pts[i - 1].z)); //Richtungsvektor P0-P1
            vecB.push(moi.vectorMath.createPoint(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y, pts[i + 1].z - pts[i].z)); //Richtungsvektor P1-P2
            vecC.push(crossProd(vecA[idx], vecB[idx])); 	//Normalenvektor der Ebene P0,P1,P2 und Richtungsvektor des Schnitts
            ptA.push(addVec(scaleVec(vecA[idx], 0.5), pts[i - 1])); 	//Punkt des ersten Ebene
            ptB.push(addVec(scaleVec(vecB[idx], 0.5), pts[i]));
            //        ptC.push(pts[i]));


            dA.push(dotProd(vecA[idx], ptA[idx]));
            dB.push(dotProd(vecB[idx], ptB[idx]));
            dC.push(dotProd(vecC[idx], pts[i]));
        }
        for (var i = 0; i < vecA.length; i++)
        {
            var DetA = vecA[i].x * vecB[i].y * vecC[i].z + vecA[i].y * vecB[i].z * vecC[i].x + vecA[i].z * vecB[i].x * vecC[i].y - vecA[i].z * vecB[i].y * vecC[i].x - vecA[i].y * vecB[i].x * vecC[i].z - vecA[i].x * vecB[i].z * vecC[i].y;
            var DetX = dA[i] * vecB[i].y * vecC[i].z + vecA[i].y * vecB[i].z * dC[i] + vecA[i].z * dB[i] * vecC[i].y - vecA[i].z * vecB[i].y * dC[i] - vecA[i].y * dB[i] * vecC[i].z - dA[i] * vecB[i].z * vecC[i].y;
            var DetY = vecA[i].x * dB[i] * vecC[i].z + dA[i] * vecB[i].z * vecC[i].x + vecA[i].z * vecB[i].x * dC[i] - vecA[i].z * dB[i] * vecC[i].x - dA[i] * vecB[i].x * vecC[i].z - vecA[i].x * vecB[i].z * dC[i];
            var DetZ = vecA[i].x * vecB[i].y * dC[i] + vecA[i].y * dB[i] * vecC[i].x + dA[i] * vecB[i].x * vecC[i].y - dA[i] * vecB[i].y * vecC[i].x - vecA[i].y * vecB[i].x * dC[i] - vecA[i].x * dB[i] * vecC[i].y;
            if (DetA != 0)
            {
                ptC.push(moi.vectorMath.createPoint(DetX / DetA, DetY / DetA, DetZ / DetA));
            } else {
                ptC.push(moi.vectorMath.createPoint(pts[i + 1].x + 10000, pts[i + 1].y + 10000, pts[i + 1].z + 10000));
            }

        }
        //Lagrange interpolation for startcurvature with fixed values the Indices are the "x"-values (t-values) here - 0 is the variable of the startpoint
        var dx_1 = ptC[0].x - pts[1].x;
        var dy_1 = ptC[0].y - pts[1].y;
        var dz_1 = ptC[0].z - pts[1].z;
        var dx_2 = ptC[1].x - pts[2].x;
        var dy_2 = ptC[1].y - pts[2].y;
        var dz_2 = ptC[1].z - pts[2].z;
        var dx_3 = ptC[2].x - pts[3].x;
        var dy_3 = ptC[2].y - pts[3].y;
        var dz_3 = ptC[2].z - pts[3].z;
        var dx_0 = dx_1 * (0 - 2) * (0 - 3) / ((1 - 2) * (1 - 3)) + dx_2 * (0 - 1) * (0 - 3) / ((2 - 1) * (2 - 3)) + dx_3 * (0 - 1) * (0 - 2) / ((3 - 1) * (3 - 2));
        var dy_0 = dy_1 * (0 - 2) * (0 - 3) / ((1 - 2) * (1 - 3)) + dy_2 * (0 - 1) * (0 - 3) / ((2 - 1) * (2 - 3)) + dy_3 * (0 - 1) * (0 - 2) / ((3 - 1) * (3 - 2));
        var dz_0 = dz_1 * (0 - 2) * (0 - 3) / ((1 - 2) * (1 - 3)) + dz_2 * (0 - 1) * (0 - 3) / ((2 - 1) * (2 - 3)) + dz_3 * (0 - 1) * (0 - 2) / ((3 - 1) * (3 - 2));
        var ptCstart = moi.VectorMath.createPoint(
                dx_0 + pts[0].x,
                dy_0 + pts[0].y,
                dz_0 + pts[0].z
                );
        //Lagrange interpolation for endcurvature with fixed values the Indices are the "x"-values (t-values) here - 0 is the variable of the startpoint
        var idxC1 = ptC.length - 3;
        var idxC2 = ptC.length - 2;
        var idxC3 = ptC.length - 1;
        var idxpts1 = idxC1 + 1;
        var idxpts2 = idxC2 + 1;
        var idxpts3 = idxC3 + 1;
        var dx_u = ptC[idxC1].x - pts[idxpts1].x;
        var dy_u = ptC[idxC1].y - pts[idxpts1].y;
        var dz_u = ptC[idxC1].z - pts[idxpts1].z;
        var dx_v = ptC[idxC2].x - pts[idxpts2].x;
        var dy_v = ptC[idxC2].y - pts[idxpts2].y;
        var dz_v = ptC[idxC2].z - pts[idxpts2].z;
        var dx_w = ptC[idxC3].x - pts[idxpts3].x;
        var dy_w = ptC[idxC3].y - pts[idxpts3].y;
        var dz_w = ptC[idxC3].z - pts[idxpts3].z;
        var dx_e = dx_u * (4 - 2) * (4 - 3) / ((1 - 2) * (1 - 3)) + dx_v * (4 - 1) * (4 - 3) / ((2 - 1) * (2 - 3)) + dx_w * (4 - 1) * (4 - 2) / ((3 - 1) * (3 - 2));
        var dy_e = dy_u * (4 - 2) * (4 - 3) / ((1 - 2) * (1 - 3)) + dy_v * (4 - 1) * (4 - 3) / ((2 - 1) * (2 - 3)) + dy_w * (4 - 1) * (4 - 2) / ((3 - 1) * (3 - 2));
        var dz_e = dz_u * (4 - 2) * (4 - 3) / ((1 - 2) * (1 - 3)) + dz_v * (4 - 1) * (4 - 3) / ((2 - 1) * (2 - 3)) + dz_w * (4 - 1) * (4 - 2) / ((3 - 1) * (3 - 2));
        var ptCend = moi.VectorMath.createPoint(
                dx_e + pts[pts.length - 1].x,
                dy_e + pts[pts.length - 1].y,
                dz_e + pts[pts.length - 1].z
                );
        /// Startpoint
        var d_vec = moi.vectorMath.createPoint(ptCstart.x - pts[0].x, ptCstart.y - pts[0].y, ptCstart.z - pts[0].z);
        var tempR = magnitude(d_vec);
        if (tempR < minR)
            minR = tempR;
        for (var n = 0; n < ptC.length; n++)
        {
            d_vec = moi.vectorMath.createPoint(ptC[n].x - pts[n + 1].x, ptC[n].y - pts[n + 1].y, ptC[n].z - pts[n + 1].z);
            tempR = magnitude(d_vec);
//                                moi.UI.alert(tempR, "EdgeRadius");
            if (tempR < minR)
                minR = tempR;
        }
        /// Endpoint
        var ptsEndIndex = pts.length - 1;
        var d_vec = moi.vectorMath.createPoint(ptCend.x - pts[ptsEndIndex].x, ptCend.y - pts[ptsEndIndex].y, ptCend.z - pts[ptsEndIndex].z);
        tempR = magnitude(d_vec);
        if (tempR < minR)
            minR = tempR;
    }
    minR = Math.ceil(minR * 10) / 10;
    return minR;
}

////////////////////////////////////////////////////////////////////////////////////////////
function splineMap(valarray) //valarray is the inputnumarray that will interpolated with a splinefunction, n is the number of targets
{ //  var n=new Array();
    var h=[],e=[];
    this.t_=[];
    var x=valarray;
    if(x.length===1)x.push(valarray[0]); //expand array with only one element - result will be array of constant
        for(var j=0;j<x.length;j++) this.t_.push(j);   
//moi.UI.alert(x.length, "laenge des Inputs");
//    this.xend=x[x.length-1];
    for(var i=0;i<x.length-1;i++){
        h.push(this.t_[i+1]-this.t_[i]);

        e.push(6/h[i]*(x[i+1]-x[i]));

    }
        var u=new Array();
        u.push(0); //dummy
        u.push(2*(h[0]+h[1]));
        var r=new Array();
        r.push(0); //dummy
        r.push((e[1]-e[0])); //error corrected was r.push(2*(e[1]-e[0])); !!!

    for(var i=2;i<x.length-1;i++){
        u.push(2*(h[i]+h[i-1])-((Math.pow(h[i-1],2))/u[i-1]));
        r.push((e[i]-e[i-1])-((r[i-1]*h[i-1])/u[i-1])); // error corrected was r.push((e[i]-e[i-1])-(r[i-1]*h[i-1]/u[i-1]));!!!
//                                    moi.UI.alert(r[i], "r");
    }
    var k=new Array(x.length); //k is the curvature 
//               moi.UI.alert(k[0], "k");
    k[k.length-1]=0;
//                 moi.UI.alert(k.length, "k");
    for(var i=x.length-2;i>0;i--){
        k[i]=(r[i]-h[i]*k[i+1])/u[i];
    }
        k[0]=0;
            for(var i=0;i<this.t_.length;i++){
//             moi.UI.alert(k[i], "k");
    }
     // ax^3+bx^2+cx+d segments of the spline intervals
        this.a=[];this.b=[];this.c=[];this.d=[];
        for(var i=0;i<x.length-1;i++){
           this.a.push((k[i+1]-k[i])/(6*h[i]));
//           moi.UI.alert(this.a[i], "a");
           this.b.push(k[i]/2);
           this.c.push(((x[i+1]-x[i])/h[i])-(h[i]/6)*(2*k[i]+k[i+1]));
           this.d.push(x[i]);

        }
        this.d.push(x[x.length-1]);
}

splineMap.prototype = {constructor: splineMap}

splineMap.prototype.calc = function (count) //idx is the elements Index count the number of elements
{   var result=[];
    for (var idx=0;idx<count-1;idx++){
    var t=idx/(count-1)*(this.a.length); //mapping the index to the parameter of spline interpolation
        var i=Math.floor(t); //evaluating the matching spline segment
    result.push( this.a[i]*Math.pow((t-this.t_[i]),3)+this.b[i]*Math.pow((t-this.t_[i]),2)+this.c[i]*(t-this.t_[i])+this.d[i]); //calculating the interpolated value
    }
    result.push(this.d[this.d.length-1]);
    return result;
}


function CurveDiv(crvObj, valArray, objList, rotMod)
{   var fObj = moi.geometryDatabase.createObjectList();
    var corr=0.0001;
    if(crvObj.isClosed){fObj.addObject(objList.item(0));fObj.addObject(objList.item(1));fObj.addObject(objList.item(2));}
    else{
        while(fObj.length<3){fObj = factory('arraycurve', objList, crvObj, 'Distance', null, crvObj.getLength()-corr, rotMod);
        corr=corr+0.0001;/*moi.ui.alert("fObject.length",fObj.length);*/}
    }
    var fcrvinp = moi.geometryDatabase.createObjectList();
    fcrvinp.addObject(crvObj);
    var fcrvList = factory('flip', fcrvinp);
    var fcrvObj = fcrvList.item(0);
    var burstPts = moi.geometryDatabase.createObjectList();
    var nva = NormalilzeVA(valArray, crvObj.getLength());
    for (var i = 0; i < nva.length; i++) {
        if (nva[i] <= crvObj.getLength() / 2) {
            var hlpPts = factory('arraycurve', fObj, fcrvObj, 'Distance', null, crvObj.getLength() - nva[i], rotMod);
        if (hlpPts.length !== 0) {burstPts.addObject(hlpPts.item(0));burstPts.addObject(hlpPts.item(1));burstPts.addObject(hlpPts.item(2));}
         
    }else {
            if (nva[i] >= crvObj.getLength() && !crvObj.isClosed)
                nva[i] = crvObj.getLength() - 0.001;
            var hlpPts = factory('arraycurve', objList, crvObj, 'Distance', null, nva[i], rotMod);
        
        if (hlpPts.length !== 0) {burstPts.addObject(hlpPts.item(0));burstPts.addObject(hlpPts.item(1));burstPts.addObject(hlpPts.item(2));}
        }
    }
    return burstPts;
}

function CurveDivision(crvObj, valArray, objList, rotMod)
{   var fObj = moi.geometryDatabase.createObjectList();
    if(crvObj.isClosed){fObj.addObject(objList.item(0));}else{
    fObj = factory('arraycurve', objList, crvObj, 'Distance', null, crvObj.getLength()-0.0001, rotMod);}
    var fcrvinp = moi.geometryDatabase.createObjectList();
    fcrvinp.addObject(crvObj);
    var fcrvList = factory('flip', fcrvinp);
    var fcrvObj = fcrvList.item(0);
    var burstPts = moi.geometryDatabase.createObjectList();
    var nva = NormalilzeVA(valArray, crvObj.getLength());
    for (var i = 0; i < nva.length; i++) {
        if (nva[i] <= crvObj.getLength() / 2) {
            var hlpPts = factory('arraycurve', fObj, fcrvObj, 'Distance', null, crvObj.getLength() - nva[i], rotMod);
        if (hlpPts.length !== 0) burstPts.addObject(hlpPts.item(0));
         
    }else {
            if (nva[i] >= crvObj.getLength() && !crvObj.isClosed)
                nva[i] = crvObj.getLength() - 0.001;
            var hlpPts = factory('arraycurve', objList, crvObj, 'Distance', null, nva[i], rotMod);
        
        if (hlpPts.length !== 0) burstPts.addObject(hlpPts.item(0));
        }
    }
    
    return burstPts;
}
