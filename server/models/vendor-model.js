const mongoose = require('mongoose');
const menuItemSchema=require('./food-model')


const vendorSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  coverImg: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  shopname: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere'
    }
  },

  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  menu: [menuItemSchema],
  contact: {
    type: Number,
    required: true
  },
  openCloseHours: {
    type: Map,
    of: String,
    required: false
  }
}
);
vendorSchema.index({ 'menu.name': 'text' });
vendorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Vendor', vendorSchema);