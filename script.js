// https://www.deckofcardsapi.com/

let deckID;
const drawBtn = document.getElementById("draw-cards");
const newDeckBtn = document.getElementById("new-deck");
const cardsContainer = document.getElementById("cards");

drawBtn.setAttribute("disabled", true);

const handleNewDeck = () => {
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
    })
    .catch((error) => console.error("Fetch error", error));
};

const handleDraw = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response error " + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card-img" />
      `;
      cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card-img" />
      `;
      const msg = winnerCard(data.cards[0], data.cards[1]);
      document.getElementById("turn-winner").innerText = msg;
    })
    .catch((error) => console.error("Fetch error", error));
};

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
