const erororM = document.querySelector(".error");
const message = document.querySelector(".message");
const resultsField = document.querySelector(".results");
const searchInput = document.getElementById("search-input");

const sideSearchListP = document.querySelector(".results");

const recipeSearch = async (event) => {
  event.preventDefault();

  //Clears the field of found recipes before a new search
  resultsField.innerHTML = "";
  // Collect values from the login form
  const search = document.querySelector("#search-input").value.trim();

  if (search) {
    const response = await fetch(`/api/recipes/find?search=${search}`).then(
      (res) => res.json()
    );
    console.log(response);

    if (response.length < 1) {
      message.classList.toggle("is-hidden");
      erororM.classList.toggle("is-hidden");
    } else {
      response.map((res) =>
        sideSearchListP.insertAdjacentHTML(
          "afterbegin",
          `  
        <li class="preview">
        <a class="preview__link" href="/profile/${res.id}" type="button">
          <figure class="preview__fig">
            <img class="preview_img" src="${res.image}" alt="${res.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">
              ${res.title}
            </h4>
            <p class="preview__publisher">${res.publisher}</p>
            <div class="preview__user-generated ${!res.userGenerated ? "is-hidden" : ""
          }">
              <svg class="preview__icon">
                <use href="/media/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
`
        )
      );
    }
  }
  //Clears the input field
  searchInput.value = "";
};

document.querySelector("#search-form").addEventListener("submit", recipeSearch);
