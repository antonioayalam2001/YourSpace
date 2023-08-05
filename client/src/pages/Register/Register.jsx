import { createRef, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useForm } from "../../hooks/useForm";
import { register } from "../auth/userFunctions";
import { uploadPhoto } from "../posts/postsFunctions";

const schema = Yup.object().shape({
  username: Yup.string().min(8, "Usuario de al menos 8 caracteres").required('El nombre de usuario es obligatorio'),
  email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
  password: Yup.string().min(2, "Al menos 8 caracteres").required('La contraseña es obligatorio'),
});

export default function Register() {

  const { form, handleFormChange, submitForm,errors } = useForm({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  }, schema)
  const [img, setImg] = useState(undefined)

  const navigate = useNavigate()
  const imgRef = createRef();
  const outerCircle = createRef();

  const imgProgress = useCallback(async (selectedImg) => {
    let imgElement = imgRef.current;
    let circle = outerCircle.current;

    if (!selectedImg) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedImg);

    const setImg = (e) => {
      circle.style.animation = "fill 3s  ease-in-out forwards "
      imgElement.style.backgroundImage = `url(${e.target.result})`;
    }
    fileReader.addEventListener('loadend', setImg)

    return true
    // fileReader.removeEventListener('progress', progress)
    // fileReader.removeEventListener('load', setImg)

  }, [imgRef, outerCircle])


  useEffect(() => {
    imgProgress(img)
  }, [img, imgProgress])


  async function handleSumbit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const formFields = Object.fromEntries(formData)

    if (formFields.password !== formFields.passwordConfirmation) {
      setErrors({ ...errors, passwordConfirmation: "Passwords don't match" })
      setTimeout(() => {
        setErrors({ ...errors, passwordConfirmation: "" })
      }, 1000)
    } else {
      // eslint-disable-next-line no-unused-vars
      const { passwordConfirmation, ...rest } = formFields;
      const isValid = await submitForm(rest)
      if (isValid) {
        let imgUrl = ""
        if (img) {
          imgUrl = await uploadPhoto(img)
        } else {
          imgUrl = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
        }
        register({ ...rest, img: imgUrl }).then((status) => {
          if (status) {
            navigate("/login")
          } else {
            toast("El usuario o correo ya existe")
          }
        })
        // navigate("/login")
      } else {
        const errorsArray = Object.entries(errors);
        errorsArray.forEach(([key, value]) => {
          toast.error(value);
        });
      }
    }
  }

  return (
    <div className="auth" >
      <ToastContainer />
      <h1>Register</h1>

      <div className="auth__photo flex">
        <input type="file" id="img" name="userimg"
          onChange={(e) => {
            setImg(e.target.files[0])
          }}
        />
        <label htmlFor="img" className="img__label"> Subir foto</label>

        <div ref={outerCircle} className="progress_container">
          <div ref={imgRef} className="circular__progress"></div>
        </div>

      </div>
      <form onSubmit={handleSumbit} action="">
        <div className="input__container">
          <input
            onChange={handleFormChange}
            type="text" placeholder="username" name="username" value={form.username} />
        </div>
        <div className="input__container">
          <input
            onChange={handleFormChange}
            type="email" placeholder="email" name="email" value={form.email} />
        </div>
        <div className="input__container">
          <input
            onChange={handleFormChange}
            type="password" placeholder="password" name="password" value={form.password} />
        </div>
        <div className="input__container">
          <input type="password" placeholder="confirm password" name="passwordConfirmation" value={form.passwordConfirmation} onChange={handleFormChange} />
        </div>
        <button type="submit" >Register</button>
        <span>Already have an account? <Link to={"/login"}>Log in</Link> </span>
      </form>
    </div>
  )
}