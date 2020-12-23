export function NoteVideo({note}){

    
        return(
            <div className={`note ${note.type}`}>
            <i className="fab fa-youtube"></i>
            {note.label && <h3>note.label</h3>}
            <iframe src={note.info.src} width="250px" height="180px"allowFullScreen></iframe>
        </div>
        )
    
    }