       document.addEventListener('DOMContentLoaded', function() {
  const messageContainer = document.getElementById('message-container');
  const message = document.getElementById('message');
  const yesButton = document.getElementById('yes-button');
  const noButton = document.getElementById('no-button');
  const permission = document.getElementById('permission');
  const body = document.querySelector('body.login');
  let step = 1;

  yesButton.addEventListener('click', function() {
    if (step === 1) {
      message.textContent = 'Are you sure?';
      permission.style.display = 'none'; // Hide the permission div
      step = 2;
    } else if (step === 2) {
      message.textContent = 'Very sure?';
      step = 3;
    } else if (step === 3) {
      message.textContent = 'Please enter the secret pass-code:';
     // 1. Create a container for the form elements
            const passwordForm = document.createElement('form');
            passwordForm.className = 'mt-3 d-flex flex-column align-items-center'; // Bootstrap classes for margin and centering
            passwordForm.method = 'POST';
            passwordForm.action = '/login'; // Set the form action to your login route
            
            // 2. Create the password input field (Bootstrap styling)
            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.name = 'secretPassword';
            passwordInput.id = 'secretPassword'; // Give it an ID to grab its value later
            passwordInput.className = 'form-control w-100 mb-2'; // Bootstrap class for form input
            passwordInput.placeholder = 'Enter Pass-code';

            // 3. Create the submit button (Bootstrap styling)
            submitButton.textContent = 'Submit';
            submitButton.type = 'submit'; // Set the button type to submit
            submitButton.className = 'btn btn-primary'; // Bootstrap success button style

            // 4. Append the input and button to the form
            passwordForm.appendChild(passwordInput);
            passwordForm.appendChild(submitButton);
            messageContainer.appendChild(passwordForm);
      yesButton.style.display = 'none';
      noButton.style.display = 'none';
      body.style.backgroundImage = 'url("/images/Jungkook.jpg")'; // Set background image from images folder
    }
  });

  noButton.addEventListener('click', function() {
    message.textContent = 'Okay, you can come back later.';
  });
});