const mediaModel = require('../models/mediaModel');

async function uploadMedia(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const mediaId = await mediaModel.uploadMedia(file.path);
        res.status(200).json({ mediaId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function sendMessage(req, res) {
  try {
      const { to, mediaId } = req.body; 
      console.log(to,mediaId);
      const result = await mediaModel.sendMessage(to, mediaId);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports = {
    uploadMedia,
    sendMessage
};
