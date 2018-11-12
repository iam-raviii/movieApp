const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require ("body-parser");
const logger = require("morgan");
const Data = require('./data');

const API_PORT = 3001;
const app = express();
const router = express.Router();


//MONGOOSE DATABASE
const dbRoute = "mongodb://iam-raviii:password#1@ds063789.mlab.com:63789/movieappbidocean";


// CONNECTS BACKEND WITH MONGODB DATABASE
mongoose.connect(
	dbRoute,
	{ useNewUrlParser: true }
	);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));


//CHECKS CONNECTION WITH DATABASE IS SUCCESSFUL OR NOT
db.on("error", console.error.bind(console, "MongoDB connection error"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));



// GET METHOD, FETCHES ALL DATA FROM EXISTING DATABASE
router.get("/getData", (req, res) => {
	Data.find((err, data) => {
		if(err) return res.json({ success: false , error: err});
		return res.json({ success: true, data: data });
	});
});

//UPDATE METHOD, OVERWRITES EXISTING DATA IN OUR DATABASE
router.post("/updateData", (req, res) => {
	const { id, update } = req.body;
	Data.FindOneAndUpdate(id, update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

//DELETE METHOD, REMOVES EXISTING DATA FROM DATABASE
router.delete("/deleteData", (req, res) => {
	const { id } = req.body;
	Data.findOneAndDelete( id, err => {
		if(err) return res.send(err);
		return res.json({success: true});
	});
});

//CREATE METHOD, ADDS NEW DATA TO DATABASE
router.post("/putData", (req, res) => {
	let data = new Data();

	const { id, message } = req.body;

	if((!id && id !== 0) || !message) {
		return res.json({
			success: false,
			error: "INVALID INPUTS"
		});
	}
	data.message = message;
	data.id = id;
	data.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});


// APPEND API FOR HTTP REQUESTS 
app.use("/api", router);

//LAUNCH OUR BACKEND INTO A PORT
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));