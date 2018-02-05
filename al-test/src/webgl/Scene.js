import React, { Component } from 'react';

import * as THREE from 'three';

export class Scene extends Component {

    scene = new THREE.Scene();

    componentDidMount()
        {
            this.scene.fog = new THREE.Fog( 0xdddddd, 0.015, 200 );
        }

    render()
        {
            return <div>Scene</div>;
        }
}