const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    // padStart는 String에만 적용 가능, date의 값은 number로 오므로 변환 필요 

    clock.innerText = (`${hours} : ${minutes} : ${seconds}`);
}

getClock();
setInterval(getClock, 1000);
// setInterval만 실행하면 1000ms 뒤에 첫 실행이 되므로
// getClock();을 즉시 실행으로 1회 실행하면 page road후 지연 없이 실행 가능
