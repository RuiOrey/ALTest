import React, { Component } from 'react';
import * as THREE from 'three';
import { isPipeGeometry } from "./components/PipeGeometry"
import { hasSubObjects } from "./components/SubObjects";
import { hasMeasurePoints } from "./components/MeasurePoints";

export class Pipe extends Component {

    possibleSubObjects = [ "flare_tip", "flange" ];

    constructor( props )
        {
            super();
            Object.assign( this, isPipeGeometry( props.attributes ) );
            Object.assign( this, hasSubObjects( this.possibleSubObjects ) );
            Object.assign( this, hasMeasurePoints( this.possibleSubObjects ) );
        }

    componentDidMount()
        {

            this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
            console.log( this );
        }

    render()
        {
            return <div>Pipe</div>
        }
}