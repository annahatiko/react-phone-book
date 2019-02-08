import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import * as contactActions from './contactsList.action';
import * as modalActions from '../contactForm/contactForm.action';
import ContactItem  from '../contactItem';
import ContactForm  from '../contactForm';
import { BirthdayToday }  from '../birthdayToday';
import './styles.css';

class ContactsListTemp extends Component {
    constructor(props) {
        super(props);

        this.handleAddContact = this.handleAddContact.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillMount() {
        this.props.contactActions.getContacts();
    }

    handleAddContact() {
        this.props.modalActions.addModal();
    }

    onEdit(contact) {
        this.props.modalActions.editContact(contact);
    }

    onDelete(contact) {
        this.props.contactActions.deleteContact(contact);
    }

    render() {
        const { contacts, isOpen, contact } = this.props;
        return (
            <div className="contact-book">
                <h1 className="main-title">PhoneBook</h1>
                <button className="button" onClick={this.handleAddContact}>+ Add contact</button>
                <hr/>
                <div className="main-wrapper">
                    <div className="contacts-list">
                        {(contacts && contacts.length) ? contacts.map( item =>
                            <ContactItem key={item.key} info={item} onDelete={this.onDelete} onEdit={this.onEdit}/>
                        ) : 'Empty book'
                        }
                    </div>
                    <div className="notices-list">
                        <h6>Today birthday's mans:</h6>
                        <BirthdayToday/>
                    </div>
                </div>
                <ContactForm isOpen={isOpen} contact={contact}/>
            </div>
        );
    }
}

ContactsListTemp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({})),
    contactActions: PropTypes.object,
    modalActions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        contacts: state.contacts.list,
        isOpen: state.modalInfo.isOpen,
        contact: state.modalInfo.contact
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
        contactActions: bindActionCreators(contactActions, dispatch)
    };
}

export const ContactsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsListTemp);


