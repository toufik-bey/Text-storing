const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema(
  {  Status:{
            submeted: Boolean,
            rejected: Boolean,
            approved: Boolean,
    },
    Version:{
        en:String,
        fr:String,
        ar:String
    },
    text:String 
} ); 
module.exports = Text = mongoose.model('Text', TextSchema);