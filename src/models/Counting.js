const mongoose = require('mongoose');

  
const Counting = mongoose.Schema({
    guild: String,
    number: String,
});

module.exports = mongoose.model("Counting", Counting);