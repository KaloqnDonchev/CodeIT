const formEl = document.querySelector('.form');
formEl.addEventListener('submit', registerUser);

function registerUser(event) {
    event.preventDefault();
    const email = document.querySelector('.email').value;
    const username = document.querySelector('.username').value;
    const realname = document.querySelector('.real-name').value;
    const password = document.querySelector('.password').value;
    const birthdate = document.querySelector('.birth-date').value;
    const checkbox = document.querySelector('.checkbox');
    if (email && username && realname && password && birthdate && checkbox.checked) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, username, realname, password, birthdate})
        }).then((res) => res.json())
        .then((data) => {
            if (typeof data === "string") {
                const errorMessage = document.createElement('p');
                errorMessage.innerHTML = data;
                formEl.appendChild(errorMessage);
                return;
            } else {
                localStorage.setItem('userEmail', data[0]);
                localStorage.setItem('username', data[1]);
                window.location.href = "/home-page.html";
            }
        });
    } else {
        alert('Not all fields are filled');
    }

};

const selectEl = document.querySelector('.countries');

fetch('/countries', {
    method:"GET",
    headers: {
        Accept: "application/json"
    }
})
.then((result) => result.json())
.then((countries) => {
    for (let country of countries) {
        const optionEl = document.createElement('option');
        optionEl.text = country;
        selectEl.add(optionEl);
    };
});
