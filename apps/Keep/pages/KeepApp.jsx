import { NoteCreate } from "../cmps/NoteCreate.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { keepService } from '../services/keep-service.js'

export class KeepApp extends React.Component {
    state = {
        notes: null,
    }

    componentDidMount() {
        this.loadNotes()

    }

    loadNotes = () => {
        keepService.query().then(notes => {
            this.setState({ notes },()=>console.log(this.state))
        })
    }

    onAddNote = (noteToAdd) => {
        keepService.addNote(noteToAdd)
        this.loadNotes()

    }

    render() {
        if (!this.state.notes) return <div>Loading..</div>
        return (
            <section>
                <NoteCreate onAddNote={this.onAddNote} />
                <NoteList notes={this.state.notes} />
            </section>
        )
    }
}