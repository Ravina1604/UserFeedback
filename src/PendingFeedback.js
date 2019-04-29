import React,{Component} from 'react';

//This component is used to show all pending Performance Review that require feedback
export default class PendingFeedback extends Component{
    constructor(props){
        super(props);
        this.state={
            feedback : '',
            showFeedbackForm : false
        };
    }
    
    //used to open feedback when user click on buttom to assign employee for feedback
    openFeedbackForm = () => {
        this.setState({
            showFeedbackForm : true
        });
    }
    
    //used to chnage the value of feedbck textarea
    updateFeedback = (event) => {
        this.setState({
            feedback : event.target.value
        })
    }
    
    //used to call when user click on submit button and it will update database accordigly.
    submitFeedback = (event) => {
        let employee=this.props.employee.pendingAsignee[Number(event.target.getAttribute("data-val"))];
        let feedback = {
            feedback : this.state.feedback,
            assignee : this.props.employee.name
        };
        fetch("https://localhost:3000/submitFeedback",
        {
            method :"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                employeeId : employee.userId,
                feedback : feedback,
                assigneeId : this.props.employee.userId
            })
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                this.setState({
                    showFeedbackForm : false,
                    feedback : ''
                },()=>{
                    this.props.fetchEmployee();
                });
            }
        });
    }
    
    render(){
        //conditional rendering to show whether all pending employees to give feedback or to show feedback form
        return  (<React.Fragment>{
                !this.state.showFeedbackForm ?
                <ul className="employee-list">
                    {
                    this.props.employee.pendingAsignee && this.props.employee.pendingAsignee.map((employee,index)=>{
                            return <li key={"pEmployee"+index}
                                className="list-item"
                            >
                                <a className="link" className="bold-font">{employee.name}({employee.userId})</a>
                                <button className="btn btn-primary btn-sm show-button"
                                data-val={index}
                                onClick={this.openFeedbackForm}
                                >Give Feedback</button>
                            </li>
                    })
                    }
                </ul> :
                <div className="feedback-box">
                    <textarea className="form-control" onBlur={this.updateFeedback}>
                    </textarea>
                    <button onClick={this.submitFeedback} className="btn btn-primary custom-button">Submit Feedback</button>
                </div>}
        </React.Fragment>)
    }
}