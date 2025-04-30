document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#register-form');
    const loginForm = document.querySelector('#login-form');
    const assessmentForm = document.querySelector('#assessment-form');

    // **Register Form Submission**
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                role: document.getElementById('role').value,
                name: document.getElementById('name').value,
                dob: document.getElementById('dob').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value
            };

            fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    window.location.href = "login.html";
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // **Login Form Submission**
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const loginData = {
                role: document.getElementById('login-role').value,
                email: document.getElementById('login-email').value,
                password: document.getElementById('login-password').value
            };

            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login Successful!");
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("userRole", data.role);
                    window.location.href = "assessment.html";
                } else {
                    alert("Invalid Credentials! Please try again.");
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // **Assessment Form Submission**
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let score = 0;
            const totalQuestions = 20;
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === "yes") {
                    score++;
                }
            }

            const userId = localStorage.getItem("userId");
            const percentage = (score / totalQuestions) * 100;

            let classification = "";
            if (percentage >= 80) classification = "Normal";
            else if (percentage >= 60) classification = "Mild";
            else if (percentage >= 40) classification = "Moderate";
            else if (percentage >= 20) classification = "Severe";
            else classification = "Profound";

            fetch('/save-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, score, percentage, classification })
            })
            .then(response => response.json())
            .then(data => {
                alert("Assessment Submitted Successfully!");
                localStorage.setItem("assessmentScore", score);
                localStorage.setItem("assessmentPercentage", percentage);
                localStorage.setItem("classification", classification);
                window.location.href = "result.html";
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // **Display Results in result.html**
    if (window.location.pathname.includes("result.html")) {
        document.getElementById("score").innerText = localStorage.getItem("assessmentScore") || "0";
        document.getElementById("percentage").innerText = localStorage.getItem("assessmentPercentage") || "0";
        document.getElementById("classification").innerText = localStorage.getItem("classification") || "Not Available";
    }
});