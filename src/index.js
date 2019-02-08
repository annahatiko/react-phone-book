import React from 'react';
import { render } from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

let contacts = [];

let contactsStore;

let options = ['family', 'work', 'friends'];

let optionsStore;

if (JSON.parse(localStorage.getItem('phoneBook')) === null) {
    localStorage.setItem('phoneBook', JSON.stringify(contacts));
    contactsStore = contacts;
} else contactsStore = JSON.parse(localStorage.getItem('phoneBook'));

if (JSON.parse(localStorage.getItem('phoneCategories')) === null) {
    localStorage.setItem('phoneCategories', JSON.stringify(options));
    optionsStore = options;
} else optionsStore = JSON.parse(localStorage.getItem('phoneCategories'));

export const store = configureStore();

render(React.createElement(App, { store }), document.getElementById('root'));
