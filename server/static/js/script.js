// Function to fetch client data from the server
async function fetchClientData() {
  try {
    // Make a GET request to the server's /api endpoint
    const response = await fetch("/api");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    // Parse the JSON response from the server
    const clientData = await response.json();

    // Process the clientData here
    console.log(clientData);

    // Assuming clientData is already available
    const mainDiv = document.querySelector(".main");

    // Create elements for each piece of data
    const dateElement = document.createElement("p");
    dateElement.className = "dateElement";
    dateElement.textContent = clientData.daily_forecast[0].month;

    const city = document.createElement("h2");
    city.className = "city";
    city.textContent = `${clientData.city}, ${clientData.country}`;

    const tempContainer = document.createElement("div");
    tempContainer.className = "tempContainer";

    // Append each element to the main div
    mainDiv.appendChild(dateElement);
    mainDiv.appendChild(city);
    mainDiv.appendChild(tempContainer);

    // Create an img element for the weather icon
    const weatherIconUrl = `http://openweathermap.org/img/wn/${clientData.current_weather_icon}.png`; // Construct the URL for the weather icon
    const img = document.createElement("img");
    img.className = "tempImg";
    img.src = weatherIconUrl;
    img.alt = "Weather Icon";

    // Create a div for the temperature
    const tempDiv = document.createElement("div");
    tempDiv.className = "currentTemp";
    tempDiv.textContent = `${clientData.current_temp.toFixed(0)}°C`;

    // Append the img and tempDiv to the tempContainer
    tempContainer.appendChild(img);
    tempContainer.appendChild(tempDiv);

    // Weather Description
    const descDiv = document.querySelector(".desc");
    descDiv.textContent = `Feels Like ${clientData.current_feels_like.toFixed(
      0
    )}°C, ${clientData.current_weather_description}`;

    // Assuming clientData is already available and contains the necessary properties
    const supplementaryDiv = document.querySelector(".supplementary");

    // Create elements for each piece of data
    const humidityDiv = document.createElement("div");
    humidityDiv.textContent = `Humidity: ${Math.ceil(
      clientData.current_humidity
    )}%`;

    const windSpeedDiv = document.createElement("div");
    windSpeedDiv.textContent = `Wind Speed: ${Math.ceil(
      clientData.daily_forecast[0].wind_speed
    )} m/s`;

    const sunriseDiv = document.createElement("div");
    sunriseDiv.textContent = `Sunrise: ${clientData.daily_forecast[0].sunrise}`;

    const sunsetDiv = document.createElement("div");
    sunsetDiv.textContent = `Sunset: ${clientData.daily_forecast[0].sunset}`;

    const popDiv = document.createElement("div");
    popDiv.textContent = `Precipitation: ${Math.ceil(
      clientData.daily_forecast[0].pop
    )}%`;

    const uvIndexDiv = document.createElement("div");
    uvIndexDiv.textContent = `UV Index: ${Math.ceil(
      clientData.daily_forecast[0].uv_index
    )}`;

    // Append each div to the supplementary div
    supplementaryDiv.appendChild(humidityDiv);
    supplementaryDiv.appendChild(windSpeedDiv);
    supplementaryDiv.appendChild(sunriseDiv);
    supplementaryDiv.appendChild(sunsetDiv);
    supplementaryDiv.appendChild(popDiv);
    supplementaryDiv.appendChild(uvIndexDiv);

    // DAILY FORECAST
    const dailyForecastDivs = clientData.daily_forecast.map((dayForecast) => {
      // Create a new div element for each day's forecast
      const div = document.createElement("div");
      div.className = "daily-forecast";

      // Populate the div with the forecast data
      div.innerHTML = `
      <span class="dailyForeast-items">
      <p>${dayForecast.day}</p>
      <div class="wrapper">
      <img src="https://openweathermap.org/img/wn/${
        dayForecast.icon
      }.png" alt="${dayForecast.summary}">
        <div class="min-max">
        <span class="max"><i class="fa-solid fa-arrow-up-long"></i> ${Math.ceil(
          dayForecast.max
        )}</span>
        <span><i class="fa-solid fa-arrow-down-long"></i> ${Math.ceil(
          dayForecast.min
        )}</span>
        </div>
        </div>
        <p>${dayForecast.weather_description}</p>
        </span>
        
        <div class="mask">
        <div class="parent">
       
        <div class="div1">Humidity: ${Math.ceil(dayForecast.humidity)}</div>
        <div class="div2">Wind Speed: ${Math.ceil(
          dayForecast.wind_speed
        )}m/s</div>
        <div class="div3">Sunrise: ${dayForecast.sunrise} </div>
        <div class="div4">Sunset: ${dayForecast.sunset} </div>
        <div class="div5">Precipitation: ${Math.ceil(dayForecast.pop)}% </div>
        <div class="div6">UV Index: ${Math.ceil(dayForecast.uv_index)} </div>  
        <div class="div7">${dayForecast.summary} </div>
        <div class="div8">Morn </div>
        <div class="div9">Day </div>
        <div class="div10">Eve </div>
        <div class="div11">Night </div>
        <div class="div12">${Math.ceil(dayForecast.feels_like.morn)}°C </div>
        <div class="div13">${Math.ceil(dayForecast.feels_like.day)}°C </div>
        <div class="div14">${Math.ceil(dayForecast.feels_like.eve)}°C </div>
        <div class="div15">${Math.ceil(dayForecast.feels_like.night)}°C </div>
        </div>
        </div>
        
    `;
      return div;
    });

    // Append each div to the container
    const container = document.getElementById("daily-forecast-container");
    dailyForecastDivs.forEach((div) => {
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching client data:", error);
  }
}
//DISPLAY TOGGLE

document.addEventListener("click", (e) => {
  // Find all.mask divs
  const allMasks = document.querySelectorAll(".mask");

  // Iterate through all.mask divs and hide them
  allMasks.forEach((mask) => {
    mask.style.display = "none"; // Initially hide all.mask divs
  });

  // Find the clicked.daily-forecast div
  const clickedDailyForecast = e.target.closest(".daily-forecast");

  // If a.daily-forecast div was clicked
  if (clickedDailyForecast) {
    // Find the.mask div associated with the clicked.daily-forecast div
    const maskToShow = clickedDailyForecast.querySelector(".mask");

    // Toggle the display of the.mask div associated with the clicked.daily-forecast div
    if (maskToShow) {
      maskToShow.style.display =
        maskToShow.style.display === "none" ? "block" : "none";
    }
  }
});

document.addEventListener("click", (e) => {
  const allArrow = document.querySelector("i");
  // alert('got it!')
});

// Call the function to fetch and process the client data
fetchClientData();

//  <h3>${dayForecast.day}</h3>
//         <p>Max: ${dayForecast.max}°C</p>
//         <p>Min: ${dayForecast.min}°C</p>
//         <p>Summary: ${dayForecast.summary}</p>
//         <img src="https://openweathermap.org/img/wn/${dayForecast.icon}.png" alt="${dayForecast.summary}">
//         <p>Humidity: ${dayForecast.humidity}%</p>
//         <p>Pressure: ${dayForecast.pressure} hPa</p>
//         <p>Wind Speed: ${dayForecast.wind_speed} m/s</p>
//         <p>Feels Like: ${dayForecast.feels_like}°C</p>
//         <p>Weather Description: ${dayForecast.weather_description}</p>
//         <p>UV Index: ${dayForecast.uv_index}</p>
//         <p>Clouds: ${dayForecast.clouds}%</p>
//         <p>Dew Point: ${dayForecast.dew_point}°C</p>
//         <p>Pop: ${dayForecast.pop}%</p>
