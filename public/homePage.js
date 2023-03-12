const detailsBtn = document.querySelector('.show-details')
detailsBtn.addEventListener('click', showDetails);
let flag = false;

function showDetails() {
    if (!flag) {
        const userEmail = localStorage.getItem('userEmail');
        const emailEl = document.getElementById('email-home');
        const email = document.createElement('p');
        email.classList.add("user-email")
        email.innerHTML = userEmail;
        emailEl.appendChild(email);
        
        const username = localStorage.getItem('username');
        const usernameEl = document.getElementById('username-home');
        const usernameHolder = document.createElement('p');
        usernameHolder.classList.add("username");
        usernameHolder.innerHTML = username;
        usernameEl.appendChild(usernameHolder);
    }
    flag = true;
}

const logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click', logout);

function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    window.location.href = "/";
}