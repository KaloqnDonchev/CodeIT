const formEl = document.getElementById('form-login');
formEl.addEventListener('submit', loginUser);

function loginUser(e) {
    e.preventDefault();
    const emailOrUsername = document.getElementById('email-username').value;
    const password = document.getElementById('login-password').value;
    if (emailOrUsername && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailOrUsername, password})
        }).then(res => res.json())
        .then((data) => {
            if (typeof data === "string") {
                const errorMessage = document.createElement('p');
                errorMessage.innerHTML = "Password or Login is invalid";
                formEl.appendChild(errorMessage);
            }
            localStorage.setItem('userEmail', data[0]);
            localStorage.setItem('username', data[1]);
            window.location.href = "/home-page.html";
        });
    } else {
        alert('Fill out the fields')
    }
}
