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
        closed: false,
        buildFlareTip: function () {
            this.path = new TipFlareCurve( this.tipFlareHeightFromBase, this.tipFlareTopHeight, this.tipFlareBottomInclination );
            //state.path = new StraightCurve( state.tipFlareHeightFromBase );

            this.geometry = new THREE.TubeGeometry( this.path, this.tubularSegments, this.radius, this.radialSegments, this.closed );
            this.mesh = new THREE.Mesh();
            for ( let i = 0; i < this.tipFlarePieces; i++ )
                {
                    const _newTube = new THREE.Mesh( this.geometry, insideMaterial );
                    _newTube.castShadow = true;
                    _newTube.receiveShadow = true;
                    this.mesh.add( _newTube );

                    _newTube.rotation.y = i * ( (2 * Math.PI) / this.tipFlarePieces )

                }
            this.mesh.position.add( new THREE.Vector3( 0, this.tipFlareHeightFromBase, 0 ) );

            this.center = new THREE.Vector3( 0, this.height / 2, 0 );
        }
    };

    Object.assign( state, outerState );
    state.buildFlareTip();
    return state;
};