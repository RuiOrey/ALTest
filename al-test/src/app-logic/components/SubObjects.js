export const hasSubObjects = ( possibleSubObjects ) => {

    let state = {
        possibleSubObjects: [ "flange", ...possibleSubObjects ],
        subObjects: {},
    };

    return state;

}