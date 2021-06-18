// 랜덤 백그라운드 이미지의 행렬 형성
// Math.random과 Math.floor 기능을 통해 행렬 순번 랜더마이즈
// 핵심기능: array에서 랜덤한 숫자를 얻어 숫자에 따른 이미지를 body에 추가함

const images = [
    "1.jpg", "2.jpg", "3.jpg",
]

const chosenImages = images[Math.floor(Math.random()*images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImages}`;

document.body.appendChild(bgImage);
bgImage.id = 'bgImage';
