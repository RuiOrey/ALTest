import React, { Component } from 'react';
import * as dat from "dat.gui/build/dat.gui" ;

export class DatGui extends Component {

    gui = new dat.GUI();

    params = {
        pipe: {
            height: 5.0,
            outerDiameter: 0.25,
            tubularSegments: 200,
            radius: 0.5,
            radialSegments: 20,
            closed: false
        },
        flare: {
            tipFlareHeightFromBase: 5.0,
            tipFlareTopHeight: 3.0,
            tipFlareDiameter: 0.125,
            tipFlareBottomThickness: 0.012,
            tipFlareTopThickness: 0.009,
            tipFlareBottomInclination: 0.9,
            tipFlarePieces: 20,
            tubularSegments: 200,
            radius: 0.0625,
            radialSegments: 20,
            closed: false
        }

    }

    componentDidMount()
        {
            this.init();
        }

    flareUpdate = () => {
        this.props.flareTipUpdated( this.params.flare );
    }
    pipeUpdate = () => {
        this.props.pipeUpdate( this.params.pipe );
        this.flareUpdate();
    }

    buildPipeUI = () => {
        //Pipe

        this.pipeUI = this.gui.addFolder( "Pipe" );
        this.pipeUI.add( this.params.pipe, 'height', 0.1, 10 ).step( 0.1 ).name( 'height' ).onChange( () => {
            this.pipeUpdate();
        } );
        this.pipeUI.add( this.params.pipe, 'outerDiameter', 0.1, 10 ).step( 0.1 ).name( 'outerDiameter' ).onChange( () => {
            this.pipeUpdate();
        } );
        this.pipeUI.add( this.params.pipe, 'tubularSegments', 0.1, 10 ).step( 0.1 ).name( 'tubularSegments' ).onChange( () => {
            this.pipeUpdate();
        } );
        /*this.pipeUI.add( this.params.pipe, 'radius', 0.1, 100 ).step( 0.1 ).name( 'radius' ).onChange( () => {
            this.pipeUpdate();
        } );*/
        this.pipeUI.add( this.params.pipe, 'radialSegments', 0.1, 10 ).step( 0.1 ).name( 'radialSegments' ).onChange( () => {
            this.pipeUpdate();
        } );
        /*
        this.pipeUI.add( this.params.pipe, 'closed' ).listen().name( 'closed' ).onChange( () => {

            this.pipeUpdate();
        } );*/

        this.pipeUI.open();
    }

    buildFlareUI = () => {
        //Flare

        this.flare = this.gui.addFolder( "Flare Tip" );
        this.flare.add( this.params.flare, 'tipFlareHeightFromBase', 0.1, 20 ).step( 0.1 ).name( 'height from base' ).onChange( () => {
            this.flareUpdate();
        } );
        this.flare.add( this.params.flare, 'tipFlareTopHeight', 0.1, 4).step( 0.1 ).name( 'top height' ).onChange( () => {
            this.flareUpdate();
        } );
        // this.flare.add( this.params.flare, 'tipFlareDiameter', 0.1, 100 ).step( 0.1 ).name( 'tipFlareDiameter' ).onChange( () => {
        //     this.flareUpdate();
        // } );
        // this.flare.add( this.params.flare, 'tipFlareBottomThickness', 0.1, 100 ).step( 0.1 ).name( 'tipFlareBottomThickness' ).onChange( () => {
        //     this.flareUpdate();
        // } );
        // this.flare.add( this.params.flare, 'tipFlareTopThickness', 0.1, 100 ).step( 0.1 ).name( 'tipFlareTopThickness' ).onChange( () => {
        //     this.flareUpdate();
        // } );
        this.flare.add( this.params.flare, 'tipFlareBottomInclination', 0.1, 1 ).step( 0.1 ).name( 'inclination' ).onChange( () => {
            this.flareUpdate();
        } );
        this.flare.add( this.params.flare, 'tipFlarePieces', 1, 20 ).step( 1 ).name( 'pieces' ).onChange( () => {
            this.flareUpdate();
        } );
        // this.flare.add( this.params.flare, 'tubularSegments', 0.1, 100 ).step( 0.1 ).name( 'tubularSegments' ).onChange( () => {
        //     this.flareUpdate();
        // } );
        this.flare.add( this.params.flare, 'radius', 0.1, 2 ).step( 0.1 ).name( 'radius tubes' ).onChange( () => {
            this.flareUpdate();
        } );
        // this.flare.add( this.params.flare, 'radialSegments', 0.1, 100 ).step( 0.1 ).name( 'radialSegments' ).onChange( () => {
        //     this.flareUpdate();
        // } );

        // this.flare.add( this.params.flare, 'closed' ).listen().name( 'closed' ).onChange( () => {
        //
        //     // this.resetStraightCylinder()
        // } );

        this.flare.open();
    }

    init = () => {

        this.buildPipeUI();
        this.buildFlareUI();

    }

    updateGUIValues = () => {
        const gui = this.gui;
        for ( var i = 0; i < Object.keys( gui.__folders ).length; i++ )
            {
                var key = Object.keys( gui.__folders )[ i ];
                for ( var j = 0; j < gui.__folders[ key ].__controllers.length; j++ )
                    {
                        gui.__folders[ key ].__controllers[ j ].updateDisplay();
                    }
            }
    }

    render()
        {
            return <div>DatGui</div>
        }
}