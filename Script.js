let currentLatitude = null;
let currentLongitude = null;

function getLocation() {

    const status = document.getElementById("status");

    if (!navigator.geolocation) {
        status.value = "Geolocation is not supported.";
        return;
    }

    status.value = "Getting location...";

    navigator.geolocation.getCurrentPosition(
        function(position) {

            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;

            document.getElementById("latitude").value =
                currentLatitude.toFixed(6);

            document.getElementById("longitude").value =
                currentLongitude.toFixed(6);

            document.getElementById("accuracy").value =
                Math.round(position.coords.accuracy) + " meters";

            status.value = "Location found successfully.";

        },

        function(error) {

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    status.value = "Location permission denied.";
                    break;

                case error.POSITION_UNAVAILABLE:
                    status.value = "Location unavailable.";
                    break;

                case error.TIMEOUT:
                    status.value = "Location request timed out.";
                    break;

                default:
                    status.value = "Unknown error.";
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function openMap() {

    if (currentLatitude === null || currentLongitude === null) {
        alert("Please get your location first.");
        return;
    }

    const url =
        "https://www.google.com/maps?q=" +
        currentLatitude +
        "," +
        currentLongitude;

    window.open(url, "_blank");
}

window.onload = function() {
    getLocation();
};