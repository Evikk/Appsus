import { OptionsBar } from "./OptionsBar.jsx";

export function NoteVideo({note,onEdit}){

    
        return(
            <div className={`note ${note.type}`}style={{backgroundColor:note.style.backgroundColor}}>
            <i className="fa fa-youtube"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <iframe src={note.info.src} width="270px" height="185px"allowFullScreen></iframe>
            <OptionsBar note={note} onEdit={onEdit}/>
        </div>
        )
    
    }