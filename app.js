const authButton = document.getElementById('auth-btn');
const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const assessmentResultDiv = document.getElementById('assessment-result');
const loginFormDiv = document.getElementById('login-form');
const nameInput = document.getElementById('name');
const roleSelect = document.getElementById('role');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const supportEmailInput = document.getElementById('support-email');
const supportMessageInput = document.getElementById('support-message');
const submitSupportButton = document.getElementById('submit-support');

// Toggle between Login and Signup
let isSignup = false;

function toggleForm() {
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? 'Signup' : 'Login';
    nameInput.style.display = isSignup ? 'block' : 'none';
    toggleLink.textContent = isSignup ? 'Already have an account? Login' : "Don't have an account? Signup";
}

// Authentication Logic
authButton.addEventListener('click', async () => {
    const role = roleSelect.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;

    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    const payload = isSignup ? { name, role, email, password } : { role, email, password };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        alert(result.message);
        if (!isSignup) {
            loginFormDiv.style.display = 'none';
            assessmentResultDiv.style.display = 'block';
            loadAssessmentGraph();
        }
    } catch (error) {
        alert(error.message);
    }
});

// Load Assessment Graph
function loadAssessmentGraph() {
    const userId = '123456'; // Replace with the actual user ID from login session

    fetch(`/assessment/result?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
            const ctx = document.getElementById('assessment-graph').getContext('2d');
            const graphData = {
                labels: data.domainScores.map((domain) => domain.name),
                datasets: [{
                    label: 'Score by Domain',
                    data: data.domainScores.map((domain) => domain.score),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }],
            };
            new Chart(ctx, {
                type: 'line',
                data: graphData,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Assessment Score by Domain',
                        },
                    },
                },
            });
        })
        .catch((error) => {
            console.error('Error fetching assessment data:', error);
        });
}

// Handle Contact Support Form Submission
submitSupportButton.addEventListener('click', () => {
    const supportEmail = supportEmailInput.value;
    const supportMessage = supportMessageInput.value;

    if (!supportEmail || !supportMessage) {
        alert('Please provide both email and message');
        return;
    }

    alert('Your message has been submitted successfully!');
    supportEmailInput.value = '';
    supportMessageInput.value = '';
});