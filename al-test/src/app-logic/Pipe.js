import React, { Component } from 'react';
import * as THREE from 'three';
import { isPipeGeometry } from "./components/PipeGeometry"
import { hasSubObjects } from "./components/SubObjects";
import { hasMeasurePoints } from "./components/MeasurePoints";
import { hasAxis } from "./components/Axis";

export class Pipe extends Component {

    possibleSubObjects = [ "flare_tip", "flange" ];

    constructor( props )
        {
            super();
            Object.assign( this, isPipeGeometry( props.attributes ) );
            Object.assign( this, hasSubObjects( this.possibleSubObjects ) );
            Object.assign( this, hasMeasurePoints( this.possibleSubObjects ) );
            Object.assign( this, hasAxis( props.attributes, this ) );
        }

    componentDidMount()
        {

            this.addMeasurePointPair( new THREE.Vector3( -this.radius, 0, 0 ), new THREE.Vector3( this.radius, 0, 0 ), new THREE.Vector3( 0, this.height + this.radius * 2, 0 ) );
            this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
            console.log( this );
        }

    render()
        {
            return <div>Pipe</div>
        }
}