import * as THREE from 'three';

export const hasAxis = function ( outerState, context ) {
        let state = {
            axisSize: 2,
            buildAxis: function () {
                Object.assign( this, outerState );
                this.axesHelper = new THREE.AxesHelper( this.axisSize );
                context.mesh.add( this.axesHelper );
                this.axesHelper.position.add( context.center );
            }
        };
        state.buildAxis();

        return state;
    }
;