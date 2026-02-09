const mysql = require('mysql2/promise');
// const path = require('path');
// require("dotenv").config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
   host: process.env.MYSQLHOST,
   user: process.env.MYSQLUSER,
   password: process.env.MYSQLPASSWORD,
   database: process.env.MYSQLDATABASE,
   port: process.env.MYSQLPORT || 3306,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
})


(async () => {
   try {
      const conn = await pool.getConnection();
      console.log("✅ Connected to Railway MySQL");
      conn.release(); // release back to pool
   } catch (err) {
      console.error("❌ Error connecting to MySQL:", err);
   }
})();

module.exports = pool;