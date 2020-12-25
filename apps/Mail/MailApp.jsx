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
        filterByRead: 'all',
        searchBy: "",
        inboxCount: null,
        trashCount: null,
        isComposeOn: false,
        mailToEdit: null
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
        const sortedMails = this.state.mails.sort((a,b) => {
            return b.sentAt - a.sentAt
        })
        .filter(mail => {
            return mail.body.toLowerCase().includes(this.state.searchBy.toLowerCase()) ||
            mail.sender.toLowerCase().includes(this.state.searchBy.toLowerCase()) ||
            mail.subject.toLowerCase().includes(this.state.searchBy.toLowerCase())
        })
        .filter((mail) => {
            return mail[filterBy];
        });
        if (this.state.filterByRead === 'all') return sortedMails
        else if (this.state.filterByRead === 'unread') return sortedMails.filter(result => {
            return !result.isRead
        })
        else if (this.state.filterByRead === 'read') return sortedMails.filter(result => {
            return result.isRead
        })
        // return sortedMails.filter((mail) => {
        //     return mail[filterBy];
        // });
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

    onChangeFilterByRead = (filter) => {
        this.setState({ filterByRead: filter });
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

    openInCompose = (mailToEdit) => {
        this.setState({ isComposeOn: true, mailToEdit }, () => {
            this.setState({mailToEdit: null})
        })
    }

    onSearchInput = (ev) => {
        const value = ev.target.value;
        this.setState({searchBy: value})
    };

    render() {
        const { mails, trashCount, inboxCount, isComposeOn, searchBy, filterBy, filterByRead } = this.state;
        if (!mails) return <h2>you have no mails...</h2>;
        return (
                <main>
                    <section className="wrapper-gen">
                        <div className="wrapper">
                            <SideNav
                                trashCount={trashCount}
                                inboxCount={inboxCount}
                                activeBtn={filterBy}
                                onChangeFilter={this.onChangeFilter}
                                onCompose={() => this.setState({ isComposeOn: true })}
                            />
                            {isComposeOn && (
                                <MailCompose onCloseCompose={this.onCloseCompose} mailToEdit={this.state.mailToEdit}/>
                            )}
                            <section className="main-container">
                                <div className="search-container">
                                    <input type="text" placeholder="Search..." onChange={this.onSearchInput} value={searchBy}/>
                                    <select name="" id="" onChange={()=>this.onChangeFilterByRead(event.target.value)}>
                                        <option value="all">Show All</option>
                                        <option value="unread">Show Unread</option>
                                        <option value="read">Show Read</option>
                                    </select>
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
                                                openInCompose={this.openInCompose}
                                                currLabel={filterBy}
                                                currFilter={filterByRead}
                                            />
                                        )}
                                    />
                                </Switch>
                            </section>
                        </div>
                    </section>
                </main>
        );
    }
}
