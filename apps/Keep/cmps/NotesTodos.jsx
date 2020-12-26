import { eventBusService } from "../../../services/eventBusService.js"
import { utilService } from "../../../services/utilService.js"
import { keepService } from "../services/keep-service.js"
import { OptionsBar } from "./OptionsBar.jsx"

export class NoteTodos extends React.Component {

    state = {
        
    }

    componentDidMount() {

    }


    render() {
        const { note, onEdit, setMark } = this.props

        return (
            <div className={`note ${note.type}`} style={{ backgroundColor: note.style.backgroundColor }}>
                <i className="fa fa-list-ul"></i>
                {note.info.label && <h5 className="note-label">{note.info.label}</h5>}
                {note.info.todos.map((todo, idx) => {
                    return <li onClick={() => {
                        eventBusService.emit('markTodo', { note, idx })
                    }} className={todo.isDone ? 'mark' : ''} key={utilService.makeId()}>{todo.txt}</li>
                })}

                <OptionsBar note={note} onEdit={onEdit} />
            </div>
        )

    }

}
