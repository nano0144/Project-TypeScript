import { TipadoState } from '../interface/interface';

const initialState = {
    listVideo: [],
    infoApi: {},
    channelInfoApi: {},
}

type Action = {type: string , payload: any}

export const Reducer = (state:TipadoState = initialState, action: Action) => {
    // console.log(action.type, 'tipo de acción')
    switch (action.type) {
        case "ADD_VIDEO":
            // console.log(action, 'en el reducer');
            return {...state, listVideo: [...state.listVideo].concat([action.payload])}
        
        case "UPDATE_LIST":
            console.log(action, 'el array de objetos en el reducer');
            return {...state, listVideo: action.payload}
        case "GET_INFO":
            // console.log('llega al reducer', action.payload);
            return {...state, infoApi: action.payload }
        
        case "GET_CHANNEL_INFO":
            // console.log('llega al reducer channelInfo', action.payload);
            return {...state, channelInfoApi: action.payload }


        default:
            return state;
    }
}


