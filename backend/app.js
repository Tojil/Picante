const express = require ('express'); // Ici, nous importons le package express pour creer des applications express
const mongoose = require('mongoose'); // Facilite les interactions avec la db
const helmet = require("helmet"); // // Ici, nous importons le package helmet Helmet nous aide à sécuriser nos applications Express.js en définissant divers en-têtes HTTP
const xss = require('xss-clean');
const cors = require('cors');
const { join } = require('path');
require('dotenv').config()


const clean = require('xss-clean/lib/xss').clean
 
const cleaned = clean('<script></script>')


const dotenv = require('dotenv').config()  // Charge la variable d'environnement


const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection à Mongoose
 mongoose.connect(process.env.SERVER_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Conexion à MongoDB réussi !'))
  .catch(() => console.log('connexion à MongoDB échouée !'))

const app = express(); // Création d'une application express

app.use(cors());

app.use(helmet());
app.use(xss())

 // Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json());

app.use('/images', express.static(join(__dirname, 'images')));

app.use('/api/auth', userRoutes); 
app.use('/api/sauces', sauceRoutes); // Enregistrement du routeur pour toutes les demandes effectuées vers /api/sauces



module.exports = app; // Donne l'accès depuis les autres fichiers, notamment le serveur Node

