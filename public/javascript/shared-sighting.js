async function sharedSightingClickHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch('/api/posts/sharedsighting', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(`Can only share a sighting ONCE on any given sighting --- HTTP STATUS: ${response.status}/${response.statusText}`);
  }
}

document.querySelector('.shared-sighting-btn').addEventListener('click', sharedSightingClickHandler);