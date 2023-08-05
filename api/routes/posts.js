const { Router } = require('express');
const router = Router();
const { insertPost, getPosts, deleteById, getById, updateById, uploadFile } = require('../controllers/postController');
const upload = require('../middlewares/imageUpload');


router.get('/', getPosts);
router.get('/:id', getById);
router.post('/', insertPost);
router.delete('/:id', deleteById);
router.put('/:id', updateById);
router.post('/upload', upload.single('img'), uploadFile);

module.exports = router;