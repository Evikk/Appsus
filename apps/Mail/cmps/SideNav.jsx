export class SideNav extends React.Component {
    state = {};

    render() {
        return (
            <nav className="nav-container">
                <div className="compose-btn-container">
                    <button className="compose-btn" onClick={this.props.onCompose}>
                        <img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"/>
                        Compose
                    </button>
                </div>
                <div className="nav-btn-container">
                    <i className="fa fa-envelope-o"></i>
                    <span className="btn-txt">Inbox</span>
                    <span>{this.props.inboxCount}</span>
                </div>
                <div className="nav-btn-container">
                    <i className="fa fa-star-o"></i>
                    <span className="btn-txt">Starred</span>
                </div>
                <div className="nav-btn-container">
                    <i className="fa fa-send"></i>
                    <span className="btn-txt">Sent</span>
                </div>
                <div className="nav-btn-container">
                    <i className="fa fa-pencil"></i>
                    <span className="btn-txt">Draft</span>
                </div>
                <div className="nav-btn-container">
                    <i className="fa fa-trash-o"></i>
                    <span className="btn-txt">Trash</span>
                    <span>{this.props.trashCount}</span>
                </div>
            </nav>
        );
    }
}
