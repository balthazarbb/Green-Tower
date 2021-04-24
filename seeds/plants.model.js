//connect to db

require('../db')

//create veggie/herbs/fruits and add to collection
const myPlants =[
    {plantname:'Lettuce', img:'', description:'Fresh crisp lettuce, grows super fast. Easy to take care of.', timeToHarvest:'45-65 days', phValue: 6.0-7.0 , placement:'', plantType:'veggie'},
    {plantname:'Tomato', img:'', description:'Botanically a fruit but most considered as a veggie.Tomatoes need much light and like it warm.', timeToHarvest:'20-30 weeks', phValue: 5.5 - 6.5 , placement:'', plantType:'veggie'},
    {plantname:'Radish', img:'', description:'One of the easiest veggies to grow. Don´t forget to eat the green leafs!', timeToHarvest:'42-56 days', phValue: 5.5-6.5 , placement:'', plantType:'veggie'},
    {plantname:'Kale', img:'', description:'Very nutritious and healthy, easy to grow', timeToHarvest:'28-35 days', phValue: 5.5-6.5 , placement:'', plantType:'veggie'},
    {plantname:'Cucumber', img:'', description:'Choose between a huge variety, though the persian one is the best! Likes it sunny and warm', timeToHarvest:'50-60 days', phValue:5.5-6.5 , placement:'', plantType:'veggie'},
    {plantname:'Spinach', img:'', description:'Not only Popeyes favorite! Likes it cool and don´t need much sun', timeToHarvest:'35-42 days', phValue:6-7 , placement:'', plantType:'veggie'},
    {plantname:'Beans', img:'', description:'Large variety to choose of. Very Productive', timeToHarvest:'3-4 months', phValue: 6.0 , placement:'', plantType:'veggie'},
    {plantname:'Chives', img:'', description:'Beautiful and healthy. Can be harvested regularly, needs lots of light', timeToHarvest:'21-28 days', phValue: 6.0 , placement:'', plantType:'herb'},
    {plantname:'Basil', img:'', description:'Choose between a huge variety. Needs a lot of light and continues growing when harvested ', timeToHarvest:'about 30 days', phValue:5.5-6.5 , placement:'', plantType:'herb'},
    {plantname:'Mint', img:'', description:'Choose between a huge variety. Easy to grow.', timeToHarvest:'21-28 days', phValue: 5.5-6.5 , placement:'', plantType:'herb'},
    {plantname:'Strawberries', img:'', description:'Make this awesome fruit avalable the whole year. Needs a lot of light', timeToHarvest:'28-42', phValue: 6.0 , placement:'', plantType:'fruit'},
    {plantname:'Blueberries', img:'', description:'Blueberries are true vitamin bombs. Need a lot of light and likes it warm.', timeToHarvest:'', phValue: 4.5-5.8 , placement:'', plantType:'fruit'},
    {plantname:'Pepper', img:'', description:'Hot or sweet, your choice! They like it warm and very sunny.', timeToHarvest:'80-90 days', phValue: 5.5-6.0 , placement:'', plantType:'veggie'},
    {plantname:'Raspberry', img:'', description:'Enjoy fresh an yummy raspberries the whole year. Likes it very warm and sunny.', timeToHarvest:'', phValue: 5.8-6.5 , placement:'', plantType:'fruit'},
    {plantname:'', img:'', description:'', timeToHarvest:'', phValue: , placement:'', plantType:''},


]