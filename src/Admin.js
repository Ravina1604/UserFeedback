import React from 'react';
import Employees from './Employees';
import Feedback from './Feedback';
import Header from './Header';
import AddEmployee from './AddEmployee';

//This componentn get rendered when admin logs in into the system.
export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            employees:[],
            selEmployee : {},
            showEmployee : false,
            showAddEmployee : false
        }
    }
    
    //this method called to fetch all employee when component get mounted.
    componentDidMount(){
        this.fetchEmployees();
    }
    
    //this method used to fetch all employee whenever there is any chaanges of data for any employee
    fetchEmployees = () =>{
         fetch("https://localhost:3000/employees",{method :"get"})
        .then(res=>res.json())
        .then(res=>{
            //console.log(JSON.stringify(res));
            this.setState({
                employees : res.employees
            });
        })
    }

    //this method used to display particular employee information when user clicks show more button
    showMore = (event) =>{
        let employee=this.state.employees[Number(event.target.getAttribute("data-val"))];
        this.setState({
            selEmployee : employee,
            showEmployee : true
        });
    }
    
    //this method is used to show all employee 
    showEmployees = ()=>{
        this.setState({
            selEmployee : {},
            showEmployee : false
        });
    }
    
    //this metod is used to open form for addin new employee if admin wants to add.
    openAddEmployee = () => {
        this.setState({
            showAddEmployee : true
        })
    }
    
    //tis method will remove particular employee from all employees.
    removeEmployee = (event) => {
        let employee=this.state.employees[Number(event.target.getAttribute("data-val"))];
        fetch(`https://paypay-ravina1604.c9users.io/removeEmployee?userId=${employee.userId}`,{method :"get"})
        .then(res=>res.json())
        .then(res=>{
            //console.log(JSON.stringify(res));
            if(res.success){
                this.fetchEmployees();
            }
        })
    }

    render(){
        //takes care of conditional rendering of which section to show(all employees, particular employee detail or add employee form)
        return <div>
            <Header/>
             
            {
                !this.state.showAddEmployee ?
                this.state.showEmployee ?
                <Feedback
                    selEmployee={this.state.selEmployee}
                    employees={this.state.employees}
                    showEmployees={this.showEmployees}
                    fetchEmployees = {this.fetchEmployees}
                /> : 
                <React.Fragment>
                    <div className="nav">
                       <button className="btn btn-primary header-button" onClick={this.showEmployees}>Show All Employees</button>
                        <button className="btn btn-primary header-button" onClick={this.openAddEmployee}>Add Employee</button>
                    </div>
                    <hr/>
                    <Employees
                        employees={this.state.employees}
                        showMore={this.showMore}
                        removeEmployee = {this.removeEmployee}
                    />
                </React.Fragment> :
                <AddEmployee
                    fetchEmployees={this.fetchEmployees}
                />
            }
        </div>
    }
}