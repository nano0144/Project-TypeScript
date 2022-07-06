import style from "./style/style.module.css";
import { useState } from "react"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TipadoState } from "../interface/interface";
import { updateList } from "../redux/actions";
import { useDispatch } from "react-redux";

interface IRigthListProps {
}

interface IInfo {
    videoId: string,
    title: string,
    imageM: string
}

interface IObjectVideo {
    index: number,
    info: IInfo
}

interface IObjectVideoInfo {
    info: IInfo
}


const RigthList: React.FC<IRigthListProps> = (props) => {
    const [videoList, setVideoList] = useState<IObjectVideo[]>([{ index: 0, info: {videoId: "", title: "", imageM: ""}}])
    const [newVideo, setNewVideo] = useState<IObjectVideo>({ index: 0, info: {videoId: "", title: "", imageM: ""}});
    const [transport, setTransport] = useState<IObjectVideo>({ index: 0, info: {videoId: "", title: "", imageM: ""}});

    const listVideo = useSelector<TipadoState, TipadoState["listVideo"]>((state) => state.listVideo);
    const dispatch = useDispatch();

    useEffect(()=>{
        setVideoList(listVideo);

    },[listVideo])



    // const addVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if (newVideo.index === videoList.length) {
    //         return setVideoList([...videoList.concat(newVideo)]);
    //     }         
    //     setNewVideo({...newVideo, index: videoList.length });
    // }

    const onDrag = (index: number, info: IInfo) => {
        // console.log("sale el drag");
        // value se toma del elemento al cual se arrastra
        // console.log(index, info, 'lo que sale'); // ejemplo --> "1"
        setTransport({index: Number(index), info: info});
    }


    const onDrop = (value: number) => {
        // console.log(transport, 'se transporta'); // "1", info
        // console.log(value, 'recibido'); // "2"

        let oldIndex: number = transport.index;

        let newIndex: number = Number(value);
        let data: IInfo = transport.info; // Guarda la copia info que se mueve

        let newStateInfo : IObjectVideoInfo[] = videoList.map((d:IObjectVideo)=>{
            return {info: d.info} });

        newStateInfo.splice(newIndex, 0, {info: transport.info});

        if (newIndex > oldIndex) {
            newStateInfo.splice(oldIndex, 1);
        } else {
            newStateInfo.splice((oldIndex + 1), 1);
        }
        console.log(newStateInfo, 'el nuevo estado uno')

        let newState: IObjectVideo[] = [];

        for (var i = 0 ; i < newStateInfo.length ; i++) {

            let element = {
                index: videoList[i].index,
                info: newStateInfo[i].info
            }
            newState.push(element);
        }
        setVideoList(newState);
        // console.log(newState, 'el nuevo estado dos')
        dispatch(updateList(newState))
    }

    // const onChangeNewVideo = (value: string) => {
    //     setNewVideo({ index: videoList.length, info: {videoId: "", title: value, imageM: ""} })
    // }

    const removeItem = (value:number) => {
        let newState = [...videoList];
        newState.splice(value, 1);
        // Voy a recorrer para reasignar valores a los ìndices
        // para que siga funcionando todo

        for (let i = value ; i < newState.length ; i++) {
            newState[i].index = i ;
        }
        setVideoList(newState);
        // console.log(newState, value, ' el nuúmero que me llega');
        dispatch(updateList(newState))
    }



    return (
        <div>
            <h2>Playlist</h2>
            {/* <form>
                <input type="text" value={newVideo.info.title}
                    onChange={(e) => onChangeNewVideo(e.target.value)} />

                <button onClick={(e) => addVideo(e)}>Agregar Video</button>
            </form> */}
            <div className={style.listBox}>
                <ul>
                    {videoList.map((video: IObjectVideo) => {
                        return <li className={style.listItem} draggable="true"
                            key={video.index}
                            value={video.info.title}
                            onDragOver={(e) => e.preventDefault()}
                            onDragStart={() => onDrag(video.index, video.info)}
                            onDrop={() => onDrop(video.index)}
                        >   {video.info.title} <br/>
                        <button onClick={()=>removeItem(video.index)}
                        >x</button>
                        <img src={video.info.imageM} alt={video.info.title} />
                        </li>
                    })}
                </ul>
            </div>
            {videoList ? JSON.stringify(videoList) : null}
            <p></p>
            {newVideo ? JSON.stringify(newVideo) : null}

        </div>
    )
}

export default RigthList;