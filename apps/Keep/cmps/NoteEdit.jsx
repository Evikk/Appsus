import { eventBusService } from "../../../services/eventBusService.js"
import { keepService } from "../services/keep-service.js"
import { NoteCreate } from "./NoteCreate.jsx"
import { OptionsBar } from "./OptionsBar.jsx"

export class NoteEdit extends React.Component {

    state = {
        openEditModal: false,
        note: null,
    }


    componentDidMount() {
        const { note, action } = this.props.edit
        this.setEdit(note, action)
    }
    componentDidUpdate(prevProps, prevState) {
        // if(prevState.openEditModal)
    }




    setEdit = (note, action) => {
        if (action === 'openedit') this.setState({ openEditModal: !this.state.openEditModal, note: note });
        else {
            keepService.updateNote(note, action).then(() => {
                this.props.setChanges()
            })
        }

    }

    render() {
        const { note, openEditModal } = this.state
        if (!note) return <div>Loading..</div>
        const{onAddNote,onAddTodos}=this.props
        return (

            openEditModal && <section className="edit-modal" style={{ backgroundColor: 'whitesmoke' }}>
                {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
                <div className="details">
                    {note.info.txt && <p>{note.info.txt}</p>}
                    {note.info.url && <img src={note.info.url} />}
                    {note.info.src && <iframe src={note.info.src} width="270px" height="185px" allowFullScreen></iframe>}
                    {note.info.todos && note.info.todos.map((todo, idx) => {
                        return <li onClick={() => {
                            eventBusService.emit('markTodo', { note, idx })
                        }} className={todo.isDone ? 'mark' : ''} key={idx}>{todo.txt}</li>
                    })}</div>
                <OptionsBar onEdit={this.setEdit} note={note} />
                <NoteCreate onAddNote={onAddNote} onAddTodos={onAddTodos} note={note}/>

            </section>
        )

    }

}