//la variable "ls" siempre tiene que estar al principio porque sino se enoja y tira un error bien feo jajaja
var ls;
ls = cargarlistaPokemones();
var select;
var url;
var urlImg;


$( document ).ready(function() {
    select = document.getElementById('s');
    url = "https://pokeapi.co/api/v2/";
    urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

    //implementacion de Select
    $('.js-example-basic-single').select2({
        minimumInputLength:1,
        data: obtenerArray(),
        language: "es",
        placeholder: "Select a state",
        sorter: function(results) {
          var query = $('.select2-search__field').val().toLowerCase();
          return results.sort(function(a, b) {
            return a.text.toLowerCase().indexOf(query) - b.text.toLowerCase().indexOf(query);
          });
        }
        //
      });
});

//carga el archivo json "listaPokemones.js" en ls
function cargarlistaPokemones() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      ls = JSON.parse(this.responseText).results;
    }
  };
  //xhttp.open("GET", "http://pokeapi.co/api/v2/pokemon", true);
  xhttp.open("GET", "listaPokemones.js", true);
  xhttp.send();
}

//transforma el array results de la pokeapi en la estructura requerida por select2
function obtenerArray() {
    var array = new Array();
    for(var i = 1; i < 803; i++){
        var poke = {"id":i+"","text":ls[i-1].name};
        array.push(poke);
    }
    return array;
}


btnBuscar.onclick = function() {
  var id = select.value;
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
  var img = document.createElement("IMG");
  img.setAttribute("src",urlImg+"/"+id+".png");
  div.replaceChild(img,div.childNodes[0]);
}
