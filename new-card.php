<?php

  require_once('vendor/autoload.php');

  $stripe = array(
    "secret_key"      => "sk_test_WEbEeRdvussZesfHk2ngsBX6",
    "publishable_key" => "pk_test_0moAazCvxJryQwvF0eCHfpIp"
  );

  \Stripe\Stripe::setApiKey($stripe['secret_key']);

  $customer = \Stripe\Customer::create(array(
    "source" => $_POST['stripe-token']
  ));

  echo '<h1>New Card Added!</h1>';

  var_dump('Your token is ' . $_POST['stripe-token'] . ' tah dah!');

  $client = \Stripe\Customer::retrieve($customer['id']);

  echo '<h2>Card Brand: ' . $client->sources->data[0]->brand . '</h2><br />';
  echo '<h2>Last 4: ' . $client->sources->data[0]->last4 . '</h2>';  
?>