import React, { Component } from 'react';

export class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '', 
            error: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    submit = () => {
        const {value } = this.state
        const { saveData } = this.props
        if (!value) {
            this.setState({
                error: 'Value must not empty'
            })
            return;
        }

        saveData(value);
    }

    render() {
        const {value, error } = this.state
        return (
            <div>
                {error && <div style={{color: 'red'}} className="errrorClass">Error : {error}</div>}
                <div>
                    <textarea value={value} onChange={this.handleChange}></textarea>
                </div>
                <button onClick={this.submit}>Save</button>

            </div>
        );
    }
}

export default AddForm;
