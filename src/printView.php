<?php
if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if (isset($_POST["html"]))
  {
    // Standard form submission
    $result = $_POST["html"];
  }

  echo $result;
}
?>