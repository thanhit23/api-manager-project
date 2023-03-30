const password = document.getElementById('password');
const email = document.getElementById('email');
const btnSubmit = document.getElementById('btn-submit');

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const error = {
  email: true,
  password: true,
};

email.addEventListener('input', ({ target: { value }}) => {
  if (regex.test(value)) {
    email.nextElementSibling.innerHTML = '';
    error['email'] = false;
  } else {
    email.nextElementSibling.innerHTML = 'Vui lòng nhập đúng định dạng email';
    error['email'] = true;
  }
})

password.addEventListener('input', ({ target: { value }}) => {
  if (value.length) {
    password.nextElementSibling.innerHTML = '';
    error['password'] = false;
  } else {
    password.nextElementSibling.innerHTML = 'Vui lòng nhập đúng mật khẩu';
    error['password'] = true;
  }
})

btnSubmit.addEventListener('click', () => {
  if (regex.test(email.value)) {
    error['email'] = false;
  } else if (password.value.length) {
    error['password'] = false;
  }

  if (Object.keys(error).length === 0 || error['password'] || error['email']) {
    Toastify({
      text: "Vui lòng nhập đầy đủ thông tin",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#37b87c",
      },
      onClick: function(){}
    }).showToast();
  } else {
    const body = JSON.stringify({
      email: email.value,
      password: password.value,
    })

    fetch('/v1/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body,
    })
      .then(res =>res.json())
      .then(({ status, data }) => {
        if (status) {
          localStorage.setItem('token', data);
          location.href = '/'
        } else {
          Toastify({
            text: "Tài khoản hoặc mật khẩu không chính xác",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#37b87c",
            },
            onClick: function(){}
          }).showToast();
        }
      })
  }
})
