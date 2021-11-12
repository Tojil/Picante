const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creation schema de donnée enregistrement
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// L'ajout de unique validator rend impossible d'avoir plusieurs utilisateurs inscrits avec la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);