import { describe, test } from 'mocha'
import { expect } from 'chai'
import { TokenContent } from 'biab/src/api/auth/auth'
import { user } from './roles'
import { connection_edges } from './connection_edges'
import { fake_pool } from 'biab/src/tests/fake_pool'
import { OrmaSchema } from 'orma/src/introspector/introspector'
import { ensure_ownership } from './ownership'
import { orma_schema } from '../../../generated/orma_schema'

describe('Ownership', () => {
    test('A user can add another user to a club', async () => {
        const query = {
            $operation: 'create',
            clubs: [
                {
                    name: 'Sigma Club',
                    photos: [
                        {
                            url: 'https://z-upload.facebook.com/CLUBSIGMAOFFICIAL/posts/2787224321542695'
                        }
                    ],
                    club_has_users: [
                        {
                            user_id: 5,
                            is_admin: true
                        },
                        {
                            user_id: 3,
                            is_admin: true
                        }
                    ]
                }
            ]
        }

        const token_content: TokenContent = { role_ids: [user], user_id: 5 }

        const result = await ensure_ownership(
            query,
            token_content,
            'mutate',
            connection_edges,
            fake_pool,
            orma_schema as unknown as OrmaSchema
        )

        expect(result).to.equal(undefined)
    })
})
