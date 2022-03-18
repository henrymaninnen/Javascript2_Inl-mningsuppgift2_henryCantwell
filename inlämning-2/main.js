class Character{
    constructor(name, gender, height, mass, hair_color, pictureUrl){
        this.name = name;
        this.gender = gender;
        this.height = +height;
        this.mass = +mass;
        this.hair_color = hair_color;
        this.pictureUrl = pictureUrl;
    }
    weightF = (cTwo, cOne, container) =>{
        let weightDifference = cTwo.mass - cOne.mass;
         let weight = weightDifference.toString()
        if(cTwo.mass > cOne.mass){container.innerHTML = `<p>${cTwo.name} heavy, ${cTwo.mass}kg, which
         ${weightDifference}kg more than me</p>`}
        else if(cTwo.mass < cOne.mass){container.innerHTML = `<p>${cTwo.name} is light,
         ${cTwo.mass}kg, that is ${weightDifference < 0 ? weight.slice(1) : weightDifference}kg
          less than me</p>`}
         else{container.innerHTML = `<p>we are the same weight ${cOne.mass}kg</p>`}
    }
    heightF = (cTwo, cOne, container) =>{
        let heightDifference = cTwo.height - cOne.height;
         let height = heightDifference.toString()
        if(cTwo.height > cOne.height){container.innerHTML = 
          `<p>${cTwo.name} is ${cTwo.height}cm tall, which ${heightDifference}cm more than me</p>`}
        else if(cTwo.height < cOne.height){container.innerHTML = `<p>${cTwo.name} 
        is small, ${cTwo.height}cm, that is${heightDifference < 0 ? height.slice(1) : heightDifference}cm
         less than me</p>`}
         else{container.innerHTML = `<p>we are the same height ${cOne.height}cm</p>`}
    } 
    hairF = (cTwo, cOne, container) =>{
        if(cTwo.hair_color === "none" && cOne.hair_color === "none"){container.innerHTML =
           `<p>${cTwo.name} is bald like me</p>`}
        else if(cTwo.hair_color === "none"){container.innerHTML = 
          `<p>i have ${cOne.hair_color} hair, and ${cTwo.name} is bald.</p>`}
       else if(cTwo.hair_color === cOne.hair_color){container.innerHTML = `<p>${cTwo.name} hair is ${cTwo.hair_color}, like mine</p>`}
         else{container.innerHTML = 
          `<p>${cTwo.name}s hair is ${cTwo.hair_color}, unlike my, which is ${cOne.hair_color}</p>`}
    }
    genderF = (cTwo, cOne, container) =>{
        if(cTwo.gender === "none" && cOne.gender === "none"){container.innerHTML = 
          `<p>${cTwo.name} does not have any gender, like me</p>`}
        else if(cTwo.gender === "none"){container.innerHTML =
           `<p>i am a ${cOne.gender} and ${cTwo.name} does not have any gender.</p>`}
       else if(cTwo.gender === cOne.gender){container.innerHTML = 
        `<p>${cTwo.name} is a ${cTwo.gender}, which is same as me</p>`}
         else{container.innerHTML = 
          `<p>${cTwo.name}s gender is ${cTwo.gender}, unlike mine, which is ${cOne.gender}</p>`}
    } 
} 
const fetchData = async (url) =>{
    let response = await fetch(url);
    let json = await response.json();
    return json;
}
let getData = async() =>{ 
    let selectedCharacterOne = document.querySelector("select[name='selectOne']");
    let selectedCharacterTwo= document.querySelector("select[name='selectTwo']");
    let dataOne = await fetchData(`https://swapi.dev/api/people/${selectedCharacterOne.value}/`);
    let dataTwo = await fetchData(`https://swapi.dev/api/people/${selectedCharacterTwo.value}/`);
   let characterOne = new Character(dataOne.name, dataOne.gender, dataOne.height, dataOne.mass, dataOne.hair_color,  getImg(dataOne.name));
   let characterTwo = new Character(dataTwo.name, dataTwo.gender, dataTwo.height, dataTwo.mass, dataTwo.hair_color,  getImg(dataTwo.name));
   function getImg (x){
    switch(x){
      case "Luke Skywalker": 
        return "./luke-skywalker.jpg";
      case "C-3PO":
        return "./cp30.jpg";
      case "R2-D2":
        return "./r2d2.jpg";
      case "Darth Vader":
        return "./darthvader.jpg";
      case "Leia Organa":
        return "./leila.jpg";
      case "Owen Lars":
        return "./owen.jpg";
      case "Beru Whitesun lars":
        return "./ben.jpg";
      case "R5-D4":
        return "./r5d4.jpg";
    }
  }
  if(characterOne.hair_color ==="n/a"){characterOne.hair_color = "none"}
  if(characterOne.hair_color ==="n/a"){characterOne.hair_color = "none"}
   if(characterTwo.gender ==="n/a"){characterTwo.gender = "none"}
  if(characterTwo.gender==="n/a"){characterTwo.gender = "none"}
  console.log(characterOne);
   let textOne = document.createElement("p");
   textOne.innerHTML = `<h1>${characterOne.name}</h1> <br>
        <img src="${characterOne.pictureUrl}" alt="${characterOne.name}"> <br>
        <button class="characterOneBtn" id="weight${characterOne.name}">weight</button>
        <button class="characterOneBtn" id="height${characterOne.name}"> height</button> <br>
        <button class="characterOneBtn" id="hair${characterOne.name}">hair</button>
        <button class="characterOneBtn" id="gender${characterOne.name}">gender</button>
        <div id="charText1" class="char-text"></div>
        `
   let textTwo = document.createElement("p");
   textTwo.innerHTML = `<h1>${characterTwo.name}</h1> <br>
        <img src="${characterTwo.pictureUrl}" alt="${characterTwo.name}"> <br>
        <button class="characterTwoBtn" id="weight2${characterTwo.name}">weight</button>    
        <button class="characterTwoBtn" id="height2${characterTwo.name}">height</button> <br>
        <button class="characterTwoBtn" id="hair2${characterTwo.name}">hair</button>   
        <button class="characterTwoBtn" id="gender2${characterTwo.name}">gender</button>
        <div id="charText2" class="char-text"></div>
        `
    let charDivOne = document.getElementById("charDivOne")
    let charDivTwo = document.getElementById("charDivTwo")
    document.getElementById("characterCointainer").append(charDivOne, charDivTwo)
    charDivOne.classList.add("charDiv");
    charDivTwo.classList.add("charDiv");
    charDivOne.innerHTML = textOne.innerHTML;
    charDivTwo.innerHTML = textTwo.innerHTML;
    let text1 = document.querySelector("#charText1")
    let text2 = document.querySelector("#charText2")
  document.querySelectorAll(".characterOneBtn").forEach(b => {
      b.addEventListener("click", (e) => {
        if(e.target.id === `weight${characterOne.name}`){
            characterOne.weightF(characterTwo, characterOne, text1)
        }
        else if(e.target.id === `height${characterOne.name}`){
            characterOne.heightF(characterTwo, characterOne, text1)
        }
        else if(e.target.id === `hair${characterOne.name}`){
            characterOne.hairF(characterTwo, characterOne, text1)
        }
        else if(e.target.id === `gender${characterOne.name}`){
            characterOne.genderF(characterTwo, characterOne, text1)
        }     
    })
  });
  document.querySelectorAll(".characterTwoBtn").forEach(b => {
      b.addEventListener("click", (e) => {
        if(e.target.id === `weight2${characterTwo.name}`){
            characterTwo.weightF(characterOne, characterTwo, text2)
        }
        else if(e.target.id === `height2${characterTwo.name}`){
            characterTwo.heightF(characterOne, characterTwo, text2)
        }
        else if(e.target.id === `hair2${characterTwo.name}`){
            characterTwo.hairF(characterOne, characterTwo, text2)
        }
        else if(e.target.id === `gender2${characterTwo.name}`){
            characterTwo.genderF(characterOne, characterTwo, text2)
        }   
    })
  });
} 



