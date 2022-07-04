import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../redux/actions";
import { TipadoState } from "../interface/interface";
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player/lazy';
import CardVideo from "./CardVideo";
import CardVideoChannel from "./CardVideoChannel";
import { getChannel } from "../redux/actions"
import { addNote } from "../redux/actions";

export interface IMainVideoProps { };

const MainVideo: React.FunctionComponent<IMainVideoProps> = (props) => {
    const dispatch = useDispatch()

    const [view, setView] = useState<string>("videos"); // Luego veo si lo uso para
    const [search, setSearch] = useState<string>(""); // Luego veo si lo uso para
    // const [videoUrl, setVideoUrl] = useState<string>(""); // el input de búsqueda
    const [videoUrl, setVideoUrl] = useState<string[]>([`https://www.youtube.com/watch?v=dAqaQU1FrFQ?showinfo=0&enablejsapi=1&origin=https://localhost:3000`]); // el input de búsqueda

    const infoApi = useSelector<TipadoState, TipadoState["infoApi"]>((state) => state.infoApi)
    const channelInfoApi = useSelector<TipadoState, TipadoState["channelInfoApi"]>((state) => state.channelInfoApi)
    const notes = useSelector<TipadoState, TipadoState["notes"]>((state) => state.notes)
    
    // console.log('la info que llega al componente ', infoApi)


    const getVideos = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (search) {
            console.log('llamo a la pai con una búsqueda ', search)
            dispatch(getInfo(search));
        }
    }

    const getChannelId = (channelId: string, value: string) => {
        // Quiero ocultar la lista de videos de la búsqueda (input de búsqueda)
        // y visibilizar los del mismo canal (cannal llamado por id)
        console.log(channelId, value, 'sale el get del canal');
        if (channelId) {
            dispatch(getChannel(channelId));
        }
        setView(value);
    }

    const goBack = (value: string) => {
        // Quiero ocultar la lista de videos del mismo canal (cannal llamado por id)
        // y visibilizar los de la búsqueda (input de búsqueda)
        console.log(value, 'voy para atrás');
        setView(value);
    }


    const addNewNote = (idVideo: string) => {
        console.log(idVideo, 'el id del vídeo que llega')

        let noteUrl = `https://www.youtube.com/watch?v=${idVideo}?showinfo=0&enablejsapi=1&origin=https://localhost:3000`

        dispatch(addNote(noteUrl))
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
            // let newUrl: string = `https://www.youtube.com/watch?v=${idVideo}?showinfo=0&enablejsapi=1&origin=https://localhost:3000`;
            //let newVideoUrl: string[] = [...videoUrl.concat(newUrl)]
            setVideoUrl([`https://www.youtube.com/watch?v=${idVideo}?showinfo=0&enablejsapi=1&origin=https://localhost:3000`]);
            // setVideoUrl([...videoUrl.concat(newUrl)]);
            
            
        }
    }

    const playList = () => {
        if (notes.length > 0 ) {
            setVideoUrl(notes);
        }
    }

    // <ReactPlayer
    //     url={[
    //         'https://www.youtube.com/watch?v=oUFJJNQGwhk',
    //         'https://www.youtube.com/watch?v=jNgP6d9HraI'
    //     ]}
    // />





    return (
        <div>
            <h3>La ventana del vídeo</h3>
            <div>
                {/* <ReactPlayer url={videoUrl}
                    controls={true} config={{ youtube: { playerVars: { 'rel': 0, 'showinfo': 0 } } }}
                /> */}
                {videoUrl ? <ReactPlayer url={videoUrl}
                    controls={true} config={{ youtube: { playerVars: { 'rel': 0, 'showinfo': 0 } } }}
                /> : null}
            </div>

            <h5>Url del vídeo {videoUrl ? JSON.stringify(videoUrl) : null}</h5>

            <button onClick={() => playList()}>Reproducir lista</button>


            <h4>Input de búsqueda</h4>
            <form action="formSearch">
                <input type="search" value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button onClick={(e) => getVideos(e)}>Llamar a la API</button>
            </form>

            <ul style={{ listStyle: "none" }}>
                {infoApi.items && infoApi.items.length > 0 && view === "videos" ? infoApi.items.map((i: any) => {
                    return <li key={i.id.videoId}>
                        <CardVideo
                            image={i.snippet.thumbnails.high.url}
                            title={i.snippet.title}
                            description={i.snippet.description}
                            channelId={i.snippet.channelId}
                            videoId={i.id.videoId}
                            channelTitle={i.snippet.channelTitle}
                            getUrlVideo={() => getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                            getChannel={() => getChannelId(i.snippet.channelId, "channelVideos")}
                            addNewNote={() => addNewNote(i.id.videoId)}
                        />
                    </li>
                }) : null}
            </ul>

            <ul style={{ listStyle: "none" }}>
                <hr />
                {channelInfoApi.items && channelInfoApi.items.length > 0 && view === "channelVideos" ? <h2>Channel Title: {channelInfoApi.items[0].snippet.channelTitle}</h2> : null}
                {channelInfoApi.items && channelInfoApi.items.length > 0 && view === "channelVideos" ? channelInfoApi.items.map((i: any) => {
                    return <li key={i.id.videoId}>
                        <CardVideoChannel
                            image={i.snippet.thumbnails.high.url}
                            title={i.snippet.title}
                            description={i.snippet.description}
                            channelId={i.snippet.channelId}
                            videoId={i.id.videoId}
                            channelTitle={i.snippet.channelTitle}
                            getUrlVideo={() => getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                            goBack={() => goBack("videos")}
                            addNewNote={() => addNewNote(i.id.videoId)}
                        />
                    </li>
                }) : null}
            </ul>
        </div>
    )
}

export default MainVideo;