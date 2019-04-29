//this method is used to seed the databse with initialvalue whenver server starts(It is just for demo
var mongoose=require("mongoose");
var Employee=require("./models/employee");
var Feedback=require("./models/feedback");

//initial data
var employees=[
    {
        userId : "Ravina123",
        name : "ravina",
        performance : "Brilliant Employee"
    },
    {
        userId : "John123",
        name : "John",
        performance : "Average Employee"
    },
    {
        userId : "Kat123",
        name : "Kat",
        performance : "Really good Employee"
    }
]

function seedDB(){
    Employee.remove({},(err)=>{
        if(err){
            console.log("Error Ocuured",err);
        }
        
        employees.forEach((employee)=>{
            Employee.create(employee,(err,newEmployee)=>{
                if(err){
                    console.log("Error Ocuured",err);
                }
                else{
                    console.log("Employee added");
                    Feedback.create({
                        feedback : "Yes this is correct",
                        assignee : "ravina"
                    },(err,feedback)=>{
                        if(err){
                            console.log("Error Ocuured",err);
                        }
                        else{
                            newEmployee.feedbacks.push(feedback);
                            newEmployee.save();
                        }
                    })
                    
                    
                }
                
            })
        })
    })
}

module.exports=seedDB;