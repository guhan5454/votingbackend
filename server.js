const express = require('express');
const app = express();
const port = 3001;
var cors = require('cors')

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  console.log('dummy')
  res.send('hii')
})

// PostgreSQL configuration
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'voting',
  password: 'guhan123',
  port: 5432, // default PostgreSQL port
});

// Endpoint to handle the data insertion
app.post('/data', async (req, res) => {
    try {
      const { chairman, viceChairman, secretary, jointSecretary, culturalSecretary, sportsSecretary } = req.body;
  
      // Insert the data into the database
      const query = 'INSERT INTO stats (chairman, vice_chairman, secretary, joint_secretary, cultural_secretary, sports_secretary) VALUES ($1, $2, $3, $4, $5, $6)';
      await pool.query(query, [chairman, viceChairman, secretary, jointSecretary, culturalSecretary, sportsSecretary]);
  
      res.status(200).json({ message: 'Data inserted successfully' });
      console.log('Data posted Successfully')
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
app.get('./getdata', (req, res) => {
  
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
