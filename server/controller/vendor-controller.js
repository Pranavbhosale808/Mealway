const mongoose = require('mongoose');
const Vendor = require('../models/vendor-model.js');
const Food=require('../models/food-model.js')

// --------------------------Register the Shop -------------------------------//
const addVendor = async (req, res) => {
    try {
        const { img, coverImg, name, shopname, location, address, description,menuid, menudata, contact,openingHour,closingHour } = req.body;

        const vendorExist = await Vendor.findOne({ contact });

        if (vendorExist) {
            return res.status(400).json({ msg: "Vendor already exists" });
        }

        const newVendor = await Vendor.create({ img, coverImg, name, shopname, address,menuid, location, description, menudata, contact,openingHour,closingHour });

        res.status(200).json({ msg: "Vendor created successfully", vendor: newVendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// Add the menu in the Food Model -------------------//
const addMenu = async(req,res)=>{
    try {
        const {name,description,category,price,image} = req.body;
        const newFood =  await Food.create({name,description,category,price,image});
        res.status(200).json({msg:"Menu created successfully",newFood});
    } catch (error) {
        res.status(404).json({msg:"Menu Error",error});  
    }
}

// Deelete the menu if not login in-----------------------------------//
const deleteMenu = async (req, res) => {
    try {
        const deleteFood = await Food.deleteOne(
            { name: req.body.name }
        );
        res.json({ deleteFood });
    } catch (error) {
        res.status(402).send("Error");
    }
}

// ----------------------------------- Push the Food Id in menu array in vendor model --------------------------//
const pushMenuId = async (req, res) => {
    try {
        const { vendorId, menuId } = req.body;

        // Find the vendor by its ID
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ msg: "Vendor not found" });
        }

        // Push the menu ID into the menuid array
        vendor.menuID.push(menuId);
        await vendor.save();

        res.status(200).json({ msg: "MenuId pushed successfully", vendor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};


// --------------------------------- ********deleteSelectedVendor********* ----------------------------- //

const deleteSelectedVendor = async (req, res) => {
    const deleteVendor = await Vendor.deleteOne(
        { contact: req.body.contact }
    );
    res.json({ deleteVendor });
};

// --------------------------------- ********updateSelectedVendor********* ----------------------------- //

const updateSelectedVendor = async (req, res) => {
    try {
        const updatedResult = await Vendor.findOneAndUpdate(
            { contact: req.body.contact },
            {
                img: req.body.img,
                coverImg: req.body.coverImg,
                name: req.body.name,
                shopname: req.body.shopname,
                address: req.body.address,
                openingHour: req.body.openingHour,
                closingHour: req.body.closingHour,
                menudata: req.body.menudata,
                ratings: req.body.ratings,
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

// --------------------------------- ********getAllVendors********* ----------------------------- //

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        console.log(vendors);

        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ msg: "No vendors found" });
        }
        res.status(200).json(vendors);
    } catch (error) {
        next(error);
    }
};

// -------------------------------------- ******Get vendor by foods *********** -----------------------------//

const getVendorsByFood = async (req, res) => {

    try {
        const foodItem = req.body.foodItem;

        // Search vendors by food item using the text index
        const vendors = await Vendor.find({ $text: { $search: foodItem } }, { _id: 0, name: 1, shopname: 1, location: 1 });
        const vendorName = vendors.name;


        if (!vendors.length) {
            return res.status(404).json({ message: 'No vendors found for the searched food item' });
        }

        const simplifiedVendors = [];

        // Iterate over each vendor and extract the required fields
        vendors.forEach(vendor => {
            const simplifiedVendor = {
                name: vendor.name,
                shopname: vendor.shopname,
                location: vendor.location // Include location coordinates
            };
            simplifiedVendors.push(simplifiedVendor);
        });

        res.json(simplifiedVendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const findVendorsByShopName = async (req, res) => {
    const { shopname } = req.body;
  
    try {
      const vendors = await Vendor.find({ shopname });
  
      if (vendors.length === 0) {
        return res.status(404).json({ error: 'No vendors found with the specified shop name' });
      }
  
      res.status(200).json(vendors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const findVendorById = async (req, res) => {
    const { vendorId } = req.body;
  
    try {
      const vendor = await Vendor.findById(vendorId);
  
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.status(200).json(vendor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// ********************************** Randomly get the food from the database ********************************//

const getRandomFood = async (req, res) => {
    try {
        // Use aggregation pipeline to randomly select menudata items
        const menuItems = await Vendor.aggregate([
            { $unwind: '$menudata' }, // Deconstruct the menudata array
            { $sample: { size: 5 } }, // Randomly select 5 menudata items
            { $project: { _id: 0, menudata: 1 } } // Project only the menudata items
        ]);

        // If no menu items found, return a 404 Not Found response
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found' });
        }

        // Extract the menu items from the aggregation result and return as JSON response
        res.json(menuItems.map(item => item.menudata));
    } catch (error) {
        // Handle errors
        console.error('Error fetching random menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {  addVendor,  addMenu,deleteMenu , pushMenuId ,
                    deleteSelectedVendor, updateSelectedVendor, 
                    getVendorsByFood, getRandomFood , getAllVendors, 
                    findVendorsByShopName, findVendorById};
