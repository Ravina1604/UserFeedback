import React,{Component} from 'react';

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        //show header in all web pages
        return (<nav className="navbar navbar-custom">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Feedback App</a>
                    </div>
                    <a href="/" style={{color:"white"}}>Logout</a>
                </div>
            </nav>);
    }
}