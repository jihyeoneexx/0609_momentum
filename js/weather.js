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
