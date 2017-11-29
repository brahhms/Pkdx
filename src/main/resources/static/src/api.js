var url;
var epPokemon;
var epSpecies;
var select;
var urlImg;
var img;
var listaPokemones;
var pokemon;

//inicializa la lista de pokemones
ajax("src/listaPokemones.js", function(request){
    var response = request.currentTarget.response || request.target.responseText;
    response = JSON.parse(response).results;
    listaPokemones = toSelectData(response);
});

$( document ).ready(function() {
    url = "http://pokeapi.salestock.net/api/v2/";
    epPokemon = url + "pokemon/";
    epSpecies = url + "pokemon-species/";
    select = document.getElementById('s');
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
});

window.onload = function() {
  crearSelect();
  img = document.getElementById("pokeball");
  img.setAttribute("src","images/pokeball.png");
}

function crearSelect() {
  //configuracion de select
  $('.js-example-basic-single').select2({
      minimumInputLength:1,
      data: listaPokemones,
      width: '200px',
      language: "es",
      placeholder: "Busca un pokemon",
      sorter: function(results) {
        var query = $('.select2-search__field').val().toLowerCase();
        return results.sort(function(a, b) {
          return a.text.toLowerCase().indexOf(query) - b.text.toLowerCase().indexOf(query);
        });
      }
    });
}


//transforma el array results de la pokeapi en la estructura requerida por select2
function toSelectData(array) {
    var a = new Array();
    for(var i = 1; i < array.length; i++){
      var cadena = array[i-1].url;
      var x = cadena.lastIndexOf("/");
      var id = cadena.slice(34, x);
        if (id != i) {
            break;
        }
        var poke = {'id':i,'text':array[i-1].name};
        a.push(poke);
    }
    return a
}

btnBuscar.onclick = function() {
  cargando();
  var id = select.value;
  getInfo(id);
}

//se muestra a partir del objeto pokemon
function mostrar() {
  var info = document.getElementById('info');
  var tipos = pokemon.tipos;
  var habilidades = pokemon.habilidades;
  var evoluciones = pokemon.evoluciones;
  var texto ="<h4>"+pokemon.nombre+"</h4>"+
          "<p>"+pokemon.info+"</p>";
   
  texto+='<dl class="dl-horizontal">'+
  '<dt>Tipos:</dt>';  
  for(var i = 0; i < tipos.length; i++){
	  texto += "<dd>"+tipos[i]+"</dd>";
  }
  
  texto+="<dt>Habilidades:</dt>";
 
  for(var i = 0; i < habilidades.length; i++){
	  texto += "<dd>"+habilidades[i]+"</dd>";
  }
  texto+="<dt>Evoluciones:</dt>";
  for(var i = 0; i < evoluciones.length; i++){
	  texto += '<dd><img src="'+urlImg+evoluciones[i]+'.png" /></dd>';
  }
  
  texto+="</dl>";

  info.innerHTML = texto;
}


function getInfo(id) {
  pokemon = new Pokemon();
  ajax(epPokemon+id, function(request) {
      var response = request.currentTarget.response || request.target.responseText;
      response = JSON.parse(response);

      pokemon.nombre = response.name;
      pokemon.setTipos(response.types);
      pokemon.setHabilidades(response.abilities);

      ajax(epSpecies+id,function(request) {
        var response = request.currentTarget.response || request.target.responseText;
        response = JSON.parse(response);
        pokemon.info = response.flavor_text_entries[3].flavor_text;
        var chain = response.evolution_chain.url;
        console.log(chain);
        
        ajax(chain,function(request){
        	var response = request.currentTarget.response || request.target.responseText;
            response = JSON.parse(response);
        	  var branch = response.chain;
        	  pokemon.evoluciones = new Array();
        	  for (var i = 0; i < 3 ; i++) {
        		  try {
        			  var cadena = branch.species.url;
        			  var x = cadena.lastIndexOf("/");
        		      var idd = cadena.slice(52, x);
        			  pokemon.evoluciones.push(idd);
            	      branch = branch.evolves_to[0];
        		  } catch (e) {	}
        	  }
              mostrar();
              crearImagen(id);
        });
  
      });

  });

}

function crearImagen(id) {
  var div = document.getElementById("imgDiv");
  img.setAttribute("src",urlImg+id+".png");
  div.replaceChild(img,div.childNodes[0]);
}

function cargando() {
  img.setAttribute("src","images/loading.gif");
}

function ajax(u, success) {
	    var xhr = new XMLHttpRequest();
	    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
	    xhr.open('GET', u);
	    xhr.onload = success;
	    xhr.send();
	    return xhr;
	}


function Pokemon(){
    this.nombre = "";
    this.info = "";
    this.lugares;               //.location_area_encounters:url
    this.tipos;
    this.habilidades;
    this.evoluciones;
}

Pokemon.prototype.setTipos = function(array) {
  this.tipos = new Array();
  for (var i = 0; i < array.length; i++) {
    var tipo = array[i].type.name;
    this.tipos.push(tipo);
  }
};
Pokemon.prototype.setHabilidades = function(array) {
  this.habilidades = new Array();
  for (var i = 0; i < array.length; i++) {
    var habilidad = array[i].ability.name;
    this.habilidades.push(habilidad);
  }
};


