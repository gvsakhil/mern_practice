import React from 'react';

const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.userName}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    );
};

export default Exercise;