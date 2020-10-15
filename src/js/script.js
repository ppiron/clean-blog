const authorLinks = document.querySelectorAll(".post__author > span");
const blogList = document.querySelector(".blog__list");

function makeDate(value) {
  // if (typeof value === "string") {
  //   return value;
  // }
  let dat = new Date(Date.parse(value));
  // const offset = dat.getTimezoneOffset();
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return `${months[dat.getMonth()]} ${dat.getDate()}, ${dat.getFullYear()}`;
}

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
      Posted by <span>${author}</span> on ${makeDate(date)}
    </div>
  </div>`;
};

// const paginateArray = (array, itemsPerPage) => {
//   const nPages = Math.ceil(array.length / itemsPerPage);
//   const paginatedArray = [];
//   for (let page = 0; page < nPages; page++) {
//     const element = {};
//     element.pageNumber = page;
//     element.items = array.slice(itemsPerPage * page, itemsPerPage * (page + 1));
//     paginatedArray.push(element);
//   }
//   return paginatedArray;
// };

window.addEventListener("popstate", (e) => {
  console.log(e);
  if (e.state === "filtered") {
    window.location.reload();
  }
});

authorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    fetch("/api/posts.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredPosts = data.filter(
          (post) => post.author === event.target.textContent
        );
        const cleanedPosts = filteredPosts
          .map((post) => {
            return {
              author: post.author,
              title: post.title,
              sub: post.sub,
              gallery: post.gallery,
              heroUrl: post.heroUrl,
              url: post.page.url,
              date: post.page.date,
            };
          })
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        // const paginatedPosts = paginateArray(cleanedPosts, 1);
        // console.log(paginatedPosts);
        const postList = cleanedPosts
          .map((post) => {
            return postRender(post);
          })
          .join("\n");
        blogList.innerHTML = postList;
        history.replaceState("filtered", "");
        history.pushState("filtered", "");
        // console.log(
        //   data.filter((post) => post.author === event.target.textContent)
        // );
      });
  });
});
