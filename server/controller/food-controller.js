const Food = require('../models/food-model.js');
// const multer = require('multer');
const path = require('path')

// 1. Get Data
// 2. Check email Existence
// 3. Hash Password
// 4. Create user/Food
// 5. Save to DB
// 6. Respond with registration successfull or handle error

const addfood = async (req,res)=>{

    try {
        const { name, description, category, price, ingredients,rating, location } = req.body;

        const foodExist = await Food.findOne({name});

        if(foodExist){
            return res.status(400).json({msg:"Food Already exits"});
        }

        await Food.create({ name, description, category, price, ingredients,rating, location });

        res.status(200).json({msg:"Food Created Succesfully"});
    }catch (error) {
        res.status(500).json({msg:"Internal Server Error",error});
        console.log(error);
    }
};

// --------------------------------- ********deleteSelectedFood********* ----------------------------- //

const deleteSelectedFood = async (req, res) => {
    const deleteFood = await Food.deleteOne(
      { name: req.body.name }
    );
    res.json({ deleteFood });
  };

// --------------------------------- ********updateSelectedFood********* ----------------------------- //

const updateSelectedFood = async (req, res) => {
    try {
      const updatedResult = await Food.findOneAndUpdate(
        { name: req.body.name },
        {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            ingredients: req.body.ingredients,
            rating: req.body.rating,
            location: req.body.location,
        },
        { new: true }
      );
      console.log(updatedResult);
      res.json(updatedResult);
    } catch (error) {
      console.log(error);
      res.status(402).send("Error");
    }
  };

// --------------------------------- ********getAllFoods********* ----------------------------- //

const getAllFoods = async (req, res) => {
    try{
        const foods = await Food.find();
        console.log(foods);

        if(!foods || foods.length === 0){
            return res.status(404).json({msg:"No foods found"});
        }
        res.status(200).json(foods);
    } catch (error){
        next(error);
    } 
};



module.exports = {addfood, getAllFoods, deleteSelectedFood, updateSelectedFood}; 
