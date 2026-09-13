import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let jobs = [];

app.get('/', (req,res) =>{
    res.render('index.ejs', { addJob: jobs });
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
});

app.post("/add", (req, res) => { 
    const addJob = {
        id : jobs.length,
        JobTitle: req.body.JobTitle,
        Company: req.body.Company,
        Location: req.body.Location,
        Status: req.body.Status,
        Chance: req.body.Chance,
        ApplicationDate: req.body.ApplicationDate,
    };
    jobs.push(addJob);
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    jobs = jobs.filter(job => job.id !==id);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const job = jobs.find(job => job.id === id);
    res.render("edit.ejs", { job: job });
});

app.post("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const job = jobs.find(job => job.id === id);
    job.JobTitle = req.body.JobTitle;
    job.Company = req.body.Company;
    job.Location = req.body.Location;
    job.Status = req.body.Status;
    job.ApplicationDate = req.body.ApplicationDate;
    res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

