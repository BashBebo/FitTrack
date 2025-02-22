document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser && window.location.pathname.includes("dashboard.html")) {
        const user = JSON.parse(loggedInUser);
        console.log("Logged-in user:", user);
        document.getElementById("user-name").textContent = user.name;
        loadWorkouts();
    } else if (!loggedInUser && window.location.pathname.includes("dashboard.html")) {
        console.log("Redirecting to login page");
        window.location.href = "login.html";
    }

    // Auto-fill email if "Remember Me" was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
        console.log("Auto-filling email:", savedEmail);
        document.getElementById("email")?.value = savedEmail;
    }
});

// Registration
document.getElementById("registration-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Registered user:", { name, email, password });
    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
});

// Login
document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rememberMe = document.getElementById("remember-me").checked;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Stored users:", users);

    const user = users.find(u => u.email === email && u.password === password);
    console.log("Found user:", user);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }
        console.log("Login successful. Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // Ensure this line executes
    } else {
        console.log("Invalid email or password");
        alert("Invalid email or password.");
    }
});

// Logout
document.getElementById("logout-button")?.addEventListener("click", () => {
    console.log("Logging out...");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

// Log Workout
document.getElementById("workout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const exercise = document.getElementById("exercise").value.trim();
    const reps = document.getElementById("reps").value.trim();
    const sets = document.getElementById("sets").value.trim();

    if (!exercise || !reps || !sets) {
        alert("Please fill out all fields.");
        return;
    }

    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push({ exercise, reps, sets });
    localStorage.setItem("workouts", JSON.stringify(workouts));

    console.log("Logged workout:", { exercise, reps, sets });
    document.getElementById("workout-form").reset();
    loadWorkouts();
});

// Load Workouts
function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    console.log("Loaded workouts:", workouts);

    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";

    workouts.forEach((workout, index) => {
        const li = document.createElement("li");
        li.textContent = `${workout.exercise} - ${workout.reps} reps x ${workout.sets} sets`;
        workoutList.appendChild(li);
    });
}