document.addEventListener("DOMContentLoaded", function() {
    const createPokemonForm = document.querySelector("#createPokemonForm");
    const updatePokemonForm = document.querySelector("#updatePokemonForm");
    const table = document.querySelector("#table");

    createPokemonForm.addEventListener("submit", e => {
        const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        e.preventDefault();
        const nameInputCreate = document.querySelector("#nameCreate").value;
        const typeInputCreate = document.querySelector("#typeCreate").value;
        const secondTypeInputCreate = document.querySelector("#secondTypeCreate").value;

        const newPokemon = {
            name: nameInputCreate,
            type: typeInputCreate,
            secondType: secondTypeInputCreate
        };

        pokemons.push(newPokemon);
        localStorage.setItem("pokemons", JSON.stringify(pokemons));
        displayPokemons();
        createPokemonForm.reset();
    });

    updatePokemonForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameUpdate = document.querySelector("#nameUpdate").value;
        const typeUpdate = document.querySelector("#typeUpdate").value;
        const secondTypeUpdate = document.querySelector("secondTypeUpdate").value;

        const selectedPokemonIndex = updatePokemonForm.dataset.index;
        updatePokemon(selectedPokemonIndex,nameUpdate, typeUpdate, secondTypeUpdate);
        updatePokemonForm.reset();
    });

    function displayPokemons(){
        const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        while(table.rows.length > 1 ){
            table.deleteRow(1);
        }

        for (let i = 0; i < pokemons.length; i++){
            const pokemon = pokemons[i];

            const row = table.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = pokemon.name;
            cell2.textContent = pokemon.type;
            cell3.textContent = pokemon.secondType;

            const updateButton = document.createElement("button");
            updateButton.innerHTML = "Update";
            updateButton.addEventListener("click", () => fillUpdateForm(i));
            cell4.appendChild(updateButton);

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click", () => deletePokemon(i));
            cell4.appendChild(deleteButton);
        }
    }

    function updatePokemon(index, name, type, secondType){
        const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        pokemons[index] = {name, type, secondType};
        localStorage.setItem("pokemons", JSON.stringify(pokemons));
        displayPokemons();
    }

    function deletePokemon(index){
        const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        pokemons.splice(index, 1);
        localStorage.setItem("pokemons", JSON.stringify(pokemons));
        displayPokemons();
    }

    function fillUpdateForm(index){
        const pokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
        const pokemonToUpdate = pokemons[index];
        document.querySelector("#nameUpdate").value = pokemonToUpdate.name;
        document.querySelector("#typeUpdate").value = pokemonToUpdate.type;
        document.querySelector("#secondTypeUpdate").value = pokemonToUpdate.secondType;
        updatePokemonForm.dataset.index = index;
    }
    displayPokemons();
})

