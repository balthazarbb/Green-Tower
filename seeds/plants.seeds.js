//connect to db

require("../db");

//create veggie/herbs/fruits and add to collection
const myPlants =[
    {plantname:'Lettuce', img:'images/salat.png', description:'Fresh crisp lettuce, grows fast. Easy to grow.', timeToHarvest: 50, phValue: 6.5, plantType:'leaf', season:"spring"},
    {plantname:'Tomato', img:'images/tomato.png', description:'Tomatoes need much light and like it warm.', timeToHarvest: 150, phValue: 6.0, plantType:'bloom', season:"spring"},
    //{plantname:'Radish', img:'', description:'One of the easiest veggies to grow. Don´t forget to eat the green leafs!', timeToHarvest: 45, phValue: 5.5-6.5, plantType:'leaf', season:"autumn"},
    {plantname:'Kale', img:'images/kale.png', description:'Very nutritious and healthy, easy to grow', timeToHarvest: 30, phValue: 6.0, plantType:'leaf', season:"summer / autumn"},
    {plantname:'Cucumber', img:'images/cucumber.png', description:'Choose between a huge variety. Likes it sunny and warm', timeToHarvest: 50, phValue: 6.0, plantType:'bloom', season:"late summer"},
    //{plantname:'Spinach', img:'', description:'Not only Popeyes favorite! Likes it cool and don´t need much sun', timeToHarvest: 37, phValue: 6-7, plantType:'leaf', season:"winter"},
    {plantname:'Bok Choy', img:'images/bokchoi.png', description:'The crunchy chinese cabbage. likes it cool.', timeToHarvest: 50, phValue: 6.5, plantType:'leaf', season:"summer"},
    {plantname:'Cilantro', img:'images/cilantro.png', description:'Our favourite herb. Can be harvested regularly, needs lots of light', timeToHarvest: 25, phValue: 6.0, plantType:'herb', season:"summer"},
    {plantname:'Basil', img:'images/basil.png', description:'Choose between a huge variety. Needs a lot of light and continues growing when harvested ', timeToHarvest: 30, phValue: 6.0, plantType:'herb', season:"summer / autumn"},
    {plantname:'Mint', img:'images/mint.png', description:'Choose between a huge variety. Easy to grow.', timeToHarvest: 25, phValue: 6.0, plantType:'herb', season:""},
    {plantname:'Strawberries', img:'images/strawberry.png', description:'Make this awesome fruit avalable the whole year. Needs a lot of light', timeToHarvest: 30, phValue: 6.0 , plantType:'bloom', season:"summer"},
    //{plantname:'Blueberries', img:'', description:'Blueberries are true vitamin bombs. Need a lot of light and likes it warm.', timeToHarvest: 30, phValue: 4.5-5.8, plantType:'bloom'},
    {plantname:'Pepper', img:'images/pepper.png', description:'Hot or sweet, your choice! They like it warm and very sunny.', timeToHarvest: 80, phValue: 6.0, plantType:'veggie', season:"summer / autumn"},
    //{plantname:'Raspberry', img:'', description:'Enjoy fresh an yummy raspberries the whole year. Likes it very warm and sunny.', timeToHarvest: 30, phValue: 6.0 , plantType:'bloom', season:"summer"},
    //{plantname:'Canteloupe', img:'', description:'Sweet and pretty! Needs warmth and light.', timeToHarvest: 90, phValue: 6.0, plantType:'bloom'}
]

const mongoose = require("mongoose");
//insert plants to DB
const PlantsModel = require("../models/Plants.model.js");
//insert data to DB
PlantsModel.create(myPlants)
  .then(() => {
    console.log(myPlants);
    //close connection
    mongoose.connection.close();
  })
  .catch(() => {
    console.log("Nooo");
  });
