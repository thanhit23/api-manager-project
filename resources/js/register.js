const btnSubmit = document.getElementById('btn-submit');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');

const error = {
  username: true,
  email: true,
  password: true,
};

email.addEventListener('input', ({ target: { value }}) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(value)) {
    email.nextElementSibling.innerHTML = '';
    error['email'] = false;
  } else {
    email.nextElementSibling.innerHTML = 'Vui lòng nhập đúng định dạng email';
    error['email'] = true;
  }
})

username.addEventListener('input', ({ target: { value }}) => {
  if (value.length) {
    username.nextElementSibling.innerHTML = '';
    error['username'] = false;
  } else {
    username.nextElementSibling.innerHTML = 'Vui lòng nhập tên';
    error['username'] = true;
  }
})


password.addEventListener('input', ({ target: { value }}) => {
  if (value.length) {
    password.nextElementSibling.innerHTML = '';
    error['password'] = false;
  } else {
    password.nextElementSibling.innerHTML = 'Vui lòng nhập mật khẩu';
    error['password'] = true;
  }
})

rePassword.addEventListener('input', ({ target: { value }}) => {
  if (value === password.value) {
    rePassword.nextElementSibling.innerHTML = '';
    error['password'] = false;
  } else {
    rePassword.nextElementSibling.innerHTML = 'Vui lòng nhập đúng password';
    error['password'] = true;
  }
})

btnSubmit.addEventListener('click', () => {
  if (error['password'] || error['email'] || error['username']) {
    Toastify({
      text: "Vui lòng nhập đầy đủ thông tin",
      duration: 3000,
    }).showToast();
  } else {
    const body = JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    fetch('/v1/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body,
    })
      .then((res) => res.json())
      .then(({ status, data, message }) => {
        if (status) {
          localStorage.setItem('token', data);
          location.href = '/login'
        } else {
          Toastify({
            text: message,
            duration: 3000,
          }).showToast();
        }
      })
  }
})
