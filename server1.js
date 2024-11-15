const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 데이터 저장소 (임시, 메모리)
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

// 위치 표시 HTML 제공
app.get('/', (req, res) => {
    const googleMapsApiKey = 'AIzaSyDxg42U8tFRwVWAk64COW-x5qfApBV6jLs'; // Google Maps API 키
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>서버 저장 위치 표시</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}"></script>
    </head>
    <body>
        <h1>서버에 저장된 위치</h1>
        <div id="map" style="width: 100%; height: 1000px;"></div>
        <script>
            function initMap() {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 36.708466, lng: 127.978498 }, // 기본 중심 서울
                    zoom: 7,
                });

                // 서버에서 위치 데이터 가져오기
                const locations = ${JSON.stringify(locations)};

                // 위치 데이터를 지도에 마커로 표시
                locations.forEach(location => {
                    new google.maps.Marker({
                        position: { lat: location.latitude, lng: location.longitude },
                        map: map,
                    });
                });
            }

            // Google Maps 초기화
            window.onload = initMap;
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
