module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addFilter("date", function (dateObj, format) {
    const d = new Date(dateObj);
    if (format === "MMMM yyyy") {
      return d.toLocaleString("en-US", { month: "long", year: "numeric" });
    }
    return d.toISOString();
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("categories", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("posts/*.md");
    const counts = {};
    posts.forEach((p) => {
      const cat = p.data.category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
