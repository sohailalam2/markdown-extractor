const tasks = arr => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': tasks(['npm run lint']),
    'pre-push': tasks(['npm run lint', 'npm run test:cov', 'npm run build']),
  },
};
