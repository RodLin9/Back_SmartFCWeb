const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    id: Number,
    question: String,
    type: Number,
    options: [
        {
            correct: String,
            retro: String,
        },
    ],
}, {
    versionKey: false,
});

module.exports = mongoose.model('Question', questionSchema);