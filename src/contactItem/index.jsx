import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.css';

class ContactItem extends Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit() {
        this.props.onEdit(this.props.info);
    }

    onDelete() {
        this.props.onDelete(this.props.info.key);
    }

    render(){
        const { info } = this.props;
        return (
            <div className="contact-body">
                <p className="contact-field"><span>First Name:</span> {info.name}</p>
                <p className="contact-field"><span>Last Name:</span> {info.surname}</p>
                <p className="contact-field"><span>Birthday:</span> {moment(info.birthday).format("DD/MM/YYYY")} </p>
                <p className="contact-field"><span>Phones:</span>
                    {( info.phones && info.phones.length ) ? info.phones.map( (item, index) =>
                        <div className="phones-item" key={index}>
                            {item.phone} <i className="contact-category">{item.category}</i>
                        </div>
                    ) : 'Not found'
                    }
                </p>
                <div className="buttons-wrapper">
                    <button className="button" onClick={this.onEdit}>Edit</button>
                    <button className="button" onClick={this.onDelete}>Delete</button>
                </div>
            </div>
        )
    }
}

ContactItem.propTypes = {
    info: PropTypes.shape({})
};

export default ContactItem;