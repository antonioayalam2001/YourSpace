import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../../models/routes";
import { getPosts } from "../../posts/postsFunctions";
import { POSTS } from "./posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;

  useEffect(() => {
    const posts = async () => {
      const data = await getPosts(category);
      if (!data) {
        if (category === "") {
          setPosts(POSTS);
          return;
        }
        const filteredPosts = POSTS.filter(post => post.category === category.split("=")[1]);
        setPosts(filteredPosts);
      } else {
        setPosts(data);
      }
    }
    posts();
  }, [category]);

  return (
    <div className="home">
      <div className="posts">
        {posts && posts.map((post, index) => {
          return (
            <div className="post" key={index}>
              <div className="post__content">
                <Link to={`${PRIVATE_ROUTES.POST}/${post.id}`} className="post__title">
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <NavLink to={`${PRIVATE_ROUTES.POST}/${post.id}`} className="btn btn__second">Read More</NavLink>
              </div>
              <div className="post__image ">
                <img src={post.img} alt={post.title} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}