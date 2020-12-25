const { Link } = ReactRouterDOM;
import {utilService} from '../../../services/utilService.js'

export function MailPreview({ mail, onRemoveMail, onStarMail, onReadMail, openInCompose }) {
    function getReadStatus() {
        return mail.isRead ? "" : "unread";
    }
    function getStarredStatus() {
        return mail.isStarred ? "starred" : "";
    }
    function getTime() {
        if (
            new Date().toLocaleDateString() === mail.sentAt.toLocaleDateString()
        )
            return mail.sentAt.toLocaleTimeString().replace(/:\d+ /, " ");
        return mail.sentAt.toLocaleDateString();
    }

    return (
        <div className="mail-preview-container">
            <i
                className="fa fa-trash-o md to-trash"
                onClick={() => {
                    onRemoveMail(mail.id);
                }}
            ></i>
            {!mail.isTrash && (
                <i
                    className={`fa fa-star mail-icon md ${getStarredStatus()}`}
                    onClick={() => {
                        onStarMail(mail.id);
                    }}
                ></i>
            )}
            {mail.isTrash && <i className="fa fa-trash-o mail-icon md red"></i> }
            
            <Link to={`/mail/${mail.id}`} onClick={() => {
                if (!mail.isDraft) onReadMail(mail.id)
                else openInCompose(mail)
                }} className={`mail-preview-details ${getReadStatus()}`}>
                    <div className="preview-sender">
                        <span className="sender-icon">
                            {utilService.getInitials(mail.sender)}
                        </span>
                        <span>
                            {mail.sender}{" "}
                            {mail.sendTo && !mail.isDraft && (
                                <span className="font-regular">
                                    To: {mail.sendTo}
                                </span>
                            )}
                            {mail.isDraft && <span className="red">Draft</span>}
                        </span>
                    </div>
                    <div className="preview-main">
                        <span className="preview-subject">{mail.subject}</span>
                        <span> - </span>
                        <span className="preview-body">{mail.body}</span>
                    </div>
                    <div className="preview-mail-sent">
                        <span>{getTime()}</span>
                    </div>
            </Link>
            
        </div>
    );
}
