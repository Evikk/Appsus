import { keepService } from "../services/keep-service.js"

export class NoteEdit extends React.Component {

    // state = {
    //     edit: null
    // }

    componentDidMount() {
        this.updateEdit()
    }

    updateEdit = () => {
        const { note, action } = this.props.edit
        switch (action) {
            case 'pin':
                note.isPinned = !currEdit.note.isPinned
                break;
            case 'clone':
                keepService.cloneNote(note.id)
                break;
            case 'openedit':
                this.setState({ opanEditModal });
            case 'delete':
                keepService.deleteNote(note.id)
                break;
            default:
                note.style.backgroundColor = action
        }

        this.props.setChanges()
    }


    render() {

        return (
            <section>




            </section>

        )

    }

}