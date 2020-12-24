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
        keepService.query().then(notes => {
            this.setState({ notes }, () => console.log(this.state))
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
        this.setState({ edit:editCopy })
    }

    render() {
        if (!this.state.notes) return <div>Loading..</div>
        return (
            <section className="keep-app">
                <NoteCreate onAddNote={this.onAddNote} />
                <NoteList notes={this.state.notes} onEdit={this.onEdit} />
                {this.state.edit.note&&<NoteEdit edit={this.state.edit} />}
            </section>
        )
    }
}