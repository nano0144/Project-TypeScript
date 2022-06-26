import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../redux/actions";


export const TestComponent = () => {
    const dispatch = useDispatch()

    // const [note, setNote] = useState(""); // Luego veo si lo uso para 
    // el input de búsqueda

    //const info = useSelector<InfoState, InfoState["ingo"]>((state)=> state.info)
    
    const info = ["un elemento"];
    /*
    0. creo la acción,
    1. disparo la acción,
    2. cargo el estado global,
    3. consumo el estado global,
    4. mapeo y renderizo
    */
    const getVideos = () => {
        //dispatch(getInfo());

        console.log('llamo a la pai para los vídeos')

    }


    return (
        <div>
            <button onClick={getVideos}>Llamar a la API</button>
            <ul>
                {info.map((note: string) => {
                    return <p key={note}>{note}</p>
                })}           

            </ul>
        </div>
    )
}