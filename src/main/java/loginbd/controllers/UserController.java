package loginbd.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
      return "Usuario not found";
    }
    return "The user id is: " + userId;
  }

  
  @RequestMapping(value="/save" , method = RequestMethod.POST)
  @ResponseBody
  public String create(@RequestParam("clave")String clave, @RequestParam("nombre")String nombre) {
    try {
      Usuario usuario = new Usuario(clave, nombre);
       
      _userDao.save(usuario);
    }
    catch(Exception ex) {
      return ex.getMessage();
    }
    return "Ud. se ha sido registrado exitosamente!";
  }

  
  
} // class UserController
