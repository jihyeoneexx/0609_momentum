// 랜덤 백그라운드 이미지의 행렬 형성
// Math.random과 Math.floor 기능을 통해 행렬 순번 랜더마이즈
// 핵심기능: array에서 랜덤한 숫자를 얻어 숫자에 따른 이미지를 body에 추가함

const images = [
    "1.jpg", "2.jpg", "3.jpg",
]
// img 폴더의 이미지들과 array 안의 이름이 동일하도록
// 이미지 파일의 이름을 jpvascript 안에서도 똑같은 형태로 쓴다!

const chosenImages = images[Math.floor(Math.random()*images.length)];

const bgImage = document.createElement("img");
// document에 없는 요소를 javascript로 생성할 경우
bgImage.src = `img/${chosenImages}`;

document.body.appendChild(bgImage);
// 생성한 html element를 body안에 추가하는 경우 
bgImage.id = 'bgImage';