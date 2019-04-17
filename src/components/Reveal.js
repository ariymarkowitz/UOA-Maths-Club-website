import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import '../../lib/reveal/css/reset.css';
import '../../lib/reveal/css/reveal.css';
import '../../lib/reveal/css/theme/sky.css';

//import 'script-loader!../reveal-init.js';

class Reveal extends React.Component {
    state = { backgroundElement: null };

    render() {
        return (
            <>
                <Head>
                    <style>{`#__next {
                            height: 100%;
                            overflow: hidden;
                            position: relative;
                        }`}</style>
                    <meta key="reveal" />
                </Head>
                {this.state.backgroundElement}
                <div className="reveal">
                    <div className="slides">{this.props.children}</div>
                </div>
            </>
        );
    }

    componentDidMount() {
        const _Reveal = require('../../lib/reveal/js/reveal.js').default;
        addLoader(_Reveal);

        this.setState({ backgroundElement: this.props.backgroundElement });
    }
}

// Reveal should initialize once everything is loaded.
// However, it should only intialize once, and only if there is a Reveal component.

let willLoad = false;
function addLoader(_Reveal) {
    if (!willLoad) {
        willLoad = true;
        window.addEventListener('load', () => initialize(_Reveal));
    }
}

function initialize(_Reveal) {
    _Reveal.initialize({
        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/notes/notes.js', async: true },
            { src: 'plugin/highlight/highlight.js', async: true }
        ]
    });
}

export default Reveal;
