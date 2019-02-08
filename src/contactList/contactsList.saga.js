import { put, takeEvery } from 'redux-saga/effects';
import { registerSaga } from '../store/middlewares/sagaMiddleware';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT
} from './contactsList.types';
import {
  getContacts,
  addContact,
  deleteContact,
  editContact
} from './contactsList.action';

function* getContactsSaga() {
    const data = JSON.parse(localStorage.getItem('phoneBook'));
    yield put(getContacts.success(data));
}

function* addContactSaga({ payload: { name, surname, birthday, phones } }) {
    const newContactList = JSON.parse(localStorage.getItem('phoneBook'));
    let newKey = newContactList.length ? parseInt(newContactList[newContactList.length - 1].key) + 1 : 1;
    newContactList.push({key: newKey, name: name, surname: surname, birthday: birthday, phones: phones});
    localStorage.setItem('phoneBook', JSON.stringify(newContactList));
    yield put(addContact.success({ name, surname, birthday, phones }));
}

function* editContactSaga({ payload: { key, name, surname, birthday, phones } }) {
    const newContactList = JSON.parse(localStorage.getItem('phoneBook'));
    let editItemIndex = newContactList.findIndex( item => item.key === key);
    newContactList[editItemIndex].name = name;
    newContactList[editItemIndex].surname = surname;
    newContactList[editItemIndex].birthday = birthday;
    newContactList[editItemIndex].phones = phones;
    localStorage.setItem('phoneBook', JSON.stringify(newContactList));
    yield put(editContact.success({ key, name, surname, birthday, phones }));
}

function* deleteContactSaga({ payload: index }) {
    let newContactList = JSON.parse(localStorage.getItem('phoneBook'));
    let filterContactList = newContactList.filter(item => index !== item.key);
    localStorage.setItem('phoneBook', JSON.stringify(filterContactList));
    yield put(deleteContact.success( index ));
}

function* contactsListSaga() {
  yield takeEvery(GET_CONTACTS.DEFAULT, getContactsSaga);
  yield takeEvery(ADD_CONTACT.DEFAULT, addContactSaga);
  yield takeEvery(EDIT_CONTACT.DEFAULT, editContactSaga);
  yield takeEvery(DELETE_CONTACT.DEFAULT, deleteContactSaga);
}

registerSaga(contactsListSaga);

export default contactsListSaga;
