<?php
  require_once('./config.php');

  $token  = $_POST['stripeToken'];
  $email  = $_POST['stripeEmail'];

  $customer = \Stripe\Customer::create(array(
      'email' => $email,
      'source'  => $token
  ));

  // create card
  $customer = \Stripe\Customer::retrieve("cus_CTvSuUolCPh7xh");
  $customer->sources->create(array("source" => "tok_amex"));

  // retrieve a card
  $card = $customer->sources->retrieve("card_1C4zEoGzPSqeh7novvTwdphN");

  $brand = $card::retrieve("brand");
  $brand = $card::retrieve("last4");

  echo $brand;
  echo $last4;
?>