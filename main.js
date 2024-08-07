//Select Elements

//Page Content
let pokeInput = document.getElementById("pokeInput");
let pokeBtn = document.getElementById("pokeBtn");
let pokeName = document.getElementById("pokeName")
let pokeImg = document.getElementById("pokeImg");
let statsTitle = document.getElementById("statsTitle");
let statsTable = document.getElementById("statsTable");
let movesTitle = document.getElementById("movesTitle");
let movesList = document.getElementById("movesList");

//Sound
let pokeSound = null;

//Stats Elements

let pokeStat = document.querySelectorAll(".pokeStat")
// console.log(pokeStat)

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

        //Reset Moves data
        movesList.innerText = "";

        //Pokemon Title data
        pokeName.innerText = myPokeData.name + " #" + myPokeData.id;

        //Image data
        pokeImg.src = myPokeData.sprites.front_default;
        //Image styles
        pokeImg.style.width = "300px";
        pokeImg.style.height = "300px";
        pokeImg.style.marginTop = "-50px";

        //Table title style
        statsTitle.style.display = "block";
        statsTitle.style.display = "flex";
        statsTitle.style.marginTop = "-100px"

        //Table data
        statsTable.style.display = "block";
        statsTable.style.display = "flex";
        // Loop to display the base stat totals of all pokemon efficently
        for (let i = 0; i < pokeStat.length; i++){
            pokeStat[i].innerText = myPokeData.stats[i].base_stat;
        }

        //Moves data
        movesTitle.style.display = "block";
        movesTitle.style.display = "flex";
        // Loop to display all the moves of all pokemon efficently
        for (let i = 0; i < myPokeData.moves.length; i++){
            let addList = document.createElement("li");
            addList.innerText = myPokeData.moves[i].move.name;
            movesList.appendChild(addList);

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
        pokeImg.removeEventListener("click", makeSound);
        pokeImg.addEventListener("click", makeSound);
    })
}

//Add Event Listener
pokeBtn.addEventListener("click", generatePokemon);







// Randomize JS

//Select Elements
let randomizeBtn = document.getElementById("randomPokeBtn");

//Add Function
function randomizePokemon(event) {
    event.preventDefault();

//Fetch the Data
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
//Preview the JSON 
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myPokeData){
        //View the returned response.json(); in the Console with this parameter+console.log
        console.log(myPokeData)


        //Generate a randomNumber between 0 - 1302
        let randomNumber = Math.floor(Math.random() * myPokeData.results.length);

        // Retrieve Selected Pokemon's name and URL for more data
        let selectedPokemon = myPokeData.results[randomNumber];
        let pokemonName = selectedPokemon.name;
        let pokemonUrl = selectedPokemon.url;

        //Create another Fetch
        fetch(pokemonUrl)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(myPokeData){
            console.log(myPokeData);

        //Reset Moves data
        movesList.innerText = "";

        pokeName.innerText = pokemonName + " #" + myPokeData.id;
        pokeInput.value = pokemonName;

        //Image data
        pokeImg.src = myPokeData.sprites.front_default;
        //Image styles
        pokeImg.style.width = "300px";
        pokeImg.style.height = "300px";
        pokeImg.style.marginTop = "-50px";

                //Table title style
        statsTitle.style.display = "block";
        statsTitle.style.display = "flex";
        statsTitle.style.marginTop = "-100px"

        //Table data
        statsTable.style.display = "block";
        statsTable.style.display = "flex";
        // Loop to display the base stat totals of all pokemon efficently
        for (let i = 0; i < pokeStat.length; i++){
            pokeStat[i].innerText = myPokeData.stats[i].base_stat;
        }

        //Moves data
        movesTitle.style.display = "block";
        movesTitle.style.display = "flex";
        // Loop to display all the moves of all pokemon efficently
        for (let i = 0; i < myPokeData.moves.length; i++){
            let addList = document.createElement("li");
            addList.innerText = myPokeData.moves[i].move.name;
            movesList.appendChild(addList);
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
        pokeImg.removeEventListener("click", makeSound);
        pokeImg.addEventListener("click", makeSound);
    })
})
    
}

//Add Event Listener
randomizeBtn.addEventListener("click", randomizePokemon);