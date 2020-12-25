import { utilService } from "../../../services/utilService.js"
import { keepService } from "../services/keep-service.js"
import { OptionsBar } from "./OptionsBar.jsx"

export class NoteTodos extends React.Component {

    state = {
        isDone: false
    }

    setMark = (note,idx) => {
        keepService.setTodoMark(note,idx).then(()=>{
            this.setState({ isDone:!this.state.isDone })
        })
    }

    render() {
        const isDone = this.state
        const { note, onEdit} = this.props
        console.log(note);
        return (
            <div className={`note ${note.type}`} style={{ backgroundColor: note.style.backgroundColor }}>
                <i className="fa fa-list-ul"></i>
                {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
                {note.info.todos.map((todo,idx) => {
                    return <li onClick={() =>{this.setMark(note,idx)}} className={todo.isDone ? 'mark' : ''} key={utilService.makeId()}>{todo.txt}</li>
                })}

                <OptionsBar note={note} onEdit={onEdit} />
            </div>
        )

    }

}
