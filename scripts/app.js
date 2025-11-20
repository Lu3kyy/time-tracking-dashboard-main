//java
// Get elements from the page
const cards = document.querySelectorAll(".card");
const links = document.querySelectorAll(".link");
const profileName = document.querySelector(".profile-name");

// Set profile name in JS instead of HTML
profileName.textContent = "Jeremy Robson";

// Load the data from data.json
fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Show weekly data first
    updateCards(data, "weekly");

    // Add click events to Daily / Weekly / Monthly links
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      link.addEventListener("click", function (event) {
        event.preventDefault();

        const timeframe = link.getAttribute("data-timeframe");

        // Update all the cards when a link is clicked
        updateCards(data, timeframe);

        // Update which link looks active
        for (let j = 0; j < links.length; j++) {
          links[j].classList.remove("activated");
        }
        link.classList.add("activated");
      });
    }
  })
  .catch(function (error) {
    console.log("Error loading data.json:", error);
  });


 // Fills the cards with the correct title, current hours, and previous hours based on the chosen timeframe (daily, weekly, monthly).

function updateCards(data, timeframe) {
  // Go through each card (Work, Play, Study, etc.)
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const titleElement = card.querySelector(".card-type");
    const currentElement = card.querySelector(".current-hours");
    const previousElement = card.querySelector(".previous-hours");

    // Set the title text (Work, Play, Study, ...)
    titleElement.textContent = data[i].title;

    // Set the current hours text
    const currentHours = data[i].timeframes[timeframe].current;
    currentElement.textContent = currentHours + "hrs";

    // Decide whether to say "day", "week", or "month"
    let label;
    if (timeframe === "daily") {
      label = "day";
    } else if (timeframe === "weekly") {
      label = "week";
    } else {
      label = "month";
    }

    // Set the previous hours text
    const previousHours = data[i].timeframes[timeframe].previous;
    previousElement.textContent =
      "Last " + label + ": " + previousHours + "hrs";
  }
}
