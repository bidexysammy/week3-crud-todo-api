const mongoose = require("mongoose");

const todoschema = new mongoose.Schema(
    {
        task : {
            type: String,
            required: true,
        
        },
        completed: {
            type: Boolean,
        },
    },
    {timestamps: true}
);

const todomodel = mongoose.model('todo', todoschema);
module.exports = todomodel;