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

const navigate = (e) => {
  e.preventDefault();
  console.log(e);
};

const makePages = ({ pages, hrefs }) => {
  createdPages = pages.map((page) => {
    return (
      page.items.map((post) => postRender(post)).join("\n") +
      `
    <div class="pag-buttons">${
      page.pageNumber > 0 ? `<a href=${page.hrefPrev}><</a>` : ""
    }${pages
        .map((_, index) => {
          return `<a class="${
            hrefs[index] === window.location.pathname ? "active" : ""
          }"
        href="${hrefs[index]}" >${index + 1}</a>`;
        })
        .join("")}${
        page.pageNumber < pages.length - 1
          ? `<a href="${page.hrefNext}">></a>`
          : ""
      }
    </div> 
    `
    );
  });
  return createdPages;
};

const paginateArray = (array, itemsPerPage) => {
  const nPages = Math.ceil(array.length / itemsPerPage);
  const pagination = {};
  const pages = [];
  const hrefs = [];
  hrefs[0] = window.location.pathname + "filtered/";
  for (let index = 1; index < nPages; index++) {
    hrefs[index] = window.location.pathname + "filtered/" + index + "/";
  }
  for (let page = 0; page < nPages; page++) {
    const element = {};
    element.pageNumber = page;
    element.items = array.slice(itemsPerPage * page, itemsPerPage * (page + 1));
    element.href = hrefs[page];
    element.hrefPrev = hrefs[page - 1] || "";
    element.hrefNext = hrefs[page + 1] || "";
    pages.push(element);
  }
  pagination.hrefs = hrefs;
  pagination.pages = pages;
  return pagination;
};

window.addEventListener("popstate", (e) => {
  console.log(e);
  if (e.state.oldState) {
    blogList.innerHTML = e.state.oldState;
  }
});

let paginatedPosts;

blogList.addEventListener("click", (event) => {
  if (event.target.nodeName === "SPAN") {
    console.log("pippo");
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
        paginatedPosts = paginateArray(cleanedPosts, 1);
        history.replaceState(
          { oldState: blogList.innerHTML },
          null,
          paginatedPosts.hrefs[0]
        );
        const createdPages = makePages(paginatedPosts);
        history.pushState(
          { oldState: createdPages[0] },
          null,
          paginatedPosts.hrefs[0]
        );
        blogList.innerHTML = createdPages[0];
      });
  }
  if (event.target.parentNode.classList.contains("pag-buttons")) {
    event.preventDefault();
    console.log(Number(event.target.textContent));
    if (Number(event.target.textContent)) {
      const path = `filtered/${Number(event.target.textContent) - 1}/`;
      console.log(path);
      history.replaceState(
        { oldState: blogList.innerHTML },
        null,
        paginatedPosts.hrefs[Number(event.target.textContent) - 1]
      );
      const createdPages = makePages(paginatedPosts);
      history.pushState(
        { oldState: createdPages[Number(event.target.textContent) - 1] },
        null,
        paginatedPosts.hrefs[Number(event.target.textContent) - 1]
      );

      blogList.innerHTML = createdPages[Number(event.target.textContent) - 1];
    }
  }
});
