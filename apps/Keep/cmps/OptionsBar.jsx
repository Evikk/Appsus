import { Colors } from "./Colors.jsx"

export class OptionsBar extends React.Component {
    state = {
        showColors: false
    }


    onEditColor=(color)=>{
        this.props.onEdit(this.props.note, color)
        this.setState({showColors:false})
    }


    render() {

        return (
            <div className="options-bar">
                <button onClick={() => {
                    {
                        this.setState({ showColors:true },()=>{
                            // this.state.showColors&&
                        })
                        
                    }
                }}><i className="fa fa-paint-brush"></i></button>
                <button onClick={() => this.props.onEdit(this.props.note, 'pin')}><i className="fa fa-thumb-tack"></i></button>
                <button onClick={() => this.props.onEdit(this.props.note, 'clone')}><i className="fa fa-clone info"></i></button>
                <button onClick={() => this.props.onEdit(this.props.note, 'openedit')}><i className="fa fa-edit"></i></button>
                <button onClick={() => this.props.onEdit(this.props.note, 'delete')}><i className="fa fa-trash-o"></i></button>
                <button onClick={() => this.props.onEdit(this.props.note, 'mail')}><i className="fa fa-envelope"></i></button>
            <Colors onEditColor={this.onEditColor}/>
            </div>
        )
    }
}