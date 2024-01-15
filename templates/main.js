// main.js

// Function to show login modal
function showLoginModal() {
    $('#loginModal').modal('show');
}

// Function to show register modal
function showRegisterModal() {
    $('#registerModal').modal('show');
}

// Handle login form submission
$('#loginForm').submit(function (event) {
    event.preventDefault();

    // Get form data
    var formData = {
        username: $('#loginUsername').val(),
        password: $('#loginPassword').val()
    };

    // You can use a traditional form submission
    // For example, redirect to a Flask route with the form data
    window.location.href = '/login?username=' + formData.username + '&password=' + formData.password;
});

// Handle registration form submission
$('#registerForm').submit(function (event) {
    event.preventDefault();

    // Get form data
    var formData = {
        username: $('#registerUsername').val(),
        password: $('#registerPassword').val()
    };

    // You can use a traditional form submission
    // For example, redirect to a Flask route with the form data
    window.location.href = '/register?username=' + formData.username + '&password=' + formData.password;
});
