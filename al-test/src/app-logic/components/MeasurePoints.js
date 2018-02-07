import * as THREE from 'three';

export const hasMeasurePoints = ( possibleSubObjects ) => {

    function MeasurePoint( point1, point2, distanceVector )
        {
            this.point1 = point1;
            this.point2 = point2;
            this.distanceVector = distanceVector;
            this.visible = true;
            const _randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString( 16 );
            this.color = _randomColor;
            this.material = new THREE.LineBasicMaterial( { color: this.color } );
            this.geometry = new THREE.Geometry();
            const _halfDistanceVector = distanceVector.clone().normalize().multiplyScalar( 0.2 );
            const _lineBorders = {
                top: [
                    point1.clone().add( _halfDistanceVector ),
                    point1.clone().sub( _halfDistanceVector )
                ],
                bottom: [
                    point2.clone().add( _halfDistanceVector ),
                    point2.clone().sub( _halfDistanceVector ) ]
            };
            this.geometry.vertices.push( _lineBorders.top[ 0 ], _lineBorders.top[ 1 ] );
            this.geometry.vertices.push( _lineBorders.bottom[ 0 ], _lineBorders.bottom[ 1 ] );
            this.geometry.vertices.push( point1 );
            this.geometry.vertices.push( point2 );
            this.distanceScalar = point1.distanceTo( point2 );
            this.line = new THREE.LineSegments( this.geometry, this.material );
            this.line.linewidth = 2;
            this.text = null;

        }

    function addMeasurePointPair( point1, point2, distanceVector )
        {
            if ( !(point1 instanceof THREE.Vector3) || !(point2 instanceof THREE.Vector3) || !(distanceVector instanceof THREE.Vector3 ) )
                {
                    return;
                }
            const _measurePoint = new MeasurePoint( point1, point2, distanceVector );
            const loader = new THREE.FontLoader();

            loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

                const geometry = new THREE.TextGeometry( _measurePoint.distanceScalar, {
                    font: font,
                    size: .5,
                    height: 0.01,
                    curveSegments: 12
                } );

                _measurePoint.text = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: _measurePoint.color } ) );
                _measurePoint.line.add( _measurePoint.text );
                _measurePoint.text.position.add( point1.lerp( point2, 0.5 ) ).add( distanceVector.clone().normalize().multiplyScalar( 0.5 ) );
                _measurePoint.text.geometry.center();
            } );

            this.measurePoints.push( _measurePoint );
            console.log( this.mesh.parent );
            this.mesh.add( _measurePoint.line );
            _measurePoint.line.position.add( distanceVector ).add( distanceVector.clone().multiplyScalar( Math.random() ) );
        }

    let state = {
        measurePoints: [],
        addMeasurePointPair: addMeasurePointPair
    };

    return state;

}