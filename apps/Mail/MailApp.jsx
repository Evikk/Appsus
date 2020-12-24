import { mailService } from "./services/mail-service.js";
import { MailList } from "./cmps/MailList.jsx";
import { MailDetails } from "./pages/MailDetails.jsx";
import { SideNav } from "./cmps/SideNav.jsx";
import { MailCompose } from "./cmps/MailCompose.jsx";
const { Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: "isInbox",
        searchBy: "",
        inboxCount: null,
        trashCount: null,
        isComposeOn: false,
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

    getMails = (filterBy) => {
        const searchResults =  this.state.mails.filter(mail => {
            return mail.body.toLowerCase().includes(this.state.searchBy.toLowerCase()) ||
            mail.sender.toLowerCase().includes(this.state.searchBy.toLowerCase()) ||
            mail.subject.toLowerCase().includes(this.state.searchBy.toLowerCase())
        })
        if (this.state.filterBy === 'all') return searchResults
        return searchResults.filter((mail) => {
            return mail[filterBy];
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

    onReadMail = (mailId) => {
        mailService.getById(mailId).then((mail) => {
            mailService.markAsRead(mail).then(msg => {
                console.log(msg);
                this.loadMails();
            });
        });
    };

    onChangeFilter = (filter) => {
        this.setState({ filterBy: filter });
    };

    onCloseCompose = () => {
        this.setState({ isComposeOn: false });
        this.loadMails();
    };

    onRemoveMail = (mailId) => {
        mailService.getById(mailId).then((mail) => {
            mailService.deleteMail(mail.id).then((msg) => {
                console.log(msg);
                this.loadMails();
            });
        });
    };

    onSearchInput = (ev) => {
        const value = ev.target.value;
        this.setState({searchBy: value})
    };

    render() {
        const { mails, trashCount, inboxCount, isComposeOn, searchBy } = this.state;
        if (!mails) return <h2>you have no mails...</h2>;
        return (
                <main>
                    <SideNav
                        trashCount={trashCount}
                        inboxCount={inboxCount}
                        activeBtn={this.state.filterBy}
                        onChangeFilter={this.onChangeFilter}
                        onCompose={() => this.setState({ isComposeOn: true })}
                    />
                    {isComposeOn && (
                        <MailCompose onCloseCompose={this.onCloseCompose} />
                    )}
                    <section className="main-container">
                        <div className="search-container">
                            <input type="text" placeholder="Search..." onChange={this.onSearchInput} value={searchBy}/>
                            <button onClick={()=>{this.setState({filterBy: 'all', searchBy: ''})}}>Show All</button>
                            <button onClick={()=>{this.setState({filterBy: 'read', searchBy: ''})}}>Show Read</button>
                            <button>Show Unread</button>
                        </div>
                        <Switch>
                            <Route path="/mail/:mailId" component={MailDetails} />
                            <Route
                                exact
                                path="/mail"
                                render={() => (
                                    <MailList
                                        mails={this.getMails(this.state.filterBy)}
                                        onRemoveMail={this.onRemoveMail}
                                        onStarMail={this.onStarMail}
                                        onReadMail={this.onReadMail}
                                    />
                                )}
                            />
                        </Switch>
                    </section>
                </main>
        );
    }
}
