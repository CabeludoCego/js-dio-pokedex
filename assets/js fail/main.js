const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let counter = 0;

const limit = 10; let offset = 151;
const maxRecords = 721;
// ALL X-Y pokémons starting from Johto


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        

            <button id="${pokemon.number}" class="popup-btn" href="${pokemon.number}">
                Open Modal
            </button>

            <div id="modal-${pokemon.number}" class="modal">

                <div class="modal-content">
                    <span class="close">X</span>
                    <p>${pokemon.name}</p>
                </div>

            </div>
        </li>
    `
}

function detailsWindow(){

    // let pokemonId = id;
    // let pokemon = "pokemon." + JSON.stringify(pokemonId);
    // window.open(`
    //     <span class="name">${pokemon}</span>
        
    // `);

    // `
    // <div id="myModal" class="modal">

    // <div class="modal-content">
    //     <span class="close">&times;</span>
    //     <p>Some text in the Modal..</p>
    // </div>

    // </div>
    // `
}


function firstLoad() {
    document.addEventListener("load", function(e){
        const target = e.target.closest(".popup-btn"); // Or any other selector.
        console.log("ok 1");
        if(target){
            console.log("ok 2");
            var btn = document.querySelectorAll(".popup-btn");
            var modals = document.querySelectorAll(".modal");
            var spans = document.getElementsByClassName("close");
            console.log(modals);
            btn.forEach((item) => {
                item.addEventListener("click", () => {
                    for (var i = 0; i < btn.length; i++) {
                        btn[i].onclick = function(e) {
                            e.preventDefault();
                            modal = document.querySelector(e.target.getAttribute("id"));
                            modal.style.display = "block";
                        }
                    }
                    // When the user clicks on <span> (x), close the modal
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].onclick = function() {
                            for (var index in modals) {
                                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
                            }
                        }
                    }
                    
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target.classList.contains('modal')) {
                            for (var index in modals) {
                                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
                            }
                        }
                    }
        
        
                });
            });
        }
    });
}
function secondLoad(){

    document.addEventListener("click", function(e){
        const target = e.target.closest(".popup-btn"); // Or any other selector.
        console.log("ok 1");
        if(target){
            console.log("ok 2");
            var btn = document.querySelectorAll(".popup-btn");
            var modals = document.querySelectorAll(".modal");
            var spans = document.getElementsByClassName("close");
            btn.forEach((item) => {
                console.log("added?");
                item.addEventListener("click", () => {
                    for (var i = 0; i < target.length; i++) {
                        target[i].onclick = function(e) {
                            e.preventDefault();
                            modal = document.querySelector(e.target.getAttribute("href"));
                            modal.style.display = "block";
                        }
                    }
                    // When the user clicks on <span> (x), close the modal
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].onclick = function() {
                            for (var index in modals) {
                                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
                            }
                        }
                    }
                    
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target.classList.contains('modal')) {
                            for (var index in modals) {
                                if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
                            }
                        }
                    }
        
                });
            });
        }
    });
}


async function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
    firstLoad();
    // if (counter<3){
    //     await secondLoad();
    // }
    // counter += 1;
    // console.log(counter);
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
    
    // console.log(document.getElementsByClassName("popup-btn"));
})




// var btn = document.getElementsByClassName("popup-btn");
// var modals = document.getElementsByClassName("modal");
// var spans = document.getElementsByClassName("close");

// var modals = document.getElementsByClassName("modal");

// window.addEventListener('load', function () {
//     document.querySelectorAll(".popup-btn").forEach((item) => {
//         console.log("working");
//         item.addEventListener("click", () => {
//             for (var i = 0; i < btn.length; i++) {
//                 btn[i].onclick = function(e) {
//                     e.preventDefault();
//                     modal = document.querySelector(e.target.getAttribute("id"));
//                     modal.style.display = "block";
//                 }
//             }
//             // When the user clicks on <span> (x), close the modal
//             for (var i = 0; i < spans.length; i++) {
//                 spans[i].onclick = function() {
//                     for (var index in modals) {
//                         if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//                     }
//                 }
//             }
            
//             // When the user clicks anywhere outside of the modal, close it
//             window.onclick = function(event) {
//                 if (event.target.classList.contains('modal')) {
//                     for (var index in modals) {
//                         if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//                     }
//                 }
//             }


//         });
//     });
// });



// var btns1 = document.getElementsByClassName("popup-btn");
// console.log(btns1);

// window.addEventListener('load', function () {
//     console.log("loaded");
//     console.log(document.getElementsByClassName("popup-btn"));

//     // document.getElementsByClassName("popup-btn").forEach((item) => {
//     //     console.log("buton");
//     //     item.addEventListener('click', (e) => {
//     //         e.preventDefault();
//     //         console.log(e);
//     //     });
//     // });

//     var btn = document.getElementsByClassName("popup-btn");
//     var modals = document.getElementsByClassName("modal");
//     var spans = document.getElementsByClassName("close");
    
//     for (var i = 0; i < btn.length; i++) {
//         btn[i].onclick = function(e) {
//             e.preventDefault();
//             modal = document.querySelector(e.target.getAttribute("id"));
//             modal.style.display = "block";
//         }
//     }
//     // When the user clicks on <span> (x), close the modal
//     for (var i = 0; i < spans.length; i++) {
//         spans[i].onclick = function() {
//             for (var index in modals) {
//                 if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//             }
//         }
//     }
    
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target.classList.contains('modal')) {
//             for (var index in modals) {
//                 if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//             }
//         }
//     }
// });

// window.onload = function(){
        
//     var btn = document.querySelectorAll(".popup-btn");

//     var modals = document.querySelectorAll(".modal");

//     var spans = document.getElementsByClassName("close");
//     // return (btn, modals, spans)

        // var btn = document.getElementsByClassName("popup-btn")

    // var modals = document.getElementsByClassName("modal");
//     console.log(btn)
//     console.log(modals)
//     console.log(spans)

//     for (var i = 0; i < btn.length; i++) {
//         btn[i].onclick = function(e) {
//             e.preventDefault();
//             modal = document.querySelector(e.target.getAttribute("id"));
//             modal.style.display = "block";
//         }
//     }
    
//     // When the user clicks on <span> (x), close the modal
//     for (var i = 0; i < spans.length; i++) {
//         spans[i].onclick = function() {
//             for (var index in modals) {
//                 if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//             }
//         }
//     }
    
//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target.classList.contains('modal')) {
//             for (var index in modals) {
//                 if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//             }
//         }
//     }
// };

// console.log(btn)
// console.log(modals)
// console.log(spans)
// When the user clicks the button, open the modal
// for (var i = 0; i < btn.length; i++) {
//     btn[i].onclick = function(e) {
//         e.preventDefault();
//         modal = document.querySelector(e.target.getAttribute("href"));
//         modal.style.display = "block";
//     }
// }

// // When the user clicks on <span> (x), close the modal
// for (var i = 0; i < spans.length; i++) {
//     spans[i].onclick = function() {
//         for (var index in modals) {
//             if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//         }
//     }
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target.classList.contains('modal')) {
//         for (var index in modals) {
//             if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
//         }
//     }
// }