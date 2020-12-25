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
        if (action === 'openedit') this.setState({ opanEditModal: !this.state.opanEditModal });
        else keepService.updateNote(note, action).then(()=>{
            this.props.setChanges()
        })
    }


    render() {

        return (
            <section>




            </section>

        )

    }

}