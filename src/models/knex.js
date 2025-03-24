import knex from 'knex'
import knexfile from '../../knexfile'

const env = 'development'
const config = knexfile[env]

export default knex(config)