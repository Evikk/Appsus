
import { TodosCreate } from "./TodosCreate.jsx";

export class NoteCreate extends React.Component {
    state = {
        currNote: {
            type: 'txt',
            inputValue: '',
            label: '',
            id: ''
        },
        noteToUpdate: null,
        placeholder: 'What\'s on your mind..',
        showFileInput: false,
        openTodosModal: false
    }
    // componentDidMount() {
    //     this.isEdit()
    // }



    setNoteType = (type) => {
        var placeholder = ''
        switch (type) {
            case 'txt':
                placeholder = 'What\'s on your mind..'
                break;
            case 'img':
                placeholder = 'Enter img url..'
                break;
            case 'video':
                placeholder = 'Enter video url..'
                break;
            case 'todos':
                placeholder = 'todos..'
                this.toggleTodosModal()
                break;
        }
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.type = type
        currNoteCopy.inputValue = ''
        // currNoteCopy.id=(this.props.note.id)?this.props.note.id:''
        this.setState({
            currNote: currNoteCopy,
            placeholder,
            showFileInput: (type === 'img') ? !this.state.showFileInput : false
        })
    }

    handleChange = (ev) => {
        const currNoteCopy = { ...this.state.currNote }
        var { value } = ev.target
        if (this.state.currNote.type === 'video') value = value.replace('watch?v=', 'embed/')
        currNoteCopy[ev.target.name] = value
        this.setState({ currNote: currNoteCopy })
    }

    onAddNote = () => {
        const { type, inputValue } = this.state.currNote
        if (!inputValue) return
        if ((type === 'video' || type === 'img') && !inputValue.includes('.com')) {
            const currNoteCopy = { ...this.state.currNote }
            currNoteCopy.inputValue = 'PLEASE ENTER VALID URL'
            this.setState({ currNote: currNoteCopy })
            return
        }
        this.props.onAddNote(this.state.currNote)
        this.clearInputs()
    }

    clearInputs = () => {
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.inputValue = ''
        currNoteCopy.type = 'txt'
        currNoteCopy.label = ''
        this.setState({ currNote: currNoteCopy, placeholder: 'What\'s on your mind..' })
    }

    onImgInput = (ev) => {
        this.loadImageFromInput(ev)
    }
    loadImageFromInput = (ev) => {
        var reader = new FileReader();
        reader.onload = (ev) => {
            const currNoteCopy = { ...this.state.currNote }
            currNoteCopy.inputValue = ev.target.result
            this.setState({ currNote: currNoteCopy, showFileInput: !this.state.showFileInput })
            // this.onAddNote()
            this.props.onAddNote(this.state.currNote)
            this.clearInputs()

        }
        reader.readAsDataURL(ev.target.files[0]);
    }

    toggleTodosModal = () => {
        this.setState({ openTodosModal: !this.state.openTodosModal })
        this.clearInputs()
    }

    // isEdit=()=>{
        
    //     if (this.props.note) {
    //         const {  note } = this.props
    //         const currNoteCopy = { ...this.state.currNote }
    //         currNoteCopy.id=note.id
    //         this.setState({currNote:currNoteCopy })
    //         // return note.info.todos
    //     }
    //     else return 
    // }


    render() {
        return (
            <section className="note-create">
                <TodosCreate note={this.props.note} toggleTodosModal={this.toggleTodosModal} toggleStatus={this.state.openTodosModal} onAddTodos={this.props.onAddTodos} />
                <div className="notes-input">
                    <input type="text" placeholder="Label your note.." onChange={this.handleChange} name="label" value={this.state.currNote.label} />
                    <textarea name="inputValue" cols="30" rows="2" value={this.state.currNote.inputValue} placeholder={this.state.placeholder} onChange={this.handleChange}></textarea>
                    {this.state.showFileInput && <input className="file-input" type="file" name="image" onChange={this.onImgInput} />}
                    {/* <label><i className='fas fa-palette'>{this.state.showColors&&<input type="color"/>}</i></label> */}
                </div>
                <div className="icons">
                    <i className="fa fa-font" onClick={() => this.setNoteType('txt')}></i>
                    <i className="fa fa-image" onClick={() => this.setNoteType('img')}></i>
                    <i className="fa fa-youtube" onClick={() => this.setNoteType('video')}></i>
                    <i className="fa fa-list-ul" onClick={() => this.setNoteType('todos')}></i>
                    <i className="fa fa-plus" onClick={() => this.onAddNote()}></i>
                </div>
            </section>
        )
    }
}