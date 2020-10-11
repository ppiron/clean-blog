exports.data = {
  layout: "page.njk",
  title: "Tutti i posts",
  sub: "Poroendi poropippo!",
  heroUrl:
    "https://images.unsplash.com/photo-1594641673584-e7a55adf1e85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
  pagination: {
    data: "collections.posts",
    size: 3,
    before: function (data) {
      // console.log(data.map((post) => post.data.page.date));
      return data.filter((post) => post.data.author === "Endi");
    },
  },
};

exports.render = function (data) {
  // console.log(data.pagination.items);
  let self = this;
  return `
    ${data.pagination.items
      .map(function (post) {
        return `
      <div class="post">
        <div>
          <a href=${post.url}>
            <div class="post__title">
              ${post.data.title}
            </div>
            <div class="post__sub">
              ${post.data.sub}
            </div>
          </a>
        </div>
        <div class="post__author">
          Posted by <span>${
            post.data.author
          }</span> on ${self.makeDate(post.date)}
        </div>
      </div>
      `;
      })
      .join("\n")}
    `;
};
