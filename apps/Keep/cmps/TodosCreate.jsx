
export class TodosCreate extends React.Component {
    state = {
        todos: {
            todosLines: [{ txt: '', isDone: false }],
            label: '',
            id: ''
        }
    }

    componentDidMount() {
        if (this.props.note) {
            const { note } = this.props
            if (note.type !== 'todos') return
            console.log('hi');
            const todosCopy = { ...this.state.todos }
            todosCopy.todosLines = note.info.value
            todosCopy.label = note.info.label
            todosCopy.id = note.id
            this.setState({ todos: todosCopy }, () => console.log(this.state))
        }
    }


    handleTodosLine = (val, idx) => {
        const line = { txt: '', isDone: false }
        const todosCopy = { ...this.state.todos }
        if (val === '+') todosCopy.todosLines.push(line)
        else {
            todosCopy.todosLines.splice(idx, 1)
            if (!todosCopy.todosLines.length) this.props.toggleTodosModal()
        }
        this.setState({ todos: todosCopy })
    }

    handleChange = (value, idx) => {
        const todosCopy = { ...this.state.todos }
        todosCopy.todosLines[idx].txt = value
        this.setState({ todos: todosCopy })
    }

    onChangeLabel = (ev) => {
        const todosCopy = { ...this.state.todos }
        todosCopy.label = ev.target.value
        this.setState({ todos: todosCopy })
    }

    render() {
        return (
            <div className={`todos-modal ${this.props.toggleStatus ? 'open-modal' : ''}`}>
                <button className="close-btn" onClick={() => {
                    this.setState({
                        todos: {
                            todosLines: [{ txt: '', isDone: false }],
                            label: ''
                        }
                    })
                    this.props.toggleTodosModal()
                }}>X</button>
                <input type="text" placeholder="Label your todos.." value={this.state.todos.label} onChange={this.onChangeLabel} name="label" />
                {this.state.todos.todosLines.map((todo, idx) => {
                    return <div className="todoLine" key={idx}>
                        <input type="text" placeholder="Enter your todo.." onChange={(ev) => {
                            const { value } = ev.target
                            this.handleChange(value, idx)
                        }} value={todo.txt} />
                        <button onClick={() => this.handleTodosLine('+')}>+</button>
                        <button onClick={() => this.handleTodosLine('-', idx)}>-</button></div>
                })}
                <button onClick={() => {
                    const { toggleTodosModal, closeModal, onAddTodos } = this.props
                    toggleTodosModal()
                    closeModal()
                    onAddTodos(this.state.todos)
                    this.setState({
                        todos: {
                            todosLines: [{ txt: '', isDone: false }],
                            label: ''
                        }
                    })
                }}>Add</button>
            </div>
        )
    }

}
