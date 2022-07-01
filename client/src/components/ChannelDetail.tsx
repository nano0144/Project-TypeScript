import { useDispatch, useSelector } from "react-redux";
import { getChannel } from "../redux/actions"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TipadoState } from "../interface/interface";

interface IChannelDetailProps {};


const ChannelDetail: React.FC<IChannelDetailProps> = (props) => {
    const dispatch = useDispatch();

    const channelInfoApi = useSelector<TipadoState, TipadoState["channelInfoApi"]>((state) => state.channelInfoApi)

    let { channelId } = useParams();

    console.log(channelId, 'el id del canal');

    useEffect(()=> {
        dispatch(getChannel(channelId))

    },[channelId])

    return (
        <div>
            
            {channelInfoApi.length > 0 ?
            <h3>Nombre del canal: {channelInfoApi[0].snippet.channelTitle}</h3>
             : null }

            <ul style={{listStyle: "none"}}>
                {channelInfoApi.length > 0 ? channelInfoApi.map((i: any) => {
                   return <li key={i.etag}>
                    <img key={i} src={i.snippet.thumbnails.high.url} 
                    alt={i.snippet.tittle}></img> <br/> 
                    <strong>{i.snippet.title}</strong><br/> 
                    <p>{i.snippet.description}</p>
                    <p>Id del canal: {i.snippet.channelId}</p>
                    {/* <button onClick={()=> getUrlVideo(i.id.videoId, i.snippet.channelTitle)}
                    >Get Video</button>
                 */}
                   
                   </li>
                }) : null}
            </ul>
        </div>
    )
}

export default ChannelDetail;
