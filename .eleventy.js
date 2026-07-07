module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
