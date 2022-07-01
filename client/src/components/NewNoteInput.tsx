import { ChangeEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TipadoState } from "../../src/interface/interface";


interface NewNoteInputProps {
    addNote(note: string): void;
}

const NewNoteInput: React.FC<NewNoteInputProps> = ({ addNote }) => {
    const [note, setNote] = useState("");

    const notes = useSelector<TipadoState, TipadoState["notes"]>((state) => state.notes)

    const updateNote = (event: ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
    }

    const onAddNoteClick = () => {
        addNote(note);
        setNote("");
    }

    return (
        <div>
            <h3>Agrega cosas a la lista</h3>
            <p>Este input es manejado con un estado local de React y cada valor se
                carga en el estado global de Redux, el flujo es el mismo pero puede
                haber algún detalle diferente.
            </p>
            <div>
                <input value={note} type="text" name="note"
                    placeholder="Note" onChange={updateNote} />
                <button onClick={onAddNoteClick} >Add note</button>
            </div>
            <div>
                <hr />
                <ul>
                    {notes.map((note: string) => {
                        return <li key={note}>{note}</li>
                    })}

                </ul>
            </div>
            


        </div>
    )
}

export default NewNoteInput;