import React, { Component } from 'react';

import * as THREE from 'three';

export class Scene extends Component {

    scene = new THREE.Scene();
    children = [];

    componentDidMount()
        {
            this.scene.fog = new THREE.Fog( 0xdddddd, 0.015, 200 );
            this.initGrid();
            this.initAxes();
        }

    initGrid()
        {

            const size = 2000;
            const divisions = 1000;

            const planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
            planeGeometry.rotateX( -Math.PI / 2 );
            const planeMaterial = new THREE.MeshPhongMaterial( {
                opacity: 0.8, transparent: true, depthWrite: false
            } );
            const plane = new THREE.Mesh( planeGeometry, planeMaterial );
            plane.position.y = -0.1;
            plane.receiveShadow = true;
            plane.material.transparent = true;
            plane.renderOrder = 100;
            this.scene.add( plane );

            const gridHelper = new THREE.GridHelper( size, divisions );
            //gridHelper.castShadow = true;

            this.scene.add( gridHelper );
        }

    initAxes()
        {

            const axesHelper = new THREE.AxesHelper( 5 );
            this.scene.add( axesHelper );
        }

    render()
        {
            return <div>Scene</div>;
        }
}