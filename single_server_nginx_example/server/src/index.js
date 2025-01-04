import express from 'express'
import pg from 'pg'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const app = express()
app.use(cors())
app.use(express.json())

// Initialize database table
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS phrases (
        id SERIAL PRIMARY KEY,
        phrase TEXT NOT NULL
      )
    `)
    
    // Check if we need to insert the default phrase
    const result = await pool.query('SELECT * FROM phrases LIMIT 1')
    if (result.rows.length === 0) {
      await pool.query('INSERT INTO phrases (phrase) VALUES ($1)', ['Hello World from Railway!'])
    }
  } catch (err) {
    console.error('Database initialization error:', err)
  }
}

initDB()

app.get('/api/phrase', async (req, res) => {
  try {
    const result = await pool.query('SELECT phrase FROM phrases LIMIT 1')
    res.json({ phrase: result.rows[0].phrase })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})