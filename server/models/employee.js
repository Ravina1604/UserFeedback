// this file is schema of employee present in database
// each key represents as below:
// userId => Id to identify each employee uniquely
// name => name of employee
// performance => Perofmance review given to employee
// feedbacks => feedbacks received from employees
// pendingAsignee => list of all employees which require feedback for their performace review(this is assgined by admin)
var mongoose=require("mongoose");

var employeeSchema=new mongoose.Schema({
    userId : String,
    name : String,
    performance : String,
    feedbacks : [
     {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Feedback"
     }
    ],
    pendingAsignee : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Employee"
        }    
    ]
});

module.exports=mongoose.model("Employee",employeeSchema);