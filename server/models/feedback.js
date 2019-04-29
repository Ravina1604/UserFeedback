// this file is schema of feedback present in database
// each key represents as below:
// feedback => feedback text
// assignee => name of employee (who gave particular feedback to any emloyee's performace review)
var mongoose=require("mongoose");

var feedbackSchema=new mongoose.Schema({
    feedback : String,
    assignee : String
});

module.exports=mongoose.model("Feedback",feedbackSchema);