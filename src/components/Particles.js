import React from 'react';
import uuid from 'uuid';
import particleSettings from '../settings/particles.json';

class Particles extends React.Component {
    state = {};

    componentDidMount() {
        this.setState({ id: uuid() });
    }
    componentDidUpdate() {
        const particlesJS = require('../../lib/particles/particles.js').default;
        console.log(particlesJS);
        particlesJS.load(this.state.id, particleSettings);
    }
    render() {
        return <div id={this.state.id} />;
    }
}

export default Particles;
