//Select Elements
let pokeInput = document.getElementById("pokeInput");
let pokeBtn = document.getElementById("pokeBtn");
let pokeName = document.getElementById("pokeName")
let pokeImg = document.getElementById("pokeImg");
let pokeSound = null;

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
        console.log(myPokeData)
        
        //h1 styles
        pokeName.innerText = myPokeData.name;

        //Image styles
        pokeImg.src = myPokeData.sprites.front_default;
        pokeImg.style.width = "300px";
        pokeImg.style.height = "300px";
        pokeImg.style.marginTop = "-50px";

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