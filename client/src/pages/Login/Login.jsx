import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { PUBLIC_ROUTES } from "../../models/routes";

const schema = Yup.object().shape({
  email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
  password: Yup.string().min(2, "Al menos 8 caracteres").required('La contraseña es obligatorio'),
});


export default function Login() {

  const { form, handleFormChange, submitForm, errors } = useForm({
    email: "",
    password: "",
  }, schema)

  const navigate = useNavigate()
  const { startLogIn, startLogOut, startLoginDemoVersion } = useContext(AuthContext)

  //Si el usuario accede a la ruta de login y ya esta logueado, hacemos que se desloguee
  useEffect(() => {
    startLogOut()
    navigate(`${PUBLIC_ROUTES.LOGIN}`, { replace: true })
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    const formValues = new FormData(e.target)
    const formFields = Object.fromEntries(formValues)
    const isValid = await submitForm(formFields)
    if (isValid) {
      const valor = await startLogIn(formFields)
      if (valor) {
        navigate("/")
      } else {
        toast.error("Email o contraseña incorrectos");
      }
    } else {
      const errorsArray = Object.entries(errors);
      errorsArray.forEach(([, value]) => {
        toast.error(value);
      });
    }
  }

  async function demoVersion() {
    startLoginDemoVersion()
    navigate("/")
  }

  return (
    <div className="auth" >
      <ToastContainer />
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="input__container">
          <input name="email" value={form.email} onChange={handleFormChange} type="email" placeholder="Email" />
        </div>
        <div className="input__container">
          <input name="password" value={form.password} onChange={handleFormChange} type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button onClick={demoVersion}>Demo Version</button>
        <span>Dont you have an account? <Link to={"/register"}>Register</Link> </span>
      </form>
    </div>
  )
}