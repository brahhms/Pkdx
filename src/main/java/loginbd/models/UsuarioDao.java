package loginbd.models;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class UsuarioDao {
  
  @Autowired
  private SessionFactory _sessionFactory;
  
  private Session getSession() {
    return _sessionFactory.getCurrentSession();
  }

  public void save(Usuario usuario) {
    getSession().save(usuario);
    return;
  }
  
  public void delete(Usuario usuario) {
    getSession().delete(usuario);
    return;
  }
  
  @SuppressWarnings("unchecked")
  public List<Usuario> getAll() {
    return getSession().createQuery("from Usuario").list();
  }
  
  public Usuario getByName(String nombre) {
    return (Usuario) getSession().createQuery(
        "from Usuario where nombre = :nombre")
        .setParameter("nombre", nombre)
        .uniqueResult();
  }

  public Usuario getById(long id) {
    return (Usuario) getSession().load(Usuario.class, id);
  }
  

  public void update(Usuario usuario) {
    getSession().update(usuario);
    return;
  }
  
  public void agregar(Favorito favorito) {
	  	try {
	  		getSession().save(favorito);
		} catch (Exception e) {
			getSession().delete(favorito);
		}
	    return;
  }
  
  @SuppressWarnings("unchecked")
  public List<Favorito> getFavoritos(long id) {
    return getSession().createQuery("from Favorito where idUsuario ="+id).list();
  }


} // class UsuarioDao
