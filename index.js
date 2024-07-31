const express = require('express');
const mediaRoutes = require('./routes/mediaRoutes');
const multer = require('multer')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', mediaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
