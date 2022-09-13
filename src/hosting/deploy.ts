import cuid from 'cuid'
import git from 'git-rev-sync'
import { run_tests } from './helpers/promise_mocha'
import { spawn } from '@malept/cross-spawn-promise'

const run_process = args => {
    return spawn(args[0], args.slice(1), {
        logger: msg => console.log(msg),
        shell: true,
        stdio: 'inherit'
    })
}

export const deploy = async () => {
    try {
        const version = 'GIT_' + git.short() + '_GID_' + cuid()

        const result = await run_tests(
            {
                timeout: 20000,
                bail: false,
                checkLeaks: true,
                color: true,
                fullTrace: true,
                inlineDiffs: true,
                require: ['ts-node/register', 'dotenv/config'],
                spec: ['src/**/*.test.ts']
            },
            file => file.slice(-8) === '.test.ts',
            './src'
        )

        await Promise.all([aws(version)])

        await run_process(['docker', 'image', 'prune', '-af'])
        console.log('Done')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const aws = async version => {
    try {
        await run_process([
            'aws',
            `configure set aws_access_key_id ${process.env.AWS_ACCESS_KEY_ID}`
        ])
        await run_process([
            'aws',
            `configure set aws_secret_access_key ${process.env.AWS_SECRET_ACCESS_KEY}`
        ])
        await run_process(['aws', `configure set region eu-central-1`])

        // Run aws configure
        await run_process([
            'aws',
            'ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 684954451958.dkr.ecr.eu-central-1.amazonaws.com'
        ])

        //  aws ecs update-service --cluster clubs-test --service clubs-test-service --force-new-deployment
        const image = `684954451958.dkr.ecr.eu-central-1.amazonaws.com/clubs:latest`

        await run_process(['docker', 'build', '-f', 'src/hosting/Dockerfile', '--tag', image, '.'])
        await run_process(['docker', 'push', image])
        await run_process([
            'aws',
            'ecs',
            'update-service',
            '--cluster',
            'clubs-test',
            '--service',
            'clubs-test-service',
            '--force-new-deployment'
        ])
    } catch (error) {
        console.error('Failed to deploy')
        console.error(error)
        process.exit(1)
    }
}
