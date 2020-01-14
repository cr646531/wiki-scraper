import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from './store';


export default class Links extends Component {

    constructor() {
        super();
        this.state = {
            start: ''
        };

        this.onChange = this.onChange.bind(this);
        // this.onSave = this.onSave.bind(this);
    }

    onChange(ev) {
        this.setState({[en.target.start]: ev.target.value});
    }

    // onSave(ev) {
    //     ev.preventDefault();
    //     console.log('save');
    // }

    render() {
        const { start } = this.state;

        return (
            <form>
            {/* <form onSubmit = { onSave }> */}
                <input name="start" value={start} onChange={this.onChange} />
                <button>Update</button>
            </form>
        )
    }
}