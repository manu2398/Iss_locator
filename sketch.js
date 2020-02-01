const mymap = L.map("ISSmap").setView([0, 0], 6);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);

const icon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [22, 94]
});

const marker = L.marker([0, 0], { icon }).addTo(mymap);

const api_url = "http://api.open-notify.org/iss-now.json";

async function getData() {
  const res = await fetch(api_url);
  const data = await res.json();
  const { latitude, longitude } = data.iss_position;

  mymap.setView([latitude, longitude], mymap.getZoom());
  marker.setLatLng([latitude, longitude]);

  document.getElementById("lat").innerText = latitude;
  document.getElementById("long").innerText = longitude;
  // return {latitude, longitude}
}

setInterval(getData, 1000);

// function draw() {
//   getData();
// }
