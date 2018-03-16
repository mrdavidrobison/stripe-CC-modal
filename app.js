// Modal Animations
$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})

$('.close-btn').click(function(){
  $('#modal-container').addClass('out');
  $('body').removeClass('modal-active');
});


// Automatically move to next input field after limit is met
$('.credit-card').keyup(function() {
  if(this.value.length == $(this).attr('maxlength')) {
      $('.cvc').focus();
  }
});

$('.cvc').keyup(function() {
  if(this.value.length == $(this).attr('maxlength')) {
      $('.exp-month').focus();
  }
});

$('.exp-month').keyup(function() {
  if(this.value.length == $(this).attr('maxlength')) {
      $('.exp-year').focus();
  }
});

$('.exp-year').keyup(function() {
  if(this.value.length == $(this).attr('maxlength')) {
      $('.btn-success').focus();
  }
});


// Stripe
Stripe.setPublishableKey('pk_test_0moAazCvxJryQwvF0eCHfpIp');

$('#payment-form').submit(function(e) {

  $form = $(this);
  $form.find('button').prop('disabled', true);

  Stripe.card.createToken($form, function(status, response) {
    console.log(status);
    console.log(response);

    if (response.error) {
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripe-token"/>').val(token));
        $form.get(0).submit();
    }

  });

  return false;
});