import { TipadoState } from '../interface/interface';

const initialState = {
    notes: [],
    infoApi: []
}

type Action = {type: string , payload: any}

export const Reducer = (state:TipadoState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return {...state, notes: [...state.notes, action.payload]}
            
        case "GET_INFO":
            // console.log('llega al reducer', action.payload);
            return {...state, infoApi: [...state.infoApi.concat(action.payload)]}

        default:
            return state;
    }
}


