import axios from "axios";

export type Action = { type: "ADD_NOTE", payload: string };


export const addNote = (note: string) => ({
    type: "ADD_NOTE", payload: note
})



export const getInfo = (search : string):any => async (dispatch: any): Promise<any> => {
    // dispatch actions, return Promise, etc.
    try {
        // let infoApi = await axios.get('http://localhost:3001/youtube/')
        let infoApi = await axios({
            method: 'GET',
            url: 'http://localhost:3001/youtube/',
            params: {
                search: search,
            }            
        })
        .then((response)=> {
            // console.log(response.data.items, ' lo que responde la promesa')
            return response.data.items;
        })
        .catch((err)=> console.log(err) )

        dispatch ({
            type: "GET_INFO",
            payload: infoApi
        })

        // console.log(infoApi, 'llama a la api y la api responde');

    } catch (error) {
        console.log(error, 'error al llama a la api');   
    }
}

// app.get("/channel", async (req: Request, res: Response) => {
// let { channelId } = req.query; // "UCGnjeahCJW1AF34HBmQTJ-Q"

export const getChannel = (channelId : string):any => async (dispatch: any): Promise<any> => {
    // dispatch actions, return Promise, etc.
    try {
        // let infoApi = await axios.get('http://localhost:3001/youtube/')
        let channelInfoApi = await axios({
            method: 'GET',
            url: 'http://localhost:3001/channel/',
            params: {
                channelId: channelId,
            }            
        })
        .then((response)=> {
            console.log(response.data.items, ' lo que responde al get Channel Id')
            return response.data.items;
        })
        .catch((err)=> console.log(err) )

        dispatch ({
            type: "GET_CHANNEL_INFO",
            payload: channelInfoApi
        })

        // console.log(infoApi, 'llama a la api y la api responde');

    } catch (error) {
        console.log(error, 'error al llama a la api');   
    }
}
