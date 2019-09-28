import React from 'react';

const User = props => {
    return (
        <tr>
            <td>{props.user.userName}</td>
            <td>
                <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
            </td>
        </tr>
    );
};

export default User;