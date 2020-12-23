import { mailService } from "./services/mail-service.js";
import { MailList } from "./cmps/MailList.jsx";
import { MailDetails } from "./pages/MailDetails.jsx";
import { SideNav } from "./cmps/SideNav.jsx";
const { Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
    state = {
        mails: [],
        inboxCount: null,
        trashCount: null,
    };

    componentDidMount() {
        this.loadMails();
    }

    loadMails = () => {
        mailService.query().then((mails) =>
            this.setState({ mails }, () => {
                this.countLabels();
            })
        );
    };

    countLabels = () => {
        var inboxCount = 0;
        var trashCount = 0;
        this.state.mails.map((mail) => {
            if (mail.isInbox && !mail.isRead) inboxCount++;
            if (mail.isTrash) trashCount++;
        });
        this.setState({ inboxCount, trashCount });
    };

    getInboxMails = () => {
        return this.state.mails.filter((mail) => {
            return mail.isInbox;
        });
    };

    onStarMail = (mailId) => {
        mailService.getById(mailId).then((mail) => {
            mailService.toggleStarMail(mail).then((msg) => {
                console.log(msg);
                this.loadMails();
            });
        });
    };

    onRemoveMail = (mailId) => {
        mailService.getById(mailId).then((mail) => {
            if (mail.isInbox) {
                mailService.moveMailToTrash(mail).then((msg) => {
                    console.log(msg);
                    this.loadMails();
                });
            }
        });
    };

    render() {
        console.log(this.state.inboxCount);

        const { trashCount } = this.state;
        const { inboxCount } = this.state;
        const { mails } = this.state;
        if (!mails) return <h2>you have no mails...</h2>;
        return (
            <section>
                <main>
                    <SideNav trashCount={trashCount} inboxCount={inboxCount} />
                    <Switch>
                        <Route path="/mail/:mailId" component={MailDetails} />
                        <Route
                            exact
                            path="/mail"
                            render={() => (
                                <MailList
                                    mails={this.getInboxMails()}
                                    onRemoveMail={this.onRemoveMail}
                                    onStarMail={this.onStarMail}
                                />
                            )}
                        />
                    </Switch>
                </main>
            </section>
        );
    }
}
