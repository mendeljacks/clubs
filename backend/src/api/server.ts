import cors from '@fastify/cors'
import Fastify from 'fastify'
import { handler } from '..'
import { introspect } from '../config/orma'
import { prepopulate } from '../scripts/prepopulate'
import { mutate, query } from './controllers'
import { welcome } from 'biab/src/api/controllers'
import {
    google_auth_headless,
    google_login,
    google_login_callback
} from 'biab/src/api/auth/auth_google'

export const start = async () => {
    await introspect()
    await prepopulate()

    const app = Fastify()
    await app.register(cors)

    app.get(
        '/',
        handler(_ => welcome(process.env.SERVER_ROOT_URI))
    )
    app.get(
        '/auth/google/login',
        handler((req, res) => google_login(res, process.env.SERVER_ROOT_URI))
    )
    app.get('/auth/google/callback', handler(google_login_callback))
    app.post('/auth/google/headless', handler(google_auth_headless))
    app.post('/query', handler(query))
    app.post('/mutate', handler(mutate))

    const port = Number(process.env.PORT) || 3001
    await app.listen({ port, host: '0.0.0.0' })
    console.clear()
    console.log(`🟢 Server running on port ${port}`)
}
