import {
    MODAL_CLOSE,
    MODAL_ADD,
    MODAL_EDIT
} from './contactForm.types';

const INITIAL_STATE = {
    isOpen: false,
    contact: {}
};

export default function modal(state = INITIAL_STATE, action) {
    switch (action.type) {
        case MODAL_CLOSE:
            return Object.assign({}, state, { isOpen: false });
        case MODAL_ADD: {
            return Object.assign({},
                state,
                {
                    isOpen: true,
                    contact: Object.assign({}, INITIAL_STATE.contact)
                });
        }
        case MODAL_EDIT: {
            return Object.assign({},
                state,
                {
                    isOpen: true,
                    contact: Object.assign({}, action.contact)
                });
        }
        default: return state;
    }
}