// Create click event function.
function addCard() {
  var cardForm = document.getElementById("card-form");
  if (cardForm.style.display === 'block') {
    cardForm.style.display = 'none';
  } else {
    cardForm.style.display = 'block';
  }
}

// Create a Stripe client.
var stripe = Stripe('pk_test_0moAazCvxJryQwvF0eCHfpIp');

// Create an instance of Elements.
var elements = stripe.elements();

// Create an instance of the card Element.
var card = elements.create('card');

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = 1;
  }
});

// Send stripe token to server
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('card-form');
// Add Stripe Token to hidden input
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
// Submit form
  form.submit();
}

// Handle form submission.
var form = document.getElementById('card-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});

// "Enter" key clicks "Add New Card" button
var input = document.getElementById("card-form");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementsByClassName("btn-success").click();
  }
});