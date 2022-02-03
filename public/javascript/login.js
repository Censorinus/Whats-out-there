
async function loginFormHandler(event) {
  event.preventDefault();
  
  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(`User/Password does not exist or is mispelled --- HTTP STATUS: ${response.status}/${response.statusText}`);
      document.location.replace('/login');
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
