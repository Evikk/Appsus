
export class NoteCreate extends React.Component {
    state = {
        currNote: {
            type: 'txt',
            inputValue: '',
            label:''
        },
        placeholder: 'What\'s on your mind..',
        showFileInput: false
        // showColors:false
    }

    componentDidMount() {

    }

    setNoteType = (type) => {
        var placeholder = ''
        switch (type) {
            case 'txt':
                placeholder = 'What\'s on your mind..'
                break;
            case 'img':
                placeholder = 'Enter img url..'
                this.setState({ showFileInput: !this.state.showFileInput })
                break;
            case 'video':
                placeholder = 'Enter video url..'
                break;
            case 'todos':
                placeholder = 'todos..'
                break;

        }
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy.type = type
        this.setState({
            currNote: currNoteCopy,
            placeholder
        })

    }

    handleChange = (ev) => {
        const { value } = ev.target
        const currNoteCopy = { ...this.state.currNote }
        currNoteCopy[ev.target.name] = value
        this.setState({ currNote: currNoteCopy },console.log(this.state))
    }

    onAddNote = () => {
        this.props.onAddNote(this.state.currNote)
        this.setState({placeholder:'What\'s on your mind..'})
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
            this.onAddNote()
        }
        reader.readAsDataURL(ev.target.files[0]);
    }


    render() {
        return (
            <section className="note-create">
                <div className="notes-input">
                    <input type="text" placeholder="Label your note.." onChange={this.handleChange} name="label"/>
                    <textarea name="inputValue" cols="30" rows="2" placeholder={this.state.placeholder} onChange={this.handleChange}></textarea>
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