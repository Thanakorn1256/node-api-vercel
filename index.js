const express = require('express');
const axios = require('axios'); // ใช้ axios สำหรับการดึงข้อมูล
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API ON PORT ${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        // ดึงข้อมูลจาก Firebase Realtime Database
        const response = await axios.get('https://src-enduro-default-rtdb.firebaseio.com/44/12/id.json');
        let firebaseData = response.data;

        // ตรวจสอบว่า firebaseData เป็นตัวเลขหรือไม่ และเพิ่ม 10
        if (typeof firebaseData === 'number') {
            firebaseData += 10;
        }

        // ส่งข้อความที่ต้องการพร้อมข้อมูลจาก Firebase (พร้อมเพิ่ม 10)
        res.send(`This is my API running..... Firebase Data: ${JSON.stringify(firebaseData)}`);
    } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        res.status(500).send('Error fetching data from Firebase');
    }
});

module.exports = app;