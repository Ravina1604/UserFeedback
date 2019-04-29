import React from 'react';
import Header from './Header';
import PendingFeedback from './PendingFeedback';

//This Compoennt get rendered when user logs into the applicaton
export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            employee : {},
            showPendingAsignee : false
        }
    }
    
    //fetch particular employee once compoennt get rendered
    componentDidMount(){
        this.fetchEmployee();
    }
    
    //used to fetch of employee whenver new data get added to particular employee
    fetchEmployee = () => {
        fetch(`https://localhost:3000/getEmployeeById?userId=${this.props.match.params.userId}`,{method :"get"})
        .then(res=>res.json())
        .then(res=>{
            console.log(JSON.stringify(res));
            this.setState({
                employee : res.employee,
                //showPendingAsignee : false
            });
        })
    }

    //used to take control of visibilty of feedback section and pending Assignee section of an employee
    openPendingAsignee = (event) => {
        event.preventDefault();
        this.setState({
            showPendingAsignee : true
        });
    }
    
    //used to take control of visibilty of feedback section and pending Assignee section of an employee
    showFeedback = () => {
        this.setState({
            showPendingAsignee : false
        });
    }

    render(){
        //takes care of conditional rendering of all compoennts(such as to show all feedbacks of employee or all pending employee who requires feedback 
        // from employee)
        let {employee,showPendingAsignee}=this.state;
        return <div>
            <Header/>
            <div className="feedback-header">
                <h1>Hello {employee.name}</h1>
                <span>Performace : {employee.performance}</span>
            </div>
            <div style={{margin:"10px 10%"}}>
                <span>Click this link to show Pending 
                    <a className="link" href="" onClick={this.openPendingAsignee}>List of Performace review requiring feedback</a>
                </span>
                <button onClick={this.showFeedback} className="btn btn-primary header-button">Show Feedbacks</button>
            </div>
            <hr/>
            {
                !showPendingAsignee ?
                    <div>
                        <h2 style={{textAlign : "center"}}>Feedbacks From Employees for your performance</h2>
                        <ul className="employee-list">
                            {
                                employee.feedbacks && employee.feedbacks.map((feedback,index)=>{
                                    return <li className="list-item" key={"feedback"+index}>
                                        {feedback.feedback}
                                    </li>
                                })
                            }
                        </ul>
                    </div> :
                <PendingFeedback
                    employee={employee}
                    fetchEmployee={this.fetchEmployee}
                    openFeedbackForm={this.openFeedbackForm}
                    showFeedbackForm = {this.state.showFeedbackForm}
                />
            }
        </div>
    }
}