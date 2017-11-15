<?php
header('Content-Type: application/json');

$isbn = isset($_GET['isbn'])?$_GET['isbn']:'error';

if($isbn == 'error' || $isbn == "nvjigdoadgnsfhpsfhs[fhgsfhgsfhgfghsfgmaodnfaubfewfibrehba"){

	//echo 'existsData({"exists":"error"});';
	echo '{"exists":"error"}';

}
else{

	$url = 'http://m.library.liv.ac.uk/search/?searchtype=Y&searcharg='.$isbn;

	# Initialise a cURL object
	$ch = curl_init(); 

	# Set url and other options
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

	# Get the page contents
	$output = curl_exec($ch); 

	# close curl resource to free up system resources 
	curl_close($ch);

	# Create a DOM parser object
	$dom = new DOMDocument();

	# The @ before the method call suppresses any warnings that
	# loadHTML might throw because of invalid HTML in the page.
	@$dom->loadHTML($output);

	# getElementsByClassName doesn't exist in DOMDocument so use xpath
	$xpath = new DOMXpath($dom);
	$error_area = $xpath->query('//p[@class="errorArea"]');


	if($error_area->length > 0) {
  		$exist = "false";
	} 
	else {
  		$exist = "true";

	}

	# return the exist variable wrapped in callback
	echo '{"exists":"'.$exist.'"}';
}

?>