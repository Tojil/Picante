const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce);

router.put('/:id', auth, multer, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.get('/:id', auth, sauceCtrl.getOneSauce);

router.get('/', auth, sauceCtrl.getAllSauces);

router.post('/:id/like', auth, sauceCtrl.likeOrNot);

  module.exports = router;


// const express = require('express');
// const router = express.Router(); // Implémentation des routes

// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// const sauceCtrl = require('../controllers/sauce');

// router.post('/', auth, multer, sauceCtrl.createSauce); //Enregistre une sauce dans la base de données
// router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Mettre à jour une sauce existante 
// router.delete('/:id', auth, multer, sauceCtrl.deleteSauce); // Supprimer une sauce
// router.get('/:id', auth, sauceCtrl.getOneSauce); // Récupération d'une sauce spécifique
// router.get('/', auth, sauceCtrl.getAllSauces); // Renvoie toutes les sauces
// router.post ('/:id/like', auth, sauceCtrl.likeOrNot);

// module.exports = router;