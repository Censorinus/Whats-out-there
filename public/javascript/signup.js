async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
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
      if (response.status === 409) {
        alert(`User already exists --- HTTP STATUS: ${response.status}/${response.statusText}`);
      } else {
        alert(response.statusText);
      }
      document.location.replace('/login');
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
