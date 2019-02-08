import {
    MODAL_CLOSE,
    MODAL_ADD,
    MODAL_EDIT
} from './contactForm.types';

export function addModal() {
    return { type: MODAL_ADD };
}

export function closeModal() {
    return { type: MODAL_CLOSE };
}

export function editContact(contact) {
    return { type: MODAL_EDIT, contact: contact };
}