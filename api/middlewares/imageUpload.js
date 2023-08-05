const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public')
    },
    filename: function (req, file, cb) {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSufix + '.' + file.mimetype.split('/')[1])
    }
});
const upload = multer({ storage: storage });
module.exports = upload;