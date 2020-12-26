import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { keepService } from '../services/keep-service.js'
import { eventBusService } from '../../../services/eventBusService.js'
import { UserMsg } from "../../../cmps/UserMsg.jsx"


export class KeepApp extends React.Component {
    state = {
        notes: null,
        edit: {
            action: '',
            note: null
        }
    }

    componentDidMount() {
        this.loadNotes()
        this.unsubscribe = eventBusService.on('markTodo', (lineToMark) => {
            keepService.setTodoMark(lineToMark)
            this.loadNotes()
        })

    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    loadNotes = () => {
        let notesCopy = { ...this.state.notes }
        keepService.query().then(notes => {
            notesCopy = notes
            this.setState({ notes: notesCopy })
        })
    }


    onAddNote = (noteToAdd) => {
        console.log(noteToAdd);

        keepService.addNote(noteToAdd).then(() => {
            this.loadNotes()
            eventBusService.emit('show-msg','Your Note Is Added!')
        })
    }
    onAddTodos = (todosToAdd) => {
        var todos = {
            inputValue: todosToAdd.todosLines,
            type: 'todos',
            label: todosToAdd.label,
            id: (todosToAdd.id) ? todosToAdd.id : ''
        }
        keepService.addNote(todos).then(() => {
            this.loadNotes()
            eventBusService.emit('show-msg','Your Note Is Added!')
        })
    }
    
    onEdit = (note, action) => {
        const editCopy = { ...this.state.edit }
        editCopy.action = action
        editCopy.note = note
        this.setState({ edit: editCopy })
    }
    
    setChanges = (isModalOpen) => {
        this.loadNotes()
        if (!isModalOpen) {
            const editCopy = { ...this.state.edit }
            editCopy.note = null
            this.setState({ edit: editCopy })
            eventBusService.emit('show-msg','Your Note Is Deleted!')
        }
        eventBusService.emit('show-msg','Your Note Edited!')
    }

    render() {
        if (!this.state.notes) return <div>Loading..</div>
        const pinnedNotes = this.state.notes.filter(note => note.isPinned)
        const notes = this.state.notes.filter(note => !note.isPinned)
        return (

            <section className="keep-app">
                <section className="closeEditModal"></section>
                <NoteCreate onAddNote={this.onAddNote} onAddTodos={this.onAddTodos} />
                <NoteList notes={pinnedNotes} onEdit={this.onEdit} />
                <hr />
                <NoteList notes={notes} onEdit={this.onEdit} />
                {this.state.edit.note && <NoteEdit edit={this.state.edit} setChanges={this.setChanges} onEdit={this.onEdit} onAddNote={this.onAddNote} onAddTodos={this.onAddTodos} />}
                <UserMsg />
            </section>
        )
    }
}