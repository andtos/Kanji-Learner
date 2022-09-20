const express = require('express')

const KanjiCtrl = require('../controllers/kanji-ctrl')

const router = express.Router()

router.post('/kanji', KanjiCtrl.createKanji)
router.put('/kanji/:id', KanjiCtrl.updateKanji)
router.delete('/kanji/:id', KanjiCtrl.deleteKanji)
router.get('/kanji/:id', KanjiCtrl.getKanjiById)
router.get('/kanjis', KanjiCtrl.getKanjis)

module.exports = router
