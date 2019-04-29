import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import User from './User';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';

// Starting Component to control routing of application
class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        //router to take care of rendering of component according to url
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/admin" component={Admin}/>
                    <Route exact path="/:userId" component={User}/>
                </Switch>
            </Router>
        );
    }
}
export default App;