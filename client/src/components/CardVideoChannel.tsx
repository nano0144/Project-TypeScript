
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
            <img src={props.image}
                alt={props.title}></img> <br />
            <strong>{props.title}</strong><br />
            <p>{props.description}</p>
            <p>Id del canal: {props.channelId}</p>
            <button onClick={() => props.getUrlVideo(props.videoId, props.channelTitle)}
            >Reproducir</button>
            <button onClick={() => props.goBack("videos")}>Volver</button>
            <button onClick={() => props.addVideoList(props.videoId)}
            >Agregar video</button>
        </div>
    )
}

export default CardVideoChannel;
