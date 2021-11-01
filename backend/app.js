const express = require ('express');
const mongoose = require('mongoose'); // Facilite les interactions avec la db
const path = require('path');
const helmet = require("helmet");
const xss = require('xss-clean');

const clean = require('xss-clean/lib/xss').clean
 
const cleaned = clean('<script></script>')
// will return "&lt;script>&lt;/script>"


const dotenv = require('dotenv').config()  // Charge la variable d'environnement


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const { http } = require('npmlog');

 mongoose.connect('mongodb+srv://picante:picante@cluster0.n16ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Conexion à MongoDB réussi !'))
  .catch(() => console.log('connexion à MongoDB échouée !'))

const app = express(); // Création d'une application express


app.use(helmet());
app.use(xss())

 // Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //res.setHeader('HTTP.StatusOK')
    next();
  });


app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes); 
app.use('/api/sauce', sauceRoutes); // Enregistrement du routeur pour toutes les demandes effectuées vers /api/sauces



module.exports = app; // Donne l'accès depuis les autres fichiers, notamment le serveur Node

