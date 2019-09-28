import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { environmentVar } from '../../environment';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',
            date: new Date(),
            duration: '',
            users: []
        }
    }

    // Not working
    // buildUsersDropdown() {
    //     this.state.users.map(element => {
    //         return <option key={element._id} value={element.userName}>{element.userName}</option>;
    //     });
    // }

    componentDidMount() {
        axios.get(`${environmentVar.url}users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data
                    });
                    // this.buildUsersDropdown();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUserName = e => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = e => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({
            date
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post(`${environmentVar.url}exercise/addExercise`, exercise)
            .then(res => {
                if (res.data.status === true) {
                    alert('Exercise created Successfully');
                    this.setState({
                        username: '',
                        description: '',
                        duration: '',
                        date: new Date()
                    });
                    this.props.history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                            <option value="">Select User</option>
                            {this.state.users.map(e => {
                                return <option key={e._id} value={e.userName}>{e.userName}</option>;
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
