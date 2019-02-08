import { combineReducers } from 'redux';
import contacts from '../contactList/contactsList.reducer';
import modalInfo from '../contactForm/contactForm.reducer';

const rootReducer = combineReducers({
  contacts,
  modalInfo
});

export default rootReducer;
