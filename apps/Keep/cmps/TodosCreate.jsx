
export class TodosCreate extends React.Component {
    state = {
        todos: [{ txt: '', isDone: false }],
        label: '',
        id: ''
    }

//     componentDidMount() {
// this.isEdit()
//     }

    handleTodosLine = (val, idx) => {
        const line = { txt: '', isDone: false }
        const todosCopy = this.state.todos
        if (val === '+') todosCopy.push(line)
        else {
            todosCopy.splice(idx, 1)
            if (!todosCopy.length) this.props.toggleTodosModal()
        }
        this.setState({ todos: todosCopy })
    }

    handleChange = (value, idx) => {
        const todosCopy = [...this.state.todos]
        todosCopy[idx].txt = value
        this.setState({ todos: todosCopy })
    }

    onChangeLabel = (ev) => {
        this.setState({ label: ev.target.value })
    }

//     isEdit=()=>{
//         if (this.props.note) {
//             const { note } = this.props
//         this.setState({id: note.id })
    
//     }
//     else return 
// }

render() {
    return (
        <div className={`todos-modal ${this.props.toggleStatus ? 'open-modal' : ''}`}>
            <button className="close-btn" onClick={() => {
                this.setState({
                    todos: [{ txt: '', isDone: false }],
                    label: ''
                })
                this.props.toggleTodosModal()
            }}>X</button>
            <input type="text" placeholder="Label your todos.." value={this.state.label} onChange={this.onChangeLabel} name="label" />
            {this.state.todos.map((todo, idx) => {
                return <div className="todoLine" key={idx}>
                    <input type="text" placeholder="Enter your todo.." onChange={(ev) => {
                        const { value } = ev.target
                        this.handleChange(value, idx)
                    }} value={todo.txt} />
                    <button onClick={() => this.handleTodosLine('+')}>+</button>
                    <button onClick={() => this.handleTodosLine('-', idx)}>-</button></div>
            })}
            <button onClick={() => {
                this.props.toggleTodosModal()
                this.props.onAddTodos(this.state)
                this.setState({
                    todos: [{ txt: '', isDone: false }],
                    label: ''
                })
            }}>Add</button>
        </div>
    )
}

}
