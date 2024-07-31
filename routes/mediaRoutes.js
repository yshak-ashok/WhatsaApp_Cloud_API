const express = require('express');
const mediaController = require('../controllers/mediaController');
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads');
  },
  filename: function (req, file, cb) {
     return cb(null, file.originalname); 
  },
});
const upload = multer({storage });
router.post('/upload',upload.single('file'), mediaController.uploadMedia);
router.post('/send', mediaController.sendMessage);

module.exports = router;

