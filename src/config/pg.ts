import { identity, parse_int } from 'biab/src/config/pg'
import { Pool, types } from 'pg'

types.setTypeParser(20, parse_int)
types.setTypeParser(types.builtins.TIMESTAMP, identity)

export const pool = new Pool({
    connectionString: process.env.pg,
    types,
    ssl: { rejectUnauthorized: false }
})
