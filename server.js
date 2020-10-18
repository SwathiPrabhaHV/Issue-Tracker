const fs = require('fs');
var path = require("path");
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Issue=require('./scripts/Issue');

mongoose
  .connect('MongodbUrl',{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false})
  .then(()=>{
    const app=express();

    app.use('/issue',express.static(path.join(__dirname,"public")));
        console.log(path.join(__dirname,'public'));
        app.use(bodyParser.json());

      app.listen(3000,()=>{
          console.log("App started at port 3000/issue")
        })

        app.get('/',  (req,res)=>{
          console.log("Inside get");
         
          var filter={};
          if(req.query.status) filter.status=req.query.status;

            
          Issue.find(filter,function(err,issues) { 
            if(err) throw err;
            console.log(issues);
            res.json(issues);
          })
        });

        app.post('/', (req,res)=>{
          const newIssue=req.body;
          if(!newIssue.status)
            newIssue.status='New';
          Issue.create(newIssue,function(err,newIssue){
              if(err) throw err;
             
              res.json(newIssue);
            });
        });



        app.get('/issue/:id',  (req, res) => {
          let issueId;
          try {
            console.log("Id in get"+req.params.id);
            issueId=req.params.id;
            // issueId = new ObjectId(req.params.id);
            }
          catch (error) {
            console.log(error);
            res.status(422).json({ message: `Invalid issue ID format: ${error}` });
            return;
            }
              Issue.find({_id:issueId},function(err,issue) { //findAll or selectAll
                if(err) throw err;
                if(!issue){
                res.status(404).json({message:`No such issue: ${issueId}`});
              }
                else
                res.json(issue);
                });
              });

              app.put('/issue/:id',(req,res)=>{

                    var Id=req.params.id;
const filter = { _id: Id };

                      var issue={};
                      issue=req.body;
                      var newIssue={
                        status:issue.status,
                        owner:issue.owner,
                        created:issue.created,
                        Effort:issue.effort,
                        dueDate:issue.dueDate,
                        title:issue.title,
                        description:issue.description
                      };
                Issue.findOneAndUpdate(filter,newIssue,function(err,data){
                  if(err) console.log(err);
                  res.send("Updated Successfully");
                })


            });
    });
