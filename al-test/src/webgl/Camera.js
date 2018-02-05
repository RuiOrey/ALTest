import React, { Component } from 'react';

import * as THREE from 'three';

export class Camera extends Component {

    attribs = {
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1000
    };
    camera = new THREE.Camera( this.attribs.fov, this.attribs.aspect, this.attribs.near, this.attribs.far );

    componentDidMount()
        {
            this.setupResize();
        };

    setupResize()
        {
            window.addEventListener( "resize", () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
            } );
        }

    render()
        {
            return <div>Camera</div>;
        }
}