import axios from "axios";

export type Action = { type: "ADD_NOTE", payload: string };


export const addNote = (note: string) => ({
    type: "ADD_NOTE", payload: note
})



export async function getInfo() {

    // export const getInfo = () => async (): Promise<any> => {
    // dispatch actions, return Promise, etc.
    try {
        // let infoApi = await axios.get('http://localhost:3001/youtube/')

        // console.log(infoApi, 'llama a la api y la api responde');
        // return ({
        //     type: "GET_INFO",
        //     payload: infoApi
        // })

    } catch (error) {
        console.log(error, 'error al llama a la api');
        //       dispatch({
        //         type: GET_USER_TOKEN_GOOGLE,
        //         payload: { error: error.message },
        //       });

    }

}


// interface ServerResponse {
//     data: ServerData
// }

// interface ServerData {
//     foo: string
//     bar: number
// }
//   Then you can say:

// axios.request<ServerData>({
//     url: 'https://example.com/path/to/data',
//     transformResponse: (r: ServerResponse) => r.data
// }).then((response) => {
//     // `response` is of type `AxiosResponse<ServerData>`
//     const { data } = response
//     // `data` is of type ServerData, correctly inferred
// })