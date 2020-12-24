export function NoteVideo({note}){

    
        return(
            <div className={`note ${note.type}`}>
            <i className="fa fa-youtube"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <iframe src={note.info.src} width="270px" height="185px"allowFullScreen></iframe>
        </div>
        )
    
    }