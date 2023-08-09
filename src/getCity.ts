export async function getCity(): Promise<string> {
  const responseCity = await fetch("https://get.geojs.io/v1/ip/geo.json");

  //console.log(responseCity);

  const jsonCity = await responseCity.json();

  console.log(jsonCity.city);
  return jsonCity.city;
}
