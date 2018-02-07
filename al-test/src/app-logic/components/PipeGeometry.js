import * as THREE from 'three';
import { StraightCurve } from "../Curves";
import { externalMaterial } from "../../webgl/Materials";

export const isPipeGeometry = ( outerState ) => {

    let state = {
        height: 10.0,
        outerDiameter: 0.5,
        tubularSegments: 200,
        radius: 0.5,
        radialSegments: 20,
        closed: false
    };

    Object.assign( state, outerState );
    state.path = new StraightCurve( state.height );

    state.geometry = new THREE.TubeGeometry( state.path, state.tubularSegments, state.outerDiameter, state.radialSegments, state.closed );
    state.mesh = new THREE.Mesh( state.geometry, externalMaterial() );
    state.center = new THREE.Vector3( 0, state.height / 2, 0 );
    return state;
};