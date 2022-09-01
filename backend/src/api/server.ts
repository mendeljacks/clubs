import cors from '@fastify/cors'
import Fastify from 'fastify'
import { handler } from '..'
import { mutate, query, welcome } from 'biab/src/api/controllers'
import {
    google_auth_headless,
    google_login,
    google_login_callback
} from 'biab/src/api/auth/auth_google'
import { apple_auth_headless } from 'biab/src/api/auth/auth_apple'
import { ensure_apple_user_exists, ensure_user_exists } from './auth/ensure_user_exists'
import { pool } from '../config/pg'
import { connection_edges } from './auth/connection_edges'
import { introspect } from 'biab/src/config/orma'
import { prepopulate } from 'biab/src/scripts/prepopulate'
import { populated_data } from '../scripts/prepopulate'
import { role_has_perms } from './auth/roles'
// import git from 'git-rev-sync'

export const start = async () => {
    const orma_schema = await introspect('../common/orma_schema.ts', pool)
    await prepopulate(populated_data, pool, orma_schema)

    const app = Fastify()
    await app.register(cors)

    app.get(
        '/',
        handler(_ => welcome(process.env.SERVER_ROOT_URI + ' Version: ' + 'git.short())')
    )
    app.get(
        '/auth/google/login',
        handler((req, res) =>
            google_login(res, process.env.SERVER_ROOT_URI, process.env.GOOGLE_CLIENT_ID)
        )
    )
    app.get(
        '/auth/google/callback',
        handler((req, res) =>
            google_login_callback(
                req.query.code,
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.SERVER_ROOT_URI,
                ensure_user_exists,
                process.env.jwt_secret
            )
        )
    )
    app.post(
        '/auth/google/headless',
        handler((req, res) =>
            google_auth_headless(req.body, ensure_user_exists, process.env.jwt_secret)
        )
    )
    app.post(
        '/auth/apple/headless',
        handler((req, res) =>
            apple_auth_headless(
                req.body,
                ensure_apple_user_exists,
                process.env.jwt_secret,
                'com.sigmasoftware.clubapp'
            )
        )
    )
    app.post(
        '/query',
        handler((req, res) =>
            query(req, process.env.jwt_secret, pool, connection_edges, role_has_perms, orma_schema)
        )
    )
    app.post(
        '/mutate',
        handler((req, res) =>
            mutate(req, process.env.jwt_secret, pool, connection_edges, role_has_perms, orma_schema)
        )
    )

    const port = Number(process.env.PORT) || 3001
    await app.listen({ port, host: '0.0.0.0' })
    console.clear()
    console.log(`🟢 Server running on port ${port}`)
}
