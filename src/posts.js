const fm = require('front-matter');
const fs = require('fs');
const marked = require('./marked');
const config = require('./config');

const createPost = (postpath) => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postpath}.md`,'utf-8');
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postpath;
  return content;
};
const posthtml = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${data.attributes.description}" />
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <header>
            <a href="/">Go back home</a>
        </header>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            
            <p>${new Date().getFullYear()}</p>
            <hr />
            ${data.body}
        </div>
    </body>
</html>`;
const createPosts = (posts) => {
  posts.forEach((post) => {
    if (!fs.existsSync(`${config.dev.outdir}/${post.path}`)) fs.mkdirSync(`${config.dev.outdir}/${post.path}`);
    fs.writeFileSync(
      `${config.dev.outdir}/${post.path}/index.html`,
      posthtml(post),
      (e) => {
        if (e) throw (e);
        console.log(`${post.path}/index.html was created successfully!`);
      },
    );
  });
};
module.exports = {
  createPost,
  createPosts,
};
