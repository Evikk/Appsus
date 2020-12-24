
import { OptionsBar } from "./OptionsBar.jsx";

export function NoteTxt({ note,onEdit }) {


    return (
        <div className={`note ${note.type}`} style={{backgroundColor:note.style.backgroundColor}}>
            <i className="fa fa-font"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <p>{note.info.txt}</p>
            <OptionsBar note={note} onEdit={onEdit}/>
        </div>
    )

}