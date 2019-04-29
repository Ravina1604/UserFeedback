import React,{Component} from 'react';

//this component is used to display form for updating existing employee
export default class UpdateEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            name : props.employee.name,
            userId : props.employee.userId,
            performance : props.employee.performance
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
    
    //this method used to call when used click on update employee and it will update existing employee in database.
    updateEmployee = (event) => {
        event.preventDefault();
        if(this.state.userId!=="" && this.state.name!=="" && this.state.performance!=="" &&
            (this.state.userId!==this.props.employee.userId || this.state.name!==this.props.employee.name ||
            this.state.performance !== this.props.employee.performance)
        ){
        let employee ={
            userId : this.state.userId,
            performance : this.state.performance,
            name : this.state.name
        };
        
        fetch("https://localhost:3000/updateEmployee",{
            method :"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                employee : employee,
                userId : this.props.employee.userId
            })
        })
        .then(res=>res.json())
        .then(res=>{
             if(res.success){
                 this.props.closeUpdateEmployee();
                this.props.fetchEmployees();
            }
        })
        }
    }
    
    render(){
        //display form for updating employee with it's field
        return <div className="login-form">
            <form>
                <span>Employee Name : </span>
                <input type="text" className="form-control" value={this.state.name} onChange={this.changeName}/>
                <span>Employee Id : </span>
                <input type="text" className="form-control" value={this.state.userId} onChange={this.changeUserId}/>
                <span>Performace : </span>
                <input type="text" className="form-control" value={this.state.performance} onChange={this.changePerformance}/>
                <button className="btn btn-primary" onClick={this.updateEmployee} >Update Employee</button>
            </form>
        </div>
    }
}