import React,{Component} from 'react';

//This component is used to show all employees in list form.
export default class Employees extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        //display all employees with show more(to show more information of employee) and remove button(to remove detail of particular employee)
        return (<div className="container-fluid">
                    <h1 style={{textAlign :"center"}}>All Employees : </h1>
                    <ul className="employee-list">
                    {
                        this.props.employees.map((employee,index)=>{
                            return <li key={"employee"+index}
                                className="list-item"
                            >
                                <a className="bold-font">{employee.name}</a><br/>
                                <span><span className="bold-font">Performance: </span>{employee.performance}</span>
                                <button className="btn btn-primary btn-sm show-button"
                                data-val={index}
                                onClick={this.props.showMore}
                                >Show More</button>
                                {employee.userId !=="Ravina123" ? <button className="btn btn-primary btn-sm remove-button"
                                data-val={index}
                                onClick={this.props.removeEmployee}
                                >Remove Employee</button> : ""}
                            </li>
                        })
                    }
                    </ul>
        </div>);
    }
}
