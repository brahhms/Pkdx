package loginbd.models;


import java.util.Collection;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;



@Entity
@Table(name = "usuario")
public class Usuario{
	
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Size(min = 4, max = 16)
    private String nombre;
    @NotNull
    @Size(min = 4, max = 16)
    private String clave;
  
    
    public Usuario() { }

    public Usuario(long id) { 
      this.id = id;
    }

    public Usuario(String pass, String name) {
      this.clave = pass;
      this.nombre = name;
    }
    

    //@Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
    
    @OneToMany(mappedBy = "usuario")
    private Collection<Favorito> favoritos;


	public Collection<Favorito> getFavoritos() {
		return favoritos;
	}

	public void setFavoritos(Collection<Favorito> favoritos) {
		this.favoritos = favoritos;
	}
    
    

}
