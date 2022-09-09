import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
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
import { default as package_json } from '../../package.json'
import { sign_in_with_apple } from 'biab/src/api/auth/auth_apple_callback'
import { ensure_ownership } from './auth/ownership'

const key_contents =
    '-----BEGIN PRIVATE KEY-----|MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgwEwwvprT9XYCYUlt|1Cqjb/h1Kg9GEyxsDPciTYvCiX+gCgYIKoZIzj0DAQehRANCAASxKpAE7pDQF5Q0|PCletiD92V/idnOoW2ROwYwsHlMFuHptFvoizv5QtL0o+rIgKTREg7H52AKQEaik|THXg2Dob|-----END PRIVATE KEY-----' // The contents of service key downloaded during the service creation replace line break with |
const bundle_id = 'com.sigmasoftware.clubapp' // The Bundle ID of your app
const service_id = `${bundle_id}.applesignin` // https://developer.apple.com/account/resources/identifiers/list/serviceId
const team_id = 'HTEV8H9ZW8' // Found in the top-right corner of https://developer.apple.com/account/resources/certificates/list
const key_id = 'ZB7F2T9QMQ' // key you created for Sign in with Apple

export const start = async () => {
    const orma_schema = await introspect('./generated/orma_schema.ts', pool)
    await prepopulate(populated_data, pool, orma_schema)

    const app = Fastify()
    await app.register(cors)
    await app.register(formbody)

    app.get(
        '/',
        handler(_ => welcome(process.env.SERVER_ROOT_URI + ' Version: ' + package_json.version))
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
        '/auth/apple/callback',
        handler(req =>
            sign_in_with_apple(
                req,
                process.env.SERVER_ROOT_URI,
                bundle_id,
                service_id,
                team_id,
                key_contents,
                key_id
            )
        )
    )
    app.post(
        '/auth/apple/headless',
        handler((req, res) =>
            apple_auth_headless(req.body, ensure_apple_user_exists, process.env.jwt_secret, [
                bundle_id,
                service_id
            ])
        )
    )

    app.post(
        '/query',
        handler((req, res) =>
            query(
                req,
                process.env.jwt_secret,
                pool,
                connection_edges,
                role_has_perms,
                orma_schema,
                ensure_ownership
            )
        )
    )
    app.post(
        '/mutate',
        handler((req, res) =>
            mutate(
                req,
                process.env.jwt_secret,
                pool,
                connection_edges,
                role_has_perms,
                orma_schema,
                ensure_ownership
            )
        )
    )

    const port = Number(process.env.PORT) || 3001
    await app.listen({ port, host: '0.0.0.0' })
    console.clear()
    console.log(`🟢 Server running on port ${port}`)
}
