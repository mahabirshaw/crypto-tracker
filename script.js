const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";

const container = document.getElementById("container");
const loader = document.getElementById("loader");

async function getData() {
  try {
    loader.style.display = "block";

    const res = await fetch(url);
    const data = await res.json();

    displayData(data);

    loader.style.display = "none";
  } catch (error) {
    console.log("Error:", error);
    loader.innerText = "Failed to load data";
  }
}

function displayData(data) {
  container.innerHTML = "";

  data.map((coin) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${coin.image}" />
      <h3>${coin.name}</h3>
      <p>₹ ${coin.current_price}</p>
      <p style="color:${coin.price_change_percentage_24h > 0 ? "lime" : "red"}">
        ${coin.price_change_percentage_24h}%
      </p>
    `;

    container.appendChild(div);
  });
}

getData();