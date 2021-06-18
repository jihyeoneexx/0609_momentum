//navigator -> get geolocation impormation
// getCurrentPosition(위치 정보 획득에 성공했을 시 실행될 함수, 실패했을 시 실행될 함수)
// getCurrentPosition 로 유저의 위치 정보-위도와 경도-를 얻고, 이를 성공시 실행될 함수에 콜백한다.
// 위도와 경도 정보를 API를 사용하여 장소와 날씨 정보로 변환함 -> Call API By geographic coordinates

const API_KEY = "6af213b58ec1dbbaa704dfc82d187d76";


function onGeoOK(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url =
     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // call API 

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:nth-child(2)");
        const temp = document.querySelector("#weather span:last-child");
        const name = data.name;
        weather.innerText = data.weather[0].main;
        city.innerText = data.name;
        temp.innerText = `${Math.floor(data.main.temp)}˚C`;})
    
    // Javascript가 브라우저에 요청하여 API url에 방문하지 않아도 url내부의 자체정보를 브라우저로 가져옴 (Network 탭에서 확인)
    
    }

function onGeoError(){
    alert("Can't find you!");
}

navigator.geolocation.getCurrentPosition(onGeoOK,onGeoError);