const btnIncreaseServings = document.getElementById("btn--increase");
const btnDecreaseServings = document.getElementById("btn--decrease");
const btnBookmarks = document.querySelector(".btn--round");
const btnBookmarksIcon = document.getElementById("bookm");
const btnShowBookmarks = document.querySelector(".books");
const bookmarksDropDown = document.querySelector(".bookmarks");
const bookmarksList = document.querySelector(".bookmarks__list");
const mainSectionLayer = document.querySelector(".main-sec");

const bookmarksStatus = async function () {
  const userId_str = document.querySelector("#user-id").textContent;
  const currentRecipeId = +window.location.pathname.split("/")[2];
  const { recipes } = await fetch(
    `${window.location.origin}/api/users/${userId_str}`
  ).then((res) => res.json());
  let checkStatus = [];
  recipes.map((recipe) => checkStatus.push(recipe.id));

  if (checkStatus.includes(currentRecipeId)) {
    btnBookmarksIcon.href.baseVal += "-fill";
  }
};

bookmarksStatus();

const updateServings = async function () {
  const getCurrentRecipe = async function () {
    const currentRecipeId = window.location.pathname.split("/")[2];

    const curRecipe = await fetch(`/api/recipes/${currentRecipeId}`).then(
      (res) => res.json()
    );
    return curRecipe;
  };

  let recipe = await getCurrentRecipe();

  const updatedServings = async function (newServings) {
    recipe.ingredients.forEach((ing) => {
      ing.quantity = (ing.quantity * newServings) / recipe.servings;
    });

    recipe.servings = newServings;
    return recipe;
  };

  btnIncreaseServings.addEventListener("click", async function (e) {
    e.preventDefault();
    newServings = recipe.servings + 1;

    await updatedServings(newServings).then((rec) => rec);
    const group = document.querySelectorAll(".recipe__quantity");

    for (let i = 0; i < group.length; i++) {
      if (group[i].innerHTML) {
        group[i].innerHTML = recipe.ingredients[i].quantity.toFixed(1);
      }
    }
    const servingSize = document.querySelector(".recipe__info-data--people");
    servingSize.innerHTML = newServings;
  });

  btnDecreaseServings.addEventListener("click", async function (e) {
    e.preventDefault();
    newServings = recipe.servings - 1;

    if (newServings <= 0) return;
    await updatedServings(newServings).then((rec) => rec);
    const group = document.querySelectorAll(".recipe__quantity");

    for (let i = 0; i < group.length; i++) {
      if (group[i].innerHTML) {
        group[i].innerHTML = recipe.ingredients[i].quantity.toFixed(1);
      }
    }

    const servingSize = document.querySelector(".recipe__info-data--people");
    servingSize.innerHTML = newServings;
  });
};

updateServings();

const renderBookmarks = async function () {
  const userId_str = document.querySelector("#user-id").textContent;
  const listBookmerkedRecipes = await fetch(`/api/users/${userId_str}`).then(
    (res) => res.json()
  );

  bookmarksList.innerHTML = "";
  bookmarksDropDown.classList.toggle("visible");

  window.addEventListener("click", function (event) {
    if (!event.target.matches(".books")) {
      if (bookmarksDropDown.classList.contains("visible")) {
        bookmarksDropDown.classList.remove("visible");
        bookmarksList.innerHTML = "";
      }
    }
  });
  listBookmerkedRecipes.recipes.map((recipe) => {
    let html = ` 
    <li class="preview">
    <a
      class="preview__link preview__link--active"
      href="/profile/${recipe.id}"
    >
      <figure class="preview__fig">
        <img
          class="preview_img"
          src=${recipe.image}
          alt=${recipe.title}
        />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">
          ${recipe.title}
        </h4>
        <p class="preview__publisher">${recipe.publisher}</p>

        ${recipe.userGenerated
        ? `          <div class="preview__user-generated">
        <svg class="preview__icon">
          <use href="/media/icons.svg#icon-user"></use>
        </svg>
      </div>`
        : ""
      }
      </div>
    </a>
  </li>
  `;
    bookmarksList.insertAdjacentHTML("beforeend", html);
  });
};

const bookmarkRecipe = async (event, req) => {
  event.preventDefault();

  // userId value is set from handlebars and written to a div at the top of profile.handlebars
  const userId_str = document.querySelector("#user-id").textContent;
  const userId = parseInt(userId_str);

  const url_str = window.location.pathname.split("/");
  const recipeIdString = url_str[2];
  const recipeId = parseInt(recipeIdString);

  if (recipeId) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/userrecipes", {
      method: "POST",
      body: JSON.stringify({ userId, recipeId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      btnBookmarksIcon.href.baseVal += "-fill";
      alert("Bookmark added");
    } else {
      alert("Unable to add bookmark, please try again!");
    }
  }
};

document.querySelector(".btn--round").addEventListener("click", bookmarkRecipe);

btnShowBookmarks.addEventListener("mouseover", renderBookmarks);