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
        this.setState({ note: note })
        if (action === 'openedit') this.toggleEditModal()
        else this.setEdit(note, action)
        // this.unsubscribe = eventBusService.on('openEditModal', ()=>{
        //     this.toggleEditModal()
        // })
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.state.openEditModal) this.props.setChanges()
    }

    toggleEditModal = () => {
        this.setState({ openEditModal: !this.state.openEditModal })
    }

    setEdit = (note, action) => {
        keepService.updateNote(note, action).then(() => {
            var keepOpen = (action === 'delete') ? false : true
            this.props.setChanges(keepOpen)
        })
    }


    render() {
        const { note, openEditModal } = this.state
        console.log(note);
        if (!note) return <div>Loading..</div>
        const openModalClass = openEditModal ? 'openEditModal' : ''
        const { onAddNote, onAddTodos } = this.props
        return (
            <section className={`edit-modal ${openModalClass}`} style={{ backgroundColor: note.style.backgroundColor }}>
                <button className="close-btn" onClick={this.toggleEditModal}>X</button>
                {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
                <div className="details">
                    {note.type === 'txt' && <p>{note.info.value}</p>}
                    {note.type === 'img' && <img src={note.info.value} />}
                    {note.type === 'video' && <iframe src={note.info.value} width="270px" height="185px" allowFullScreen></iframe>}
                    {note.type === 'todos' && note.info.value.map((todo, idx) => {
                        return <li onClick={() => {
                            eventBusService.emit('markTodo', { note, idx })
                        }} className={todo.isDone ? 'mark' : ''} key={idx}>{todo.txt}</li>
                    })}</div>
                <OptionsBar onEdit={this.setEdit} note={note} />
                <NoteCreate onAddNote={onAddNote} onAddTodos={onAddTodos} note={note} closeModal={this.toggleEditModal} />
            </section>
        )

    }

}