const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
//const fs = require("fs");
//const navigation = require('@11ty/eleventy-navigation');



module.exports = function (eleventyConfig) {

  //eleventyConfig.addPlugin(navigation);

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("localeDate", (dateObj, lg) => {
    lg = lg ? lg : "en";
    return DateTime.fromJSDate(dateObj).setLocale(lg).toLocaleString(DateTime.DATE_FULL);
  });

 
  eleventyConfig.addFilter("categoryFilter", function(collection, cat) {
    let filtered = collection.filter((p) => p.data.category === cat);
    return filtered || [];
  });

  eleventyConfig.addFilter("LocaleFilter", function(collection, loc) {
    loc = loc ? loc : "en";
    let filtered = collection.filter((p) => p.data.locale === loc);
    return filtered || [];
  });

  eleventyConfig.addCollection("blogposts_vi", function (collection) {
    return collection.getFilteredByGlob("./src/vi/blog/posts/*.md");
  });

    eleventyConfig.addCollection("ViTechnoPosts", function(collectionApi) {
    return collectionApi.getFilteredByTags("vi", "techno", "post");
  });

 

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./_static/js/alpine.js",
    "./src/_static/img": "./_static/img",
    "./src/favicon.ico": "./favicon.ico",
    "./src/robots.txt": "./robots.txt"
  });


  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Browsersync Overrides
/*  
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/en/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
    
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (req.url === '/') {
            res.writeHead(301, {
              location: '/vi/'
            });
            res.end();
          }
        });
      }
    }
  });
*/

  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
