module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: './',
      script: 'npm',
      args: ['start'],
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    development: {
      key: '~/.ssh/awsKey.pem',
      user: 'ubuntu',
      host: ["54.180.116.188"],
      ref: 'origin/develop',
      repo: 'git@github.com:ldongg/backend_node.git',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no', 'ForwardAgent=yes'],
      path: '/var/www/backend_node_develop',
      'pre-setup' : 'scripts/pre-setup.sh',
      'post-deploy': 'npm i --production;pm2 startOrReload ecosystem.config.js development',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development'
      }
    },
    production: {
      key: '~/.ssh/awsKey.pem',
      user: 'ubuntu',
      host: ["54.180.116.188"],
      ref: 'origin/release',
      repo: 'git@github.com:ldongg/backend_node.git',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no', 'ForwardAgent=yes'],
      path: './var/www/backend_node_product',
      'pre-setup' : 'scripts/pre-setup.sh',
      'post-deploy': 'npm i --production;pm2 startOrReload ecosystem.config.js production',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      }
    }
  }
}
