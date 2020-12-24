import { mailService } from "../services/mail-service.js";

export class MailDetails extends React.Component {
    state = {
        mail: null,
    };

    componentDidMount = () => {
        const { mailId } = this.props.match.params;
        mailService.getById(mailId).then(mail =>{
            this.setState({ mail })
        })
    };

    render() {
        const { mail } = this.state
        if (!mail) return <h3>Loading...</h3>
        return (
            <section className="main-mail-container">
                <div className="mail-nav">
                    <i className="fa fa-arrow-left mail-menu-btn md" onClick={()=>{this.props.history.push("/mail")}}></i>
                    <i className="fa fa-trash-o mail-menu-btn md"></i>
                </div>
                <div className="mail-details-container">
                    <div className="mail-subject">
                        <span>{mail.subject}</span>
                    </div>
                    <div className="mail-sender-time">
                        <div className="mail-sender"><span>{mail.sender}</span><span>{mail.senderAddress}</span></div>
                        <span className="mail-sent-at">{mail.sentAt.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="mail-body">
                        <span>{mail.body}</span>
                    </div>
                </div>
            </section>
        );
    }
}
