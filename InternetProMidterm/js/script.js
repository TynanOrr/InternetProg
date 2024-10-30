const reservationForm = document.querySelector("#reservation-form");
if (reservationForm) {
    reservationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const guests = document.querySelector("#guests").value;

        const reservationMessage = document.querySelector("#reservation-message");
        reservationMessage.textContent = `Thank you, ${name}! Your reservation for ${guests} on ${date} at ${time} is confirmed.`;
    });
}

const darkModeToggle = document.querySelector("#dark-mode-toggle");
const body = document.body;

// Load theme from localStorage on page load
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    // Update button text
    if (body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Light Mode";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeToggle.textContent = "Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    }
});
