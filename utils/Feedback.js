"use strict";
import React from 'react';
import css from './feedback.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { feedback } from '../actions/actionCreators';
import Snackbar from 'material-ui/Snackbar';



export class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.feedback(undefined, "");
    }

    render() {
        return (
            <Snackbar
              className={css.snackbar}
              open={!!this.props.status}
              message={<span className={css.message}>{this.props.message}</span>}
              onRequestClose={this.close}
              autoHideDuration={4000}
              bodyStyle={{height: '100px'}}
            />
        );
    }
}


Feedback.defaultProps = {
    status: undefined,
    message: "",
};

const mapStateToProps = (state) => {
    return {
        status: state.feedback.status,
        message: state.feedback.message || "",
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ feedback }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

