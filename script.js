document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#register-form');
    const loginForm = document.querySelector('#login-form');
    const assessmentForm = document.querySelector('#assessment-form');

    // Helper: JSON fetch with error handling
    async function fetchJSON(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        } catch (err) {
            console.error("Fetch error:", err.message);
            alert("An error occurred: " + err.message);
            return null;
        }
    }

    // **Register Form Submission**
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const role = document.getElementById('role')?.value;
            const name = document.getElementById('name')?.value;
            const dob = document.getElementById('dob')?.value;
            const age = document.getElementById('age')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const password = document.getElementById('password')?.value;

            if (!role || !email || !password) {
                alert("Please fill in all required fields.");
                return;
            }

            const formData = { role, name, dob, age, email, phone, password };
            const data = await fetchJSON('/register', formData);

            if (data && data.success) {
                alert(data.message || "Registered successfully!");
                window.location.href = "./login.html";
            }
        });
    }

    // **Login Form Submission**
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const role = document.getElementById('login-role')?.value;
            const email = document.getElementById('login-email')?.value;
            const password = document.getElementById('login-password')?.value;

            if (!role || !email || !password) {
                alert("Please enter email, role, and password.");
                return;
            }

            const loginData = { role, email, password };
            const data = await fetchJSON('/login', loginData);

            if (data && data.success) {
                alert("Login Successful!");
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("userRole", data.role);
                window.location.href = "./assessment.html";
            } else {
                alert("Invalid Credentials! Please try again.");
            }
        });
    }

    // **Assessment Form Submission**
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            let score = 0;
            const totalQuestions = 20;

            for (let i = 1; i <= totalQuestions; i++) {
                const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
                if (selectedAnswer?.value === "yes") {
                    score++;
                }
            }

            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("User not logged in.");
                window.location.href = "./login.html";
                return;
            }

            const percentage = (score / totalQuestions) * 100;

            let classification = "";
            if (percentage >= 80) classification = "Normal";
            else if (percentage >= 60) classification = "Mild";
            else if (percentage >= 40) classification = "Moderate";
            else if (percentage >= 20) classification = "Severe";
            else classification = "Profound";

            const payload = { userId, score, percentage, classification };
            const data = await fetchJSON('/save-assessment', payload);

            if (data) {
                alert("Assessment Submitted Successfully!");
                localStorage.setItem("assessmentScore", score);
                localStorage.setItem("assessmentPercentage", percentage.toFixed(2));
                localStorage.setItem("classification", classification);
                window.location.href = "./result.html";
            }
        });
    }

    // **Display Results in result.html**
    if (window.location.pathname.includes("result.html")) {
        const scoreEl = document.getElementById("score");
        const percEl = document.getElementById("percentage");
        const classEl = document.getElementById("classification");

        if (scoreEl && percEl && classEl) {
            scoreEl.innerText = localStorage.getItem("assessmentScore") || "0";
            percEl.innerText = localStorage.getItem("assessmentPercentage") || "0";
            classEl.innerText = localStorage.getItem("classification") || "Not Available";
        }
    }
});
