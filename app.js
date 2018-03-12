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
    displayError.textContent = 'working';
  }
});

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
var input = document.getElementById("card-element");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit-btn").click();
  }
});