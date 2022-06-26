import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../redux/actions";
import { TipadoState } from "../interface/interface";
import { useState } from "react";

export const TestComponent = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState<string>(""); // Luego veo si lo uso para 
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
        
        
        // console.log('llamo a la pai para los vídeos')

    }


    return (
        <div>
            <form action="formSearch">
                <input type="search" value={search}
                onChange={(e)=> setSearch(e.target.value)} />
                <button onClick={(e)=> getVideos(e)}>Llamar a la API</button>
            </form>
            <ul>
                {infoApi.length > 0 ? infoApi.map((i: any) => {
                   return <li key={i.etag}>{i.snippet.title}
                   <img key={i} src={i.snippet.thumbnails.high.url} 
                   alt={i.snippet.tittle}></img>
                   </li>
                }) : null}

                {/* {infoApi.length >0 ? infoApi.map((i: any) => {
                   return <img key={i} src={i.snippet.thumbnails.high.url} 
                   alt={i.snippet.tittle}></img>

                 
                }) : null} */}
                

            </ul>
        </div>
    )
}