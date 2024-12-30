const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

// ฟังก์ชันเพื่อคำนวณเวลาระหว่าง StartSS1 และ ENDSS1
const calculateTimeDiff = (start, end) => {
    const startDate = new Date(`2023-05-01T${start}`);
    const endDate = new Date(`2023-05-01T${end}`);
    const diffInMs = endDate - startDate;
    const diffInSec = diffInMs / 1000; // แปลงเป็นวินาที
    return diffInSec;
};

// Route เพื่อดึงข้อมูลและแสดงผล
app.get('/', async (req, res) => {
    try {
        // ดึงข้อมูลจาก Firebase
        const response = await axios.get('https://src-enduro-default-rtdb.firebaseio.com/44.json');
        const firebaseData = response.data;

        // สร้างอาร์เรย์เพื่อเก็บข้อมูลที่ได้
        const result = [];

        for (const key in firebaseData) {
            const data = firebaseData[key];

            // คำนวณความแตกต่างระหว่าง StartSS1 และ ENDSS1
            const startSS1 = data.StartSS1.replace('"', '').trim(); // ลบเครื่องหมายคำพูดออก
            const endSS1 = data.ENDSS1.replace('"', '').trim();   // ลบเครื่องหมายคำพูดออก
            const diff = calculateTimeDiff(startSS1, endSS1);

            // บันทึกข้อมูลที่ต้องการในอาร์เรย์ result
            result.push({
                name: data.name,
                id: data.id,
                team: data.Team || '',  // ตรวจสอบว่า Team มีหรือไม่
                totalClass: data.TotalClass || '',  // ตรวจสอบว่า TotalClass มีหรือไม่
                startSS1,
                endSS1,
                diff,
                result: `Time Diff: ${diff} seconds`
            });
        }

        // เรียงลำดับตามเวลาที่แตกต่างน้อยที่สุด
        result.sort((a, b) => a.diff - b.diff);

        // สร้าง HTML ตารางเพื่อแสดงผล
        let table = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Team</th>
                        <th>TotalClass</th>
                        <th>StartSS1</th>
                        <th>ENDSS1</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        result.forEach(item => {
            table += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.id}</td>
                    <td>${item.team}</td>
                    <td>${item.totalClass}</td>
                    <td>${item.startSS1}</td>
                    <td>${item.endSS1}</td>
                    <td>${item.result}</td>
                </tr>
            `;
        });

        table += `</tbody></table>`;

        // ส่งผลลัพธ์เป็น HTML ตาราง
        res.send(table);
    } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        res.status(500).send('Error fetching data from Firebase');
    }
});

app.listen(PORT, () => {
    console.log(`API ON PORT ${PORT}`);
});

