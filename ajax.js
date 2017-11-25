var url;
var select;
var urlImg;
var img;
var listaPokemones;

//inicializa la lista de pokemones
ajax("listaPokemones.js", function(request){
    var response = request.currentTarget.response || request.target.responseText;
    response = JSON.parse(response).results;
    listaPokemones = toSelectData(response);
});



$( document ).ready(function() {
    url = "http://pokeapi.co/api/v2/";
    select = document.getElementById('s');
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
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
      var url = array[i-1].url;
      var x = url.lastIndexOf("/");
      var id = url.slice(34, x);
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
  crearImagen(id);
}

function crearImagen(id) {
  var div = document.getElementById("imgDiv");
  img.setAttribute("src",urlImg+"/"+id+".png");
  div.replaceChild(img,div.childNodes[0]);
}

function cargando() {
  img.setAttribute("src","images/loading.gif");
}

function ajax(url, success) {
	    var xhr = new XMLHttpRequest();
	    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
	    xhr.open('GET', url);
	    xhr.onload = success;
	    xhr.send();
	    return xhr;
	}
