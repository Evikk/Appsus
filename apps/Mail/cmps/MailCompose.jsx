import { mailService } from "../services/mail-service.js"

export class MailCompose extends React.Component {
    state={
        mail: {
            sendTo: '',
            subject: '',
            body: '',
            isInbox: false,
            isRead: false,
            isDraft: false,
            isTrash: false,
            isStarred: false,
        },
        emptyState: {}
    }
    componentDidMount = () => {
        this.setState({emptyState: this.state.mail})
    }
    setType = (type) => {
        if (type === 'send') return { ...this.state.mail, isInbox: true, isRead: false, isDraft: false }
        if (type === 'draft') return { ...this.state.mail, isInbox: false, isRead: true, isDraft: true }
    }

    onSaveMail = (ev, type) => {
        ev.preventDefault()
        const mailToSave = this.setType(type)
        // console.log(mailToSave);
        mailService.save(mailToSave).then(msg => {
            console.log(msg)
            this.setState({mail: this.state.emptyState})
            this.props.onCloseCompose()
        })

    }

    onInputChange = (ev) => {
        const value = ev.target.value;
        const mail = { ...this.state.mail }
        mail[ev.target.name] = value;  
        this.setState({
            mail
        });
    };

    render() {
        return (
            <div className="mail-compose container" >
                <div className="compose-header">
                    <p> New Message </p>
                    <div className="header-controls">
                        <button title="save to drafts" onClick={()=>this.onSaveMail(event, 'draft')}> <i className="fa fa-times"></i></button>
                    </div>
                </div>
                <form onSubmit={()=>this.onSaveMail(event, 'send')} className="mail-compose-form">
                    <div className="compose-address">
                        <input value={this.state.mail.sendTo} type="mail" name="sendTo" placeholder="To" onChange={this.onInputChange} />
                    </div>
                    <div className="compose-subject">
                        <input value={this.state.mail.subject} ref={this.elInput} type="text" name="subject" placeholder="Subject" onChange={this.onInputChange} />
                    </div>

                    <div className="compose-body">
                        <textarea value={this.state.mail.body} rows="25" type="text" name="body" placeholder="Write your mail here" onChange={this.onInputChange} />
                    </div>
                    <section className="compose-footer">
                        <button type="submit" title="Send"> Send </button>
                        <button className="fa fa-trash-o" onClick={() => this.props.onCloseCompose()}></button>
                    </section>
                </form>
            </div>
        )
    }
}