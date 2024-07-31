const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const accessToken = process.env.ACCESS_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;

async function uploadMedia(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const form = new FormData();
        form.append('file', fileStream, { filename: 'file', contentType: 'image/png' });
        form.append('type', 'image');
        form.append('messaging_product', 'whatsapp');
        form.append('access_token', accessToken);
        const response = await axios.post(`https://graph.facebook.com/v17.0/${phoneNumberId}/media`, form, {
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
            type: 'image',
            image: {
                id: mediaId,
            },
        };
        console.log('message',message);
        const response = await axios.post(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, message, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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
