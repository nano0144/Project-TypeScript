import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../redux/actions";
import { TipadoState } from "../interface/interface";
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player/lazy';
import CardVideo from "./CardVideo";
import CardVideoChannel from "./CardVideoChannel";
import { getChannel } from "../redux/actions"
import { addVideo } from "../redux/actions";
import style from "./style/style.module.css";

export interface IMainVideoProps {

};

const MainVideo: React.FunctionComponent<IMainVideoProps> = (props) => {
    const dispatch = useDispatch()

    const [view, setView] = useState<string>("videos"); // Luego veo si lo uso para
    const [search, setSearch] = useState<string>(""); // Luego veo si lo uso para
    const [memoSearch, setMemoSearch] = useState<string>("");
    // const [videoUrl, setVideoUrl] = useState<string>(""); // el input de búsqueda
    const [videoUrl, setVideoUrl] = useState<string[]>([`https://www.youtube.com/watch?v=dAqaQU1FrFQ?showinfo=0&enablejsapi=1&origin=https://localhost:3000`]); // el input de búsqueda

    const infoApi = useSelector<TipadoState, TipadoState["infoApi"]>((state) => state.infoApi)
    const channelInfoApi = useSelector<TipadoState, TipadoState["channelInfoApi"]>((state) => state.channelInfoApi)
    const listVideo = useSelector<TipadoState, TipadoState["listVideo"]>((state) => state.listVideo)

    // console.log('la info que llega al componente ', infoApi)
    let fiveImage = "https://www.pngmart.com/files/14/5-Number-PNG-Background-Image.png";
    const getVideos = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (search) {
            console.log('llamo a la pai con una búsqueda ', search)
            setMemoSearch(search);
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


    const addVideoList = (v: any) => {
        console.log(v, 'el id del vídeo que llega')

        let newObjectVideo: object = {
            index: listVideo.length,
            info: {
                videoId: v.id.videoId,
                title: v.snippet.title,
                imageM: v.snippet.thumbnails.default.url
            }
        }

        console.log(newObjectVideo, ' el objeto creado para la play list');

        dispatch(addVideo(newObjectVideo))
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

    // Tal vez debería manejar esto con un estado global
    const playList = () => {
        console.log(listVideo, 'cuando pido la playlist');

        let playList: string[] = [];

        if (listVideo.length > 0) {
            playList = listVideo.map((v: any) => {
                return `https://www.youtube.com/watch?v=${v.info.videoId}?showinfo=0&enablejsapi=1&origin=https://localhost:3000`
            })
        }
        console.log(playList, 'como queda la playlist');
        if (listVideo.length > 0) {
            setVideoUrl(playList);
        }
    }




    return (
        <div>
            {/* <h3>La ventana del vídeo</h3> */}
            <div className={style.mainVideo}>
                {/* <ReactPlayer url={videoUrl}
                    controls={true} config={{ youtube: { playerVars: { 'rel': 0, 'showinfo': 0 } } }}
                /> */}
                {videoUrl ? <ReactPlayer url={videoUrl}
                    controls={true} config={{ youtube: { playerVars: { 'rel': 0, 'showinfo': 0 } } }}
                /> : null}
            </div>

            <h5>Url del vídeo {videoUrl ? JSON.stringify(videoUrl) : null}</h5>

            <div className={style.mainSearch}>
                <h4>Input de búsqueda</h4>
                <form action="formSearch">
                    <input type="search" value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={(e) => getVideos(e)}>Buscar</button>
                </form>
                <button onClick={() => playList()}>Reproducir lista</button>
            </div>

            <div className={style.mainResults}>
                <ul className={style.mainCardVideo}>
                    {infoApi.items && view === "videos" && <h2>Resultado relacionados a: {memoSearch} </h2>}
                    {infoApi.items && infoApi.items.length > 0 && view === "videos" ? infoApi.items.map((i: any) => {
                        return <li key={i.id.videoId} className={style.cardVideo}>
                            <CardVideo
                                image={i.snippet.thumbnails.medium.url}
                                title={i.snippet.title}
                                description={i.snippet.description}
                                channelId={i.snippet.channelId}
                                videoId={i.id.videoId}
                                channelTitle={i.snippet.channelTitle}
                                getUrlVideo={() => getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                                getChannel={() => getChannelId(i.snippet.channelId, "channelVideos")}
                                addVideoList={() => addVideoList(i)}
                            />
                        </li>
                    }) : null}
                    {infoApi.items && infoApi.items.length > 0 && view === "videos" ? (
                        <li key="next" className={style.cardVideo5}>
                            <div className={style.boxImage5}>
                                <img src={fiveImage} className={style.imageCardVideo5}
                                    alt={"five"}></img>
                            </div>
                            <strong>{""}</strong><br />
                            <button>Prev</button>
                            <button>Next</button>
                        </li>) : null}

                    {channelInfoApi.items && channelInfoApi.items.length > 0 && view === "channelVideos" ? <h2>Channel Title: {channelInfoApi.items[0].snippet.channelTitle}</h2> : null}
                    {channelInfoApi.items && channelInfoApi.items.length > 0 && view === "channelVideos" ? channelInfoApi.items.map((i: any) => {
                        return <li key={i.id.videoId} className={style.cardVideo}>
                            <CardVideoChannel
                                image={i.snippet.thumbnails.medium.url}
                                title={i.snippet.title}
                                description={i.snippet.description}
                                channelId={i.snippet.channelId}
                                videoId={i.id.videoId}
                                channelTitle={i.snippet.channelTitle}
                                getUrlVideo={() => getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                                goBack={() => goBack("videos")}
                                addVideoList={() => addVideoList(i)}
                            />
                        </li>
                    }) : null}
                    {channelInfoApi.items && channelInfoApi.items.length > 0 && view === "channelVideos" ? (
                        <li key="next" className={style.cardVideo5}>
                            <div className={style.boxImage5}>
                                <img src={fiveImage} className={style.imageCardVideo5}
                                    alt={"five"}></img>
                            </div>
                            <strong>{""}</strong><br />
                            <button>Prev</button>
                            <button>Next</button>
                        </li>) : null}
                </ul>
            </div>
        </div>
    )
}

export default MainVideo;