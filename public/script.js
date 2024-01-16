function getAuthToken() {
  return localStorage.getItem('token');
}

// Declare the loadContent function in the global scope
window.loadContent = async (page) => {
  try {
    const response = await fetch(page);
    const content = await response.text();
    document.getElementById('contentContainer').innerHTML = content;
    // Check authentication status after loading content
    updateNavigationLinks();
  } catch (error) {
    console.error('Error loading content:', error.message);
  }
};

// Update navigation links visibility based on authentication status
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
  // Check authentication status on page load
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
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        // Optionally, redirect to the profile page after successful registration
        window.loadContent('./profile.html');
        // Update navigation links after registration
        updateNavigationLinks();
      } else {
        console.error('Registration failed:', data.error);
        // Handle registration failure, e.g., show an error message
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
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
        // Optionally, redirect to the profile page after successful login
        window.loadContent('./profile.html');
        // Update navigation links after login
        updateNavigationLinks();
      } else {
        console.error('Login failed:', data.error);
        // Handle login failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  });

  // Event listeners for navigation links
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
        // If the user is authenticated, load the profile
        window.loadContent('./profile.html');
      } else {
        // If the user is not authenticated, load the registration form
        window.loadContent('./register.html');
      }
    } catch (error) {
      console.error('Error checking authentication status:', error.message);
    }
  });
});
