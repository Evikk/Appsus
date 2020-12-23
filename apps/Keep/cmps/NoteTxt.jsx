export function NoteTxt({ note }) {


    return (
        <div className={`note ${note.type}`}>
            <i className="fa fa-font"></i>
            {note.label && <h3>note.label</h3>}
            {/* <blockquote contentEditable="true"> */}
            <p>{note.info.txt}</p>
            {/* </blockquote> */}
        </div>
    )

}