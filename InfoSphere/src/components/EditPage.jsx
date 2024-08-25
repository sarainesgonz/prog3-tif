import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import useFetch from "./useFetch";
import NavBar from "./layout/NavBar";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { token } = authState;
  const [formData, setFormData] = useState({ title: "", abstract: "", image: "", content: "" });
  const [file, setFile] = useState(null)

  const { data, loading, error } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    credentials: "include"
  });

  useEffect(() => {
    if (data) {
      console.log("Desde edit page:", data);
      // console.log(data.results);
      setFormData({
        title: data.title,
        abstract: data.abstract,
        image: data.image,
        content: data.content
      });
    }
  }, [data]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataUpdated = new FormData();
    formDataUpdated.append("title", formData.title);
    formDataUpdated.append("abstract", formData.abstract);
    formDataUpdated.append("content", formData.content);
    if (file) {
      formDataUpdated.append("image", file);
    }
    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`
        },
        body: formDataUpdated,
        credentials: "include"
      });
      if (response.ok) {
        console.log("articulo actualizado correctamente")
        alert("Artículo actualizado correctamente")
        navigate(-1)
      } else {
        alert("No se pudo modificar el articulo")
      }
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo editar el articulo");
    }
  }
  return (
    <div>
      <NavBar />
      {loading && <p>Cargando...</p>}
      {error && <p>Se ha producido un error</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"> Titulo</label>
          <input type="text" value={formData.title} onChange={handleChange} required className="form-control" name="title" />
        </div>
        <div className="mb-3">
          <label type="form-label"  >Resumen</label>
          <input type="text" value={formData.abstract} onChange={handleChange} className="form-control" name="abstract" />
        </div>
        <div className="mb-3">
          <label className="form-label">Contenido</label>
          <textarea className="form-control" value={formData.content} onChange={handleChange} name="content" required />
        </div>
        <div className="mb-3">
          <label className="form-label"> Imagen </label>
          <input type="file" name="image" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditPage;