import datetime from 'node-datetime';

function formatDate(date) {
    return date.format('D f Y');
}

class Main extends React.PureComponent {
    state = { date: datetime.create() };

    render() {
        return (
            <section>
                <h1>Welcome to Polygon!</h1>
                <h3>{formatDate(this.state.date)}</h3>
            </section>
        );
    }
}

export default Main;
