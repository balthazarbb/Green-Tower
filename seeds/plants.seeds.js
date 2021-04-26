//connect to db

require('../db')

//create veggie/herbs/fruits and add to collection
const myPlants =[
    {plantname:'Lettuce', img:'', description:'Fresh crisp lettuce, grows fast. Easy to grow.', timeToHarvest: 50, phValue: 6.0-7.0, plantType:'leaf'},
    {plantname:'Tomato', img:'', description:'Tomatoes need much light and like it warm.', timeToHarvest: 150, phValue: 5.5 - 6.5, plantType:'bloom'},
    {plantname:'Radish', img:'', description:'One of the easiest veggies to grow. Don´t forget to eat the green leafs!', timeToHarvest: 45, phValue: 5.5-6.5, plantType:'leaf'},
    {plantname:'Kale', img:'', description:'Very nutritious and healthy, easy to grow', timeToHarvest: 30, phValue: 5.5-6.5, plantType:'leaf'},
    {plantname:'Cucumber', img:'', description:'Choose between a huge variety. Likes it sunny and warm', timeToHarvest: 50, phValue: 5.5-6.5, plantType:'bloom'},
    {plantname:'Spinach', img:'', description:'Not only Popeyes favorite! Likes it cool and don´t need much sun', timeToHarvest: 37, phValue: 6-7, plantType:'leaf'},
    {plantname:'Bok Choy', img:'', description:'The crunchy chinese cabbage. likes it cool.', timeToHarvest: 50, phValue: 6.0-7.0 , plantType:'leaf'},
    {plantname:'Chives', img:'', description:'Beautiful and healthy. Can be harvested regularly, needs lots of light', timeToHarvest: 25, phValue: 6.0, plantType:'herb'},
    {plantname:'Basil', img:'', description:'Choose between a huge variety. Needs a lot of light and continues growing when harvested ', timeToHarvest: 30, phValue:5.5-6.5 , plantType:'herb'},
    {plantname:'Mint', img:'', description:'Choose between a huge variety. Easy to grow.', timeToHarvest: 25, phValue: 5.5-6.5, plantType:'herb'},
    {plantname:'Strawberries', img:'', description:'Make this awesome fruit avalable the whole year. Needs a lot of light', timeToHarvest: 30, phValue: 6.0 , plantType:'bloom'},
    {plantname:'Blueberries', img:'', description:'Blueberries are true vitamin bombs. Need a lot of light and likes it warm.', timeToHarvest: 30, phValue: 4.5-5.8, plantType:'bloom'},
    {plantname:'Pepper', img:'', description:'Hot or sweet, your choice! They like it warm and very sunny.', timeToHarvest: 80, phValue: 5.5-6.0, plantType:'veggie'},
    {plantname:'Raspberry', img:'', description:'Enjoy fresh an yummy raspberries the whole year. Likes it very warm and sunny.', timeToHarvest: 30, phValue: 5.8-6.5 , plantType:'bloom'},
    {plantname:'Canteloupe', img:'', description:'Sweet and pretty! Needs warmth and light.', timeToHarvest: 90, phValue: 6.1-6.5, plantType:'bloom'}
]

const mongoose  = require('mongoose');
//insert plants to DB
const PlantsModel = require('../models/Plants.model.js')
//insert data to DB
PlantsModel.create(myPlants)
 .then(() => {
    console.log(myPlants)
//close connection
    mongoose.connection.close()
})
 .catch(() => {
    console.log("Nooo")
});