import React from 'react';


//Login component is used for login of the employee
class Login extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            userId : '',
            validId : true
        }
        
        this.login=this.login.bind(this);
        this.changeUserId=this.changeUserId.bind(this);
    }
    
    //used to chnage the user id when user write it in textbox
    changeUserId = (event) => {
        this.setState({
            userId : event.target.value
        });
    }

    //used to call when user click on login button and verify user by looking into database
    login(){
        let validId=this.state.validId;
        fetch(`https://localhost:3000/verifyId?userId=${this.state.userId}`,{method :"get"})
        .then(res=>res.json())
        .then(res=>{
            if(res.employee.length!==0){
                validId=true
                if(res.employee[0].userId==="Ravina123"){
                    this.props.history.push('/admin');
                }
                else{
                    this.props.history.push(`/${res.employee[0].userId}`);
                }
            }
            else{
                validId=false;
                this.setState({
                    validId
                })
            }
            
        });
    }


    render(){
        //display login form
        return <div className="login-form">
            <form>
                <span>Usename : </span>
                <input type="text" value={this.state.userName} className="form-control" onBlur={this.changeUserId} name="userName" placeholder="User Name"/>
                { !this.state.validId ? <span style={{color :"red"}}>Please Enter Correct UserId</span> : ""}
                <input type="button" className="btn btn-primary custom-button" value="Login" onClick={this.login}/>
            </form>
        </div>
    }
}

export default Login;