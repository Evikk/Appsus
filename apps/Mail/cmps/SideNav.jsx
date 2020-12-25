const { Link } = ReactRouterDOM;
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
                <div className="nav-ctn" onClick={()=>this.props.onChangeFilter('isInbox')}>
                    <Link className={`nav-btn-container ${this.checkActive('isInbox')}`} to="/mail/"><i className="fa fa-envelope-o"></i>
                    <span className="btn-txt">Inbox</span>
                    <span>{this.props.inboxCount}</span>
                    </Link>
                </div>
                <div className="nav-ctn" onClick={()=>this.props.onChangeFilter('isStarred')}>
                    <Link className={`nav-btn-container ${this.checkActive('isStarred')}`} to="/mail/"><i className="fa fa-star-o"></i>
                    <span className="btn-txt">Starred</span>
                    </Link>
                </div>
                <div className="nav-ctn" onClick={()=>this.props.onChangeFilter('isSent')}>
                    <Link className={`nav-btn-container ${this.checkActive('isSent')}`} to="/mail/"><i className="fa fa-send"></i>
                    <span className="btn-txt">Sent</span>
                    </Link>
                </div>
                <div className="nav-ctn" onClick={()=>this.props.onChangeFilter('isDraft')}>
                    <Link className={`nav-btn-container ${this.checkActive('isDraft')}`} to="/mail/"><i className="fa fa-pencil"></i>
                    <span className="btn-txt">Draft</span>
                    </Link>
                </div>
                <div className="nav-ctn" onClick={()=>this.props.onChangeFilter('isTrash')}>
                    <Link className={`nav-btn-container ${this.checkActive('isTrash')}`} to="/mail/"><i className="fa fa-trash-o"></i>
                    <span className="btn-txt">Trash</span>
                    <span>{this.props.trashCount}</span>
                    </Link>
                </div>
            </nav>
        );
    }
}
