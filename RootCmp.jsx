import { AppHeader } from './cmps/AppHeader.jsx';
import { About } from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
import { PetApp } from './pages/PetApp.jsx';
import { PetDetails } from './pages/PetDetails.jsx';
import { PetEdit } from './pages/PetEdit.jsx';
import { Survey } from './pages/Survey.jsx';
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <Switch>
                        <Route path="/pet/edit/:petId?" component={PetEdit} />
                        <Route path="/pet/:petId" component={PetDetails} />
                        <Route path="/pet" component={PetApp} />
                        <Route path="/about" component={About} />
                        <Route path="/survey" component={Survey} />
                        <Route path="/" component={Home} />
                    </Switch>
                    <footer className="animate__animated animate__jello">coffeerights 2020</footer>
                </section>
            </Router>
        );
    }
}
