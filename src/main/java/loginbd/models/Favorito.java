package loginbd.models;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.Size;


@SuppressWarnings("serial")
@Entity
@Table(name = "favorito")
@IdClass(FavoritoPk.class)
public class Favorito implements Serializable{

	@Id
    @Column(name = "idFavorito")
	@Size(min = 1, max = 4)
    private String idFavorito;
	
	@Id
    @Column(name = "idUsuario")
    private Long idUsuario;
	
	
	
	public Favorito() {

	}

	public Favorito(String idFavorito, Long idUsuario) {
		this.idFavorito = idFavorito;
		this.idUsuario = idUsuario;
	}

	@ManyToOne
    @JoinColumn(name = "idUsuario" , insertable=false, updatable=false)
    private Usuario usuario;
	///////////////////////////////////////////////////////

	public String getIdFavorito() {
		return idFavorito;
	}

	public void setIdFavorito(String idFavorito) {
		this.idFavorito = idFavorito;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}

@SuppressWarnings("serial")
class FavoritoPk implements Serializable{
    @Column(name = "idUsuario")
    private Long idUsuario;
	
    @Column(name = "idFavorito")
    private String idFavorito;
    
    
}
