import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

class BirthdayTodayTemp extends Component {

    render(){
        const { contacts } = this.props;
        let birthdayBoys = ( contacts && contacts.length ) ?
            contacts.reduce((arr, item) => {
                if (moment(item.birthday).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
                    arr.push(`${item['surname']} ${item['name']}`);
                }
                return arr
            }, []) : [];
        return(
            <div className="birthday-boys">
                {( birthdayBoys && birthdayBoys.length ) ? birthdayBoys.map( (item, index) =>
                    <div className="birthday-boys-item" key={index}>
                        <h6>{item}</h6>
                    </div>
                    ) : 'Today not birthdayBoys'
                }
            </div>
        )
    }
}

BirthdayTodayTemp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({}))
};

function mapStateToProps(state) {
    return {
        contacts: state.contacts.list,
    };
}

export const BirthdayToday = connect(
    mapStateToProps
)(BirthdayTodayTemp);

