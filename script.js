const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";

let allData = [];

const container = document.getElementById("container");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("search");

async function getData() {
  try {
    loader.style.display = "block";

    const res = await fetch(url);
    const data = await res.json();

    allData = data;
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
        ${Math.round(coin.price_change_percentage_24h * 100) / 100}%
      </p>
    `;

    container.appendChild(div);
  });
}

// SEARCH
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = allData.filter((coin) =>
    coin.name.toLowerCase().includes(query)
  );

  displayData(filtered);
});

// SORT HIGH → LOW
function sortHigh() {
  const sorted = [...allData].sort(
    (a, b) => b.current_price - a.current_price
  );
  displayData(sorted);
}

// SORT LOW → HIGH
function sortLow() {
  const sorted = [...allData].sort(
    (a, b) => a.current_price - b.current_price
  );
  displayData(sorted);
}

// FILTER TOP 10
function top10() {
  const filtered = allData.filter((coin) => coin.market_cap_rank <= 10);
  displayData(filtered);
}

// RESET
function resetData() {
  displayData(allData);
}

getData();