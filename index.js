const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method")); 

app.use(express.urlencoded({extended: true}));
app.set("views engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


let twits = [
    {
        "id": uuidv4(),
        "username": "Dipak_Mandal",
        "content": "Today i learned CRUD operations..",
        "img":"https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/63fdf75ad4a978704fe9ac9c_CRUD%20%20Preview.jpeg"
    },
    {
        "id": uuidv4(),
        "username":"Aman-Mandal",
        "content":"I am a Backend Developer and MERN satck Developer.",
        "img":"https://media.geeksforgeeks.org/wp-content/uploads/20231110115359/Roadmap-to-Mern-stack-developer-copy-(3).webp"
    },
    {
        "id": uuidv4(),
        "username": "Dipak_Mandal",
        "content": "Learning X day of 100 day, Today my progress learning how express and REStFUl APIs work and implement it..",
        "img":"https://media.geeksforgeeks.org/wp-content/uploads/20250920130811963577/express2.webp"
    },
    {
        "id": uuidv4(),
         "username":"Aman-Mandal",
        "content":"oday I learned and implemented RESTful APIs in Node.js using Express.orked with all HTTP methods: GET, POST, PUT/PATCH, and DELETE to perform full CRUD operations.Understanding how APIs handle requests and responses is helping me build real backend applications.#NodeJS #ExpressJS #RESTAPI #BackendDevelopment #LearningInPublic",
        "img":"https://miro.medium.com/0*PSxcvFBVaufSCuwt.png"
    }

]
app.get("/twits",(req,res) => {
    res.render("index.ejs",{twits});
});

app.get("/twits/new", (req,res) => {
    res.render("new.ejs");
});
app.post("/twits",(req,res) => {
    console.log(req.body);
    let {username,content,img} = req.body;
    let id = uuidv4();
    twits.push({id,username,content,img});
    res.redirect("/twits");
});
app.get("/twits/:id", (req,res) => {
    let {id} = req.params;
    let twit = twits.find(t => id === t.id);
    res.render("show.ejs",{twit});
});

app.patch("/twits/:id",(req,res) => {
    let {id}= req.params;
    let newContent = req.body.content;
     let newimg = req.body.img;
    twits.push(newContent);
    twits.push(newimg);
    let twit = twits.find(t => id === t.id);
    twit.content = newContent;
    twit.img = newimg; 
    // console.log(twit);
    res.redirect("/twits");
});

app.get("/twits/:id/edit", (req,res) => {
    let { id } = req.params;
    let twit = twits.find(t => id === t.id);
    res.render("edit.ejs", { twit });
    // res.redirect("/twits");
});

app.delete("/twits/:id", (req,res) => {
    let {id} = req.params;
    twits = twits.filter(t => id !== t.id);
    res.redirect("/twits");
});


app.listen(port, ()=> {
    console.log("Server is on port in 3000");
});