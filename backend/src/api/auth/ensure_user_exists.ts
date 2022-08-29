import { GoogleUser } from 'biab/src/api/auth/auth_google'
import { mutate_handler } from 'biab/src/config/orma'
import { query_handler } from 'biab/src/config/orma'
import { pool } from '../../config/pg'
import { user } from './roles'

export const ensure_user_exists = async (google_user: GoogleUser) => {
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

    let { users } = (await query_handler(query, pool)) as any

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

    await mutate_handler(mutation, pool)
    let { users: new_users } = await query_handler(query, pool)
    return new_users[0]
}
