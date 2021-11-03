const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');


// const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage = multer.diskStorage({
//     // Indique à multer dans quel dossier engistrer les fichiers
//     destination: (req, file, callback) => {
//         callback(null, 'images')
//     },
//     filename: (req, file, callback) => {
//         const extension = MIME_TYPES[file.mimetype];
//         const name = file.originalname.split(' ').join('_').split('.').join('_');
//         callback(null, name + Date.now() + '.' + extension);
//         console.log(filename)
//     } // Indique à multer de remplacer le nom d'origine par un timestamp 
// });
// // Importation de multer et indique qu'on gère uniquement les téléchargements de fichiers image
// module.exports = multer({storage:storage}).single('image');