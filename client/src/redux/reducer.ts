import { TipadoState } from '../interface/interface';

const initialState = {
    listVideo: [],
    infoApi: {},
    channelInfoApi: {},
}

type Action = {type: string , payload: any}

export const Reducer = (state:TipadoState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_NOTE":
            return {...state, listVideo: [...state.listVideo, action.payload]}
            
        case "GET_INFO":
            // console.log('llega al reducer', action.payload);
            return {...state, infoApi: action.payload }
        
        case "GET_CHANNEL_INFO":
            console.log('llega al reducer channelInfo', action.payload);
            return {...state, channelInfoApi: action.payload }


        default:
            return state;
    }
}


