import * as THREE from 'three';

export function externalMaterial()
    {
        var path = "/textures/cube/SwedishRoyalCastle/";
        var format = '.jpg';
        var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];
        const reflectionCube = new THREE.CubeTextureLoader().load( urls, ( texture ) => {

        } );
        return new THREE.MeshStandardMaterial( {
            color: 0x00FF00, side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0,
            envMap: reflectionCube,
            envMapIntensity: 1,
            roughness: 0.2,
            metalness: 0.5
        } );
    }

export const insideMaterial = new THREE.MeshStandardMaterial( {
    color: 0x00FF00,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 1.0
} );