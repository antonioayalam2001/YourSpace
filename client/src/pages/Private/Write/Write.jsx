import { useContext } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import CategoryInput from "../../../components/CategoryInput";
import { AuthContext, DEMO_USER_NAME } from "../../../context/authContext";
import { useForm } from "../../../hooks";
import { CATEGORIES } from "../../../models/categories";
import { PRIVATE_ROUTES } from "../../../models/routes";
import { createPost, updatePost, uploadPhoto, uploadPhotoLocalServer } from "../../posts/postsFunctions";


const getTextFromHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const schema = Yup.object().shape({
  title: Yup.string().min(3, "Longitud minima").required('Título es obligatorio'),
  desc: Yup.string().min(3, "Longitud minima").required('Ingresa una descripción valida'),
  cat: Yup.string().min(3, "Longitud minima").required('Selecciona una categoría'),
  img: Yup.mixed().required("Required")
    .test("is-valid-type", "Not a valid image type",
      value => isValidFileType(value && value.name.toLowerCase(), "image"))
});

export default function Write() {
  const post = useLocation().state;

  const { form, handleFormChange, submitForm, errors } = useForm({
    title: post ? post.title : "",
    desc: post ? post.desc : "",
    cat: post ? post.category : "",
    img: "",
  }, schema)
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputBoxChange = (e) => {
    handleFormChange({
      target: {
        name: "desc",
        type: "text",
        value: e
      }
    })
  }

  async function handlePublish() {
    const isValid = await submitForm(form);
    //Convirtiendo objeto a arreglo
    if (isValid) {
      if (user.username !== DEMO_USER_NAME) {
        const clodinaryImg = await uploadPhoto(form.file);
        // const clodinaryImg = undefined;
        const localServerImg = await uploadPhotoLocalServer(form.file);
        // const localServerImg = undefined;
        const notFoundImg = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
        if (!clodinaryImg) {
          toast.error("Error al subir la imagen a cloudinary");
        }
        if (!localServerImg) {
          toast.error("Error al subir la imagen al servidor local");
        }
        const { title, desc, cat } = form;
        const response = post ? await updatePost({
          title: title.trim(),
          desc: getTextFromHTML(desc).trim(),
          category: cat,
          img: clodinaryImg ? clodinaryImg : localServerImg ? localServerImg : notFoundImg,
          date: new Date().toISOString()
        }, post.id) : await createPost(
          {
            title: title.trim(),
            desc: getTextFromHTML(desc).trim(),
            category: cat,
            img: clodinaryImg ? clodinaryImg : localServerImg ? localServerImg : notFoundImg,
            date: new Date().toISOString()
          }
        );
        if (response) {
          toast.success(response.msg);
          navigate(`${PRIVATE_ROUTES.POST}/${response.id}`);
        }
      }
      toast.success("Publicando...");
      setTimeout(() => {
        navigate(`${PRIVATE_ROUTES.POST}/${1}`);
      }, 2000);
    } else {
      const errorsArray = Object.entries(errors);
      errorsArray.forEach(([, value]) => {
        toast.error(value);
      });
    }
  }

  return (
    <div className="write__section">
      <ToastContainer />
      <div className="content">
        <input type="text" placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleFormChange}
        />
        <div className="editor__container">
          <ReactQuill
            theme="snow" value={form.desc} onChange={(e) => handleInputBoxChange(e)} className="editor" />
        </div>
      </div>
      <div className="menu">
        <div className="item flex">
          <h1>Publish</h1>
          <span>
            <b>Nombre de Archivo : </b> {form.img && form.img.name}
          </span>
          <span>
            {form.img && <img className="preview__img" src={URL.createObjectURL(form.img)} alt="" />}
          </span>

          <input style={{ display: "none" }} type="file" name="img" id="img"
            onChange={handleFormChange}
          />
          <label htmlFor="img" className="btn image">Upload Image</label>
          <div className="buttons">
            <button className="btn btn__second" onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h2>Category</h2>
          <div>
            {CATEGORIES.slice(0, 3).map((cat) => {
              return (
                <CategoryInput key={cat} cat={cat} callback={handleFormChange} isChecked={form.cat === cat} />
              )
            })}
          </div>
          <div>
            {CATEGORIES.slice(3).map((cat) => {
              return (
                <CategoryInput key={cat} cat={cat} callback={handleFormChange} isChecked={form.cat === cat} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}