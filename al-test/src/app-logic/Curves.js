import * as THREE from 'three';

/*
Diameter = 1250 mm ( consider this for default)
Arms = 12 “ pipe / equivalent diameter , thickness of inclined arms = 12 mm and the top vertical bit = 9.52 mm ( std pipe thk.)
Height = consider example 800 mm form base.
Usually from Flange base to top is usually between 3000 mm – 4000 mm max.

Conical part = 400 / 600 mm.

So typically vertical cylinder height = 2000 mm. ( usually)
 */

export function StraightCurve( scale )
    {

        THREE.Curve.call( this );
        this.scale = ( scale === undefined ) ? 1 : scale;

    }

StraightCurve.prototype = Object.create( THREE.Curve.prototype );
StraightCurve.prototype.constructor = StraightCurve;

StraightCurve.prototype.getPoint = function ( t ) {
    // const tx = t * 3 - 1.5;
    const tx = 0;
    const ty = t;
    const tz = 0;
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
};

export function TipFlareCurve( totalHeight, topHeight, inclination )
    {
        THREE.Curve.call( this );
        this.totalHeight = ( totalHeight === undefined ) ? 1 : totalHeight;
        this.topHeight = ( topHeight === undefined ) ? 1 : topHeight;
        this.bottomHeight = this.totalHeight - this.topHeight;
        this.inclination = ( inclination === undefined ) ? 1 : inclination;
        this.half = this.bottomHeight / (this.totalHeight);
    }

TipFlareCurve.prototype = Object.create( THREE.Curve.prototype );
TipFlareCurve.prototype.constructor = TipFlareCurve;

TipFlareCurve.prototype.getPoint = function ( t ) {
    // const tx = t * 3 - 1.5;
    let tx, ty, tz;
    if ( t < this.half )
        {
            tx = t * Math.cos( this.inclination );
            ty = t * Math.sin( this.inclination );
            tz = 0;
        }
    else
        {
            tx = this.half * Math.cos( this.inclination );
            ty = this.half * Math.sin( this.inclination ) + (t - this.half);
            tz = 0;
        }
    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.totalHeight );
};