import { createApiActions  } from '../utils';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT
} from './contactsList.types';

export const getContacts = createApiActions(GET_CONTACTS);
export const addContact = createApiActions(ADD_CONTACT);
export const deleteContact = createApiActions(DELETE_CONTACT);
export const editContact = createApiActions(EDIT_CONTACT);