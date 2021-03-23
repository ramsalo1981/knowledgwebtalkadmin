import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/scss/index.scss';
import App from './Components/App';
import registerServiceWorker from './Components/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
