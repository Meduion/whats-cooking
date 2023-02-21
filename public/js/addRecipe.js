const displayRecipeForm = (event) => {
  event.preventDefault();
  document.querySelector(".overlay").classList.remove("is-hidden");
  document.querySelector(".add-recipe-window").classList.remove("is-hidden");
};

const addNewRecipe = async (event) => {
  event.preventDefault();

  const userGenerated = true;
  const title = document.querySelector('#recipe-title').value.trim();
  const publisher = document.querySelector('#recipe-publisher').value.trim();
  const sourceUrl = document.querySelector('#recipe-url').value.trim();
  const image = document.querySelector('#recipe-image').value.trim();
  const servings = document.querySelector('#recipe-servings').value.trim();
  const cookingTime = document.querySelector('#recipe-cooking-time').value.trim();

  const ingredientFields = document.querySelectorAll('#ingredient-column input');

  const ingredients =
    Array.from(ingredientFields)
      .map(ingredientFields => {
        const ingredient = ingredientFields.value.trim().split(',');

        return {
          quantity: ingredient[0] || '',
          unit: ingredient[1] || '',
          description: ingredient[2] || ''
        };
      })
      .filter(o => o.quantity || o.unit || o.description);

  console.log(ingredients);

  const newRecipe = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify({ userGenerated, title, publisher, sourceUrl, image, servings, cookingTime, ingredients }),
    headers: { 'Content-Type': 'application/json' },

  });

  if (newRecipe.ok) {
    document.location.reload();
  } else {
    alert('Unable to create new recipe.');
  }
};

const closeModal = (event) => {
  event.preventDefault();
  document.querySelector('.overlay').classList.add('is-hidden');
  document.querySelector('.add-recipe-window').classList.add('is-hidden');
}

document
  .querySelector("#add-recipe-button")
  .addEventListener("click", displayRecipeForm);

document
  .querySelector('.upload')
  .addEventListener('submit', addNewRecipe);

document
  .querySelector('.btn--close-modal')
  .addEventListener('click', closeModal);