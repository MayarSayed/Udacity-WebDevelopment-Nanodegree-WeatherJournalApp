// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');



// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,()=> {console.log(`running on local host ${port}`);});


app.post("/addData",(req,res)=>{
	console.log("added data to server = ");
	console.log(req.body.temp);
	console.log(req.body.date);
	console.log(req.body.feeling);

	projectData.temp = req.body.temp;
	projectData.date = req.body.date;
	projectData.feeling = req.body.feeling;
	console.log("and now the projectData = ");
	console.log(projectData);
	res.send(projectData);

});

app.get('/showData',(req,res)=>{
	console.log("1 the project data send = ");
	console.log(projectData);
	res.send(projectData);
	console.log("2 the project data send = ");
	console.log(projectData);
});