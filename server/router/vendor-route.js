const express = require('express');
const router = express.Router();
const vendorForm = require('../controller/vendor-controller');


// const uploadform = require('../controller/image-controllers');
// router.route('/upload').post(uploadform);


router.route('/addVendor').post(vendorForm.addVendor);
router.route("/getAllVendors").get(vendorForm.getAllVendors );
router.route("/deleteVendor").delete(vendorForm.deleteSelectedVendor );
router.route("/updateVendor").post(vendorForm.updateSelectedVendor );


module.exports = router;
