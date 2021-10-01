const http = require("http"); 
const express = require("express"); 

var bodyParser = require("body-parser");
const app = express(); 

app.use(bodyParser.json()); 

const courses = [
    {id :1, name: "NodeJS"}, 
    {id :2, name: "PHP"}, 
    {id :3, name: "ReactJS"}, 
]

app.get("/", (req, res) => {
    res.send(courses)
});

app.get("/courses/:id", (req, res) => {
    let {id} =  req.params ;
    let item = courses.find((course) => course.id ===  parseInt(id)); 

    if(!item) {
        res.status(404).send("NOT FOUND THE COURSE")
    }
    res.send(`Bạn đang tìm kiếm khoá học ${item.name}`); 
});

app.post("/courses/add" , (req, res) => {
    console.log(req.body);
    const newCourse = req.body;

    courses.p
})



const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
}
)