const listaPokemon = document.querySelector("#listaPokemon");
let URL= "https://pokeapi.co/api/v2/pokemon/";
const botonesHeader = document.querySelectorAll(".btn-header");

/*Metodo para recorrer la API*/
for( let i = 1; i<= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

/*Funcion para mostrar Pokemon*/
function mostrarPokemon(poke){
    /*Subfuncion para los tipos de pokemon*/ 
    let tipos = poke.types.map(type => 
        ` <p class="${type.type.name} tipo">${type.type.name} </p>`);
        tipos = tipos.join('');

    /*Subfuncion para arreglar el ID de los pokemon */   
    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId ="00"+ pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
         <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" 
            alt="${poke.name}">
         </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}M</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>`;

        listaPokemon.append(div);

}

/*Eventos para los botones */
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id //trae el id del boton seleccionado

    listaPokemon.innerHTML = ""; //esto ayuda a limpiar la pagina

    for( let i = 1; i<= 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos"){
                    mostrarPokemon(data);
                }else{
                    const tipos = data.types.map(type => type.type.name);
                    if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                    }
                }
                
            })
    }
})) 

