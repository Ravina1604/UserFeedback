# PayPayTest
PayPay Test Feedback Appliation

===>Technology Stack used :
   
 Front-End  : React.js, Javascript, HTML, CSS, Bootstrap
 
 
 Back-end(Server Side) : Node.js,Express.js
 
 
 Database  : MongoDB
 

===>Please follow below steps to run the application :

1) Install MongoDB latest verison
2) Create Database directory in root folder and start MongoDB Database
3) Go to Project directory
5) run "npm install" command
4) run "npm run build" command
5) run "npm start" command

 and it will run application on https://localhost:3000 in local.
 
 
  (Please make sure database is running in background otherwise application will not run properly as it won't get any data to render.)
  
  
  Currently as time restricts, i have verified admin staticly(admin id is "Ravina123")
  
  
  All other valid id will be considered as userID(such as "John123","Kat123")(admin can add new employee after login)
  
  

===>Assumption Made for this application :
1) userName is case-sensitive which we use at the time of loggin in into the system.
2) Admin can also be an employee so application will also show admin in all employees section
3) Only one performance review for one employee and it is in form of text(We can chnage it afterwards if we want it in form of object).
4) Performance of Employee is currently Text only(later we can rephrase it in object).


===>Below are the snippent schema for stored data in database :
   
Each employee consist of :


 name (Name of employee)
 
 
 userID (userId of employee to identify each employee uniquely)
 
 
 feedback (All feedbacks(with employee name) given to employee for his/her performance review from all employees)
 
 
 pendingAssignee (All employee which requires feedback for their performance review from you)
 
 

Each feedback consist of :


 feedback (Feedback text given by employee)
 
 
 assignee (Employee name who gave this particular feedback)
 
 

===>Folder structure of Project:

 server : contains server file(Node.js), Schema model for data, seed file to load application with initial data
 
 
 src    : contains all React componennt (Staring Component App.js)
 
 
 style  : contains css style file of application
 
 
 index.js : file created after build of react application
 
 
 main.js  : starting file of react application
 
 
 package.json : contain all module required for application
 
 
 webpack.config.js : configuration required for react application
 
 

====>Notes

1) Please refer Doc format that i have attached to see screenshots of application incase application doesn't run properly.
2) There is code which need to be refactor(and we can achieve reusability) but for time being i have kept it as it is.
3) I have also added comments in all components which help to clarify the code in case of need.
