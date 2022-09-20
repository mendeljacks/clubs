import { identity, parse_int } from 'biab/src/config/pg'
import { Pool, types } from 'pg'

types.setTypeParser(20, parse_int)
types.setTypeParser(types.builtins.TIMESTAMP, identity)

export const pool = new Pool({
    connectionString: process.env.pg,
    types,
    ssl: { rejectUnauthorized: false }
})

export const byo_query_fn = async (sqls: { sql_string }[], connection: Pool) => {
    const sql = sqls.map(el => el.sql_string).join(';\n')
    const response = await connection.query(sql)

    // pg driver returns array only when multiple statements detected
    if (!Array.isArray(response)) {
        return [response.rows]
    } else {
        return response.map(row => row.rows)
    }
}

export const trans = async (fn, pool: { connect: Function }) => {
    const connection = await pool.connect()
    try {
        await connection.query('BEGIN')
        const res = await fn(connection)
        await connection.query('COMMIT')
        await connection.release()
        return res
    } catch (err) {
        await connection.query('ROLLBACK')
        await connection.release()
        return Promise.reject(err)
    }
}
