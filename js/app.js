const NEW_URL = "https://fakestoreapi.com/users";
const loadingEl = document.querySelector(".loading");
const skeletonEl = document.querySelector(".skeleton");

const fetchData = () => {
  fetch(NEW_URL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      createProduct(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingEl.style.display = "none";
    });
};

window.addEventListener("load", () => {
  createSkeleton();
  fetchData();
});

const images = [
  "./images/Icon.png",
  "./images/Icon2.png",
  "./images/Icon3.png",
  "./images/Icon4.png",
  "./images/Icon5.png",
];

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

const wrapperEl = document.querySelector(".wrapper");

function createProduct(data) {
  const fragment = document.createDocumentFragment();

  data.forEach((user) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let randomImage = getRandomImage();
    card.innerHTML = `
              <img src="${randomImage}" alt="">
              <div class="card__desc">
                <div class="card__between">
                  <p>Username:</p>
                  <p class="name">${user.name.firstname} ${user.name.lastname}</p>
                </div>
                <div class="card__between">
                  <p>Email:</p>
                  <p class="name">${user.email}</p>
                </div>
                <div class="card__between">
                  <p>Phone:</p>
                  <p class="name">${user.phone}</p>
                </div>
                <div class="card__btn">
                  <button class="call-btn">Call</button>
                  <button class="more-btn">Chat</button>
                </div>
              </div>
        `;
    fragment.appendChild(card);
  });
  wrapperEl.appendChild(fragment);
}

const createSkeleton = () => {
  const salafan = document.createDocumentFragment()
  for (let i = 0; i < 10; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("skeleton__item");
    newDiv.innerHTML = `
        <div class="skeleton__img skelt-animation"></div>
          <div class="skeleton__line skelt-animation"></div>
          <div class="skeleton__line skelt-animation"></div>
          <div class="skeleton__flex">
            <div class="skeleton__line skelt-animation"></div>
            <div class="skeleton__line skelt-animation"></div>
          </div>
        <div class="skeleton__line skelt-animation"></div>
    `;
    salafan.appendChild(newDiv)
  }
  skeletonEl.appendChild(salafan)
};

document.body.addEventListener("click", function (e) {
  if (e.target.className === "call-btn") {
    document.querySelector(".call-popup").style.display = "flex";
  }

  if (e.target.className === "close") {
    document.querySelector(".call-popup").style.display = "none";
  }
});
