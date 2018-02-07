import * as THREE from 'three';
import { StraightCurve } from "../Curves";
import { externalMaterial } from "../../webgl/Materials";

export const isPipeGeometry = ( outerState ) => {

    let state = {
        height: 5.0,
        outerDiameter: 0.25,
        tubularSegments: 200,
        radius: 0.5,
        radialSegments: 20,
        closed: false,
        buildPipe: function () {
            console.log( "buildPipe" )
            this.path = new StraightCurve( this.height );

            this.geometry = new THREE.TubeGeometry( this.path, this.tubularSegments, this.outerDiameter, this.radialSegments, this.closed );
            this.mesh = new THREE.Mesh( this.geometry, externalMaterial );
            this.mesh.castShadow = true;
            this.mesh.receiveShadow = true;
            this.center = new THREE.Vector3( 0, this.height / 2, 0 );
        }
    };

    Object.assign( state, outerState );
    state.buildPipe();
    return state;
};