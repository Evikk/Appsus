import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onStarMail, onReadMail }) {
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
                        />
                    </li>
                );
            })}
        </ul>
    );
}
