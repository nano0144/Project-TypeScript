import { useState } from "react"
import style from "./style/style.module.css";

interface IRigthListProps {
    // addNote(note: string): void;
}
interface IObjectVideo {
    index: number,
    info: string
}
interface IObjectVideoInfo {
    info: string
}

const RigthList: React.FC<IRigthListProps> = (props) => {
    const [videoList, setVideoList] = useState<IObjectVideo[]>([{ index: 0, info: "data video 0" }, { index: 1, info: "data video 1" }])
    const [newVideo, setNewVideo] = useState<IObjectVideo>({ index: 2, info: "data video 2" });
    const [transport, setTransport] = useState<IObjectVideo>({ index: 2, info: "data video 2" });

    const addVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (newVideo.index === videoList.length) {
            return setVideoList([...videoList.concat(newVideo)]);
        } 
        
        setNewVideo({...newVideo, index: videoList.length });

    }

    const onDrag = (index: string, info: string) => {
        // console.log("sale el drag");
        // value se toma del elemento al cual se arrastra
        // console.log(index, info, 'lo que sale'); // ejemplo --> "1"
        setTransport({index: Number(index), info: info});

    }


    const onDrop = (value: string) => {
        // console.log(transport, 'se transporta'); // "1", info
        // console.log(value, 'recibido'); // "2"

        let oldIndex: number = transport.index;

        let newIndex: number = Number(value);
        let data: string = transport.info; // Guarda la copia info que se mueve

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
    }

    const onChangeNewVideo = (value: string) => {
        setNewVideo({ index: videoList.length, info: value })
    }

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
    }



    return (
        <div>
            RigthList
            <form>
                <input type="text" value={newVideo.info}
                    onChange={(e) => onChangeNewVideo(e.target.value)} />

                <button onClick={(e) => addVideo(e)}>Agregar Video</button>
            </form>
            <div className={style.listBox}>
                <ul>
                    {videoList.map((video: any) => {
                        return <li className={style.listItem} draggable="true"
                            key={video.index}
                            value={video.info}
                            onDragOver={(e) => e.preventDefault()}
                            onDragStart={() => onDrag(video.index, video.info)}
                            onDrop={() => onDrop(video.index)}
                        >   {video.info} <br/>
                        <button onClick={()=>removeItem(video.index)}
                        >x</button>
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