var listaPokemones = setLista();
var select;
var url;
var urlImg;
var img;


$( document ).ready(function() {
    select = document.getElementById('s');
    url = "https://pokeapi.co/api/v2/";
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    img = document.getElementById("pokeball");
    crearSelect();

});

function crearSelect() {
  //configuracion de select
  $('.js-example-basic-single').select2({
      minimumInputLength:1,
      data: listaPokemones,
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText).results;
      listaPokemones = toSelectData(response);
    }
  };
  //xhttp.open("GET", "http://pokeapi.co/api/v2/pokemon", true);
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
  var id = select.value;
  cargando();
  crearImagen(id);
}
function buscar(id) {
  /*
  var datos = "/"+id+"/";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //
    }
  };
  xhttp.open("GET",url+datos, true);
  xhttp.send();*/
}

function crearImagen(id) {
  var div = document.getElementById("imgDiv")
  img.setAttribute("src",urlImg+"/"+id+".png");
  div.replaceChild(img,div.childNodes[0]);
}

function cargando() {
  img.setAttribute("src","images/loading.gif");
}
