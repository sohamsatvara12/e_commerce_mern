//another way to use methods of mongoose module by directly destructuring
const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  name: { type: String, required: true },
});

const City = new model("City", citySchema);
module.exports = City;
