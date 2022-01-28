async function newFormHandler(event) {
  event.preventDefault();

  const sighting = document.querySelector('textarea[name="post-sighting"]').value;
  const description = document.querySelector('textarea[name="post-description"]').value;
  const datetime = document.querySelector('input[name="post-datetime"]').value;
  const location = document.querySelector('input[name="post-location"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      sighting,
      description,
      datetime,
      location
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);