class AllPosts {
  data() {
    return {
      layout: "page.njk",
      title: "Tutti i posts",
      sub: "Poroendi poropippo!",
      heroUrl:
        "https://images.unsplash.com/photo-1594641673584-e7a55adf1e85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
      pagination: {
        data: "collections.posts",
        size: 2,
        before: function (data) {
          return data.sort((a, b) => b.data.page.date - a.data.page.date);
        },
      },
    };
  }

  render(data) {
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
          }</span> on ${self.makeDate(post.data.page.date)}
        </div>
      </div>
      `;
      })
      .join("\n")}
      <div class="pag-buttons">${
        data.pagination.pageNumber > 0
          ? `<a href=${data.pagination.href.previous}><</a>`
          : ""
      }${data.pagination.pages
      .map((_, index) => {
        return `<a class="${
          data.pagination.hrefs[index] === data.page.url ? "active" : ""
        }"
          href="${data.pagination.hrefs[index]}">${index + 1}</a>`;
      })
      .join("")}${
      data.pagination.pageNumber < data.pagination.pages.length - 1
        ? `<a href="${data.pagination.href.next}">></a>`
        : ""
    }
      </div>  
    `;
  }
}

module.exports = AllPosts;
