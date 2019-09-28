import React, { Component } from 'react';
import axios from 'axios';
import { environmentVar } from '../../environment';
import User from './user.component.jsx';

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersList: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        axios.get(`${environmentVar.url}users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        usersList: response.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUser = id => {
        axios.delete(`${environmentVar.url}users/deleteUser/${id}`)
            .then(response => {
                if (response.data.status === true) {
                    this.getUsers();
                } else {
                    alert('Error deleting the user');
                }
            });
    }


    usersList() {
        return this.state.usersList.map(currentuser => {
            return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
