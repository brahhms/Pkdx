function buscar(){
var id= document.getElementById("id").value;
buscarPokemon(id);

}



function buscarPokemon(id) {
  document.getElementById("cargando").src="../img/cargando.gif";//poner a cargar el video o gif
 limpiarDiv();
	//limpiar si hay imagenes de la busqueda anterior

	document.getElementById("nombre").innerHTML="cargando...";

  var cadenaevolutiva = ""; //aqui recolectaremos la cadena evolutiva del puchamon

//Aquí consultamos los datos generales del Puchamón ----------------------------------------------------------------------------------------------
	fetch('https://pokeapi.co/api/v2/pokemon/'+id)//buscamos el pokemon d la api pasandole el id o el nombre.
   .then( function (r) { return r.json(); })
   .then( function(datos) {

   		console.log(datos);
   		//antes de sacar el sprite del json solo usabamos el link
   		//var src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png";
   		var salida ="";
      var salida2="";//la cadena que imprimiremos más tarde
      var salida3="";
   		var url = JSON.stringify(datos.sprites.front_default);//esto vine con comillas extra las vamos a quitar el primer y ultimo caracter.
   		var url = url.slice(1, -1);//aqui le quitamos las comillas extra
   		document.getElementById("img").src=url;//para mostrar el sprite
  	 	var nombre = JSON.stringify(datos.name);//así obtenemos info del obj que llamamos de la api
  	 	var tipo1 = JSON.stringify(datos.types[0].type.name);

  	 	//vamos a concatenar la salida

      nombre = nombre.slice(1, -1);
 	 	salida= "Nombre: "+nombre;
    tipo1=tipo1.slice(1,-1);
    salida2 ="Tipo: "+tipo1;


  	 			try {//esto para los pokes que tienen mas de un tipo
  	 				var tipo2 = JSON.stringify(datos.types[1].type.name);
            tipo2=tipo2.slice(1,-1);

    				salida2 ="Tipos: "+tipo1+" , "+tipo2;
						}
				catch(err) {
					console.log(err);//error que no existe la crap
          document.getElementById("tipos").innerHTML=salida2;
							}

				try {
  	 				var habilidad = JSON.stringify(datos.abilities[0].ability.name);
            habilidad=habilidad.slice(1,-1);
  	 				var habilidad2 = JSON.stringify(datos.abilities[1].ability.name);//así obtenemos info del obj que llamamos de la api si existe
            habilidad2=habilidad2.slice(1,-1);
  	 				salida3 ="Habilidades : "+habilidad+" , "+habilidad2;
						}
				catch(err) {
					var habilidad = JSON.stringify(datos.abilities[0].ability.name);
          habilidad=habilidad.slice(1,-1);
					salida3 ="Habilidad : "+habilidad;
					console.log(err);//error que no existe la crap

							}


  	 	document.getElementById("nombre").innerHTML=salida;
      document.getElementById("tipos").innerHTML=salida2;
      document.getElementById("habilidades").innerHTML=salida3;

   }).catch(function(error){
   	console.log("hubo un error",error);
   	document.getElementById("nombre").innerHTML="se produjo un error (cod 1)"
   });//en el caso que algo salga mal siempre se va a venir aquí

//aquí consultamos el hábitat del puchamon -----------------------------------------------------------------------------------------------------------------------------

	fetch('https://pokeapi.co/api/v2/pokemon-species/'+id)//buscamos la descripción y el hábitat del puchamón
   .then( function (r) { return r.json(); })
   .then( function(datos) {
   		var salida ="";


   		try {
  	 				var habitat = JSON.stringify(datos.habitat.name);//así obtenemos info del obj que llamamos de la api si existe
            habitat=habitat.slice(1,-1);
            salida ="Habitat : "+habitat;
						}
				catch(err) {
          var nombre=document.getElementById("nombre").innerHTML;
          if (nombre ==="se produjo un error (cod 1)" ) {
            var habitat="";
          salida= habitat;

          };

					console.log(err);//error que no existe la crap

							}

	 	//mostrar el habitat del pokemondongo
      document.getElementById("habitat").innerHTML=salida;

    //aqui recolectaremos la cadena de la linea evolutiva
    try {
            cadenaevolutiva = JSON.stringify(datos.evolution_chain.url);//así obtenemos info del obj que llamamos de la api si existe
            cadenaevolutiva = cadenaevolutiva.slice(1, -1);
            //document.getElementById('cadenaEvolutiva').innerHTML=cadenaevolutiva;
            cadenaEvolutiva(cadenaevolutiva);//aqui pasamos de parametro la el link para llamar la cadena evolutiva
            }
        catch(err) {
          cadenaevolutiva="no hay cadena evolutiva";
          console.log(err);

              }



  	 	//var descripcion = JSON.stringify(datos.flavor_text_entries[3].flavor_text)
  	 //var descripcion = descripcion.slice(1, -1);//si queremos mostrar la descripcción se haria de esta manera :'v
  	 //document.getElementById("descripcion").innerHTML=descripcion;


   }).catch(function(error){
   	console.log("hubo un error",error);
   	document.getElementById("nombre").innerHTML="se produjo un error cod(2)"
   });


//aqui consultaremos la cadena evolutiva de los puchamons ----------------------------------------------------------------------------------------------------------------


		}

function cadenaEvolutiva (enlace){


fetch(enlace)
   .then( function (r) { return r.json(); })
   .then( function(datos) {

      var salida ="Cadena evolutiva: ";


          var nombre="";
          nombre= JSON.stringify(datos.chain.species.name);
          nombre=nombre.slice(1,-1);
          //salida+= JSON.stringify(datos.chain.species.name); //asi obtenemos el primer pokemon de la cadena evolutiva
          imprimirImagen(JSON.stringify(datos.chain.species.url),nombre);




          try {

               //esto solo para eevee pasaria de la primer vuelta
               try{ for (var i = 0; i <= 7; i++) {
                  var cadena = JSON.stringify(datos.chain.evolves_to[i].species.name);//esta cadena esta para romper el bucle antes de poner la coma
                  cadena=cadena.slice(1,-1);
                  imprimirImagen(JSON.stringify(datos.chain.evolves_to[i].species.url),cadena);
                   //salida+=", ";
                    //salida+=cadena;
              };
            }catch(err){
             }
         }
        catch(err) {

         // salida+=", ";
           //salida+=JSON.stringify(datos.chain.evolves_to[0].species.name);
            console.log(err);
              }

               try{//si tiene una tercera evolucion
                //salida+=", ";
                var cadena=JSON.stringify(datos.chain.evolves_to[0].evolves_to[0].species.name);
               cadena=cadena.slice(1,-1);
                imprimirImagen(JSON.stringify(datos.chain.evolves_to[0].evolves_to[0].species.url),cadena);
                try{//si tiene una evolucion alternativa
                  var cadena= datos.chain.evolves_to[0].evolves_to[1].species.name;
                  cadena=cadena.slice(1,-1);
                  //salida+=", ";
                //salida+=cadena;
                imprimirImagen(JSON.stringify(datos.chain.evolves_to[0].evolves_to[1].species.url),cadena);


            }catch(err){

              console.log(err);
            }

            }catch(err){

              console.log(err);
            }







      document.getElementById("cadenaEvolutiva").innerHTML=salida;
      //quitar video
      document.getElementById("cargando").setAttribute( "src", "" );
   }).catch(function(error){
    console.log("hubo un error",error);
    document.getElementById("cadenaEvolutiva").innerHTML="se produjo un error(cod3)";
   });




}


function imprimirImagen (cod,pokemon) {


//obtenemos el id de los pokemons de linea evolutiva
  var texto= cod.slice(43, -2);//hacemos trim para no hacer otra consulta y mas lenta la app >:v
  var cadena= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+texto+".png"
  var span = document.createElement("div");
  var nodo = document.createElement("IMG");
  var nombre = document.createElement("span");//aqui metemos el nombre

  nodo.src=cadena;
nodo.setAttribute( "onClick", "buscarPokemon("+texto+");" );
//agregar evento onclic al nodo

nombre.innerHTML=pokemon+"<br>";
span.appendChild(nombre);
span.appendChild(nodo);

  document.getElementById("cadenaImg").appendChild(span);


}

function limpiarDiv (){

//limpiaremos el div de imagenes de los child si tiene alguno
    document.getElementById("img").setAttribute( "src", "" );
    //document.getElementById("id").setAttribute("value","");
    document.getElementById("id").value="";
    document.getElementById("habitat").innerHTML="";
    document.getElementById("cadenaEvolutiva").innerHTML="";
      document.getElementById("tipos").innerHTML="";
      document.getElementById("habilidades").innerHTML="";
try{

var node=document.getElementById("cadenaImg");


while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}



}catch (err){
console.log(err)

}


}



function BuscarEnter(e,input){//al presionar enter buscar

var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13) { //si presionan enter
    buscar();
}


}
