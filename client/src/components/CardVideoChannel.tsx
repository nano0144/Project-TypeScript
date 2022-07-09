import style from "./style/style.module.css";

interface ICardVideoChannelProps {
    image: string,
    title: string,
    description: string,
    channelId: string,
    videoId: string,
    channelTitle: string,
    getUrlVideo: any,
    goBack: any,
    addVideoList: any,

};


const CardVideoChannel: React.FC<ICardVideoChannelProps> = (props) => {


    return (
        <div key={props.videoId}>
            <div className={style.boxImage}>
                <img src={props.image} className={style.imageCardVideo}
                    alt={props.title}></img>
            </div>
            <div>
                <p className={style.videoDescription}><strong>{props.title}</strong></p>
            </div>
            <p style={{ display: "none" }}>{props.description}</p>
            <p style={{ display: "none" }}>Id del canal: {props.channelId}</p>
            <button onClick={() => props.getUrlVideo(props.videoId, props.channelTitle)}
            >Reproducir</button>
            <button onClick={() => props.goBack("videos")}>Volver</button>
            <button onClick={() => props.addVideoList(props.videoId)}
            >Agregar video</button>
        </div>
    )
}

export default CardVideoChannel;
