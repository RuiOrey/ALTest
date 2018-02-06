import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

import { Scene } from './Scene';
import { Camera } from './Camera';
import { Controls } from './Controls';

export class RendererTest extends Component {

    registeredUpdates = [];
    renderer = new THREE.WebGLRenderer( {
        alpha: true
    } );
    canvas = this.renderer.domElement;

    componentDidMount()
        {
            ReactDOM.findDOMNode( this ).appendChild( this.canvas );
            this.setupRendererDefaults();
            this.setupCanvasDefaults();
            this.setupResize();
            this.renderLoop();
        };

    setupResize()
        {
            window.addEventListener( "resize", () => {
                this.resize();
            } );
            this.resize();
        }

    resize = () => {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.renderer.setSize( this.canvas.width, this.canvas.height );
    }

    renderLoop = ( timeRenderLoopWasCalled ) => {
        this.updateChildren( timeRenderLoopWasCalled, this.children );
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.renderLoop );
    }

    updateChildren = ( timeRenderLoopWasCalled, children ) => {
        if ( children === undefined )
            {
                return;
            }
        children.forEach( ( child ) => {
            child.update ? child.update() : null;
            child.children ? this.updateChildren( timeRenderLoopWasCalled, child.children ) : null;
        } )
    }

    setupRendererDefaults()
        {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.renderReverseSided = true;
            this.renderer.shadowMap.renderSingleSided = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
            this.renderer.setClearColor( 0xdddddd, 1.0 );
            this.renderer.sortObjects = false;

        }

    setupCanvasDefaults()
        {
            this.canvas.style.position = "absolute";
            this.canvas.style.left = 0;
            this.canvas.style.top = 0;
            this.canvas.style.top = 0;
            this.canvas.style.zIndex = -1;
        }

    setCamera = ( camera ) => {
        this.camera = camera.camera;
        this.children.push( camera );
    };

    setScene = ( scene ) => {
        this.scene = scene.scene;
        this.children.push( scene );
    }

    setControls = ( controls ) => {
        controls.init( this.camera, this.renderer.domElement );
        this.controls = controls;
        this.children.push( controls );
    }

    render()
        {
            let _children = [];
            this.children = [];
            _children.push( <Camera ref={camera => this.setCamera( camera )} key="testForUpdate"></Camera> );
            _children.push( <Scene ref={scene => this.setScene( scene )} key="testForUpdate2"></Scene> );
            _children.push( <Controls ref={controls => this.setControls( controls )} key="testForUpdate3"></Controls> );

            return _children;
        }
}