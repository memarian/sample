const mongoose = require('mongoose');
 const infoSchema = {
    userName:{type: String,unique : true},
    name : {type : String},
    firstName: String,
    lastName: String,
    job: Number,
    nationalCode: { type: String, unique: true },
    phone: Number,
    photo: String,
    email: {type : String,set : _toLower},
    gender: Number,
    birthday: Date,
 }

const customerSchema = {
  family: [
    {
      userName: String,
      firstName: String,
      lastName: String,
      nationalCode: { type: String, unique: true },
      gender: { type: Number, min: 0, max: 2 },
      assign: Number,
    },
  ],
  contents: [String],
  inbox: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
      type: { type: Number },
      title: { type: String, required: true },
      body: String,
      cover: String,
      url: String,
      like: { type: Boolean, default: false },
    },
  ],

  mobile: { type: Number, required: true, unique: true, select: false },
  info: infoSchema,
  sharesLink: String,

  groups: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    },
  ],

  reagent: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  },

  locations: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
      type: { type: String },
      name: { type: String, required: true },
      verify: {
        type: Boolean,
        default: false,
      },
      columns: [{ code: String, column: [Number] }],
    },
  ],

  honors: [Number],

  points: {
    month: { type: Number, default: 0 },
    _id: false,
  },

  state: {
    active : {type : Number,default : 0},
    time : Number,
    days : [Number]
  },

  status: { type: Number, default: 0 },
  rtoken: { type: String, unique: true, select: false },
  credit: { type: Number, min: 0, max: 1000000000 },
};

function _toLower(v) {
  return v.toLowerCase();
}



const CustomerSchema = new mongoose.Schema(customerSchema);

CustomerSchema.virtual('fullName').get(() => {
  return this.info.firstName + ' ' + this.info.lastName;
})




module.exports = mongoose.model('Customer', CustomerSchema);
