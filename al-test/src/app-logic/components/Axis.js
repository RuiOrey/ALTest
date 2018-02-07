import * as THREE from 'three';

export const hasAxis = function ( outerState, context ) {
        let state = {
            axisSize: 2
        };
        Object.assign( state, outerState );
        state.axesHelper = new THREE.AxesHelper( state.axisSize );
        context.mesh.add( state.axesHelper );
        state.axesHelper.position.add( context.center );

        return state;
    }
;