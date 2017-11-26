

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