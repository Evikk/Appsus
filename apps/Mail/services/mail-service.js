import { utilService } from "../../../services/utilService.js";
export const mailService = {
    query,
    getById,
    toggleStarMail,
    deleteMail,
    markAsRead,
    toggleRead,
    getBgColor,
    save
};

var mails;
_createMails();
// _sendFakeMails();

window.db = mails
function _createMails() {
    if (!mails || !mails.length) {
        mails = [
            {
                id: '123',
                sender: "Avi",
                senderAddress: "aviHakarish32@hotmail.com",
                subject: "Hi",
                body: `What's up?`,
                bgColor: utilService.getRandomColor(),
                isRead: false,
                sentAt: new Date(2018, 11, 24, 10, 33, 30, 0),
                isInbox: true,
                isTrash: false,
                isStarred: false,
                isDraft: false
            },
            {
                id: '456',
                sender: "Shira",
                senderAddress: "shira1987@walla.co.il",
                subject: "Send me the last two files",
                body: `hey, I saw you finished working on these files so send me the updated files, ok? thanks :)`,
                bgColor: utilService.getRandomColor(),
                isRead: true,
                sentAt: new Date(2014, 7, 3, 16, 50, 40, 0),
                isInbox: true,
                isTrash: false,
                isStarred: false,
                isDraft: false
            },
            {
                id: '789',
                sender: "Dwight Schrute",
                senderAddress: "d_schrute@dundermifflin.com",
                subject: "Memo #1x6G_09",
                body: `Note that casual friday tradition is no longer relevant! please show with formal suiting`,
                bgColor: utilService.getRandomColor(),
                isRead: false,
                sentAt: new Date(),
                isInbox: true,
                isTrash: false,
                isStarred: false,
                isDraft: false
            },
        ];
    }
}
// function _sendFakeMails() {
//     setInterval({

//     }, (utilService.getRandomInt(10,100))*1000)
// }
function query() {
    return Promise.resolve(mails);
}

function getById(mailId){
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function deleteMail(mailId) {
    return getById(mailId).then(mail => {
        if (mail.isTrash) return _deleteFromDb(mail)
        else return _moveMailToTrash(mail)
    })
}

function toggleStarMail(mail) {
    mail.isStarred = !mail.isStarred
    // _saveMailsToStorage();
    return Promise.resolve()
}

function save(mail){
    if (mail.id) {
        return _update(mail);
    } else {
        return _add(mail);
    }
}

function markAsRead(mail) {
    mail.isRead = true
    return Promise.resolve()
}
function toggleRead(mail) {
    mail.isRead = !mail.isRead
    return Promise.resolve()
}

function getBgColor(mail){
    return mail.bgColor
}

function _add(mail) {
    const mailToAdd = {
        id: utilService.makeId(),
        sentAt: new Date(),
        bgColor: utilService.getRandomColor(),
        ...mail
    };
    mails = [mailToAdd, ...mails];
    // _saveMailsToStorage();
    if (mailToAdd.isDraft) return Promise.resolve(`Message is saved to drafts!`)
    return Promise.resolve(`Message is sent!`); 
}

function _update(mail) {
    const mailToUpdate = {
        ...mail
    };
    const mailsCopy = [...mails];
    const mailIdx = mailsCopy.findIndex(mail => mail.id === mail.id);
    mailsCopy[mailIdx] = mailToUpdate;
    mails = mailsCopy;
    // _saveMailsToStorage();
    return Promise.resolve(mailToUpdate);
}

function _deleteFromDb(mailToDelete){
    console.log(mailToDelete);
    
    const idx = mails.findIndex(mail => {
        return mail.id === mailToDelete.id
    })
    mails.splice(idx,1)
    // _saveMailsToStorage();
    return Promise.resolve(`Message was deleted completely!`)
}

function _moveMailToTrash(mail) {
    mail.isInbox = false
    mail.isTrash = true
    // _saveMailsToStorage();
    return Promise.resolve(`Message has moved to trash`)
}

