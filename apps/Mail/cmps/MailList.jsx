import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onStarMail, onReadMail, openInCompose, currLabel }) {

    function getCurrLabel() {
        let label
        switch (currLabel) {
            case 'isInbox':
                label = 'Messages in Inbox'
                break;
            case 'isStarred':
                label = 'Starred Messages'
                break;
            case 'isSent':
                label = 'Sent Messages'
                break;
            case 'isDraft':
                label = 'Messages to Edit'
                break;
            case 'isTrash':
                label = 'Messages in Trash'
                break;
            case 'read':
                label = 'Read Messages'
                break;
            case 'unread':
                label = 'Unread Messages'
                break;
            default:
                label = 'Messages'
                break;
        }
        return label
    }

    if (mails.length === 0) return <div className="no-mail-msg"><h2>You Have No {getCurrLabel()}...</h2></div>
    return (
        <ul className="mail-list">
            
            {mails.map((mail) => {
                return (
                    <li className="mail-item-container" key={mail.id}>
                        <MailPreview
                            mail={mail}
                            onRemoveMail={onRemoveMail}
                            onStarMail={onStarMail}
                            onReadMail={onReadMail}
                            openInCompose={openInCompose}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
