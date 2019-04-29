import React,{Component} from 'react';

//this component is used to display form for adding new employee
export default class AddEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            name : '',
            userId : '',
            performance : ''
        };
    }
    //used to change name of textbox
    changeName = (event) => {
        this.setState({
            name : event.target.value
        });
    }
    
    //used to change usedId of textbox
    changeUserId = (event) => {
        this.setState({
            userId : event.target.value
        });
    }
    
    //used to change performance of textbox
    changePerformance = (event) => {
        this.setState({
            performance : event.target.value
        });
    }
    
    //this method used to call when used click on add employee and it will add new employee in database.
    addEmployee = () => {
        if(this.state.userId!=="" && this.state.name!=="" && this.state.performance!==""){
        let employee ={
            userId : this.state.userId,
            performance : this.state.performance,
            name : this.state.name,
            feedbacks : [],
            pendingAsignee : []
        };
        fetch("https://localhost:3000/addEmployee",{
            method :"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                employee : employee
            })
        })
        .then(res=>res.json())
        .then(res=>{
             if(res.success){
                this.props.fetchEmployees();
            }
        })
        }
    }
    
    render(){
        //it will display form to add employee
        return <div className="login-form">
            <form>
                <span>Employee Name : </span>
                <input type="text" className="form-control" value={this.state.name} onChange={this.changeName}/>
                <span>Employee Id : </span>
                <input type="text" className="form-control" value={this.state.userId} onChange={this.changeUserId}/>
                <span>Performace : </span>
                <input type="text" className="form-control" value={this.state.performance} onChange={this.changePerformance}/>
                <button className="btn btn-primary" onClick={this.addEmployee} >Add Employee</button>
            </form>
        </div>
    }
}