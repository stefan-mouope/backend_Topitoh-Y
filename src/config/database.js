const { Sequelize } = require('sequelize');
require('dotenv').config();

// Utiliser l'URL complète de Neon
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,          // obligatoire pour Neon
      rejectUnauthorized: false, // permet de bypass les certificats non vérifiés
    },
  },
  logging: false,
  define: {
    freezeTableName: true,
    underscored: false,
    timestamps: true,
  },
});

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion DB OK !'))
  .catch(err => console.error('❌ Erreur DB:', err));

module.exports = sequelize;
