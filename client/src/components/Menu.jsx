import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PRIVATE_ROUTES } from "../models/routes";
import { getPosts } from "../pages/posts/postsFunctions";

export default function Menu() {
    const [posts, setPosts] = useState([]);
    const url = useLocation().pathname.split('/')[2];
    useEffect(() => {
        const posts = async () => {
            const data = await getPosts("");
            const random = Math.floor(Math.random() * data.length);

            setPosts(data.splice(random, 3));
        }
        posts();
    }, [url]);
    return (
        <div className="menu">
            <h2>Other posts you may like</h2>
            {posts && posts.map((post, index) => {
                return (
                    <div key={index} className="post">
                        <div className="post__image">
                            <img src={post.img} alt="" />
                        </div>
                        <div className="post__content">
                            <h3>{post.title}</h3>
                            <NavLink to={`${PRIVATE_ROUTES.POST}/${post.id}`} className="btn btn__second">Read More</NavLink>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}