exports.data = {
  pagination: {
    data: "collections.posts",
    size: 1,
  },
  permalink: (data) => `api/pag-${data.pagination.pageNumber}.json`,
  // permalinkBypassOutputDir: true
};

exports.render = function (data) {
  // console.log(data.pagination);
  function replacer(key, value) {
    if (
      key === "collections" ||
      key === "pages" ||
      key === "page" ||
      key === "first" ||
      key === "last" ||
      key === "items"
    ) {
      return undefined;
    }
    return value;
  }

  return JSON.stringify(data.pagination, replacer);
};
