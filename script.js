// https://www.deckofcardsapi.com/

let deckID;
const drawBtn = document.getElementById("draw-cards");
const newDeckBtn = document.getElementById("new-deck");
const cardsContainer = document.getElementById("cards");

drawBtn.setAttribute("disabled", true);

const handleNewDeck = () => {
  // Reset any existing card effects
  document.querySelectorAll(".winning-card").forEach((card) => {
    card.classList.remove("winning-card");
  });

  // Reset turn winner message and classes
  const turnWinner = document.getElementById("turn-winner");
  turnWinner.innerText = "";
  turnWinner.classList.remove("player-wins", "computer-wins", "war");

  // Clear card images
  cardsContainer.children[0].innerHTML = "";
  cardsContainer.children[1].innerHTML = "";

  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response error " + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      deckID = data.deck_id;
      drawBtn.removeAttribute("disabled");

      // Update remaining cards display
      const remainingCards = document.querySelector("#remaining-cards span");
      if (remainingCards) {
        remainingCards.textContent = data.remaining;
      }
    })
    .catch((error) => console.error("Fetch error", error));
};

const handleDraw = () => {
  // Remove any existing winning card classes
  document.querySelectorAll(".winning-card").forEach((card) => {
    card.classList.remove("winning-card");
  });

  // Remove any existing turn winner classes
  const turnWinner = document.getElementById("turn-winner");
  turnWinner.classList.remove("player-wins", "computer-wins", "war");

  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response error " + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      const computerCard = cardsContainer.children[0];
      const playerCard = cardsContainer.children[1];

      // Add card-drawn class for animation
      computerCard.classList.add("card-drawn");
      playerCard.classList.add("card-drawn");

      // Reset animation by removing and re-adding the class
      setTimeout(() => {
        computerCard.classList.remove("card-drawn");
        playerCard.classList.remove("card-drawn");
        void computerCard.offsetWidth; // Trigger reflow
        void playerCard.offsetWidth; // Trigger reflow
        computerCard.classList.add("card-drawn");
        playerCard.classList.add("card-drawn");
      }, 10);

      computerCard.innerHTML = `
        <img src=${data.cards[0].image} class="card-img" />
      `;
      playerCard.innerHTML = `
        <img src=${data.cards[1].image} class="card-img" />
      `;

      const result = winnerCard(data.cards[0], data.cards[1]);
      turnWinner.innerText = result;

      // Apply appropriate classes based on the result
      if (result === "War!") {
        turnWinner.classList.add("war");
        // Both cards get the effect in case of war
        computerCard.classList.add("winning-card");
        playerCard.classList.add("winning-card");
      } else if (result === "Computer wins!") {
        turnWinner.classList.add("computer-wins");
        computerCard.classList.add("winning-card");
      } else {
        turnWinner.classList.add("player-wins");
        playerCard.classList.add("winning-card");
      }

      // Update remaining cards display
      const remainingCards = document.querySelector("#remaining-cards span");
      if (remainingCards) {
        remainingCards.textContent = data.remaining;
      }

      // Disable draw button if no cards remain
      if (data.remaining === 0) {
        drawBtn.setAttribute("disabled", true);
      }
    })
    .catch((error) => console.error("Fetch error", error));
};

// Function to determine the winner between two cards
function winnerCard(card1, card2) {
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Value = ranks.indexOf(card1.value);
  const card2Value = ranks.indexOf(card2.value);

  if (card1Value === card2Value) {
    return "War!";
  } else if (card1Value > card2Value) {
    return "Computer wins!";
  } else {
    return "You win!";
  }
}

newDeckBtn.addEventListener("click", handleNewDeck);
drawBtn.addEventListener("click", handleDraw);
