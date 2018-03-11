let path = require('path')
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const dbName = (process.env.NODE_ENV === 'production' && 'adifia') || 'adifia-prueba'

export const DB_MONGO_URI = 'mongodb://localhost/' + dbName
export const PORT = (process.env.NODE_ENV === 'production' && 3000) || 7000
export const SECRET_JWT_TOKEN = 'mi clave secreta tonta'
export const ASSETS_DIR = path.join(__dirname, '../assets/')