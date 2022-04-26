module.exports = {
  apps: [
    {
      name: 'test',
      script: 'bin/www',
      ignore_watch: ['[/\\]./', 'node_modules', 'config', 'public', '.git'],
      exec_mode: 'fork',
      watch: '../',
      kill_timeout: 3000,
      autorestart: true,
      mergeLogs: true,
      exp_backoff_restart_delay: 4000,

      env_development: {
        NODE_DEBUG: 'redis',
        DEBUG: 'express:*',
        NODE_ENV: 'development',
        APP_PORT: 3000,
        DB_PORT: 1712,
        DB_HOST: 'test-mdb',
        DB_USER: '',
        DB_PASS: '',
        DB_NAME: 'testdb',
        REDIS_PORT: 6379,
        API_URI: '/api/v1',
        KEY_S:
          '165a4d912bf3983ad896b1366199385ab1ebe08d0fcd247f89c7540b0cda786ed4037fa4a439f1dcd0a2d621fa3a30d30d5f3e06d4c61aa7e36f40750b1f2984',
        KEY_A:
          'e57518d17a65831a707254c857224fa9e1c041faedd8e5c03a18069e62b371e000579dfb33d192647ebb213a3f76a202e0350bd222f627ec4461f73fff765ba6',
      },
    },
  ],

  deploy: {
    production: {
      user: 'user',
      repo: '/var/www/',
      ref: 'origin/development',
      host: ['localhost'],
      port: '30544',
      path: '/root/app',
      'post-deploy': 'pnpm i && pnpm start:prod',
      'pre-setup': "echo 'run on the host before the setup process starts'",
      'post-setup': "echo 'run on the host after cloning the repo'",
      'pre-deploy-local': "echo 'local executed command'",
    },
  },
};
