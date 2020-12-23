const { Route, Switch, NavLink } = ReactRouterDOM;

export function About() {
    return (
        <section className="about-page">
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem unde officia nobis quisquam similique maiores, impedit voluptates, deleniti sed recusandae aspernatur at dicta fugit perferendis asperiores eos dignissimos cupiditate adipisci.</p>
            <hr/>
            <nav>
                <NavLink to="/about/secret">Secret content</NavLink>
                |
                <NavLink to="/about/stam">Not a secret</NavLink>
            </nav>

            <Switch>
                <Route component={AboutSecret} path="/about/secret" />
                <Route component={NotSoSecret} path="/about/stam" />
            </Switch>
            
        </section>
    );
}

function AboutSecret() {
    return <h1>TOP-SECRET</h1>;
}

function NotSoSecret() {
    return <h1>Tell anyone! </h1>;
}