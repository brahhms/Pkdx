function autocompletar(){
document.getElementById("id").value="";
fetch('https://pokeapi.co/api/v2/pokemon/?limit=803')//buscamos la descripción y el hábitat del puchamón el off limit para mostrar mas de 20
   .then( function (r) { return r.json(); })
   .then( function(datos) {     
      var salida ="";

 
      try {
        var lista =  document.getElementById("listaPokemon");
      
for (i=0;i<802;i++){//recorremos todos los pokemons y llenamos un string
            var cadena="";
           cadena =JSON.stringify(datos.results[i].name);//obtener el puchamon por su indice
           cadena=cadena.slice(1, -1);//quitar las comillas
           cadena="<option value ='"+cadena+"'/>"
          salida+=cadena;

          }

lista.insertAdjacentHTML('beforeend',salida);//por algun motivo appendchild no funcionó aquí

       
     }catch(err) {
          alert(err+"opps se ha producido un error :( en la iteracion" +i);
                console.log(err+"opps se ha producido un error :(");  
              }  
  
        
   }).catch(function(error){
    console.log("hubo un error",error);
    document.getElementById("nombre").innerHTML="se produjo un error cod(0)";
   });






}