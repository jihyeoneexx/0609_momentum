const quotes = [
    { main: "하지만 우리가 빛의 속도로 갈 수조차 없다면, 같은 우주라는 개념이 대체 무슨 의미가 있나?",
        sub: "  - 우리가 빛의 속도로 갈 수 없다면",
    },
    { main: "I've had lots of troubles, so I write jolly tales.",
    sub: "  - Louisa May Alcott",
    },
    { main: "Chess isn't always competitive. Chess can also be beautiful.",
    sub: "  - Queen's Gambit, Halmon",
    },
    { main: "My experience has taught me what you know isn't always what's important.",
    sub: "  - Queen's Gambit, Alma",
    },
    { main: "The strongest person is the person who isn't scared to be alone.",
    sub: "  - Queen's Gambit, Alice",
    },
    { main: "If you don't like it, You change it.",
    sub: "  - Miss Sloane",
    },
    { main: "Suddenly, time travel seems almost unnecessary, because every detail of life is so delightful.",
    sub: "  - About time",
    },
    { main: "We are all traveling through ime together, everyday of our lives. all we can do is do our best to relish this remarkable ride.",
    sub: "  - About time",
    }
]
// array 내부의 object 형태
// arry형태로 정렬된 object에 랜덤하게([0]~[7]중에 하나) 접근하여 그 중 1개를 송출해야함

const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");

// Math object : 수학 계산과 관련된 계산 기능을 포함한 객체
// Math.random() = 0~1사이의 숫자를 랜덤으로 송출함(0.4353423423)
// Math.random() * 10 = 1~10사이의 숫자를 송출 
// Matn.round(반올림), ceil(올림), floor(버림)

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.main;
author.innerText = todaysQuote.sub;