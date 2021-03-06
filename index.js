//acquiring express
const express = require('express');
const mongo = require('mongodb');
// assigning port
const port = 8000;

const app = express();
//setting up the view engine
app.set('view engine', 'ejs');
// setting up the views directory
app.set('views' , './views');

app.use(express.static('assets'));
app.use(express.urlencoded());

const mongoose = require('./config/mongoose.js');

const tasks = require('./models/toDoListSchema');

// home page controller
app.get('/' , function(req , res){

    tasks.find({} , function(err , task_list){
        if(err)
        {
            console.log(`Error in reading data from db ${err}`);
        }

        return res.render('todo' , {
            tasks : task_list,
        });
    });
});
// controller for creating the tasks
app.post('/create-task' , function(req , res){
   
    tasks.create({
        desc: req.body.desc,
        category: req.body.category,
        duedate: req.body.deadline,
    }, function(err , newTask){

        if(err)
        {
            console.log('Error in creating entry in DB ', err);
            return;
        }

        return res.redirect('back');
    });
});

// controller for deleting the tasks

app.post('/delete-task/' , function(req , res){

    let id = req.body.des;
    //console.log(id);
    
    if(typeof(id) === 'string')
    {
        // deleting the selected id in case of single selection
        tasks.findByIdAndDelete(id , function(err){
            if(err)
            console.log('Error in deleting an entry in database' , err);

            console.log(`Successfully deleted the entry from db`);
        });
    }
    else{
        // deleting the selected ids in case of multiple selection
        for(let i of id)
        {
            tasks.findByIdAndDelete(i , function(err){
                if(err)
                console.log('Error in deleting an entry in database' , err);
    
                console.log(`Successfully deleted the entry from db`);
            });
        }
    }

    return res.redirect('back');
});


// Server listening at port 8000
app.listen(port , function(err){
    if(err)
    {
        console.log(`Error in listening at port : ${port}`);
    }

    console.log(`Server is up and runnig at port: ${port}`);
});

