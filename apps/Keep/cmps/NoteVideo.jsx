export function NoteVideo({note}){

    
        return(
            <div className={`note ${note.type}`}>
            <i className="fa fa-youtube"></i>
            {note.label && <h3>note.label</h3>}
            <iframe src={note.info.src} width="270px" height="185px"allowFullScreen></iframe>
        </div>
        )
    
    }