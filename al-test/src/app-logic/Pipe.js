import React, { Component } from 'react';
import * as THREE from 'three';
import { isPipeGeometry } from "./components/PipeGeometry"
import { hasSubObjects } from "./components/SubObjects";
import { hasMeasurePoints } from "./components/MeasurePoints";
import { hasAxis } from "./components/Axis";
import { TipFlare } from "./TipFlare"

export class Pipe extends Component {

    possibleSubObjects = [ "flare_tip", "flange" ];

    constructor( props )
        {
            super();
            Object.assign( this, isPipeGeometry( props.parameters.pipe ) );
            Object.assign( this, hasSubObjects( this.possibleSubObjects, props.parameters ) );
            Object.assign( this, hasMeasurePoints( this.possibleSubObjects ) );
            Object.assign( this, hasAxis( props.attributes, this ) );
            props.registerUpdatePipe( this.rebuildPipe );
        }

    rebuildPipe = ( parameters ) => {
        Object.assign( this, parameters );
        if ( this.mesh )
            {
                let _parent = this.mesh.parent;
                _parent.remove( this.mesh );
                this.mesh.geometry.dispose();
                this.mesh.material.dispose();
                this.mesh = undefined;

                this.buildPipe();
                _parent.add( this.mesh );
                this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
                this.buildAxis();
            }
    }

    componentDidMount()
        {
            // this.addMeasurePointPair( new THREE.Vector3( -this.radius / 2, 0, 0 ), new THREE.Vector3( this.radius / 2, 0, 0 ), new THREE.Vector3( 0, this.path.getPointAt( 1 ).y / 2 + this.radius, 0 ) );
            this.addMeasurePointPair( this.path.getPointAt( 1 ), this.path.getPointAt( 0 ), new THREE.Vector3( this.radius * 2, 0, 0 ) );
        }

    componentWillReceiveProps( nextProps )
        {
            console.log( "Pipe componentWillReceiveProps:", nextProps );

            this.rebuildPipe( nextProps.parameters );
        }

    addChild = ( child ) => {
        if ( child.mesh )
            {
                this.mesh.add( child.mesh );
            }
        this.subObjects.push( child );
    }

    getMesh = () => {
        // console.log( this.mesh );
        return this.mesh;
    }

    render()
        {
            return <div>Pipe<TipFlare getParent={this.getMesh}
                                      registerUpdateFlareTip={this.props.registerUpdateFlareTip}
                                      parameters={this.props.parameters.flare} ref={this.addChild}></TipFlare></div>
        }
}