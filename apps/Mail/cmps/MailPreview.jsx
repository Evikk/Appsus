import { mailService } from "../services/mail-service.js";
const { Link } = ReactRouterDOM;

export function MailPreview({ mail, onRemoveMail, onStarMail, onReadMail }) {
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
    function onClickMail() {
        console.log(mail.id, onReadMail());
    }
    return (
        <div className="mail-preview-container">
            <i
                className="fa fa-trash-o md to-trash"
                onClick={() => {
                    onRemoveMail(mail.id);
                }}
            ></i>
            <i
                className={`fa fa-star md ${getStarredStatus()}`}
                onClick={() => {
                    onStarMail(mail.id);
                }}
            ></i>
            <Link to={`/mail/${mail.id}`} onClick={() => onReadMail(mail.id)}>
                <div className={`mail-preview-details ${getReadStatus()}`}>
                    <div className="preview-sender">
                        <span>
                            {mail.sender}{" "}
                            {mail.sendTo && !mail.isDraft &&(
                                <span className="font-regular">
                                    To: {mail.sendTo}
                                </span>
                            )}
                            {mail.isDraft &&
                                <span className="red">
                                    Draft
                                </span>
                            }
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
                </div>
            </Link>
        </div>
    );
}


