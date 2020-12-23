import { utilService } from "../../../services/utilService.js";
export const mailService = {
    query,
    getById,
    toggleStarMail,
    moveMailToTrash
};

var mails;

_createMails();
function _createMails() {
    if (!mails || !mails.length) {
        mails = [
            {
                id: '123',
                sender: "Avi",
                subject: "Hi",
                body: `What's up?`,
                isRead: false,
                sentAt: new Date(2018, 11, 24, 10, 33, 30, 0),
                isInbox: true,
                isTrash: false,
                isStarred: false
            },
            {
                id: '456',
                sender: "Shira",
                subject: "Send me the last two files",
                body: `hey, I saw you finished working on these files so send me the updated files, ok? thanks :)`,
                isRead: true,
                sentAt: new Date(2014, 7, 3, 16, 50, 40, 0),
                isInbox: true,
                isTrash: false,
                isStarred: false
            },
            {
                id: '789',
                sender: "Dwight Schrute",
                subject: "Memo #1x6G_09",
                body: `Note that casual friday tradition is no longer relevant! please show with formal suiting`,
                isRead: false,
                sentAt: new Date(),
                isInbox: true,
                isTrash: false,
                isStarred: false
            },
        ];
    }
}

function query() {
    return Promise.resolve(mails);
}

function getById(mailId){
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function moveMailToTrash(mail) {
    mail.isInbox = false
    mail.isTrash = true
    return Promise.resolve(`${mail.id} has moved to trash`)
}

function toggleStarMail(mail) {
    mail.isStarred = !mail.isStarred
    return Promise.resolve(`${mail.id} star change`)
}

function deleteMail(mailId) {
    const idx = mails.findIndex(mail => {
        return mail.id === mailId
    })
    mails.splice(idx,1)
    return Promise.resolve()
}
