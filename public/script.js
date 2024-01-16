function getAuthToken() {
  return localStorage.getItem('token');
}

window.loadContent = async (page) => {
  try {
    const response = await fetch(page);
    const content = await response.text();
    document.getElementById('contentContainer').innerHTML = content;

    updateNavigationLinks();
  } catch (error) {
    console.error('Error loading content:', error.message);
  }
};

async function updateNavigationLinks() {
  try {
    const response = await fetch('http://localhost:3001/check-auth', {
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
      },
    });
    const data = await response.json();

    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');

    if (data.authenticated) {
      loginLink.style.display = 'none';
      registerLink.style.display = 'none';
      profileLink.style.display = 'block';
    } else {
      loginLink.style.display = 'block';
      registerLink.style.display = 'block';
      profileLink.style.display = 'none';
    }
  } catch (error) {
    console.error('Error checking authentication status:', error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  updateNavigationLinks();

  const registerButton = document.getElementById('registerButton');
  const googleLoginButton = document.getElementById('googleLoginButton');
  const loginButton = document.getElementById('loginButton');
  const aboutLink = document.getElementById('aboutLink');
  const scheduleLink = document.getElementById('scheduleLink');
  const profileLink = document.getElementById('profileLink');

  registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        showNotification('Registration successful!');
        window.loadContent('./profile.html');
        updateNavigationLinks();
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.error || 'Unknown error');
        showNotification('Registration failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  });

  googleLoginButton.addEventListener('click', () => {
    window.location.href = 'http://localhost:3001/auth/google';
  });

  loginButton.addEventListener('click', async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log('Login successful');
        showNotification('Login successful!');
        window.loadContent('./profile.html');
        updateNavigationLinks();
      } else {
        const data = await response.json();
        console.error('Login failed:', data.error || 'Unknown error');
        showNotification('Login failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  });

  aboutLink.addEventListener('click', () => {
    window.loadContent('./about.html');
  });

  scheduleLink.addEventListener('click', () => {
    window.loadContent('./schedule.html');
  });

  profileLink.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3001/check-auth', {
        headers: {
          'Authorization': 'Bearer ' + getAuthToken(),
        },
      });
      const data = await response.json();

      if (data.authenticated) {
        window.loadContent('./profile.html');
      } else {
        window.loadContent('./register.html');
      }
    } catch (error) {
      console.error('Error checking authentication status:', error.message);
    }
  });

  function showNotification(message) {
    const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
    const notificationModalBody = document.getElementById('notificationModalBody');
    notificationModalBody.textContent = message;
    notificationModal.show();
  }
});
