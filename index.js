const express = require('express')
const Joi = require('joi')
const app = express()
app.use(express.json());
const courses =[
    {id:1,name: 'Course1'},
    {id:2,name: 'Course2'},
    {id:3,name: 'Course3'},
    {id:4,name: 'Course4'}
]
app.get('/', (req,res)=>{
    res.send('hello world hello')
})


app.get('/api/hello/', (req,res)=>{
    res.send([1,2,3])
})

app.get('/api/course',(req,res)=>{
    res.send(courses)
})

app.get('/api/course/:id', (req,res)=>{
   let course = courses.find(c=>c.id === parseInt(req.params.id))

   if(!course) res.status(404).send('The course with given Id was not found')
   res.send(course);
})
app.get('/api/post/:year/:month',(req,res)=>{
    res.send(req.params);
})
app.post('/api/course',(req,res)=>{

    const { error } = ValidateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
      
    const course = {
        id: courses.length +1,
        name:req.body.name
    }
    courses.push(course)
    res.send(courses)
})

app.put('/api/course/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return  res.status(404).send('The course with given Id was not found')
    const { error } = ValidateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    course.name === req.body.name;
    res.send(course);
})

app.delete('/api/course/:id', (req, res)=> {
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with given Id was not found')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)

})

function ValidateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    })
    return schema.validate(course);
}

const port =process.env.PORT ||9003;

app.listen(port, () => console.log(`listening on port ${port}`));