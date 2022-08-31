/** 이 게임은 클릭을 하면 뒤집힌다(첫번째 클릭)
 * 다른걸 클릭하면 또 뒤집힌다(두번째 클릭)
 * 
 * 맞으면, 둘다 뒤집힌채로 둔다.
 * 틀리면, 0.5초 후에 둘다 다시 뒤집어 물음표가 보이게 한다.
 */


/**우리의 데이터 타입을 유리하게 정해 놓고 (자료구조) 
 * 가진 데이터를 문제를 해결한다(알고리즘)  */

/**12개의 DOM 정보를 받아 올려면,3개 ROW에 대한 
 DOM 정보를 임시로, 반복문을 써서(for loop)각각에 대한 돔 정보를 
 gameDOM 배열에 받으면 될 것이다. 
*/

const cardArray = [
    {
        name: "img_1",
        img: "./img/img_1.jpg",
        id : null,
        done: false,
        

    },
    {
        name: "img_1",
        img: "./img/img_1.jpg",
        id : null,
        done: false,
        

    },
    {
        name: "img_2",
        img: "./img/img_2.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_2",
        img: "./img/img_2.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_3",
        img: "./img/img_3.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_3",
        img: "./img/img_3.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_4",
        img: "./img/img_4.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_4",
        img: "./img/img_4.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_5",
        img: "./img/img_5.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_5",
        img: "./img/img_5.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_6",
        img: "./img/img_6.jpg",
        id : null,
        done: false,

    },
    {
        name: "img_6",
        img: "./img/img_6.jpg",
        id : null,
        done: false,

    },


];

/**파싱을 할 배열을 정의 
 * clickFirst/Second -1로 초기화,0으로 하면 맨 첫번째 카드가 되어버림 
 * clickCount 클릭을 하면 클릭카운트를 증가시킴, 첫번째 클릭시 1 두번째 클릭시 2가되고 2가 되는 순간 초기화시킴
*/
 const gameDOM = [];
 let clickFirst = -1;
 let clickSecond = -1;
 let clickCount = 0;
 

 /**getGameDOM 함수  실행 */
 /**document.querySelectorAll(선택자) 선택자로 선택되는 요소를 모두 선택함. */
 const getGameDOM = () =>{

    const rows = document.querySelectorAll(".container .row");//.container 한칸 띄우고 row라는건 컨테이너 안에 자식을 가져올 수 있다
    for (let i = 0; i < rows.length; i++){
        gameDOM[i] = rows[i].querySelectorAll(".column");
    }//배열이 아닌 2차원 노드리스트를 가져옴,gameDOM에 gameDOM[1][2]식으로 접근
    console.log(gameDOM);

 };

 const createBoard = () => {
    for (let i = 0; i < gameDOM.length; i++){
        for(let j = 0; j < gameDOM[i].length; j++){
            const card = document.createElement("img");
            card.setAttribute("src", "./img/question-mark.png")//card에 물음표 이미지를 넣어준다
            card.classList.add("eachImage");//카드에 클래스를 넣어준다
            gameDOM[i][j].appendChild(card);//해당DOM(html column 자식태그) 정보에 접근해서 거기에 싹다 이미지 태그를 달아줌
        }
    }
    console.log(gameDOM);
};

/** 클릭을 했을때 로케이션 정보를 받음, 뒤집히는 것,  
 * if(!cardArray[location].done)- done false일때만 실행 되게 함.
*/

const setClickHistory = (location) => {
    if(clickFirst === -1){    //-1인것을 판단해서 어디에 위치시켜 줘야하는지 집어넣어 주겠다.
        clickFirst = location;
    }else{
        clickSecond = location;
    }
    
};

/** 처음 클릭한 카드의 인덱스는 어디에 저장돼? clickFirst
 * 두번째 클릭한 카드의 인덱스는 어디에 저장돼? clickSecond
 * 이 둘의 타입은 무엇인가? 0부터 11까지의 number
 * 어디에 접근해야돼? gameDOM
 * gameDOM에 접근하려면? 0부터 11까지 받았으면 
 * 1-3, 2-2 이런 형태로 파싱해라.
 */
const backFlip = () => {
    const parsIdFirst = cardArray[clickFirst].id.split("-");
    const parsIdSecond = cardArray[clickSecond].id.split("-");
    setTimeout(() => {gameDOM[parsIdFirst[0]][parsIdFirst[1]].querySelector("img").src =
    "./img/question-mark.png"
    gameDOM[parsIdSecond[0]][parsIdSecond[1]].querySelector("img").src =
    "./img/question-mark.png"
    }, 500);
    
};

const isCorrect = () => {
    if(cardArray[clickFirst].name === cardArray[clickSecond].name){
        cardArray[clickFirst].done = true;
        cardArray[clickSecond].done = true;
    } else{
        backFlip();

    }
};

const flip = (location) => {
    if(!cardArray[location].done){
        setClickHistory(location);
        const parsId = cardArray[location].id.split("-");
        gameDOM[parsId[0]][parsId[1]].querySelector("img").src =
            cardArray[location].img;
        clickCount++;
        if(clickCount === 2){
            clickCount = 0;
            isCorrect();
        } 
                       
        if(clickFirst !== -1 && clickSecond !== -1){
          clickFirst = -1;
          clickSecond = -1;
    }
}
};

/**섞여진 배열에 id를 부여하는 함수,쉬운코딩을위해 길게 늘여씀 */
const setIDtoCardArray = () => {
     cardArray[0].id = "0-0";
     cardArray[1].id = "0-1";
     cardArray[2].id = "0-2";
     cardArray[3].id = "0-3";
     cardArray[4].id = "1-0";
     cardArray[5].id = "1-1";
     cardArray[6].id = "1-2";
     cardArray[7].id = "1-3";
     cardArray[8].id = "2-0";
     cardArray[9].id = "2-1";
     cardArray[10].id = "2-2";
     cardArray[11].id = "2-3";


};



/** 페이지가 로드 되었을 때 자동으로 실행될 함수*/
onload = () => {
    getGameDOM();
    cardArray.sort(() => 0.5 - Math.random());//cardArray 무작위로 섞음
    setIDtoCardArray(); //섞여진 배열에 id를 부여
    createBoard(); 

    
};//전체 페이지에 모든 외부 리소스나 이미지가 전부 불러와진 이후에 작동/ 다 불러왔을때 작업해라