import { injectReducer } from '../utils';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT
} from './contactsList.types';

const INITIAL_STATE = {
    list: []
};

export default injectReducer(INITIAL_STATE, {
    [GET_CONTACTS.REQUEST]: state => ({
        ...state,
        isLoading: true,
    }),
    [GET_CONTACTS.SUCCESS]: (
        state,
        { payload: data  }
    ) => ({
        ...state,
        isLoading: false,
        list: data
    }),
    [ADD_CONTACT.SUCCESS]: (
        state,
        { payload }
    ) => (
        {
        ...state,
        list: [...state.list,
            Object.assign({...payload}, { key: (state.list.length) ? (state.list[state.list.length - 1].key + 1) : 1 }) ]
    }),
    [EDIT_CONTACT.SUCCESS]: (
        state,
        { payload : contact }
    ) => ({
        ...state,
        list: [...state.list.map((item) => {
            if (item.key === contact.key) {
                return Object.assign({}, contact);
            }
            return item;
        })]
    }),
    [DELETE_CONTACT.SUCCESS]: (
        state,
        { payload: index }
    ) => ({
        ...state,
        list: [...state.list.filter(item => index !== item.key)]
    }),
});


