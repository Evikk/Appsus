const { NavLink, withRouter } = ReactRouterDOM;

export class AppHeader extends React.Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <header className="app-header">
                <nav>
                    <ul className="nav-wrapper">
                        <li>
                            <NavLink className="logo" exact to="/">
                                <img src="assets/img/logo.png" alt="" />
                            </NavLink>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <NavLink to="/mail">Mail</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/keep">Keep</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/book">Book</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
