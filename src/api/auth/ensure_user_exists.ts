import { AppleUser, EnsureAppleUserExistsFn } from 'biab/src/api/auth/auth_apple'
import { EnsureUserExistsFn, GoogleUser } from 'biab/src/api/auth/auth_google'
import { mutate_handler } from 'biab/src/config/orma'
import { query_handler } from 'biab/src/config/orma'
import { OrmaSchema } from 'orma/src/introspector/introspector'
import { orma_schema } from '../../../generated/orma_schema'
import { pool } from '../../config/pg'
import { user } from './roles'

export const ensure_user_exists: EnsureUserExistsFn = async (google_user: GoogleUser) => {
    const query = {
        users: {
            id: true,
            email: true,
            password: true,
            user_has_roles: {
                role_id: true
            },
            $where: {
                $eq: ['email', { $escape: google_user.email }]
            }
        }
    }

    let { users } = (await query_handler(query, pool, orma_schema as any as OrmaSchema)) as any

    if (users.length > 0) {
        return users[0]
    }

    const mutation = {
        $operation: 'create',
        users: [
            {
                email: google_user.email,
                password: google_user.id,
                first_name: google_user.given_name,
                last_name: google_user.family_name,
                user_has_roles: [
                    {
                        role_id: user
                    }
                ]
            }
        ]
    }

    await mutate_handler(mutation, pool, orma_schema as any as OrmaSchema)
    let { users: new_users } = await query_handler(query, pool, orma_schema as any as OrmaSchema)
    return new_users[0]
}

export const ensure_apple_user_exists: EnsureAppleUserExistsFn = async (apple_user: AppleUser) => {
    const query = {
        users: {
            id: true,
            email: true,
            password: true,
            user_has_roles: {
                role_id: true
            },
            $where: {
                $eq: ['email', { $escape: apple_user.email }]
            }
        }
    }

    let { users } = (await query_handler(query, pool, orma_schema as any as OrmaSchema)) as any

    if (users.length > 0) {
        return users[0]
    }

    const mutation = {
        $operation: 'create',
        users: [
            {
                email: apple_user.email,
                password: apple_user.sub,
                first_name: '',
                last_name: '',
                user_has_roles: [
                    {
                        role_id: user
                    }
                ]
            }
        ]
    }

    await mutate_handler(mutation, pool, orma_schema as any as OrmaSchema)
    let { users: new_users } = await query_handler(query, pool, orma_schema as any as OrmaSchema)
    return new_users[0]
}
