const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
async function uploadMedia(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const form = new FormData();
        form.append('file', fileStream, { filename: 'file.pdf', contentType: 'application/pdf' });
        form.append('type', 'document');
        form.append('messaging_product', 'whatsapp');
        form.append('access_token', process.env.ACCESS_TOKEN);
        const response = await axios.post(`https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/media`, form, {
            headers: { ...form.getHeaders() },
        });

        return response.data.id;
    } catch (error) {
        throw new Error('Error uploading media: ' + error.message);
    }
}

async function sendMessage(to, mediaId) {
    try {
        const message = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'document',
            document: {
                id: mediaId,
            },
        };
        console.log('message',message);
        const response = await axios.post(`https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`, message, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('data',response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error sending message: ' + error.message);
    }
}

module.exports = {
    uploadMedia,
    sendMessage,
};
