import { eventBusService } from "../services/eventBusService.js";

export class Home extends React.Component {
    state = {
        headerStyle: {
            color: 'gold',
            fontSize: 15
        }
    }
    // Getter function:
    get fontSize() {
        return this.state.headerStyle.fontSize + 'px'
    }
    componentDidMount() {
        // eventBusService.emit('showMsg', `I'm listening`)
    }
    foo = ()=>{
        console.log('THIS', this);
        eventBusService.emit('showMsg', `I'm listening`)
    }

    render() {
        // Destructering
        // const color = this.state.headerStyle.color;
        const {color} = this.state.headerStyle;
        return (
            <section>
                <h2 style={{color:color, fontSize: this.fontSize}}>
                    Home Sweet Home
                    <button onClick={this.foo}>Listen</button>
                </h2>
            </section>
        )
    }
}