const authorLinks = document.querySelectorAll(".post__author > span");
const blogList = document.querySelector(".blog__list");

const postRender = ({ author, title, sub, url, date }) => {
  return `<div class="post">
    <div>
      <a href=${url}>
        <div class="post__title">
          ${title}
        </div>
        <div class="post__sub">
          ${sub}
        </div>
      </a>
    </div>
    <div class="post__author">
      Posted by <span>${author}</span> on ${date}
    </div>
  </div>`;
};

const paginateArray = (array, itemsPerPage) => {
  const nPages = Math.ceil(array.length / itemsPerPage);
  const paginatedArray = [];
  for (let page = 0; page < nPages; page++) {
    const element = {};
    element.pageNumber = page;
    element.items = array.slice(itemsPerPage * page, itemsPerPage * (page + 1));
    paginatedArray.push(element);
  }
  return paginatedArray;
};

authorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    fetch("/api/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredPosts = data.filter(
          (post) => post.author === event.target.textContent
        );
        const cleanedPosts = filteredPosts.map((post) => {
          return {
            author: post.author,
            title: post.title,
            sub: post.sub,
            gallery: post.gallery,
            heroUrl: post.heroUrl,
            url: post.page.url,
            date: post.page.date,
          };
        });
        const paginatedPosts = paginateArray(cleanedPosts, 1);
        console.log(paginatedPosts);
        const postList = cleanedPosts
          .map((post) => {
            return postRender(post);
          })
          .join("\n");
        blogList.innerHTML = postList;
        // console.log(
        //   data.filter((post) => post.author === event.target.textContent)
        // );
      });
  });
});
