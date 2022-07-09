import style from "./style/style.module.css";

interface ICardVideoProps {
    image: string,
    title: string,
    description: string,
    channelId: string,
    videoId: string,
    channelTitle: string,
    getUrlVideo: any,
    getChannel: any,
    addVideoList: any,
};


const CardVideo: React.FC<ICardVideoProps> = (props) => {
    // console.log(props, 'las props que llegan a la card')
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
            >Play</button>
            <button onClick={() => props.getChannel(props.channelId, "channelVideos")}
            >Channel</button>
            <button onClick={() => props.addVideoList(props.videoId)}
            >Add Video</button>
        </div>
    )
}


export default CardVideo;