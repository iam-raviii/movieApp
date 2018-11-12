const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//DATABSES'S DATA STRUCTURE
const DataSchema = new Schema (
	{
		id: Number,
		message: String

	},

	{ timestamps: true }
);


//EXPORTING THE SCHEMA
module.exports = mongoose.model("Data", DataSchema);