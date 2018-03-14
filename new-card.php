<?php
  require_once('./config.php');

  $token  = $_POST['stripeToken'];

  $customer = \Stripe\Customer::create(array(
      'source'  => $token,
      'customer' => $customer_id,
  ));

  echo '<h1>New Card Added!</h1>';
  echo $customer['{$customer_id}'];
?>