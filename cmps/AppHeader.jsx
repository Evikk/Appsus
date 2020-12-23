const { NavLink, withRouter } = ReactRouterDOM;

export class AppHeader extends React.Component {

    state = {}

    componentDidMount() {}  

    render() {
        
        return <header className="app-header">
            <nav>
                <ul>
                    <div className="home-about">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </div>
                    <div className="apps">
                        <li>
                            <ul>
                                <li><NavLink to="/book">Book</NavLink></li>
                                <li><NavLink to="/mail">Mail</NavLink></li>
                                <li><NavLink to="/keep">Keep</NavLink></li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    }
}