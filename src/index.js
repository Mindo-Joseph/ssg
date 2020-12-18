const fs = require('fs');
const config = require('./config');
const postMethods = require('./posts');

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map((post) => post.slice(0, -3))
  .map((post) => postMethods.createPost(post));

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);
