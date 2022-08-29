import { reset } from 'biab/src/scripts/reset'
import { default as config } from '../../database.json'

export const reseta = async () => {
    await reset(config)
}
