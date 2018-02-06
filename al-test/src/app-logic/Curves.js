import * as THREE from 'three';

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