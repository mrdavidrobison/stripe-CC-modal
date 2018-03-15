// Create click event function.
function addCard() {
  
  var cardForm = document.getElementById("payment-form");
  
  if (cardForm.style.display === 'block') {
    cardForm.style.display = 'none';
  } else {
    cardForm.style.display = 'block';
  }

}
Stripe.setPublishableKey('pk_test_0moAazCvxJryQwvF0eCHfpIp');

$('#payment-form').submit(function(e) {

  $form = $(this);
  $form.find('button').prop('disabled', true);

  Stripe.card.createToken($form, function(status, response) {
    console.log(status);
    console.log(response);

    if (response.error) {
      $form.find('payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      var token = response.id;
      $form.append($('<input type="hidden" name="stripe-token"/>').val(token));
      $form.get(0).submit();
    }
  });
  return false;
});