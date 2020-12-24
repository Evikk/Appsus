export class SideNav extends React.Component {
    state = { };
    
    checkActive = (btn) => {
        return btn === this.props.activeBtn ? 'active-btn' : ''
    }

    render() {
        return (
            <nav className="nav-container">
                <div className="compose-btn-container">
                    <button className="compose-btn" onClick={this.props.onCompose}>
                        <img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png"/>
                        Compose
                    </button>
                </div>
                <div className={`nav-btn-container ${this.checkActive('isInbox')}`} onClick={()=>this.props.onChangeFilter('isInbox')}>
                    <i className="fa fa-envelope-o"></i>
                    <span className="btn-txt">Inbox</span>
                    <span>{this.props.inboxCount}</span>
                </div>
                <div className={`nav-btn-container ${this.checkActive('isStarred')}`} onClick={()=>this.props.onChangeFilter('isStarred')}>
                    <i className="fa fa-star-o"></i>
                    <span className="btn-txt">Starred</span>
                </div>
                <div className={`nav-btn-container ${this.checkActive('isSent')}`} onClick={()=>this.props.onChangeFilter('isSent')}>
                    <i className="fa fa-send"></i>
                    <span className="btn-txt">Sent</span>
                </div>
                <div className={`nav-btn-container ${this.checkActive('isDraft')}`} onClick={()=>this.props.onChangeFilter('isDraft')}>
                    <i className="fa fa-pencil"></i>
                    <span className="btn-txt">Draft</span>
                </div>
                <div className={`nav-btn-container ${this.checkActive('isTrash')}`} onClick={()=>this.props.onChangeFilter('isTrash')}>
                    <i className="fa fa-trash-o"></i>
                    <span className="btn-txt">Trash</span>
                    <span>{this.props.trashCount}</span>
                </div>
            </nav>
        );
    }
}
