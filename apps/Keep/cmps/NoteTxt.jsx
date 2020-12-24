export function NoteTxt({ note }) {


    return (
        <div className={`note ${note.type}`}>
            <i className="fa fa-font"></i>
            {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
            <p>{note.info.txt}</p>
            {/* <div className="options-bar">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div> */}
        </div>
    )

}