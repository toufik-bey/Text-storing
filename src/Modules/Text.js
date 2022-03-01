const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema(
  {  Status:{
            Draft: Boolean,
            Submmited: Boolean,
            Rejected: Boolean,
            Approved: Boolean,
    },
    Version:{
        en:String,
        fr:String,
        ar:String
    },
    text:String ,
} ); 
module.exports = Text = mongoose.model('Text', TextSchema);