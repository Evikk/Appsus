import { DynamCmp } from "./DynamCmp.jsx";

export function NoteList({ notes }) {
    return (
        <section className="notes-list">
            {notes.map(note => {
                return <DynamCmp  key={note.id} note={note}/>

                    })}
        </section>
    )

}