import React, { Component } from 'react';

import * as THREE from 'three';

const OrbitControls = require( 'three-orbit-controls' )( THREE );

export class Controls extends Component {

    controls;

    componentDidMount()
        {
        };

    init( camera, domElement )
        {
            this.controls = new OrbitControls( camera, domElement );
        }

    update()
        {
            // console.log( "updating controls test" );
        }

    render()
        {
            return <div>Controls</div>;
        }
}