module.exports = module.exports = {
  deploy: {
    production: {
      key: '~/.ssh/id_ed25519',
      user: 'virt98592',
      host: 'thaifood.ee',
      ref: 'origin/master',
      repo: 'git@github.com:devmc-ee/tf-bo.git',
      path: '/data01/virt98592/nodeapp/tf-bo',
      ssh_options: 'ForwardAgent=yes',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build:prod -- --output-path=/data01/virt98592/domeenid/www.thaifood.ee/bo',
      'pre-setup': '',
    },
  },
};
