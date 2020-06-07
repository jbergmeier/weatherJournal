/* Global Variables */
const API_KEY_WEATHER = "dbbb0c655264a1d3b866654be07c3178&units=imperial";
const URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather?";
const countryCode = "de";

const serverBaseUrl = "http://localhost:8000";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// weather Action get Fetch
const weatherAction = async (e) => {
  let zipCode = document.getElementById("zip").value;
  const fullUrl =
    URL_WEATHER +
    "zip=" +
    zipCode +
    "," +
    countryCode +
    "&appid=" +
    API_KEY_WEATHER;

  await fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.name);
      let temperature = data.main.temp;
      let userData = document.getElementById("feelings").value;
      postData(serverBaseUrl + "/saveWeather", {
        temperature: temperature,
        date: newDate,
        userResponse: userData,
      });

      updateUI();
    });
};

// Get Button and set Event Listeners
document.getElementById("generate").addEventListener("click", weatherAction);

//call external API
const postData = async (url = "", data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch(serverBaseUrl + "/all");
  try {
    const responseData = await request.json();
    console.log(responseData);

    responseData.forEach((element) => {
      console.log(element.temperature);
      document.getElementById(
        "temp"
      ).innerHTML = `<p>${element.temperature}</p>`;

      document.getElementById("date").innerHTML = `<p>${element.date}</p>`;

      document.getElementById(
        "content"
      ).innerHTML = `<p>${element.userResponse}</p>`;
    });
  } catch (e) {
    console.log("Error", e);
  }
};

// window.onload = () => {
//   updateUI();
// };
