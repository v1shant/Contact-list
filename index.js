const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



//middleware
// app.use(function(req,res,next){
//     console.log("middleware 1 called");
//     next();
// });


var contactList=[
    {
        name:"Vishant",
        phone:"9832444246"
    },
    {
        name:"Shyam",
        phone:"8932744249"
    },
    {
        name:"Aashish",
        phone:"8656253541"
    },
    {
        name:"Jatin",
        phone:"7465282566"
    },
    
]

app.get('/', function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });
        
    });
    // return res.render('home',{
    //     title: "Contact List",
    //     contact_list: contactList
    // });

    //console.log(__dirname);
    //res.send('<h1>Cool, it is running or is it?</h1>');
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Lets practice with ejs "
    });
});

app.post('/create-contact',(req,res)=>{
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*********', newContact);
        return res.redirect('/');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
    }
    console.log('Yahoo! My Express server is running on port:',port);
});
app.get('/delete-contact/',function(req,res){
    //get id from query in url
    let id=req.query.id;
    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');  

    });

    // console.log(req.query);
    // let phone=req.query.phone;
    // let ci=contactList.findIndex(contact=>contact.phone==phone);
    // if(ci!=-1){
    //     contactList.splice(ci,1);
    // }
    // return res.redirect('back');  
});
