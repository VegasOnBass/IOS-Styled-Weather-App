export const searchWeather = async (city) => {
  const url = `http://api.weatherapi.com/v1/search.json?key=${process.env.Weather_Key}&q=` + city
  const response = await fetch(url)
  const results = await response.json()
  return results
}