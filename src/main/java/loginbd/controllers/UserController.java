package loginbd.controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import loginbd.models.Favorito;
import loginbd.models.Usuario;
import loginbd.models.UsuarioDao;

@Controller
@RequestMapping(value="/user")
public class UserController {

  @Autowired
  private UsuarioDao _userDao;
  
  @RequestMapping(value="/delete")
  @ResponseBody
  public String delete(long id) {
    try {
      Usuario usuario = new Usuario(id);
      _userDao.delete(usuario);
    }
    catch(Exception ex) {
      return ex.getMessage();
    }
    return "Usuario succesfully deleted!";
  }
  
  @RequestMapping(value="/get-by-name")
  @ResponseBody
  public String getByName(String nombre) {
    String userId;
    try {
      Usuario usuario = _userDao.getByName(nombre);
      userId = String.valueOf(usuario.getId());
    }
    catch(Exception ex) {
      return "El usuario no ha sido encontrado";
    }
    return "El id del usuario es: " + userId;
  }

  
  @RequestMapping(value="/save" , method = RequestMethod.POST)
  @ResponseBody
  public String create(@RequestParam("clave")String clave, @RequestParam("nombre")String nombre) {
    if (_userDao.getByName(nombre) != null) {
		return "Ya existe un usuario con ese nombre";
	}
	try {
      Usuario usuario = new Usuario(clave, nombre);
      _userDao.save(usuario);
    }
    catch(Exception ex) {
      return ex.getMessage();
    }
    return "Ud. se ha sido registrado exitosamente!";
  }
  
  @RequestMapping(value="/agregar" , method = RequestMethod.GET)
  @ResponseBody
  public String agregar(@RequestParam("nombre")String nombre,@RequestParam("favorito")String favorito) {
	  
	try {
		long idUsuario = _userDao.getByName(nombre).getId();       
	    Favorito e = new Favorito(favorito,idUsuario);
	    _userDao.agregar(e);
    }
    catch(Exception ex) {
      return "no se pudo agregar";
    }
    return "agregado";
  }

  @RequestMapping(value="/get-favoritos" , method = RequestMethod.GET)
  @ResponseBody
  public String getFavoritos(@RequestParam("nombre")String nombre) {
	
	String json = "{\"favoritos\":[";
	long idUsuario = _userDao.getByName(nombre).getId(); 
    List<Favorito> favoritos = _userDao.getFavoritos(idUsuario);
	
    try {
    	for (int i = 0; i < favoritos.size(); i++) {
    		if (i != 0) {
	  			json = json+",";
	  		}
			json = json+"\""+ favoritos.get(i).getIdFavorito()+"\"";	        
		}
	    
    }
    catch(Exception ex) {
    	
    }
	json = json+"]}";
    return json;
  }
  
} // class UserController
