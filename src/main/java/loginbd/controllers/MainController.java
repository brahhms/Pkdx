package loginbd.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
	

	@RequestMapping(value = "/", method = RequestMethod.GET)
	  public String index1() {
	      return "/home";
	  }

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	  public String index() {
	      return "/home";
	  }
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	  public String login() {
	      return "/login";
	  }
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	  public String autentificar() {
	      return "/main";
	  }
	
	@RequestMapping(value = "/registrar", method = RequestMethod.GET)
	  public String registrar() {
	      return "/registrar";
	  }
  
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	  public String main() {
				
	      return "/main";
	  }

}
