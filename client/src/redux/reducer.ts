import { NotesState } from '../interface/interface';

const initialState = {
    notes: [],
    infoApi: []
}

type Action = {type: string , payload: any}

export const Reducer = (state:NotesState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return {...state, notes: [...state.notes, action.payload]}
            
        case "GET_INFO":
            return {...state, infoApi: [...state.infoApi, action.payload]}

        default:
            return state;
    }
}


