import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component.jsx';
import ExerciseList from './components/exercise/exercise-list.component.jsx';
import EditExercise from './components/exercise/edit-exercise.component';
import CreateExercise from './components/exercise/create-exercise.component';
import CreateUser from './components/user/create-user.component.jsx';
import UsersList from './components/user/users-list.component.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar />
                    <br />
                    <Route path="/" exact component={ExerciseList} />
                    <Route path="/editExercise/:id" component={EditExercise} />
                    <Route path="/createExercise" component={CreateExercise} />
                    <Route path="/createUser" component={CreateUser} />
                    <Route path="/usersList" component={UsersList} />
                </div>
            </Router>
        )
    }
}

export default App;