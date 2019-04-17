import React from 'react';
import Particles from 'react-particles-js';
import particleSettings from '../src/settings/particles.json';
import Reveal from '../src/components/Reveal';
import Slides from '../src/components/slides/Slides.js';

class App extends React.Component {
    constructor(params) {
        super(params);

        this.Particles = (
            <Particles
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}
                params={particleSettings}
            />
        );
    }

    render() {
        return (
            <Reveal
                backgroundElement={
                    <Particles
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute'
                        }}
                        params={particleSettings}
                    />
                }
            >
                <Slides.Main />
                <Slides.Attendance />
                <Slides.MathPuzzle />
            </Reveal>
        );
    }
}

export default App;
