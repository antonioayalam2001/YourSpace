import { FETCH_URL } from "../../models/variables";
const POST_URL = `${FETCH_URL}/posts`;
export const deletePost = async (id) => {
    try {
        const response = await fetch(`${POST_URL}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getPosts = async (category) => {
    try {
        const response = await fetch(`${POST_URL}/${category}`);
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getOnePost = async (id) => {
    try {
        const response = await fetch(`${POST_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const uploadPhoto = async (img) => {
    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/coursenodejs/upload';
    const formData = new FormData();
    formData.append("upload_preset", "reactJournal");
    // Debe ser obligatoriamente file
    formData.append("file", img);

    try {
        const response = await fetch(cloudinaryURL, {
            "method": "POST",
            body: formData
        });


        if (!response.ok) throw new Error("Error on Image upload ")

        const cloudResponse = await response.json();
        console.log(cloudResponse.secure_url);
        return cloudResponse.secure_url;

    } catch (e) {
        return "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
    }
}

export const uploadPhotoLocalServer = async (img) => {
    const formData = new FormData();
    formData.append("img", img);

    try {
        const response = await fetch(`${POST_URL}/upload`, {
            "method": "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Error on Image upload ")

        const cloudResponse = await response.json();
        console.log(cloudResponse.name);
        return cloudResponse.name;

    } catch (e) {
        return false
    }
}

export const createPost = async (post) => {
    try {
        const response = await fetch(`${POST_URL}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updatePost = async (post, id) => {
    try {
        const response = await fetch(`${POST_URL}/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

