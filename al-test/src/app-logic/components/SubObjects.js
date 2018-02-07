export const hasSubObjects = ( possibleSubObjects = [], outerState ) => {

    let state = {
        possibleSubObjects: [ ...possibleSubObjects ],
        subObjects: [],
    };

    Object.assign( state, outerState );
//TODO: return subobjects factories
    return state;

}