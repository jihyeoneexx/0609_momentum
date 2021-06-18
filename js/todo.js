//todo list -> form으로 유저의 응답을 받아 li화
// list 형태로 확인, 이를 불러오거나 삭제할 수 있도록 하는 것이 핵심 기능
// html의 ul에 유저가 작성한 리스트를 li로 추가 
// greeting과 유사: submit event를 받고, 기본 동작을 prevent 후 input에서 value를 받음

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];  // localstorage 저장용 정보, but 배열 형태는 스토리지에 저장 불가능, 텍스트만 가능함
    // 첫 실행 시 배열은 요소 없이 공백으로 시작, 요소 추가될 때마다 기존에 저장되어있던 data들 복원 필요, 새로운 todo 또한 추가할 수 있도록
    // 기존의 locak storage에 있는 toDo들을 배열 요소로서 가진 상태로 페이지가 refresh 되어야 함 -> parsedToDos(localstorage에 저장된 이전의 todo)와 동일한 배열요소 가짐 
    // -> 가변할 수 있는 변수 선언을 사용 : let
    // 일종의 DB 역할을 함 

const TODOS_KEY = "todos";

function saveToDos(){
    // toDos array를 locarstorage에 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 현재는 행렬을 >문자< 형태로 만들어 로컬스토리지에 저장, 이 데이터를 행렬로서 활용하기 위해서는 후에 다시 행렬 형태로 변환하여 사용해야함
    // localstorage에는 string만 저장 가능하므로, array를 string으로 변환 
    // JSON.stringify : data를 string 형태로 저장할 때 많이 사용, 단순히 문자열의 기능만을 함
    // JSON.parse("[n, m, x, y]") : data의 문자열을 분석하여 자바스크립트에서 사용 가능한 객체(object)나, Javascript 값으로 변형함 // localstorage의 TODOS_KEY를 getItem 할 경우에는 배열 형태가 됨
}

function deleteToDo(event){ 
    // 여러개의 버튼이 동일한 이벤틑를 기다리고 있으므로 정확히 몇 번째 버튼이 클릭되었는지 알 수 없음
    // 따라서, 이벤트가 발생할 당시의 정보를 얻기 위해 인자로서 event(click시 발생하는 함수기 때문에 click에 대한)를 받는다.
    // event가 가진 property들로 해당 button의 parentElemet(li)가 누군지 알 수 있음=
//    console.log(event.target.parentElement);
    // event에 대한 정보를 받고, target(클릭된 HTML element)의 property 확인(parentElement) ---- 삭제해야할 타겟을 알 수 있음

    const deleteLi = event.target.parentElement; //target=button, parent=li
    toDos = toDos.filter(todo => todo.id !== parseInt(deleteLi.id)); // toDos array에서 삭제 버튼을 클릭한 요소를 제외하고 새로운 array로 업데이트
                         // li의 id와 변수의 id가 다를 때 true -> 클릭한 li.id와 todo.id가 같은 요소는 false이므로 배열에서 제외한다! 
                         // toDos.filter(todo => todo.id !== deleteLi.id) 라고만 실행하면 실행되지 않음
                         // -> todo.id는 date.now()로 부여하여 string으로 저장되었다가 parse로 다시 object가 되었으므로 number타입
                         // deleteLi.id는 localstorage에 저장된 id값을 >html<에 부여한 것이므로 string 타입, 따라서 타입이 같지 않으므로 연산자로 비교 불가능, parseInnt() : sring을 number로 변환
    
    saveToDos(); // toDos를 재정의 했으므로 toDos DB에서 해당 요소를 제외시킨 후, 새롭개 형성한 array를 다시 한 번 DB를 저장함
    
    deleteLi.remove(); // = delete parent li
 }

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id; // html의 li에 localstorage에 저장된 id값을 부여 -> string 타입
    const span = document.createElement("span");
    span.innerText = newTodo.text; // coming from handleToDosubmit. object를 인자로 갖기 때문에 id값 아닌 text값을 call
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span); // 이후 삭제 버튼을 만들기 위해 li 내부에 span구조 형성
    li.appendChild(button);
    toDoList.appendChild(li); // 형성된 li를 ul에 추가
} 

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value; // const에 변수값을 할당해서 const 자체는 수정되지 않더라도 변수로 값 변경 가능
    toDoInput.value = "";
    // submit(enter) 할 때마다 해당 입력값을 빈 칸으로 초기화
    // 칸을 빈 칸으로 초기화해도 newTodo의 값이 사라지는 것은 아님!
    // (11번째 줄)newTodo라는 새로운 변수에 사용자 입력값을 먼저 복사했기 때문, 영향x 
    const newTodoObj = {
        // todo의 요소가 id를 가졌을 때 특정 id와 요소를 매치하여(id로 item 구분) 동일한 내용이라도 삭제할 수 있음
        text:newTodo,
        id: Date.now(), // -> number 타입 
    }
    toDos.push(newTodoObj); // toDos arry에 vlaue 저장 -> localstorage 
    paintToDo(newTodoObj); // + #7.6 기존의 newTodo라는 text가 아닌 object를 인자로 받음
    saveToDos();
}
toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    // localstorage에 저장된 todo가 있을 경우
    const parsedToDos = JSON.parse(savedToDos); // string으로 저장한 요소를 다시 javascript 요소로 변환 === 현재는 object가 담긴 array 형태
    // Javascript can execute all each items on array.  ::: forEach 구문 (행렬 안 각각 요소에 대하여 함수 실행)

    toDos = parsedToDos; // 기존의 저장된 todo를 array에 포함

    //parsedToDos.forEach((item) => console.log("blaaaa"));
    // forEach : array의 각 item에 대해 function을 실행해 줌 -> But, Javascript에서는 '어떤' 아이템에 함수가 실행되었는지 표적을 아는게 중요함
    // *item argument* : event와 유사, Javascript가 제공하는 인자. 함수 인자로서 사용 시 처리되고 있는 item, 타겟에 대한 정보를 제공해 줌
    // arrow function : short cut, (argument) => function execute 

    parsedToDos.forEach(paintToDo);
    
}



// JSON.parse 
// item argument
// forEach
// filter(array의 item을 인자로 function 각기 실행후 true return, true가 아닌 요소를 제외하고 새로운 array를 형성) 
// filter 결과값을 받는 새로운 array 이름을 지정할 수 있음, 기존의 array를 변경하는게 아니라! 해당 요소를 제외한 새로운 array를 형성!
// arrow function