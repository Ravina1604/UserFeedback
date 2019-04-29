//server file with which our UI interacts.
var express     = require('express'),
    http        = require('http'),
    request     = require('request'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    fs          = require('fs'),
    morgan      = require('morgan'),
    path        = require('path'),
    Employee    = require("./models/employee"),
    Feedback    = require("./models/feedback"),
    seedDB      = require("./seeds");
    
mongoose.connect('mongodb://localhost:27017/rating_sys',{useNewUrlParser : true})

const hostname = 'localhost';
const port = 3000;
const app = express();
seedDB();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../'));

//used to return all employee from dadatbse
app.get("/employees",(req,res)=>{
    Employee.find({}).populate("feedbacks").populate("pendingAsignee").exec((err,employees)=>{
        if(err){
            console.log("Error Ocuured",err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send({employees : employees})
        }
    })
})

//used to verify used id while user logs in into the system by finding employee from database
app.get("/verifyId",(req,res)=>{
    Employee.find({userId : req.query.userId},(err,employee)=>{
        if(err){
            console.log("Error Ocuured",err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send({employee : employee})
        }
    })
});

//used to return employee by user id
app.get("/getEmployeeById",(req,res)=>{
    Employee.find({userId : req.query.userId}).populate("feedbacks").populate("pendingAsignee").exec((err,employee)=>{
        if(err){
            console.log("Error Ocuured",err);
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send({employee : employee[0]});
        }
    })
});

//used to remove particular employee from database
app.get("/removeEmployee",(req,res)=>{
    Employee.findOneAndDelete({userId : req.query.userId},(err)=>{
           if(err){
                    console.log("Err occured",err);
                }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.send({success : true});
            }
    });
});

//used to add new employee in database
app.post("/addEmployee",(req,res)=>{
    Employee.create(req.body.employee,(err,employee)=>{
           if(err){
                    console.log("Err occured",err);
                }
            else{
                employee.save();
                res.setHeader('Content-Type', 'application/json');
                res.send({success : true});
            }
    });
});


app.post("/updateEmployee",(req,res)=>{
    Employee.find({userId : req.body.userId},(err,employee)=>{
        if(err){
            console.log("Error Occured",err)
        }
        else{
            employee[0].userId=req.body.employee.userId;
            employee[0].name=req.body.employee.name;
            employee[0].performance=req.body.employee.performance;
            employee[0].save();
            res.setHeader('Content-Type', 'application/json');
            res.send({success : true});
        }
    })
})

//used to assign employee to give feedback for performance review of particular employee in database
app.post("/assignEmployee",(req,res)=>{
    console.log(req.body);
    Employee.find({userId : req.body.employeeId},(err,employee)=>{
        if(err){
            console.log("Error Ocuured",err);
        }
        else{
            Employee.find({userId : req.body.assigneeId},(err,assignee)=>{
                if(err){
                    console.log("Error Ocuured",err);
                }
                else{
                    employee[0].pendingAsignee.push(assignee[0]);
                    employee[0].save();
                    res.setHeader('Content-Type', 'application/json');
                    res.send({employee : assignee[0]})
                }
            })
        }
    })
});

//used to submit feedback for performace review's of employees
app.post("/submitFeedback",(req,res)=>{
    console.log(req.body);
    Employee.find({userId : req.body.employeeId}).populate("feedbacks").populate("pendingAsignee").exec((err,employee)=>{
        if(err){
            console.log("Error Occured",err);
        }
        else{
            Feedback.create(req.body.feedback , (err,feedback) => {
                if(err){
                    console.log("Error Occured",err);
                }
                else{
                    employee[0].feedbacks.push(feedback);
                    Employee.find({userId : req.body.assigneeId}).populate("pendingAsignee").exec((err,assigneeEmp)=>{
                        if(err){
                            console.log("Err occured",err);
                        }
                        else{
                            assigneeEmp[0].pendingAsignee=assigneeEmp[0].pendingAsignee.filter((assigee)=> assigee.userId!==req.body.employeeId);
                            employee[0].save();
                            assigneeEmp[0].save();  
                            res.setHeader('Content-Type', 'application/json');
                            res.send({success : true});
                        }
                    });
                    
                }
            })
        }
    })
});

//used to render react application from server
app.get('*', (req, res, next) => {
    const filename = path.join(__dirname, '../index.html');

    fs.readFile(filename, (err, html) => {
        res.statusCode = 200;
        res.set('content-type', 'text/html');
        res.send(html);
        res.end();
    });
});


app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});