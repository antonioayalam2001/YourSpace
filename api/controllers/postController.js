const { validateJWT } = require("../helpers/jsonWebToken");
const { Post } = require("../models/Post");
const { User } = require("../models/User");

const insertPost = async (req, res) => {
    const { body } = req;
    console.log(body);
    const post = await Post.create(body);
    return res.status(201).json({
        ok: true,
        msg: 'Post created',
        id: post.id
    });
}
const getPosts = async (req, res) => {
    const { cat } = req.query;

    if (cat) {
        const posts = await Post.findAll({
            where: {
                category: cat.toLowerCase()
            }
        });
        return res.status(200).json({ posts });
    }
    const posts = await Post.findAll();
    return res.status(200).json({ posts });
}
const deleteById = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            status: false,
            msg: 'Unauthorized'
        });
    }
    const { id: userId } = await validateJWT(token);
    const post = await Post.findByPk(id);
    console.log(post.dataValues);
    if (post.user__id !== userId) {
        return res.status(401).json({
            status: false,
            msg: 'Unauthorized'
        });
    }
    const deleted = await Post.destroy({
        where: {
            id
        }
    });

    if (deleted) {
        return res.status(200).json({
            status: true,
            msg: 'Post deleted'
        });
    }
    return res.status(404).json({
        status: false,
        msg: 'Post not found'
    });
}
const getById = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
        include: {
            model: User,
            attributes: ['username', 'email']
        }
    });
    if (post) {
        const { user__id, users: [{ dataValues }], ...postValues } = post.dataValues
        const returnedPost = {
            ...postValues,
            ...dataValues
        }

        return res.status(200).json(returnedPost);
    }
    return res.status(404).json({
        ok: false,
        msg: 'Post not found'
    });

}
const updateById = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            status: false,
            msg: 'Unauthorized'
        });
    }

    const userValues = await validateJWT(token);
    console.log("USER VALUES", userValues);
    const post = await Post.findByPk(id);
    if (post.user__id !== userValues.id) {
        return res.status(401).json({
            status: false,
            msg: 'Unauthorized'
        });
    }

    const updated = await Post.update(body, {
        where: {
            id
        }
    });

    console.log(updated);
    if (updated) {
        return res.status(200).json({
            ok: true,
            msg: 'Post updated',
            id
        });
    }
    return res.status(404).json({
        ok: false,
        msg: 'Post not found'
    });
}

const uploadFile = async (req, res) => {
    return res.status(200).json({
        name: req.file.filename
    });
}

module.exports = {
    insertPost,
    getPosts,
    deleteById,
    getById,
    updateById,
    uploadFile
}