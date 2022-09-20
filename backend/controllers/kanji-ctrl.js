const Kanji = require('../models/kanji-model')

createKanji = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a kanji',
        })
    }

    const kanji = new Kanji(body)

    if (!kanji) {
        return res.status(400).json({ success: false, error: err })
    }

    kanji
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: kanji._id,
                message: 'Kanji created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Kanji not created!',
            })
        })
}

updateKanji = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Kanji.findOne({ _id: req.params.id }, (err, kanji) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Kanji not found!',
            })
        }
        kanji.name = body.name
        kanji.time = body.time
        kanji.rating = body.rating
        kanji
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: kanji._id,
                    message: 'Kanji updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Kanji not updated!',
                })
            })
    })
}

deleteKanji = async (req, res) => {
    await Kanji.findOneAndDelete({ _id: req.params.id }, (err, kanji) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!kanji) {
            return res
                .status(404)
                .json({ success: false, error: `Kanji not found` })
        }

        return res.status(200).json({ success: true, data: kanji })
    }).catch(err => console.log(err))
}

getKanjiById = async (req, res) => {
    await Kanji.findOne({ _id: req.params.id }, (err, kanji) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!kanji) {
            return res
                .status(404)
                .json({ success: false, error: `Kanji not found` })
        }
        return res.status(200).json({ success: true, data: kanji })
    }).catch(err => console.log(err))
}

getKanjis = async (req, res) => {
    await Kanji.find({}, (err, kanjis) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!kanjis.length) {
            return res
                .status(404)
                .json({ success: false, error: `Kanji not found` })
        }
        return res.status(200).json({ success: true, data: kanjis })
    }).catch(err => console.log(err))
}

module.exports = {
    createKanji,
    updateKanji,
    deleteKanji,
    getKanjis,
    getKanjiById,
}