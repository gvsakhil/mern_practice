import React, { Component } from 'react';
import axios from 'axios';
import { environmentVar } from '../../environment';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    onChangeUserName = e => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        axios.post(`${environmentVar.url}Users/addUser`, user)
            .then(res => {
                if (res.data.status === true) {
                    alert('User created Successfully');
                    this.setState({
                        username: ''
                    });
                    this.props.history.push("/usersList");
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
