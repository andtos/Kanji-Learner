
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Kanji = new Schema(
    {
        character: { type: String, required: true },
        reading: { type: String, required: true },
        meaning: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('kanji', Kanji)