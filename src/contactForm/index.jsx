import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as contactActions from '../contactList/contactsList.action';
import * as modalActions from './contactForm.action';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: Object.assign({}, props.contact),
            defaultPhoneOption: 'work',
            errors: null
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.handleAddPhone = this.handleAddPhone.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ contact: Object.assign({}, nextProps.contact), errors: null});
    }

    handleInput(event) {
        const field = event.target.name;
        let contact = Object.assign({}, this.state.contact);
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g,'');
        contact[field] = event.target.value;
        return this.setState({ contact: contact });
    }

    handleInputPhone(event, index) {
        event.target.value = event.target.value.replace(/[^0-9]/g,'');
        let phone = event.target.value;

        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones:
                        this.state.contact.phones.slice(0, index)
                            .concat([{
                                ...this.state.contact.phones[index],
                                phone: phone
                            }])
                            .concat(this.state.contact.phones.slice(index + 1))
                }) });

    }

    handleChangeOption(event, index) {
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g,'');
        let phoneOption = event.target.value;
        let phones = this.state.contact.phones.slice(0, index)
            .concat([{
                ...this.state.contact.phones[index],
                newOption: phoneOption
            }])
            .concat(this.state.contact.phones.slice(index + 1));
        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones: phones
                }) });
    }

    handleDatePicker(date) {
        let contact = Object.assign({}, this.state.contact);
        contact['birthday'] = date;
        return this.setState({ contact: contact });
    }

    handleChangeCategory(event, index) {
        let phoneOption = event.target.value;
        let phones = this.state.contact.phones.slice(0, index)
            .concat([{
                ...this.state.contact.phones[index],
                category: phoneOption
            }])
            .concat(this.state.contact.phones.slice(index + 1));
        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones: phones
                }) });
    }

    handleSubmit(index) {
        let newOption = [...this.state.contact.phones][index].newOption;
        const newOptionsList = JSON.parse(localStorage.getItem('phoneCategories'));

        if (newOption) {
            if (newOptionsList.indexOf(newOption) === -1) { newOptionsList.push(newOption)}
            let phones = this.state.contact.phones.slice(0, index)
                .concat([{
                    ...this.state.contact.phones[index],
                    isCreateOption: false,
                    newOption: '',
                    category: newOption
                }])
                .concat(this.state.contact.phones.slice(index + 1));

            localStorage.setItem('phoneCategories', JSON.stringify(newOptionsList));
            this.setState({ contact: Object.assign({}, this.state.contact,
                    {
                        phones: phones
                    }) });
        } else {
            let phones = this.state.contact.phones.slice(0, index)
                .concat([{
                    ...this.state.contact.phones[index],
                    isCreateOption: false,
                    newOption: ''
                }])
                .concat(this.state.contact.phones.slice(index + 1));
            this.setState({ contact: Object.assign({}, this.state.contact,
                    {
                        phones: phones
                    }) });
        }
    }

    showCreateOption(index) {
        let phones = this.state.contact.phones.slice(0, index)
            .concat([{
                ...this.state.contact.phones[index],
                isCreateOption: true
            }])
            .concat(this.state.contact.phones.slice(index + 1));
        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones: phones
                }) });
    }

    isEditMode() {
        return this.state.contact.hasOwnProperty("key");
    }

    onCancel() {
        this.props.modalActions.closeModal();
    }

    checkForEmptyInput() {
        let errors = {};
        let countErrors = 0;
        let { name, surname, birthday, phones } = this.state.contact;

        if (!name) {
            errors.name = "Parameter is required";
            countErrors += 1;
        }

        if (!surname) {
            errors.surname = "Parameter is required";
            countErrors += 1;
        }

        if (!birthday) {
            errors.birthday = "Parameter is required";
            countErrors += 1;
        }

        if (!phones || !phones.length) {
            errors.notPhones = "You must specify at least one phone";
            countErrors += 1;
        } else {
            let errorsPhones = phones.reduce((arr, item, index) => {
                if(!item.phone) {
                    arr[index] = "Enter the phone number";
                    countErrors += 1;
                }
                return arr
            }, []);

            errors.phones = errorsPhones;
        }

        return (countErrors) ? errors : null;
    }

    onSave() {
        let errors = this.checkForEmptyInput();

        if (errors != null) {
            this.setState({ errors: errors });
        }
        else {
            this.props.modalActions.closeModal();

            if (this.isEditMode())
                this.props.contactActions.editContact(this.state.contact);
            else
                this.props.contactActions.addContact(this.state.contact);
        }
    }

    handleAddPhone(){
        const { contact, defaultPhoneOption } = this.state;
        let newIndex;
        if (!contact.phones) {
            contact.phones = [];
        }
        newIndex = contact.phones.length;
        let phones = this.state.contact.phones.slice()
            .concat([{
                ...this.state.contact.phones[newIndex],
                key: newIndex,
                phone: '',
                category: defaultPhoneOption,
                isCreateOption: false,
                newOption: ''
            }]);

        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones: phones
                }) });
    }

    handleDeletePhone(key) {
        let phones = this.state.contact.phones.slice();
        let indexElem = phones.findIndex(item => item.key===key);
        phones.splice(indexElem, 1);

        return this.setState({ contact: Object.assign({}, this.state.contact,
                {
                    phones: phones
                }) });
    }
    buildPhoneFieldUpdate(i){
        let { contact } = this.state;
        let options = JSON.parse(localStorage.getItem('phoneCategories'));

        let optionsArr = options.reduce((arr, item, index) => {
            arr.push(<option key={index} selected={item === contact.phones[i].category} value={item}>{item.toUpperCase()}</option>);
            return arr
        }, []);

        return optionsArr;
    }

    buildPhoneField(){
        let { contact, defaultPhoneOption , errors } = this.state;
        let options = JSON.parse(localStorage.getItem('phoneCategories'));

        let optionsArr = options.reduce((arr, item, index) => {
            arr.push(<option key={index} selected={item === defaultPhoneOption} value={item}>{item.toUpperCase()}</option>);
            return arr
        }, []);

        return(
            (contact.phones && contact.phones.length) ? contact.phones.map((item, index) =>
                <div key={index}>
                    <div className="phone-wrapper">
                        <div className="phone-category">
                            <select className={`${contact.phones[index].isCreateOption ? 'hide' : 'show'} select-create`}
                                    onChange={(e) => this.handleChangeCategory(e, index)}
                            >
                                { this.isEditMode() ? this.buildPhoneFieldUpdate(index) : optionsArr }
                            </select>
                            <button
                                className={contact.phones[index].isCreateOption ? 'hide' : 'show'}
                                onClick={() => this.showCreateOption(index)}
                            >
                                +
                            </button>
                            <div className={contact.phones[index].isCreateOption ? 'show' : 'hide'}>
                                <input
                                    type="text"
                                    className="input-create"
                                    placeholder="type category"
                                    pattern="^[a-zA-Z]+$"
                                    value={contact.phones[index].newOption}
                                    onChange={(e) => this.handleChangeOption(e, index)}
                                />
                                <button className="button-add" onClick={() => this.handleSubmit(index)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="phone-number">
                            <input
                                onChange={(e) => this.handleInputPhone(e, index)}
                                value={contact.phones[index].phone}
                                placeholder="type phone"
                                type="tel"
                                name="phone"
                                pattern="^[ 0-9]+$"
                                maxLength="12"
                            />
                            {errors && errors.phones && <span className="form-error">{errors.phones[index]}</span>}
                        </div>

                        <button className="button button-delete" onClick={() => this.handleDeletePhone(contact.phones[index].key)}>+</button>
                    </div>
                </div>
            ) : ''
        )
    }

    render(){
        const { contact, errors } = this.state;
        return (
            <Modal isOpen={this.props.isOpen}>
                <div className="popup">
                    <h4 className="popup-title">{this.isEditMode() ? 'Update' : 'Create'} contact</h4>
                    <label>
                        <span className="form-field">Firstname:</span>
                        <input type="text"
                               name="name"
                               placeholder="type firstname"
                               pattern="^[a-zA-Z]+$"
                               value={contact.name}
                               onChange={this.handleInput}
                        />
                        {errors && errors.name && <span className="form-error">{errors.name}</span>}
                    </label><br/>
                    <label>
                        <span className="form-field">Lastname:</span>
                        <input type="text"
                               name="surname"
                               placeholder="type lastname"
                               pattern="^[a-zA-Z]+$"
                               value={contact.surname}
                               onChange={this.handleInput}
                        />
                        {errors && errors.surname && <span className="form-error">{errors.surname}</span>}
                    </label><br/>
                    <label>
                        <span className="form-field">BirthDay:</span>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={ contact.birthday }
                            onChange={this.handleDatePicker}
                            name="birthday"
                        />
                        {errors && errors.birthday && <span className="form-error">{errors.birthday}</span>}
                    </label><br/>
                    <label>
                        Phones
                        <div>
                            { this.buildPhoneField() }
                            {errors && errors.notPhones && <span className="form-error">{errors.notPhones}</span>}
                            <button className="button add-another-phone" onClick={this.handleAddPhone}>Add phone</button>
                        </div>
                    </label>
                    <hr/>
                    <div className="popup-buttons">
                        <button className="button" onClick={this.onSave} > {this.isEditMode() ? 'Update' : 'Create'}</button>
                        <button className="button" onClick={this.onCancel} >Cancel</button>
                    </div>
                </div>
            </Modal>
        )
    }
}

ContactForm.propTypes = {
    isOpen: PropTypes.bool,
    contact: PropTypes.shape({}),
    contactActions: PropTypes.object,
    modalActions: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
        contactActions: bindActionCreators(contactActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);