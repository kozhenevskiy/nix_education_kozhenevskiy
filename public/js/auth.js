window.addEventListener('DOMContentLoaded', (event) => {
const regBtn = document.querySelector('.registered');
const loginBtn = document.querySelector('.login');
const nameInp = document.querySelector('#name');
const passInp = document.querySelector('#pass');
const emailInp = document.querySelector('#email');
const correctTip = document.querySelector('.message');

regBtn.addEventListener('click', (event) => {
    const url = 'http://localhost:8000/auth/registration';
    if(!regBtn.classList.contains('active')) {
        regBtn.classList.add('active');
        loginBtn.classList.remove('active');
        emailInp.classList.add('active');
    } else {
        if(nameInp.value.length <= 0 || passInp.value.length <= 0 || emailInp.value.length <= 0) {
            const content = '<p>* Enter correct data</p>';
            message(content);
        } else {
            const name = nameInp.value;
            const pass = passInp.value;
            const usermail = emailInp.value;
            registration(url, name, pass, usermail);
        }
    }
})

function registration(url, name, pass, usermail) {
    const userData = {
        username: name,
        password: pass,
        email: usermail
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        loginBtn.classList.add('active');
        regBtn.classList.remove('active');
        emailInp.classList.remove('active');
        response.json().then(data => {
            message(data.message);
        })
    })
}

loginBtn.addEventListener('click', (event) => {
    const url = 'http://localhost:8000/auth/login';
    if(!loginBtn.classList.contains('active')) {
        loginBtn.classList.add('active');
        regBtn.classList.remove('active');
        emailInp.classList.remove('active');
    } else {
        if(nameInp.value.length <= 0 || passInp.value.length <= 0) {
            const content = '<p>* Enter correct data</p>';
            message(content);
        } else {
            const name = nameInp.value;
            const pass = passInp.value;
            login(url, name, pass);
        }
    }
})

function login(url, name, pass) {
    const userData = {
        username: name,
        password: pass
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        response.json().then(data => {
            if(response.status !== 200) {
                message(data)
            } else {
            document.cookie = `macOutletTOKEN=${data.token}; max-age=3600`;
            document.location.replace('http://localhost:8000/main');
            }
        })
    })
    
}

function message(content) {
    correctTip.innerHTML = content;
    correctTip.classList.add('active');
    setTimeout(removeTip, 30000);
}

function removeTip() {
    correctTip.classList.remove('active');
}

})
