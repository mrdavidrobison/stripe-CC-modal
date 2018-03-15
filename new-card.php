<?php
  require_once('vendor/autoload.php');

  $stripe = array(
    "secret_key"      => "sk_test_WEbEeRdvussZesfHk2ngsBX6",
    "publishable_key" => "pk_test_0moAazCvxJryQwvF0eCHfpIp"
  );

  \Stripe\Stripe::setApiKey($stripe['secret_key']);

  $customer = \Stripe\Customer::create(array(
    'default_source' => $_POST['stripeToken']
  ));

  $customer = \Stripe\Customer::update($_POST['stripeToken'], [
    'default_source' => $_POST['stripeToken']
  ]);

  echo '<h1>New Card Added!</h1>';
?>