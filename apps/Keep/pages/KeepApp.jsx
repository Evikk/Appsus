import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { keepService } from '../services/keep-service.js'

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

    }

    loadNotes = () => {
        let notesCopy = this.state.notes
        keepService.query().then(notes => {
            notesCopy = notes
            this.setState({ notes: notesCopy })
        })
    }

    onAddNote = (noteToAdd) => {
        keepService.addNote(noteToAdd)
        this.loadNotes()

    }

    onEdit = (note, action) => {
        const editCopy = { ...this.state.edit }
        editCopy.action = action
        editCopy.note = note
        this.setState({ edit: editCopy })
    }

    setChanges = () => {
        const editCopy = { ...this.state.edit }
        editCopy.note = null
        this.setState({ edit: editCopy })
        this.loadNotes()
    }

    render() {
        if (!this.state.notes) return <div>Loading..</div>
        return (
            <section className="keep-app">
                <NoteCreate onAddNote={this.onAddNote} />
                <NoteList notes={this.state.notes} onEdit={this.onEdit} />
                {this.state.edit.note && <NoteEdit edit={this.state.edit} setChanges={this.setChanges} />}
            </section>
        )
    }
}