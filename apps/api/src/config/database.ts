import { Sequelize } from 'sequelize';

// ⚠️ TEMPORARY: Hardcoded for testing – REMOVE LATER
const DATABASE_URL = 'postgresql://postgres:hLfMZqbPgZSTtvWeieMRGtyeiXpvjmCb@tokaido.proxy.rlwy.net:45942/railway';

console.log('✅ Using database URL:', DATABASE_URL);

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
});
