/*
 *
 *   Generate test data with testing purposes
 *
*/

// Interfaces based on the models

interface User {
  name: string;
  password: string;
}

interface Category {
  name: string;
  color: string;
  user: number;
}

interface Element {
  name: string;
  image: string;
  chapter: number;
  category: number;
}

// Data that will be used

const users: User[] = [
  { name: "benito83", password: "22March1989" },
  { name: "cunibaldoacevedo", password: "ouju6ieree" },
  { name: "angela91", password: "Oe6yu5bu8ie" },
  { name: "ambercute14", password: "amaprincess" },
  { name: "sarahyoung88", password: "qwerty" },
  { name: "katarinaclaes", password: "1234" },
  { name: "jameslaflamme", password: "mOnKeY" },
  { name: "alfredop447", password: "123456789" },
  { name: "r0dr1g3zp3r3d", password: "1qaz2wsx" },
  { name: "sethharley", password: "pongomango24/7" },
  { name: "nobuki123", password: "ochinchindaisuki88" },
  { name: "rumi.takisawa", password: "kyoto4ever" },
  { name: "kumikokane", password: "loveutuxedo" },
  { name: "noguchisama", password: "7836293456273" },
  { name: "adalberta", password: "Hiner1949" },
  { name: "marchesiegidio", password: "Ceengis8poF" },
  { name: "ricciruggero", password: "Aret1956" },
  { name: "ruthyefremova", password: "uihwirfhyw87e342" },
  { name: "tretiakov3000", password: "aequ7Pae9" },
];

const categoriesNames: string[] = [
  "Anime",
  "HBO",
  "Netflix",
  "neflis",
  "monas chinas",
  "manhuas",
  "kpop",
  "Libros",
  "comics",
  "hentai",
  "PDF BOOKS",
  "selfhelp",
  "aweafdds",
];

async function getRandomColor(): Promise<string> {
  const cases = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += cases[Math.floor(Math.random() * cases.length)];
  }
  return result;
}

const elementsNames: string[] = [
  "ONE PUNCH MAN",
  "Evangelion",
  "Sex Education",
  "Game of Thrones",
  "NO GAME NO LIFE",
  "Stranger Things",
];

// Action

// POST users
users.forEach(async (u) => {
  const req = await fetch("http://localhost:8080/api/user/", {
    method: "POST",
    body: JSON.stringify(u),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
  });
  console.log(await req.text());
});

// POST categories

categoriesNames.forEach(async (c) => {
  const categ: Category = {
    name: c,
    color: await getRandomColor(),
    user: Math.floor(Math.random() * users.length),
  };
  const req = await fetch("http://localhost:8080/api/category", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(categ),
  });
  console.log(await req.text());
});

// POST elements

elementsNames.forEach(async (e) => {
  const imageReq = await fetch("https://some-random-api.ml/img/cat", {
    method: "GET",
  });
  const image = await imageReq.json();
  const req = await fetch("http://localhost:8080/api/element", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: e,
      image: image.link,
      chapter: 0,
      category: Math.floor(Math.random() * categoriesNames.length),
    }),
  });
  console.log(await req.text());
});
