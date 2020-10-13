exports.data = {
  permalink: "api/posts.json",
  // permalinkBypassOutputDir: true
};

exports.render = function (data) {
  function replacer(key, value) {
    if (key === "collections") {
      return undefined;
    }
    return value;
  }

  return JSON.stringify(
    data.collections.posts.map((post) => post.data),
    replacer
  );
};
