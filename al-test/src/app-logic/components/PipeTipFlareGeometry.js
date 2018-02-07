import * as THREE from 'three';
import { TipFlareCurve } from "../Curves";
import { insideMaterial } from "../../webgl/Materials"

export const isPipeTipFlareGeometry = ( outerState ) => {

    let state = {
        tipFlareHeightFromBase: 4.0,
        tipFlareTopHeight: 2.0,
        tipFlareDiameter: 0.125,
        tipFlareBottomThickness: 0.012,
        tipFlareTopThickness: 0.009,
        tipFlareBottomInclination: 0.9,
        tipFlarePieces: 20,
        tubularSegments: 200,
        radius: 0.0625,
        radialSegments: 20,
        closed: false
    };

    Object.assign( state, outerState );
    state.path = new TipFlareCurve( state.tipFlareHeightFromBase, state.tipFlareTopHeight, state.tipFlareBottomInclination );
    //state.path = new StraightCurve( state.tipFlareHeightFromBase );

    state.geometry = new THREE.TubeGeometry( state.path, state.tubularSegments, state.radius, state.radialSegments, state.closed );
    state.mesh = new THREE.Mesh();
    for ( let i = 0; i < state.tipFlarePieces; i++ )
        {
            const _newTube = new THREE.Mesh( state.geometry, insideMaterial );
            _newTube.castShadow = true;
            _newTube.receiveShadow = true;
            state.mesh.add( _newTube );

            _newTube.rotation.y = i * ( (2 * Math.PI) / state.tipFlarePieces )

        }
    state.mesh.position.add( new THREE.Vector3( 0, state.tipFlareHeightFromBase, 0 ) );

    state.center = new THREE.Vector3( 0, state.height / 2, 0 );
    return state;
};