import Layout from './components/layout/layout';
import './style/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Deck from './components/features/deck/deck'

ReactDOM.render(
    <Layout>
        <Deck/>
    </Layout>,
    document.getElementById('layout-wrapper')
)

module.hot.accept();