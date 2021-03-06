import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

import { Scene } from './Scene';
import { Camera } from './Camera';
import { Controls } from './Controls';
import { DatGui } from "../ui/DatGui"

export class RendererTest extends Component {

    registeredUpdates = [];
    renderer = new THREE.WebGLRenderer( {
        alpha: true,
        antialias: true
    } );
    ui = {};
    canvas = this.renderer.domElement;
    sceneParameters = {};
    state = {
        loadedUI: false
    }

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
        if ( !camera )
            {
                return;
            }
        this.camera = camera.camera;
        this.children.push( camera );
    };

    setScene = ( scene ) => {

        if ( !scene )
            {
                return;
            }
        this.scene = scene.scene;
        this.children.push( scene );
    }

    setControls = ( controls ) => {

        if ( !controls )
            {
                return;
            }
        controls.init( this.camera, this.renderer.domElement );
        this.controls = controls;
        this.children.push( controls );
    }

    setUI = ( ui ) => {
        if ( !ui )
            {
                return;
            }
        //ui.init();
        this.ui = ui;

        console.log( "renderer setUI", this.ui );
        // console.log( "renderer setUI 2", this.ui.params );
        this.sceneParameters = ui ? ui.params : {};

        if ( !this.state.loadedUI )
            {
                this.setState( { loadedUI: true } );
            }
    }

    registerUpdatePipe = ( updatePipeFunction ) => {
        this.updatePipe = updatePipeFunction;
    }

    pipeUpdated = ( params ) => {
        this.updatePipe( params );
    }

    registerUpdateFlareTip = ( updateFlareTip ) => {
        this.updateFlareTip = updateFlareTip;
    }

    flareTipUpdated = ( params ) => {
        this.updateFlareTip( params );
    }

    render()
        {
            let _children = [];
            this.children = [];
            _children.push( <DatGui pipeUpdate={this.pipeUpdated} flareTipUpdated={this.flareTipUpdated}
                                    ref={ui => this.setUI( ui )} key="testForUpdate4"></DatGui> );
            _children.push( <Camera ref={camera => this.setCamera( camera )} key="testForUpdate"></Camera> );
            _children.push( <Scene registerUpdatePipe={this.registerUpdatePipe}
                                   registerUpdateFlareTip={this.registerUpdateFlareTip}
                                   parameters={this.sceneParameters} ref={scene => this.setScene( scene )}
                                   key="testForUpdate2"></Scene> );
            _children.push( <Controls ref={controls => this.setControls( controls )} key="testForUpdate3"></Controls> );

            return <div className="scene">{_children} </div>;
        }
}