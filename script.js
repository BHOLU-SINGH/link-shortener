// Get all variables
let container = document.querySelector(".container"),
  original_link = document.querySelector("#original_link"),
  generate = document.querySelector("#generate"),
  shorten_link = document.querySelector("#shorten_link"),
  copy = document.querySelector("#copy"),
  message = document.querySelector(".message"),
  readMore = document.querySelector(".read-more"),
  shorten_link_div = document.querySelector(".shorten_link_div"),
  buttons = document.querySelectorAll(".btn-div button"),
  footer = document.querySelector('footer p span');

message.classList.remove("error", "success", "warning", "flex");

original_link.addEventListener("focus", () => {
  //   message.classList.remove("error", "success", "warning", "flex");
  message.classList.add("none");
  message.value = "";
  original_link.value = "";
  shorten_link.value = "";
  shorten_link_div.style.display = "none";
});

// handleClasses call when we want to show some message to user
const hangleClasses = (className, msg) => {
  message.classList.remove("none");
  message.classList.add("flex", `${className}`);
  message.innerHTML = `${msg}`;

  // setTimeout() function set default message after 5 sec
  setTimeout(() => {
    message.classList.remove("error", "success", "warning");
    message.classList.add("error");
    message.innerHTML =
      "Shorten your links quickly and easily with FreeProjects1. Our link shortener is free to use.";
  }, 5000);
};

// If user enter the link then short this link via calling a third party api
generate.addEventListener("click", () => {
  if (original_link.value.length > 0) {
    let url = original_link.value;
    shorten_link_div.style.display = "flex";

    //calling api
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then((response) => response.json())
      .then((value) => {
        shorten_link.value = value.result.short_link;
      })
      .catch((error) => {
        // catch all error that occur in calling api
        hangleClasses("flex", "Something went wrong, Try again!")
        shorten_link_div.style.display = "none";
      });
  } else {
    hangleClasses("warning", "Please enter url!");
    shorten_link_div.style.display = "none";
  }
});

// Enavbling copy button functionality
copy.addEventListener("click", () => {
  if (shorten_link.value.length > 0) {
    navigator.clipboard.writeText(shorten_link.value);
    hangleClasses("success", "Link successfully copied!");
    copy.innerHTML = "Copied!";

    setTimeout(() => {
      copy.innerHTML = "copy";
    }, 1000);
  } else {
    hangleClasses("warning", "Please first generate link!");
  }
});


// Hide link shortener page and show details page
readMore.addEventListener("click", () => {
  container.classList.add("hide-box");
});

// Hide details page and show Link Shortener page
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    container.classList.remove("hide-box");
  });
});


// Change copyright year automatically
window.addEventListener("load", () => {
  let date = new Date();
  let curr_date, next_date;
  curr_date = date.getFullYear();
  next_date = date.getFullYear() + 1;
  footer.innerHTML = curr_date + "-" + next_date;
})