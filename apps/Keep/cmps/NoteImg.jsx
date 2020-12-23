export function NoteImg({ note }) {

    return (
        <div className={`note ${note.type}`}>
            <i className="fa fa-image"></i>
            {note.label && <h3>note.label</h3>}
            <div className="img-container">
            <img src={note.info.url}/>
            </div>
        </div>
    )

}