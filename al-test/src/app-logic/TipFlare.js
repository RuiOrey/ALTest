import React, { Component } from 'react';
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
            props.registerUpdateFlareTip( this.rebuildFlareTip );
        }

    rebuildFlareTip = ( parameters ) => {
        Object.assign( this, parameters );
        if ( this.mesh )
            {
                let _parent = this.mesh.parent;
                _parent.remove( this.mesh );
                this.mesh.geometry.dispose();
                this.mesh.material.dispose();
                this.mesh = undefined;
            }
        this.buildFlareTip();
        //_parent.add( this.mesh );
        // this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
        this.buildAxis();
        const _newParent = this.props.getParent();
        _newParent.add( this.mesh );

    }

    componentWillReceiveProps( nextProps )
        {
            console.log( "TipFlare componentWillReceiveProps:", nextProps );
        }

    componentDidMount()
        {

            // this.addMeasurePointPair( new THREE.Vector3( -this.radius, 0, 0 ), new THREE.Vector3( this.radius, 0, 0 ), new THREE.Vector3( 0, this.height + this.radius * 2, 0 ) );
            // this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
        }

    render()
        {
            return <div>TipFlare</div>
        }
}
