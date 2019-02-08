import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {ContactsList} from "./contactList";

const App = props => (
    <Provider store={props.store}>
      <ContactsList/>
    </Provider>
);

App.propTypes = {
    store: PropTypes.shape({}),
};

export default App;