const timer = document.querySelector(".timer");
setInterval(function () {
  let currentDate = moment().format("MMMM Do, YYYY");
  let currentTime = moment().format("hh:mm:ss (A)");
  weekDay = moment().format("dddd");
  let currentHour;
  timer.innerText = `${currentDate} (${weekDay}) ${currentTime}`;
}, 1000);

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const status = await fetch("/api/users/login/:id", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (status.ok) {
        document.location.replace("/profile");
      }
    } else {
      alert("Login failed, please try again!");
    }
  }
};

const displaySignup = (event) => {
  event.preventDefault();

  document.querySelector("#login-form").classList.add("is-hidden");
  document.querySelector("#signup-form").classList.remove("is-hidden");
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const loggedIn = true;

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password, loggedIn }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const status = await fetch("/api/users/login/:id", {
        method: "PUT",
        body: JSON.stringify({ loggedIn }),
        headers: { "Content-Type": "application/json" },
      });

      if (status.ok) {
        document.location.replace("/profile");
      }
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);

document
  .querySelector("#signup-button")
  .addEventListener("click", displaySignup);
