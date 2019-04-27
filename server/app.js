const express = require('express');
const morgan = require('morgan');
const parser= require('body-parser');
const app = express();
const data =[
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.use(morgan('dev'));
// add your code here
app.get("/", (req,res)=>{
  var generic = {Status: "ok"};
  res.status(200).send(generic)
    
});

app.get("/api/TodoItems", (req, res)=>{

   res.status(200).json(data);
    
});
app.get("/api/TodoItems/:number", (req,res)=>{
  let number= req.params.number;
  let index= data.findIndex(x => x.todoItemId==number);
  res.status(200).send(data[index]);
  
});
app.post("/api/TodoItems", (req,res)=>{
  
  var newPost = 
    {
    todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    };
  console.log(newPost);
  for(i=0; i < data.length; i++){
    if(data[i].todoItemId==newPost.todoItemId){
      data[i]=newPost;
      data[i].completed=true;
    }
    
  }   
  data.push(newPost);
  return res.status(201).send(newPost);
  
   
  
});

app.delete('/api/TodoItems/:number', (req,res)=>{
  let number= req.params.number;
  let index= data.findIndex(x => x.todoItemId==number);

  res.status(200).send(data[index]);
  data.splice(index, 1);
  
  });

app.listen(8484, ()=>{
  console.log("listening on port 8484");
  });

  

module.exports = app;
