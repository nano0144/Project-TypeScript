import { useDispatch, useSelector } from "react-redux";
import { NotesState } from "../src/interface/interface";
import { NewNoteInput } from "./components/NewNoteInput";
import { TestComponent } from "./components/TestComponenet";
import { addNote } from './redux/actions';


function App() {
  const notes = useSelector<NotesState, NotesState["notes"]>((state)=> state.notes)
  const dispatch = useDispatch();

  const onAddNote = (note:string) => {
    dispatch(addNote(note))
  }

  return (
    <>
      <h3>Agrega cosas a la lista</h3>
      <p>Este input es manejado con un estado local de React y cada valor se
        carga en el estado global de Redux, el flujo es el mismo pero puede 
        haber algún detalle diferente.
      </p>
      <NewNoteInput addNote={onAddNote}/>
      <hr />
      <ul>
        {notes.map((note:string) => {
          return <li key={note}>{note}</li>
        })}
        
      </ul>
      <h3>Trato de consumir la api y renderizar</h3>
      <TestComponent/>
    </>
  );
}

export default App;
