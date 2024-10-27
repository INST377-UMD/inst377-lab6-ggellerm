function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

const map = L.map('map').setView([32.5, -95], 5); // Central US

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function addMarker(coordinate, index) {
    const marker = L.marker([coordinate.lat, coordinate.lng]).addTo(map);
    document.getElementById(`coord${index}`).textContent = `Lat: ${coordinate.lat}, Lng: ${coordinate.lng}`;

    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinate.lat}&longitude=${coordinate.lng}&localityLanguage=en`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Unknown";
            document.getElementById(`locality${index}`).textContent = `Locality: ${locality}`;
        })
        .catch(error => {
            console.error("Error fetching locality:", error);
            document.getElementById(`locality${index}`).textContent = "Locality: Not Found";
        });
}

coordinates.forEach((coordinate, index) => {
    addMarker(coordinate, index + 1);
});