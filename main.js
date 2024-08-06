//Select Elements

//Page Content
let pokeInput = document.getElementById("pokeInput");
let pokeBtn = document.getElementById("pokeBtn");
let pokeName = document.getElementById("pokeName")
let pokeImg = document.getElementById("pokeImg");
let statsTable = document.getElementById("statsTable");

//Sound
let pokeSound = null;

//Stats Elements

// let pokeHP = document.getElementById("pokeHP");
// let pokeAtk = document.getElementById("pokeAtk");
// let pokeDef = document.getElementById("pokeDef");
// let pokeSpAtk = document.getElementById("pokeSpAtk");
// let pokeSpDef = document.getElementById("pokeSpDef");
// let pokeSpeed = document.getElementById("pokeSpeed");

let pokeStat = document.querySelectorAll(".pokeStat")
console.log(pokeStat)

//Add Function
function generatePokemon(event){
//Prevent Page Refresh
    event.preventDefault();

//Include userInput into the input field
    let userInput = pokeInput.value.toLowerCase();
    console.log(userInput);

//Fetch the Data
    fetch("https://pokeapi.co/api/v2/pokemon/" + userInput)
//Preview the JSON 
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myPokeData){
        //View the returned response.json(); in the Console with this parameter+console.log
        console.log(myPokeData.stats)

        //h1 data
        pokeName.innerText = myPokeData.name;

        //Image data
        pokeImg.src = myPokeData.sprites.front_default;
        //Image styles
        pokeImg.style.width = "300px";
        pokeImg.style.height = "300px";
        pokeImg.style.marginTop = "-50px";

        //Table data
        statsTable.style.display = "block";
        statsTable.style.display = "flex";
        for (i = 0; i < pokeStat.length; i++){
            pokeStat[i].innerText = myPokeData.stats[i].base_stat;
        }

        //Function with Sound
        function makeSound(){

        //Stop previous pokemon Sound
            if (pokeSound){
                pokeSound.pause();
                pokeSound.currentTime = 0;
            }

        //Play pokemon sound
            pokeSound = new Audio(myPokeData.cries.latest);
            pokeSound.play();
        }

        pokeImg.removeEventListener("mouseover", makeSound);
        pokeImg.addEventListener("mouseover", makeSound);
    })
}

//Add Event Listener
pokeBtn.addEventListener("click", generatePokemon);