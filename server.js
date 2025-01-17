const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())
const port = 3000

const database = {
 users :[
    {
        id: '1',
        name: 'MenLii',
        email: 'menlii@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '2',
        name: 'Lii',
        email: 'lii@gmail.com',
        password: 'cooky',
        entries: 0,
        joined: new Date()
    }
 ]
}

app.get('/', (req, res)=>{
    res.send(database.users)
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
            return res.json(user)
        }
    })
    if(!found){
        res.status(404).json("User not found")
    }
})


app.put('/image', (req, res)=>{
    const {id} = req.body;
    let found = false
    database.users.forEach(user =>{
        if(user.id === id){
            found = true
            user.entries ++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(404).json("User not found")
    }
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password ){
        res.json("Success")
    }
    else{
        res.status(400).json('Error during Sign in')
    }
    
})
let count = 2
app.post('/register',(req,res)=>{
    count ++
    const {email, name, password}= req.body;
    database.users.push({
            id: count.toString(),
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    res.json(database.users[database.users.length -1])
})

app.listen(port, ()=>{
    console.log('Running on port 3000')
})


/*
/ --> res = this is working
/signin --> POST = success/fsil
/Register --> POST = user obj
/profile/:userId --> GET = user
/image --> PUt = updated obj
 
*/