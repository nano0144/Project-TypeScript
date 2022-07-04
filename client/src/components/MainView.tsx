import MainVideo from "./MainVideo";
import VideoList from "./VideoList";
import { addNote } from '../redux/actions';
import { useDispatch } from "react-redux";

interface IMainViewProps { };


const MainView: React.FC<IMainViewProps> = (props) => {
    const dispatch = useDispatch();

    const onAddNote = (note: string) => {
        dispatch(addNote(note))
    }


    return (
        <div>
            <h3>Main View</h3>
            <div className="main-video">
                <MainVideo />
            </div>
            <h3>Lista de videos</h3>
            <div className="list-video">
                {/* <VideoList addNote={onAddNote} /> */}
                <VideoList />
            </div>

        </div>

    )

}

export default MainView;