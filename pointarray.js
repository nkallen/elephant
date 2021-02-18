//	Nodeedit for Moment of inspiration 1.0, Max Smirnov Copyright (C) 2018
//  Math/Geometry lib

function factory( factoryname ) { var f = moi.command.createFactory( factoryname ); for ( var i = 1; i < arguments.length; i++ ) if (arguments[i] !==null) f.setInput( i - 1, arguments[i] ); f.update(); var obj = f.calculate(); f.cancel(); return obj; }



// ------- pointArray Class --------------------------------------------------------------------------------------------
// pointArray structure
//	+0	ptX		0
//	+1	ptY		0
//	+2	ptZ		0
//	+3	AngleX	0
//	+4	AngleY	0
//	+5	AngleX	0
//	+6	Scale	1

function pointArray(pushDefault, x, y, z)
{
	this.data = new Array();
	this.recordLength = 7;
	this.length = 0;
	this.xlength = 0;
	this.ylength = 1;
	this.zlength = 1;
	if ( pushDefault ) this.push(x || 0, y || 0, z || 0);
}

pointArray.prototype = { constructor: pointArray }

pointArray.prototype.clear = function()
{
	delete this.data;
	this.data = new Array();
	this.length = 0;
	this.xlength = 0;
	this.ylength = 1;
	this.zlength = 1;
}

pointArray.prototype.clone = function()
{
	var c = new this.constructor();
	c.data = this.data.slice(0);
	c.recordLength = this.recordLength;
	c.length = this.length;
	c.xlength = this.xlength;
	c.ylength = this.ylength;
	c.zlength = this.zlength;
	return c;
}

pointArray.prototype.getElement = function(n)
{
	var c = new this.constructor();
	c.data = this.data.slice(n*this.recordLength, (n+1)*this.recordLength);
	c.recordLength = this.recordLength;
	c.length = 1;
	c.xlength = 1;
	c.ylength = 1;
	c.zlength = 1;
	return c;
}

pointArray.prototype.getYLayer = function(n) // returns Y layer
{
	var c = new this.constructor(), x=this.xlength;
	c.data = this.data.slice(n*x*this.recordLength, (n+1)*x*this.recordLength);
	c.recordLength = this.recordLength;
	c.length = x;
	c.xlength = x;
	c.ylength = 1;
	c.zlength = 1;
	return c;
}

pointArray.prototype.getZLayer = function(n) // returns Z layer
{
	var c = new this.constructor(), x=this.xlength, y=this.ylength, l=x*y;
	c.data = this.data.slice(n*l*this.recordLength, (n+1)*l*this.recordLength);
	c.recordLength = this.recordLength;
	c.length = l;
	c.xlength = x;
	c.ylength = y;
	c.zlength = 1;
	return c;
}

pointArray.prototype.getLength = function()
{
	return this.length;
}

pointArray.prototype.getPoint = function(n)
{
	var shift = ( n || 0 )*this.recordLength;
	return moi.VectorMath.createPoint(this.data[shift+0], this.data[shift+1], this.data[shift+2]);
}

pointArray.prototype.xAxis = function(n)
{
	var shift = n*this.recordLength;
	var rX = this.data[shift+3]/180*Math.PI, 	rY = this.data[shift+4]/180*Math.PI,	rZ = this.data[shift+5]/180*Math.PI;
	return moi.VectorMath.createPoint( Math.cos(rY)*Math.cos(rZ), Math.sin(rX)*Math.sin(rY)*Math.cos(rZ)-Math.cos(rX)*Math.sin(rZ), Math.cos(rX)*Math.sin(rY)*Math.cos(rZ)+Math.sin(rX)*Math.sin(rZ));
}

pointArray.prototype.yAxis = function(n)
{
	var shift = n*this.recordLength;
	var rX = this.data[shift+3]/180*Math.PI, 	rY = this.data[shift+4]/180*Math.PI,	rZ = this.data[shift+5]/180*Math.PI;
	return moi.VectorMath.createPoint(Math.cos(rY)*Math.sin(rZ), Math.sin(rX)*Math.sin(rY)*Math.sin(rZ)+Math.cos(rX)*Math.cos(rZ), Math.cos(rX)*Math.sin(rY)*Math.sin(rZ)-Math.sin(rX)*Math.cos(rZ));
}

pointArray.prototype.zAxis = function(n)
{
	var shift = n*this.recordLength;
	var rX = this.data[shift+3]/180*Math.PI, 	rY = this.data[shift+4]/180*Math.PI
	return moi.VectorMath.createPoint(-Math.sin(rY), Math.cos(rY)*Math.sin(rX), Math.cos(rX)*Math.cos(rY));
}

pointArray.prototype.getFrame = function(n, rX, rY, rZ)
{
	var shift = ( n || 0 )*this.recordLength;
	var rtX = (rX || 0), rtY = (rY || 0), rtZ = (rZ || 0);

	rtX = (this.data[shift+3]+rtX)/180*Math.PI;		rtY = (this.data[shift+4]+rtY)/180*Math.PI;		rtZ = (this.data[shift+5]+rtZ)/180*Math.PI;
	var c1 = Math.cos(rtZ),		c2 = Math.cos(rtY),		c3 = Math.cos(rtX),		s1 = Math.sin(rtZ),		s2 = Math.sin(rtY),		s3 = Math.sin(rtX);
	return moi.VectorMath.createFrame( moi.VectorMath.createPoint(this.data[shift+0], this.data[shift+1], this.data[shift+2]), moi.VectorMath.createPoint( c2*c1, s3*s2*c1-c3*s1, c3*s2*c1+s3*s1 ), moi.VectorMath.createPoint( c2*s1, s3*s2*s1+c3*c1, c3*s2*s1-s3*c1 ));
}

pointArray.prototype.getScale = function(n)
{
	return this.data[(n+1)*this.recordLength-1];
}

pointArray.prototype.setScale = function(n, scale)
{
	this.data[(n+1)*this.recordLength-1] = scale;
}

pointArray.prototype.concat = function(ar)
{
	//Array.prototype.push.apply(this.data, ar.data);
	for ( var i=0, l=ar.data.length; i<l; i++ ) this.data.push(ar.data[i]);
	if ( this.data.length === ar.data.length) // array was empty
	{
		this.xlength = ar.xlength;
		this.ylength = ar.ylength;
		this.zlength = ar.zlength;
		this.length = ar.length;
	}
	else if ( ar.data.length > 0 )
	{
		if ( this.xlength === ar.xlength && this.ylength === ar.ylength && (ar.xlength > 1 || ar.ylength > 1 ))
		{
			this.zlength += ar.zlength;
			this.length += ar.length;
		}
		else
		{
			this.xlength = this.data.length/this.recordLength;
			this.ylength = 1;
			this.zlength = 1;
			this.length = this.xlength;
		}
	}
}

pointArray.prototype.push = function(x, y, z, rx, ry, rz, s)
{
	this.data.push( x || 0);		this.data.push( y || 0);		this.data.push( z || 0);
	this.data.push( rx || 0);		this.data.push( ry || 0);		this.data.push( rz || 0);
	this.data.push( s || 1);
	this.xlength++;
	this.length++;
}

pointArray.prototype.pushPoint = function(pt)
{
	this.data.push(pt.x);		this.data.push(pt.y);		this.data.push(pt.z);
	this.data.push(0);			this.data.push(0);			this.data.push(0);
	this.data.push(1);
	this.xlength++;
	this.length++;
}

pointArray.prototype.pushFrame = function(frame)
{
	var rx=0, ry=0, rz=0;
	if ( frame.zaxis.y === 0 && frame.zaxis.z === 0) { ry = ( frame.xaxis.z > 0 )?90:-90; }
	else
	{
		var r2d = 1/Math.PI*180;
		rx = Math.atan2(frame.zaxis.y, frame.zaxis.z);
		ry = -Math.asin(frame.zaxis.x);
		rz = Math.atan2(frame.xaxis.z*Math.sin(rx)-frame.xaxis.y*Math.cos(rx), frame.xaxis.x*Math.cos(ry)+(frame.xaxis.y*Math.sin(rx)+frame.xaxis.z*Math.cos(rx))*Math.sin(ry));
		rx = rx*r2d;	ry = ry*r2d;	rz = rz*r2d;
	}
	
	this.data.push(frame.origin.x);	this.data.push(frame.origin.y);	this.data.push(frame.origin.z);
	this.data.push(rx);				this.data.push(ry);				this.data.push(rz);
	this.data.push(1);
	this.xlength++;
	this.length++;
}

pointArray.prototype.rotateAroundLine = function(mode, x0, y0, z0, x1, y1, z1, angle)
{
	var d = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0) + (z1-z0)*(z1-z0));				// расстояние между точками оси вращения
	this.rotateAroundNormalizedVector(mode, x0, y0, z0, (x1-x0)/d, (y1-y0)/d, (z1-z0)/d, angle)	// нормализованный вектор оси вращения
}

pointArray.prototype.rotateAroundFrame = function(mode, frame, angle)
{
	var rX = frame.data[3]/180*Math.PI, rY = frame.data[4]/180*Math.PI;
	this.rotateAroundNormalizedVector(mode, frame.data[0], frame.data[1], frame.data[2], -Math.sin(rY), Math.cos(rY)*Math.sin(rX), Math.cos(rX)*Math.cos(rY), angle);
}

pointArray.prototype.rotateAroundNormalizedVector = function(mode, xc, yc, zc, xa, ya, za, angle) // methods All, Step, Twist
{
	var rLen = this.recordLength, d2r = 1/180*Math.PI;
	var axx, axy, axz, ayx, ayy, ayz, azx, azy, azz, rtx, rty, rtz, c1, c2, c3, s1, s2, s3;
	var x, y, z, xn, yn, zn, shift = 0, alpha = angle*d2r, aInc;

	if ( mode === "Twist" && this.zlength > 1 ) { aInc = alpha / ( this.zlength - 1 ); alpha = 0; }
		else if ( mode === "Step" ) { aInc = alpha }
			else { aInc = 0 }

	var matXx, matXy, matXz, matYx, matYy, matYz, matZx, matZy, matZz;

	for ( var zcnt = 0, zlen = this.zlength; zcnt < zlen; zcnt++)
	{
		var ca = Math.cos(alpha);
		var sa = Math.sin(alpha);
	
		matXx = ca+xa*xa*(1-ca);		matXy = xa*ya*(1-ca)-za*sa;		matXz = xa*za*(1-ca)+ya*sa;
		matYx = ya*xa*(1-ca)+za*sa;		matYy = ca+ya*ya*(1-ca);		matYz = ya*za*(1-ca)-xa*sa;
		matZx = xa*za*(1-ca)-ya*sa;		matZy = ya*za*(1-ca)+xa*sa;		matZz = ca+za*za*(1-ca);

		for (var xycnt=0, xylen = this.xlength*this.ylength; xycnt<xylen; xycnt++)
		{
			x = this.data[shift+0] - xc;
			y = this.data[shift+1] - yc;
			z = this.data[shift+2] - zc;
			rtx = this.data[shift+3]*d2r;
			rty = this.data[shift+4]*d2r;
			rtz = this.data[shift+5]*d2r;
			xn = x*matXx + y*matXy + z*matXz + xc;
			yn = x*matYx + y*matYy + z*matYz + yc;
			zn = x*matZx + y*matZy + z*matZz + zc;
			c1 = Math.cos(rtz);	c2 = Math.cos(rty);	c3 = Math.cos(rtx);
			s1 = Math.sin(rtz);	s2 = Math.sin(rty);	s3 = Math.sin(rtx);
			axx = x + c2*c1;	axy = y + s3*s2*c1-c3*s1;	axz = z + c3*s2*c1+s3*s1;
			ayx = x + c2*s1;	ayy = y + s3*s2*s1+c3*c1;	ayz = z + c3*s2*s1-s3*c1;
			azx = x - s2;		azy = y + c2*s3;			azz = z + c2*c3;

			var axxn = axx*matXx + axy*matXy + axz*matXz + xc - xn;
			var axyn = axx*matYx + axy*matYy + axz*matYz + yc - yn;
			var axzn = axx*matZx + axy*matZy + axz*matZz + zc - zn;
			var azxn = azx*matXx + azy*matXy + azz*matXz + xc - xn;
			var azyn = azx*matYx + azy*matYy + azz*matYz + yc - yn;
			var azzn = azx*matZx + azy*matZy + azz*matZz + zc - zn;

			if ( azyn === 0 && azzn === 0) { rtx = 0; rty = ( axzn > 0 )?90:-90; rtz = 0; }
			else
			{
				rtx = Math.atan2(azyn, azzn);
				rty = -Math.asin(azxn);
				s1 = Math.sin(rtx);
				c1 = Math.cos(rtx);
				rtz = Math.atan2(axzn*s1-axyn*c1, axxn*Math.cos(rty)-(axyn*s1+axzn*c1)*azxn);
			}

			this.data[shift+0] = xn;
			this.data[shift+1] = yn;
			this.data[shift+2] = zn;
			this.data[shift+3] = rtx/d2r;
			this.data[shift+4] = rty/d2r;
			this.data[shift+5] = rtz/d2r;
	
			shift += rLen;
		}
		alpha += aInc;
	}
}

pointArray.prototype.explode = function(frame, value)
{
	var fx = frame.data[0], fy = frame.data[1], fz = frame.data[2];
	var shift = 0;
	for ( var i = this.data.length/this.recordLength; i>0; i-- )
	{
		this.data[shift+0] = (this.data[shift+0]-fx)*value+fx;
		this.data[shift+1] = (this.data[shift+1]-fy)*value+fy;
		this.data[shift+2] = (this.data[shift+2]-fz)*value+fz;
		shift += this.recordLength;
	}
}


pointArray.prototype.rotate = function(n, rX, rY, rZ)
{
	var shift = n*this.recordLength;

	this.data[shift+3] = (this.data[shift+3] + rX) % 360;
	this.data[shift+4] = (this.data[shift+4] + rY) % 360;
	this.data[shift+5] = (this.data[shift+5] + rZ) % 360;
}

pointArray.prototype.rotateAll = function(rX, rY, rZ, mode)
{
	var shift = 0, aX = rX, aY = rY, aZ = rZ;
	var m = mode || "Incremental"
	if ( m === "Fixed") { rX = 0; rY = 0; rZ = 0; }

	for ( var i = this.data.length/this.recordLength; i>0; i-- )
	{
		this.data[shift+3] = (this.data[shift+3] + aX) % 360;
		this.data[shift+4] = (this.data[shift+4] + aY) % 360;
		this.data[shift+5] = (this.data[shift+5] + aZ) % 360;
		shift += this.recordLength;
		aX += rX;	aY += rY;	aZ += rZ;
	}
}

pointArray.prototype.move = function(n, dX, dY, dZ)
{
	var shift = n*this.recordLength;
	this.data[shift+0] += dX;
	this.data[shift+1] += dY;
	this.data[shift+2] += dZ;
}

pointArray.prototype.moveAll = function(dX, dY, dZ)
{
	var shift = 0;
	for ( var i = this.data.length/this.recordLength; i>0; i-- )
	{
		this.data[shift+0] += dX;
		this.data[shift+1] += dY;
		this.data[shift+2] += dZ;
		shift += this.recordLength;
	}
}

pointArray.prototype.jitter = function(n, jX, jY, jZ, jrX, jrY, jrZ, jS)
{
	var shift = n*this.recordLength;
	this.data[shift+0] += Math.random()*jX*2-jX;
	this.data[shift+1] += Math.random()*jY*2-jY;
	this.data[shift+2] += Math.random()*jZ*2-jZ;
	this.data[shift+3] += Math.random()*jrX*2-jrX;
	this.data[shift+4] += Math.random()*jrY*2-jrY;
	this.data[shift+5] += Math.random()*jrZ*2-jrZ;
	this.data[shift+6] += Math.random()*jS*2-jS;
}

pointArray.prototype.jitterAll = function(jX, jY, jZ, jrX, jrY, jrZ, jS)
{
	
	var shift = 0;
	for ( var i = this.data.length/this.recordLength; i>0; i-- )
	{
		this.data[shift+0] += Math.random()*jX*2-jX;
		this.data[shift+1] += Math.random()*jY*2-jY;
		this.data[shift+2] += Math.random()*jZ*2-jZ;
		this.data[shift+3] += Math.random()*jrX*2-jrX;
		this.data[shift+4] += Math.random()*jrY*2-jrY;
		this.data[shift+5] += Math.random()*jrZ*2-jrZ;
		this.data[shift+6] += Math.random()*jS*2-jS;
		if (this.data[shift+6] < 1e-6 ) this.data[shift+6] = 1e-6;
		shift += this.recordLength;
	}
}

pointArray.prototype.interpolate = function(num, mode)
{
	var arsplit = [], arbuf = [], newdata = [], s, x, a, angcnt = 0, xl = this.xlength, stripes = this.ylength*this.zlength, rl=this.recordLength, ln=this.data.length, c = 0;
	for ( a=0; a<rl; a++ ) arsplit[a]=[];
	for ( a=0; a<ln; a++)
	{
		if (a<3 || a>5) { arsplit[c].push(this.data[a]) } else {arsplit[c].push((this.data[a] % 360)+angcnt)}
		c++;
		if ( a === 5) angcnt +=360;
		if (c === rl) c=0;
	}
	for ( s = 0; s<stripes; s++ )
	{
		for ( a=0; a<rl; a++ )
		{
			arbuf[a] = new InterpArray(arsplit[a].slice(s*xl,(s+1)*xl), mode);
			arbuf[a] = arbuf[a].generateArray(num);
		}
		for (x=0; x<num; x++) for ( a=0; a<rl; a++ ) if (a<3 || a>5) { newdata.push(arbuf[a][x]) } else { newdata.push(arbuf[a][x]%360) }
	}
	this.data = newdata;
	this.xlength = num;
	this.length = num*stripes;
}

// cross product
// zx = xy*yz - xz*yy;
// zy = xz*yx - xx*yz;
// zz = xx*yy - xy*yx;


// ------- InterpArray Class --------------------------------------------------------------------------------------------

function interpArray(input, num, mode)
{
	var ar = new InterpArray(input, mode);
	return ar.generateArray(num);
}

function InterpArray(input, mode)
{
	this.data = (input.constructor === Array)?input.slice(0):[0];
	this.length = this.data.length;
	if (this.length === 0 ) { this.data.push(0); this.length = 1; }
	this.setMode(mode);
}

InterpArray.prototype = { constructor: InterpArray }

InterpArray.prototype.setMode = function(mode)
{
	if ( typeof(this[mode]) === 'undefined' ) { mode = 'Cosine' }
	if (this.length === 1) mode = 'Single';
	this.calcAt = this[mode];
}

InterpArray.prototype.generateArray = function(num)
{
	if ( num <= 1 ) return [this.calcAt(0.5)];
	var step = 1/(num-1), ar = [], t = 0;
	for (var i = 1; i<num; i++) { ar.push(this.calcAt(t)); t += step; }
	ar.push(this.calcAt(1));
	return ar;
}

InterpArray.prototype.Single = function()
{
	return this.data[0];
}

InterpArray.prototype.Linear = function(t)
{
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	var after = Math.ceil(mu);
	mu -=before;
	return this.data[before] + (this.data[after] - this.data[before]) * mu;
}

InterpArray.prototype.Cosine = function(t)
{
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	var after = Math.ceil(mu);
	mu -=before;
	var mu2 = (1-Math.cos(mu*Math.PI))/2;
	return this.data[before]*(1-mu2) + this.data[after]*mu2;
}

InterpArray.prototype.Cubic = function(t)
{
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	mu -=before;
	var y0, y1, y2, y3, a0, a1, a2, a3, mu2;
	y0 = ( before > 0 )?this.data[before-1]:this.data[0];
	y1 = this.data[before];
	y2 = ( before < this.length-1 )?this.data[before+1]:this.data[this.length-1];
	y3 = ( before < this.length-2 )?this.data[before+2]:this.data[this.length-1];

	mu2 = mu * mu;
	a0 = y3 - y2 - y0 + y1;
	a1 = y0 - y1 - a0;
	a2 = y2 - y0;
	a3 = y1;
	return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
}

InterpArray.prototype.CatmullRom = function(t)
{
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	mu -=before;
	var y0, y1, y2, y3, a0, a1, a2, a3, mu2;
	y0 = ( before > 0 )?this.data[before-1]:this.data[0];
	y1 = this.data[before];
	y2 = ( before < this.length-1 )?this.data[before+1]:this.data[this.length-1];
	y3 = ( before < this.length-2 )?this.data[before+2]:this.data[this.length-1];

	mu2 = mu * mu;
	a0 = -0.5 * y0 + 1.5 * y1 - 1.5 * y2 + 0.5 * y3;
	a1 = y0 - 2.5 * y1 + 2 * y2 - 0.5 * y3;
	a2 = -0.5 * y0 + 0.5 * y2;
	a3 = y1;
	return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
}

InterpArray.prototype.Hermite = function(t)
{
	var bias = 0, tension = 1;
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	mu -=before;
	var y0, y1, y2, y3, a0, a1, a2, a3, mu2, mu3, m0, m1;
	y0 = ( before > 0 )?this.data[before-1]:this.data[0];
	y1 = this.data[before];
	y2 = ( before < this.length-1 )?this.data[before+1]:this.data[this.length-1];
	y3 = ( before < this.length-2 )?this.data[before+2]:this.data[this.length-1];

	mu2 = mu * mu;
	mu3 = mu2 * mu;
	m0 = (y1 - y0) * (1 + bias) * (1 - tension) / 2;
	m0 += (y2 - y1) * (1 - bias) * (1 - tension) / 2;
	m1 = (y2 - y1) * (1 + bias) * (1 - tension) / 2;
	m1 += (y3 - y2) * (1 - bias) * (1 - tension) / 2;
	a0 = 2 * mu3 - 3 * mu2 + 1;
	a1 = mu3 - 2 * mu2 + mu;
	a2 = mu3 - mu2;
	a3 = -2 * mu3 + 3 * mu2;
	return a0 * y1 + a1 * m0 + a2 * m1 + a3 * y2;
}

InterpArray.prototype.FritschCarlson = function(t)
{
	var mu = t*(this.length-1);
	var before = Math.floor(mu);
	mu -=before;

	var y0, y1, y2, y3, mu2, mu3, m0, m1, m2, c11, c12, c21, c31;
	y0 = ( before > 0 )?this.data[before-1]:this.data[0];
	y1 = this.data[before];
	y2 = ( before < this.length-1 )?this.data[before+1]:this.data[this.length-1];
	y3 = ( before < this.length-2 )?this.data[before+2]:this.data[this.length-1];

	m0 = y1 - y0;
	m1 = y2 - y1;
	m2 = y3 - y2;

	if (m0 * m1 <= 0) { c11 = 0 } else { c11 = 2/(1/m0 + 1/m1) }
	if (m1 * m2 <= 0) { c12 = 0 } else { c12 = 2/(1/m1 + 1/m2) }
	c21 = (3 * m1) - (2 * c11) - c12;
	c31 = c11 + c12 - (2 * m1);
	mu2 = mu * mu;
	mu3 = mu2 * mu;
	return y1 + c11 * mu + c21 * mu2 + c31 * mu3;
}

// ---------------------------------------------------------------------------------------------------
var Objects = {};
Objects.createFaces = function (faces, vertices, joinFlag)
{
	var faceobj = moi.geometryDatabase.createObjectList();
	var lineF = moi.command.createFactory( 'line' ), lineV;
	var loftF = moi.command.createFactory( 'loft' ), loftV;
	var planarF = moi.command.createFactory( 'planarsrf' ), planarV;

	for ( var f=0; f<faces.length; f++ )
	{
		var face = faces[f], edges = moi.geometryDatabase.createObjectList();
		var flen = face.length;
		if ( flen > 4 )
		{
			for (var i=0; i < flen; i++)
			{
				lineF.setInput( 0, vertices[face[i]]);
				lineF.setInput( 1, vertices[face[(i+1)%flen]]);
				lineV=lineF.calculate();
				edges.addObject(lineV.item(0));
			}
			planarF.setInput( 0, edges );
			planarV=planarF.calculate();
			if ( planarV.length > 0 ) { faceobj.addObject(planarV.item(0)) }
		}
		else if ( flen === 3 || flen === 4 )
		{
			var sPt = 0, maxLength = 0, cLength=0, nPt;
			for (var i = 0; i<flen; i++)
			{
				nPt=(i+1)%flen;
				cLength = Math.sqrt((vertices[face[nPt]].x-vertices[face[i]].x)*(vertices[face[nPt]].x-vertices[face[i]].x)+(vertices[face[nPt]].y-vertices[face[i]].y)*(vertices[face[nPt]].y-vertices[face[i]].y)+(vertices[face[nPt]].z-vertices[face[i]].z)*(vertices[face[nPt]].z-vertices[face[i]].z));
				if ( cLength > maxLength ) { maxLength = cLength; sPt = i; }
			}
			lineF.setInput( 0, vertices[face[sPt]]); 			lineF.setInput( 1, vertices[face[(sPt+1)%flen]]);	lineV=lineF.calculate(); if (lineV.length>0) edges.addObject(lineV.item(0));
			lineF.setInput( 0, vertices[face[(sPt+3)%flen]]);	lineF.setInput( 1, vertices[face[(sPt+2)%flen]]);	lineV=lineF.calculate(); if (lineV.length>0) edges.addObject(lineV.item(0));
			loftF.setInput( 0, edges);
			loftV = loftF.calculate();
			if (loftV.length>0) { faceobj.addObject(loftV.item(0)) }
		}
	}
	lineF.cancel();
	loftF.cancel();
	planarF.cancel();
	if ( joinFlag )
	{
		var joinF=moi.command.createFactory( 'join' );
		joinF.setInput(0, faceobj);
		faceobj = joinF.calculate();
		joinF.cancel();
	}

	return faceobj;
}

