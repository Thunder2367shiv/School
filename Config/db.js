import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Reconnect if connection is closed
db.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('MySQL connection lost. Reconnecting...');
    db.connect((err) => {
      if (err) {
        console.error('Error reconnecting:', err);
      } else {
        console.log('Reconnected to MySQL');
      }
    });
  } else {
    console.error('MySQL error:', err);
  }
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connection Done..');
});

export default db;
