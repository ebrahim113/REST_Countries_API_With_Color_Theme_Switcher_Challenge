const countriesContainer = document.querySelector(".countries .container");

const darkMode = document.querySelector(".dark-mode");

const body = document.body;

const searchAndFilterContainer = document.querySelector(".search-and-filter");

const search = document.querySelector(".search");

const searchInput = search.querySelector("input");

const searchIcon = search.querySelector("i");

const region = document.getElementById("region");

const header = document.querySelector("header");

const goBack = document.querySelector(".back");

const countryInfo = document.querySelector(".country-info");

goBack.style.display = "none";

countryInfo.style.display = "none";

let darkModeIsOn = false;

let countries = [];

goBack.addEventListener("click", (_) => {
  goBack.style.display = "none";
  countryInfo.style.display = "none";
  searchAndFilterContainer.style.display = "block";
  countriesContainer.parentElement.style.display = "block";
});

/* Function to generate a random number */
const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

/* Function to generate array of numbers */
const randomNumbers = (count, max) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const random = randomNumber(max);
    if (!numbers.includes(random)) numbers.push(random);
    else i--;
  }
  return numbers;
};

/* Function to fetch countries */
const getCountries = async (apiLink) => {
  const response = await fetch(apiLink);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Fetching failed");
};

console.log(countries);

/* Function to display random 10 countries on page load  */
const randomCountries = async (_) => {
  countriesContainer.innerHTML = "";
  const countries = await getCountries("./data.json");
  let randomCountries = randomNumbers(8, countries.length);
  for (let country of randomCountries) createCountryCard(countries[country]);
  if (darkModeIsOn) {
    body.style.backgroundColor = "var(--blue-950)";
    body.style.color = "#ffffff";
    header.style.backgroundColor = "var(--blue-900)";
    searchInput.style.backgroundColor = "var(--blue-900)";
    searchInput.style.color = "#ffffff";
    searchIcon.style.color = "#ffffff";
    region.style.backgroundColor = "var(--blue-900)";
    region.style.color = "#ffffff";
    countriesContainer.style.color = "#ffffff";
    countriesContainer
      .querySelectorAll(".country .info")
      .forEach(
        (country) => (country.style.backgroundColor = "var(--blue-900)")
      );
  }
};

/* Function to create country div */
const createCountryCard = (obj) => {
  const country = document.createElement("div");
  country.className = "country";

  country.addEventListener("click", (_) => {
    searchAndFilterContainer.style.display = "none";
    countriesContainer.parentElement.style.display = "none";

    const {
      flags,
      name,
      nativeName,
      population,
      region,
      subregion,
      capital,
      topLevelDomain,
      currencies,
      languages,
      borders,
    } = obj;

    goBack.style.display = "block";

    countryInfo.querySelector("img").src = flags.png;
    countryInfo.querySelector("h2").textContent = name;
    countryInfo.querySelector(".native-name span").textContent = nativeName;
    countryInfo.querySelector(".population span").textContent = population;
    countryInfo.querySelector(".region span").textContent = region;
    countryInfo.querySelector(".sub-region span").textContent = subregion;
    countryInfo.querySelector(".capital span").textContent = capital;
    countryInfo.querySelector(".top-level-domain span").textContent =
      topLevelDomain;
    countryInfo.querySelector(".currencies span").textContent =
      currencies[0].name;
    countryInfo.querySelector(".languages span").textContent = `${
      languages[0]
        ? `${languages[1] ? `${languages[0].name}, ` : `${languages[0].name}`}`
        : ``
    }${
      languages[1]
        ? `${languages[2] ? `${languages[1].name}, ` : `${languages[1].name}`}`
        : ``
    }${languages[2] ? `${languages[2].name}` : ``}`;
    if (!borders) {
      document.querySelector(".border-countries").style.display = "none";
    }
    countryInfo.querySelector(".border-countries .border-count").innerHTML = `${
      borders
        ? `
        <div>${borders[0]}</div>
        ${borders[1] ? `<div>${borders[1]}</div>` : ``}
        ${borders[2] ? `<div>${borders[2]}</div>` : ``}
        `
        : ``
    }`;

    if (darkModeIsOn)
      document
        .querySelectorAll(".border-count div")
        .forEach((div) => (div.style.backgroundColor = "var(--blue-900)"));

    countryInfo.style.display = "block";
  });

  const imageContainer = document.createElement("div");
  imageContainer.className = "image";

  const img = document.createElement("img");
  img.src = obj.flags.png;
  imageContainer.appendChild(img);

  country.appendChild(imageContainer);

  const info = document.createElement("div");
  info.className = "info";

  const name = document.createElement("h3");
  name.textContent = obj.name;

  info.appendChild(name);

  [
    { Population: obj.population },
    { Region: obj.region },
    { Capital: obj.capital },
  ].forEach((h5) => {
    const [name, value] = [Object.keys(h5), Object.values(h5)];
    const container = document.createElement("h5");
    container.textContent = `${name}: `;

    const span = document.createElement("span");
    span.textContent = `${value}`;
    container.appendChild(span);

    info.appendChild(container);
  });

  country.appendChild(info);

  countriesContainer.appendChild(country);
};

onload = randomCountries;

darkMode.addEventListener("click", (_) => {
  if (!darkModeIsOn) {
    body.style.backgroundColor = "var(--blue-950)";
    body.style.color = "#ffffff";
    header.style.backgroundColor = "var(--blue-900)";
    searchInput.style.backgroundColor = "var(--blue-900)";
    searchInput.style.color = "#ffffff";
    searchIcon.style.color = "#ffffff";
    region.style.backgroundColor = "var(--blue-900)";
    region.style.color = "#ffffff";
    countriesContainer.style.color = "#ffffff";
    countriesContainer
      .querySelectorAll(".country .info")
      .forEach(
        (country) => (country.style.backgroundColor = "var(--blue-900)")
      );
    goBack.querySelector(".go-back").style.backgroundColor = "var(--blue-900)";
    document
      .querySelectorAll(".border-count div")
      .forEach((div) => (div.style.backgroundColor = "var(--blue-900)"));
    document
      .querySelectorAll(".details h5 span")
      .forEach((span) => (span.style.fontWeight = "var(--font-weight-300)"));
    darkMode.innerHTML = '<i class="fa-regular fa-moon"></i> Light Mode';
    darkModeIsOn = true;
  } else {
    body.style.backgroundColor = "var(--grey-50)";
    body.style.color = "#000000";
    header.style.backgroundColor = "#ffffff";
    searchInput.style.backgroundColor = "#ffffff";
    searchInput.style.color = "#000000";
    searchIcon.style.color = "var(--grey-400)";
    region.style.backgroundColor = "#ffffff";
    region.style.color = "#000000";
    countriesContainer.style.color = "#000000";
    countriesContainer
      .querySelectorAll(".country .info")
      .forEach((country) => (country.style.backgroundColor = "#ffffff"));
    document
      .querySelectorAll(".details h5 span")
      .forEach((span) => (span.style.fontWeight = "var(--font-weight-600)"));
    goBack.querySelector(".go-back").style.backgroundColor = "#ffffff";
    document
      .querySelectorAll(".border-count div")
      .forEach((div) => (div.style.backgroundColor = "#ffffff"));
    darkMode.innerHTML = '<i class="fa-regular fa-moon"></i> Dark Mode';
    darkModeIsOn = false;
  }
});

searchInput.addEventListener("input", async (_) => {
  let value = searchInput.value.toLowerCase();
  if (value.length > 0) {
    countriesContainer.innerHTML = "";
    let countries = await getCountries("./data.json");
    let filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().startsWith(value)
    );
    filteredCountries.forEach((country) => createCountryCard(country));
    if (darkModeIsOn) {
      body.style.backgroundColor = "var(--blue-950)";
      body.style.color = "#ffffff";
      header.style.backgroundColor = "var(--blue-900)";
      searchInput.style.backgroundColor = "var(--blue-900)";
      searchInput.style.color = "#ffffff";
      searchIcon.style.color = "#ffffff";
      region.style.backgroundColor = "var(--blue-900)";
      region.style.color = "#ffffff";
      countriesContainer.style.color = "#ffffff";
      countriesContainer
        .querySelectorAll(".country .info")
        .forEach(
          (country) => (country.style.backgroundColor = "var(--blue-900)")
        );
    }
  } else randomCountries();
});

region.addEventListener("change", async (_) => {
  countriesContainer.innerHTML = "";
  const filteredCountries = (await getCountries("./data.json")).filter(
    (country) => country.region === region.value
  );
  filteredCountries.forEach((country) => createCountryCard(country));
  if (darkModeIsOn) {
    body.style.backgroundColor = "var(--blue-950)";
    body.style.color = "#ffffff";
    header.style.backgroundColor = "var(--blue-900)";
    searchInput.style.backgroundColor = "var(--blue-900)";
    searchInput.style.color = "#ffffff";
    searchIcon.style.color = "#ffffff";
    region.style.backgroundColor = "var(--blue-900)";
    region.style.color = "#ffffff";
    countriesContainer.style.color = "#ffffff";
    countriesContainer
      .querySelectorAll(".country .info")
      .forEach(
        (country) => (country.style.backgroundColor = "var(--blue-900)")
      );
  }
});
