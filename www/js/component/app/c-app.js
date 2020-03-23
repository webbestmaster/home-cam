// @flow

/* global window */

import React, {type Node} from 'react';
import {BrowserRouter} from 'react-router-dom';

// import {defaultInitialData} from '../../provider/intial-data/intial-data-const';
// import {GdprInfo} from '../layout/gdpr-info/c-gdpr-info';

import {ClientApp} from './c-client-app.js';

export function App(): Node {
    return (
        <BrowserRouter>
            <ClientApp/>
        </BrowserRouter>
    );
}
