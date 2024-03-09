require("dotenv").config();
const express = require("express");
const app = express();
const port = 3005; //
const cors = require("cors");
require("./Db/Db");

app.use(cors());
app.use(express.json()); //use the json data convert to object

// Routes
app.use(require("./routes/auth"));

const imageData = [
  { id: 1, name: "Organic Waste", image: "./Types/organic.jpg", rate: 2 },
  { id: 2, name: "Electronic Waste", image: "./Types/electronic.jpg", rate: 5 },
  { id: 3, name: "Metal Waste", image: "./Types/metal.png", rate: 5 },
  { id: 4, name: "Paper Waste", image: "./Types/paper.jpg", rate: 2 },
];

const Data = [
  { 
    id: 5, name: "Hazardous Waste", image: "./Types/hazardous.jpg", rate: 10 },
  {
    id: 6,
    name: "Plastic Bottles & Cans",
    image: "./Types/plastic.jpg",
    rate: 1,
  },
  { 
    id: 7, name: "Medicine Waste", image: "./Types/medicine.jpg", rate: 5 },
  { 
    id: 8, name: "Bulky Waste", image: "./Types/bulky.jpg", rate: 5 },
];

// Set up a route to fetch data
app.get("/api/data", (req, res) => {
  res.json(imageData);
});

app.get("/api/data1", (req, res) => {
  res.json(Data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
