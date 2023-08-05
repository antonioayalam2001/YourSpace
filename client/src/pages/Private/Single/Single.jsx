import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../../../assets/resources";
import Menu from "../../../components/Menu";
import { AuthContext } from "../../../context/authContext";
import { PRIVATE_ROUTES } from "../../../models/routes";
import { deletePost, getOnePost } from "../../posts/postsFunctions";
import { POSTS } from "../Home/posts";

const dummyProfileImg = 'https://medialab.news/wp-content/uploads/2021/03/Captura-de-pantalla-2021-03-24-a-las-16.19.35.png'

export default function Single() {
  const [post, setPost] = useState(null);
  const id = useLocation().pathname.split('/')[2];
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      const data = await getOnePost(id);
      if (!data) {
        // navigate(PRIVATE_ROUTES.PRIVATE);
        const post = POSTS.filter(post => post.id === parseInt(id));
        setPost(post[0]);
      } else {
        setPost(data);
      }
    }
    getPosts();
  }, [id]);

  async function handleDelete(e) {
    e.preventDefault();
    const data = await deletePost(id);
    if (data.status) {
      navigate(PRIVATE_ROUTES.PRIVATE);
    } else {
      alert(data.msg);
    }
  }

  return (
    post == null ? <h1>Loading...</h1> : (
      <div className="single__page">
        <div className="single__page__content">
          <img src={post.img} alt="" />

          {/* <img src={"../public/img-1690590614077-135167809.png"} alt="" /> */}

          <div className="user">
            <img src={dummyProfileImg} alt="" />

            <div className="info">
              <span>{post.username}</span>
              <p>Posted: {moment(post.date).fromNow()}</p>
            </div>

            {user && user.username === post.username && (<div className="edit">
              {/* Mandando estado hacía nuestro componente mediante Link */}
              <Link to={`/write?edit=${id}`} state={post}>
                <img src={editIcon} alt="" />
              </Link>
              <img onClick={handleDelete} src={deleteIcon} alt="" />
            </div>)}
          </div>

          <h1 className="title">{post.title}</h1>
          <p>{post.desc}</p>


        </div>
        <Menu />
      </div>
    )
  )
}