import * as THREE from 'three';
import { StraightCurve } from "./Curves";
import { externalMaterial } from "../webgl/Materials";

export const isPipeGeometry = ( outerState ) => {

    let state = {
        height: 20.0,
        outerDiameter: 1.0
    };

    Object.assign( state, outerState );

    state.path = new StraightCurve( state.height );
    state.geometry = new THREE.TubeGeometry( state.path, 200, state.outerDiameter, 20, false );
    state.mesh = new THREE.Mesh( state.geometry, externalMaterial() );
    return state;
};

export const hasSubObjects = ( possibleSubObjects ) => {

    let state = {
        possibleSubObjects: [ "flange", ...possibleSubObjects ],
        subObjects: {},
    };

    return state;

}

export const hasMeasurePoints = ( possibleSubObjects ) => {

    function MeasurePoint( point1, point2, distanceVector )
        {
            this.point1 = point1;
            this.point2 = point2;
            this.distanceVector = distanceVector;
            this.visible = true;
            this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            this.geometry = new THREE.Geometry();
            this.geometry.vertices.push( point1 + distanceVector );
            this.geometry.vertices.push( point2 + distanceVector );
            this.line = new THREE.Line( geometry, material );
        }

    function addMeasurePointPair( point1, point2, distanceVector )
        {
            if ( point1 !== THREE.Vector3 || point2 !== THREE.Vector3 || distanceVector !== THREE.Vector3 )
                {
                    return;
                }
            const _measurePoint = new MeasurePoint( point1, point2, point3 );
            this.measurePoints.push( _measurePoint );
            this.add( _measurePoint.line );

        }

    let state = {
        measurePoints: [],
        addMeasurePointPair: addMeasurePointPair
    };

    return state;

}