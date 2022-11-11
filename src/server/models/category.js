const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String
    },
    // icons: [{type: Schema.Types.ObjectId, ref: "Icon"}],
    dir: {
        type: String 
    }
});


const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.categorySchema = categorySchema;