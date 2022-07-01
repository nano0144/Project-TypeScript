import { useDispatch } from "react-redux";
import NewNoteInput from "./components/NewNoteInput";
import TestComponent from "./components/TestComponenet";
import { addNote } from './redux/actions';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // para poder rutear
import ChannelDetail from "./components/ChannelDetail";


export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  
  const dispatch = useDispatch();

  const onAddNote = (note: string) => {
    dispatch(addNote(note))
  }

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<NewNoteInput addNote={onAddNote} />}/>
          <Route path="/" element={<TestComponent/> } />
          <Route path="/channel/:channelId" element={<ChannelDetail/>} />
        </Routes>        
      </BrowserRouter>     
    </>
  );
}

export default App;
