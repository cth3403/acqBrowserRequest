<?php

if(!isset($_POST['chrome-version'])){
 require('new_orders_ext/wufooAPI-pre0.1.1.php');
}
elseif(isset($_POST['chrome-version']) && $_POST['chrome-version'] == "0.1.1"){
	require('new_orders_ext/wufooAPI-0.1.1.php');
}
elseif(isset($_POST['chrome-version']) && $_POST['chrome-version'] == "test"){
	require('new_orders_ext/wufooAPI-test.php');
}
else{
	echo 'Error';
}
