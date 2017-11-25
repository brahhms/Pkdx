var listaPokemones;
listaPokemones = setLista();
var select;
var url;
var urlImg;
var img;


$( document ).ready(function() {
    select = document.getElementById('s');
    url = "https://pokeapi.co/api/v2/";
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    crearSelect();
    img = document.getElementById("pokeball");
    img.setAttribute("src","images/pokeball.png");

});

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

//inicializa la variable listaPokemones
function setLista() {
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  }else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText).results;
      listaPokemones = toSelectData(response);
    }
  };
  //xhttp.open("GET", "http://pokeapi.salestock.net/api/v2/pokemon", true);
  xhttp.open("GET", "listaPokemones.js", true);
  xhttp.send();
}

//transforma el array results de la pokeapi en la estructura requerida por select2
function toSelectData(array) {
    var a = new Array();
    for(var i = 1; i < array.length; i++){
      var url = array[i-1].url;
      var x = url.lastIndexOf("/");
      var id = url.slice(34, x);
        if (id != i) {
          return a;
        }
        var poke = {"id":i+"","text":array[i-1].name};
        a.push(poke);
    }
    return a;
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
