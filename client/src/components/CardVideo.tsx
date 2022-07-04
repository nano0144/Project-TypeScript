

interface ICardVideoProps {
    image: string,
    title: string,
    description: string,
    channelId: string,
    videoId: string,
    channelTitle: string,
    getUrlVideo: any,
    getChannel: any,
    addNewNote: any,
};


const CardVideo: React.FC<ICardVideoProps> = (props) => {
    // console.log(props, 'las props que llegan a la card')
    return (
        <div key={props.videoId}>
            <img src={props.image}
                alt={props.title}></img> <br />
            <strong>{props.title}</strong><br />
            <p>{props.description}</p>
            <p>Id del canal: {props.channelId}</p>
            <button onClick={() => props.getUrlVideo(props.videoId, props.channelTitle)}
            >Reproducir</button>
            <button onClick={() => props.getChannel(props.channelId, "channelVideos")}
            >Get - Ver Channel</button>
            <button onClick={() => props.addNewNote(props.videoId)}
            >Agregar video</button>
        </div>
    )
}


export default CardVideo;