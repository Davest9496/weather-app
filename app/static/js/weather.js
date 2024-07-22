function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("weatherForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const location = document.getElementById("location").value;
      const units = document.getElementById("units").value;
      const response = await axios.post("/", { location, units });
      const weatherData = response.data;

      console.log(weatherData);
      let resultHTML = `<h2 class="mb-3">Weather in ${location}</h2>`;
      if (weatherData.error) {
        resultHTML += `<div class="alert alert-danger">${weatherData.error}</div>`;
      } else {
        const current = weatherData.current;
        const iconCode = current.weather[0].icon;
        document.getElementById("location").value = "";
        resultHTML += `
          <div class="card">
            <div class="card-body">
            <div class="current-display">
            <div class="parent">
            <div class="div1"><img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon" class="weather-icon"></div>
            <div class="div2"><p class="card-text">${Math.round(current.temp)}°${units === "metric" ? "C" : "F"}</p></div>
            <div class="div3"><p class="card-text">${current.weather[0].description}: Feels like: ${Math.round(current.feels_like)}°${units === "metric" ? "C" : "F"}</p></div>
            <div class="div4"><p class="card-text">Humidity: ${Math.round(current.humidity)}%</p></div>
            <div class="div5"><p class="card-text">Wind speed: ${Math.round(current.wind_speed)} ${units === "metric" ? "m/s" : "mph"}</p></div>
            <div class="div6"><p class="card-text">UV Index: ${Math.round(current.uvi)}</p></div>
            <div class="div7"><p class="card-text">Visibility: ${Math.round(current.visibility / 1000)} km</p></div>
            <div class="div8"><p class="card-text">Sunrise: ${formatTime(current.sunrise)}</p></div>
            <div class="div9"><p class="card-text">Sunset: ${formatTime(current.sunset)}</p></div>
            </div>
              </div>
            </div>
          </div>
        `;
      }
      document.getElementById("weatherResult").innerHTML = resultHTML;

      // Populate forecast accordion
      let forecastHTML = "";
      weatherData.daily.forEach((day, index) => {
        forecastHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
              <button class="accordion-button ${index !== 0 ? "collapsed" : ""}" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${index}" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="collapse${index}">
                <div class="parent-1">
                <div class="div-1">${formatDate(day.dt)}</div>
                <div class="div-2"><span class="span-img"><img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather icon" class="weather-icon"> </span>
                  <span class="span-temp">${Math.round(day.temp.min)}°${units === "metric" ? "C" : "F"} | ${Math.round(day.temp.max)}°${units === "metric" ? "C" : "F"}</span>
                </div>
                <div class="div-3">${day.weather[0].main}</div>
                </div>                      
              </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
              aria-labelledby="heading${index}" data-bs-parent="#forecastAccordion">
            <div class="accordion-body">
                <div class="parent">
            <div class="div--1"><p>${day.weather[0].description}</p>
            <br/>
            <p>${day.summary}</p></div>
            <div class="div--2"><p>Humidity: ${Math.round(day.humidity)}%</p></div>
            <div class="div--3"><p>Wind speed: ${Math.round(day.wind_speed)} ${units === "metric" ? "m/s" : "mph"}</p></div>
            <div class="div--4"> </div>
            <div class="div--5"> </div>
            <div class="div--6"> </div>
            <div class="div--7"> </div>
            <div class="div--8"> </div>
            <div class="div--9"> </div>
            <div class="div--10"> </div>
            <div class="div--11"> </div>
            <div class="div--12"> </div>
            <div class="div--13"> </div>
            <div class="div--14"> </div>
            <div class="div--15"> </div>
            <div class="div--16"> </div>
            <div class="div--17"> </div>
            <div class="div--18"> </div>
            </div>
                <p>Temperature: ${Math.round(day.temp.day)}°${units === "metric" ? "C" : "F"}</p>
                
                
                
                
                <p>UV Index: ${Math.round(day.uvi)}</p>
                <p>Sunrise: ${formatTime(day.sunrise)}</p>
                <p>Sunset: ${formatTime(day.sunset)}</p>
              </div>
            </div>
          </div>
        `;
      });
      document.getElementById("forecastAccordion").innerHTML = forecastHTML;
    });
});
