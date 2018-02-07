import React, { Component } from 'react';
import * as THREE from 'three';
import { isPipeTipFlareGeometry } from "./components/PipeTipFlareGeometry"
import { hasMeasurePoints } from "./components/MeasurePoints";
import { hasAxis } from "./components/Axis";

export class TipFlare extends Component {

    constructor( props )
        {
            super();
            Object.assign( this, isPipeTipFlareGeometry( props.attributes ) );
            Object.assign( this, hasMeasurePoints( this.possibleSubObjects ) );
            Object.assign( this, hasAxis( props.attributes, this ) );
        }

    componentDidMount()
        {

            // this.addMeasurePointPair( new THREE.Vector3( -this.radius, 0, 0 ), new THREE.Vector3( this.radius, 0, 0 ), new THREE.Vector3( 0, this.height + this.radius * 2, 0 ) );
            // this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
            console.log( this );
        }

    render()
        {
            return <div>TipFlare</div>
        }
}
