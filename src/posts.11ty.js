class Test {
  data() {
    return {
      layout: "page.njk",
      title: "Tutti i posts",
      sub: "Poroendi poropippo!",
      heroUrl:
        "https://images.unsplash.com/photo-1594641673584-e7a55adf1e85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
      pagination: {
        data: "collections.posts",
        size: 4,
      },
    };
  }

  render(data) {
    let self = this;
    return `
    ${data.pagination.items
      .map(function (post) {
        // console.log(this);
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
          }</span> on ${self.makeDate(data.page.date)}
        </div>
      </div>
      `;
      })
      .join("\n")}
    `;
  }
}

module.exports = Test;
