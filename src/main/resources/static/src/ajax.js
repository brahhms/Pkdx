function registrame() {
	  var u = document.getElementById('usuario').value;
      var p = document.getElementById('clave').value;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById('dsp').innerHTML = this.responseText;
        }
      };
      xhttp.open("POST", "/user/save", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("clave="+p+"&nombre="+u);
	
};


function logueame() {
	  var u = document.getElementById('usuario').value;
      var p = document.getElementById('clave').value;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
        	 location.href = "/main";
        }
      };
      xhttp.open("POST", "/login", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("username="+p+"&password="+u);
	
};

function agregar() {
	  var s = document.getElementById('s').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
    	//
      }
    };
    xhttp.open("GET", "/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("favorito="+s);
	
};

