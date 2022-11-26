const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  xp: { type: Number, default: 0},
  level: { type: Number, default: 0},
  coins: { type: Number, default: 1000 },
  bank: { type: Number }, 
  topggrewards: { type: String},
  cooldownenabled: { type: String },
  banned: { type: String },
  isDeveloper: { type: Boolean },
  Company: 
    {
    miners: { type: Number, require: true  },
    workers: { type: Number },
  },
  Items:
  {
    Shirt: { type: Number, },
    Pants: { type: Number },
    Cookies: { type: Number },
    FishingRod: { type: Number },
    CommonFish: { type: Number },
    RareFish: { type: Number },
    MythicFish: { type: Number },
  
  },
  commands_cooldowns:[
    {
      name: { type: String },
      time: { type: String },
    }
  ]

 
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;
