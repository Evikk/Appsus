export function NoteImg({ note }) {

    return (
        <div className={`note ${note.type}`}>
            <i className="fa fa-image"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <div className="img-container">
            <img src={note.info.url}/>
            </div>
        </div>
    )

}