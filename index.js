const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 데이터 저장소 (임시, Cloud Type에서는 Redis나 DB 사용 권장)
let locations = [];

app.use(cors());
app.use(bodyParser.json());

// 위치 저장 엔드포인트
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    if (latitude && longitude) {
        locations.push({ latitude, longitude });
        console.log('새 위치 저장:', { latitude, longitude });
        res.status(200).send({ message: '위치 저장 성공' });
    } else {
        res.status(400).send({ error: '위치 정보가 올바르지 않습니다.' });
    }
});

// 위치 조회 엔드포인트
app.get('/locations', (req, res) => {
    res.status(200).send(locations);
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
