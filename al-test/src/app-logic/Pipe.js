import React, { Component } from 'react';

import { isPipeGeometry, hasSubObjects } from "./components";

export class Pipe extends Component {

    possibleSubObjects = [ "flare_tip", "flange" ];

    constructor( props )
        {
            super();
            Object.assign( this, isPipeGeometry( props.attributes ) );
            Object.assign( this, hasSubObjects( this.possibleSubObjects ) );
        }

    render()
        {
            return <div>Pipe</div>
        }
}