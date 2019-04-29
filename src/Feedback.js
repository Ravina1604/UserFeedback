import React,{Component} from 'react';
import UpdateEmployee from './UpdateEmployee';
//this component is used to show all feedbacks given for performance and to assign new employee for feedback
export default class Feedback extends Component{
    constructor(props){
        super(props);
        this.state={
            openForm : false,
            assigneeId : '',
            filteredEmployees : props.employees.filter((employee)=> employee.userId!==this.props.selEmployee.userId),
            updateEmployee : false
        }
    }
    
    //this component is used to filter out the employees to show in dropdown which is used as assignee for feedback of performance review.
    componentDidMount(){
        let filteredEmployees=this.state.filteredEmployees;
        this.props.selEmployee.pendingAsignee.map((assignee)=>{
            filteredEmployees = filteredEmployees.filter((employee)=> employee.userId!==assignee.userId)
        });
        
        this.setState({
            filteredEmployees
        });
    }
    
    //this methos is used to open form for assigning emloyee to give feedback for performance review.
    openForm = () => {
        this.setState({
            openForm : true
        });
    }
    
    //this method is used to call when user click on assign button and it assign emloyee performace to assignee to give feedback in database
    assignEmployee =() => {
        let filteredEmployees=this.state.filteredEmployees;
        fetch("https://localhost:3000/assignEmployee",
        {
            method :"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                employeeId : this.props.selEmployee.userId,
                assigneeId : this.state.assigneeId
            })
        })
        .then(res=>res.json())
        .then(res=>{
            filteredEmployees=filteredEmployees.filter((employee)=>employee.userId!==res.employee.userId);
            this.setState({
                openForm : false,
                filteredEmployees,
                assigneeId : ''
            },()=>{
                this.props.fetchEmployees();
            });
        })
    }
    
    //used to update assigneeId when user chnage it in dropdown.
    handleChange = (event) => {
        this.setState({
            assigneeId : event.target.value
        });
    }
    
    //used to open update employe form
    openUpdateEmployee = () => {
        this.setState({
            updateEmployee : true
        });
    }
    
    //used to close update employe form
    closeUpdateEmployee = () => {
        this.setState({
            updateEmployee : false
        });
    }
    
    render(){
        //takes care of conditional rendering of components(such as feedbacks of employee or assignee form to assign employee to give feedback
        // or to show update employee form )
        return (<div className="container-fluid p-0">
                    <div className="feedback-header">
                    <h1>Employee : {this.props.selEmployee.name} ({this.props.selEmployee.userId})</h1>
                    <span>Performance: {this.props.selEmployee.performance}</span>
                    </div>
                    <div className="update-nav">
                        <button className="btn btn-primary header-button" onClick={this.props.showEmployees}>Show All Employees</button>
                        <button className="btn btn-primary header-button" onClick={this.openForm}>Assign Employee for feedback</button>
                        <button className="btn btn-primary header-button" onClick={this.openUpdateEmployee}>Update Employee</button>
                    </div>
                    <hr/>
                    {
                        !this.state.updateEmployee ?
                        !this.state.openForm ?
                        <div>
                            
                            <h2 style={{textAlign : "center"}}>Feedbacks from Employees for performance review:</h2>
                            <ul className="employee-list">
                                {
                                    this.props.selEmployee.feedbacks && this.props.selEmployee.feedbacks.map((feedback,index)=>{
                                        return <li key={"feedback"+index} className="list-item">
                                            <span>{feedback.feedback}</span><br/>
                                            <span><span className="bold-font">Asignee </span>- {feedback.assignee}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </div> :
                        <div className="assign-box">
                            <select className="form-control" value={this.state.assigneeId} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {
                                    this.state.filteredEmployees.map((employee,index)=>{
                                        return <option value={employee.userId} key={"emp"+index}>
                                            {employee.name} ({employee.userId})
                                        </option>
                                    })
                                }
                            </select>
                            <button className="btn btn-primary" style={{margin:"10px 40%"}} onClick={this.assignEmployee}>Assign</button>
                        </div> :
                        <UpdateEmployee
                            employee={this.props.selEmployee}
                            fetchEmployees={this.props.fetchEmployees}
                            closeUpdateEmployee={this.closeUpdateEmployee}
                        />
                    }
        </div> );
    }
}
