import { useDispatch, useSelector } from "react-redux";
// import { TipadoState } from "../src/interface/interface";
import NewNoteInput from "./components/NewNoteInput";
import TestComponent from "./components/TestComponenet";
import { addNote } from './redux/actions';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // para poder rutear


export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {

  // const notes = useSelector<TipadoState, TipadoState["notes"]>((state) => state.notes)
  const dispatch = useDispatch();

  const onAddNote = (note: string) => {
    dispatch(addNote(note))
  }

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewNoteInput addNote={onAddNote} />}/>
          <Route path="/videos" element={<TestComponent/> } />
        </Routes>        
      </BrowserRouter>     
    </>
  );
}

export default App;
