# Green-Tower #


## Description ##

Green-Towers is a platform for people who would like to start with hydroponic growing and plan their first hydroponic growing system.


## User stories ##

* **404**
    As users we want to see a nice 404 page when we go to a page that does not exist.
* **500**
    As users we want a nice error page when the creators messed up.
* **Start**
    Start page with some short information about hydroponic planting and gives opportunity to sign up or login.
* **Login**    
    login form.
* **Signup**
    signup form.
* **profile**
    As user we want to see our towers, edit and add new towers.
* **Tower**   
    input form to create our tower.
* **Plants** 
    Here we can see all the available plants and choose the ones we want for our tower.

## Routes ##

* GET/
    * sign up
    * login

* POST/
    * sign up
    * login

### Protected Routes ###
* GET/ 
    * profile input form / empty tower / full tower  
    * plants
    * edit
    * delete plant

* POST/
    * input form
    * confirm edit
    * plants
    


## Models ##

**Users** 
    User Schema

    username: String
    password: String

**Plants** 
    Plant Schema

    Name: String
    Description: String
    Time to harvest: Number
    Placement: Bottom, Middle, Top
    type: Veggie/Fruit

**Towers** 
    Tower Schema

    Name: String
    maxPlants: Number
     ref: plants 
     ref: user

## Backlog ##

**Different Towers** 
    Choose between different towers.

**Countdown** 
    Shows time until you can harvest.

**Admin** 
    Gives rights to edit plants and add new plants for the plant site.


## Links ##

# Git #

    [GitHub Pages](https://github.com/balthazarbb/Green-Tower.git).

# Slides #



#### AnnBar 2021 ####