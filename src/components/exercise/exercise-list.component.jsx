import React, { Component } from 'react';
import axios from 'axios';
import { environmentVar } from '../../environment';
import Exercise from './exercise.component.jsx';

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exerciseList: []
        }
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises = () => {
        axios.get(`${environmentVar.url}exercise/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        exerciseList: response.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise = id => {
        axios.delete(`${environmentVar.url}exercise/deleteExercise/${id}`)
            .then(response => {
                if (response.data.status === true) {
                    this.getExercises();
                } else {
                    alert('Error deleting the exercise');
                }
            });
    }


    exerciseList() {
        return this.state.exerciseList.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
