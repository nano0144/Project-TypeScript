import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../redux/actions";
import { TipadoState } from "../interface/interface";
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player/lazy';

export interface ITestComponentsProps {};

const TestComponent: React.FunctionComponent<ITestComponentsProps> = (props) => {
// export const TestComponent = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState<string>(""); // Luego veo si lo uso para
    const [videoUrl, setVideoUrl] = useState<string>(""); 
    // el input de búsqueda

    const infoApi = useSelector<TipadoState, TipadoState["infoApi"]>((state) => state.infoApi)
    console.log('la info que llega al componente ', infoApi)
    // const infoApi = ["un elemento"];
    /*
    0. creo la acción,
    1. disparo la acción,
    2. cargo el estado global,
    3. consumo el estado global,
    4. mapeo y renderizo
    */
    const getVideos = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (search) {
            console.log('llamo a la pai con una búsqueda ', search)
            
            dispatch(getInfo(search));
            
            // dispatch(getInfo());
        }

    }

    
    //---------------------------------------------------------------------
    // https://www.youtube.com/watch?v=_w4sPyiNdBY&ab_channel=angeloDev
    // Y si uso ReactPlayer?
    //---------------------------------------------------------------------
    // https://www.npmjs.com/package/react-player
    //---------------------------------------------------------------------
    
    const getUrlVideo = (idVideo: string, titleChannel: string) => {
        console.log(idVideo, titleChannel, 'lo que llega a función');
        if (idVideo && titleChannel) {           
            setVideoUrl(`https://www.youtube.com/watch?v=${idVideo}?showinfo=0&enablejsapi=1&origin=https://localhost:3000`);
        }
    }
    


    return (
        <div>
            <form action="formSearch">
                <input type="search" value={search}
                onChange={(e)=> setSearch(e.target.value)} />
                <button onClick={(e)=> getVideos(e)}>Llamar a la API</button>
            </form>
            <h3>La url del vídeo</h3>
            {videoUrl ? videoUrl : null}

            <h3>La ventana del vídeo</h3>
            <div>
            {videoUrl ? <ReactPlayer url={videoUrl} 
            controls={true} config={{youtube:{playerVars:{'rel': 0,'showinfo': 0}}}}
            /> : null}

            </div>
            <ul style={{listStyle: "none"}}>
                {infoApi.length > 0 ? infoApi.map((i: any) => {
                   return <li key={i.etag}>
                    <img key={i} src={i.snippet.thumbnails.high.url} 
                    alt={i.snippet.tittle}></img> <br/> 
                    <strong>{i.snippet.title}</strong><br/> 
                    <p>{i.snippet.description}</p>
                    <p>Id del canal: {i.snippet.channelId}</p>
                    <button onClick={()=> getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                    >Get Video</button>
                   
                   </li>
                }) : null}
            </ul>
        </div>
    )
}

export default TestComponent;