<?php
/** Wufoo API Curl data transmit **/

$form_api_key = [Wufoo Key];
$form_locn = [Link to Wufoo API version of form];


function getPostParams() {

	// examples of fields set by post of extension 
	$choice = isset($_POST['choice'])?$_POST['choice']:'choice';
	$title = isset($_POST['title'])?$_POST['title']:'title';
	$author = isset($_POST['author'])?$_POST['author']:'author';
	$isbn = isset($_POST['isbn'])?$_POST['isbn']:'isbn';
	$edition = isset($_POST['edition'])?$_POST['edition']:'edition';
	$plc_publ = isset($_POST['plc_publ'])?$_POST['plc_publ']:'plc_publ';
	$yr_publ = isset($_POST['yr_publ'])?$_POST['yr_publ']:'yr_publ';
	$format = isset($_POST['format'])?$_POST['format']:'format';
	$fund = isset($_POST['fund'])?$_POST['fund']:'fund';
	$locn = isset($_POST['locn'])?$_POST['locn']:'locn';
	$librarian = isset($_POST['librarian'])?$_POST['librarian']:'librarian';
	$resv = isset($_POST['resv'])?$_POST['resv']:'';
	$resv_pat = isset($_POST['resv_pat'])?$_POST['resv_pat']:'resv_pat';
	$comments = isset($_POST['comments'])?$_POST['comments']:'comments';
	$url = isset($_POST['url'])?$_POST['url']:'url';
	$mbi = isset($_POST['mbi'])?$_POST['mbi']:'no';
	$missing = isset($_POST['choice'])?$_POST['choice']:'no';
	$service = isset($_POST['missing'])?$_POST['missing']:'no';
	$chrome = isset($_POST['chrome-version'])?$_POST['chrome-version']:'0.0.0';

	if($_POST['urgent'] == 'Yes'){
		$urgent = "URGENT";
	}
	else{
		$urgent = "";
	}

	//supplier links
	$supplier = "Links to suppliers: \n";
	$supplier .= "Dawsons: http://www.dawsonenter.com/isbnEnquiry.aspx?isbn=".$isbn."\n";
	$supplier .= "Coutts: http://www.couttsoasis.com/OpenURL?isbn=".$isbn."\n";
	$supplier .= "Blackwell's: http://bookshop.blackwell.co.uk/jsp/welcome.jsp?wcp=1&isbn=".$isbn."\n";
	$supplier .= "Askews: http://www.askewsandholts.com/site/acad_catalogue_product.asp?isbn=".$isbn."\n";
	
	// map fields sent by form to API fields
	$fields = [ 'choice' => $choice, 'Field1' => $title,'Field2' => $author,  'Field3' => $isbn,'Field10' => $edition,'Field5' => $plc_publ,'Field9' => $yr_publ,'Field7' => $format,'Field11' => $fund,'Field12' => $locn,  'Field13' => $librarian,'Field15' => $resv,'Field218' => $resv_pat,'Field216' => $comments,
            'Field220' => $url,'Field222' => $mbi,'Field224' => $missing,'Field226' => $service,'Field237' => $urgent, 'Field239' => $supplier];

	return [$chrome, $fields];
		
}

function confEmail($data){
	switch ($data[1]['choice']) {
		case 'Additional':
			$html = html_entity_decode($data[1]['Field13']);
			break;

		case 'Missing':
			$html = html_entity_decode($data[1]['Field226']);
			$html = str_replace('sadaly@liverpool.ac.uk;', '', $html);
			break;
		
	}

	$re = "/([A-Za-z0-9\.]+[%|@].+)/"; 
	preg_match($re, $html, $matches);

	// send confirmation email to requestor
	$to = (string)$matches[0];
	$subject = 'Confirmation of Order Request';
	$headers = "From: libbook@liverpool.ac.uk\r\n";
	$headers .= "Reply-To: libbook@liverpool.ac.uk\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	
	$message = 'This is a confirmation email that the following item has been requested:'."\r\n";

	$emArr = ['Title' => $data[1]['Field1'],
			'Author(s)' => $data[1]['Field2'], 
			'ISBN' => $data[1]['Field3'],
			'Edition' => $data[1]['Field10'],
            'Year Published' => $data[1]['Field9'],
            'Format' => $data[1]['Field7'],
            'Fund' => $data[1]['Field11'],
            'Location' => $data[1]['Field12'],
            'Comments' => $data[1]['Field216'],
            'Reserved?' => $data[1]['Field15'],
            'Reserved For' => $data[1]['Field218'],
			'Urgent' => $data[1]['Field237'] ];

	$message .= '<table style:"font-family:Arial,Helvetica">';

	$n = 0;

	foreach($emArr as $key => $value){
		$n++;
		if($n%2 == 1){	
					$message .=	'<tr bgcolor="d3d3d3">
                	<td><strong>'.$key.'</strong></td>
                	<td></td>
                	<td>'.$value.'</td>
            		</tr>';
            	}
        else{
				$message .=	'<tr>
                <td><strong>'.$key.'</strong></td>
                <td></td>
                <td>'.$value.'</td>
            	</tr>';
        }
        }	

	$message .= '</table>';

	return array('to'=>$to, 'subject'=>$subject, 'headers'=>$headers, 'message'=>$message);
}


// use curl to send details to Wufoo

$data = getPostParams();

$ref = curl_init($form_locn);
curl_setopt($ref, CURLOPT_HTTPHEADER, array('Content-type: multipart/form-data'));
curl_setopt($ref, CURLOPT_POST, true);
curl_setopt($ref, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ref, CURLOPT_POSTFIELDS, $data[1]);
curl_setopt($ref, CURLOPT_USERPWD, $form_api_key);
curl_setopt($ref, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
curl_setopt($ref, CURLOPT_SSL_VERIFYPEER, false);
//http://bugs.php.net/bug.php?id=47030
curl_setopt($ref, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ref, CURLOPT_SSLVERSION, 'CURL_SSLVERSION_TLSv1');
curl_setopt($ref, CURLOPT_SSL_CIPHER_LIST, 'SSLv3');
curl_setopt($ref, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ref, CURLOPT_USERAGENT, 'Chrome Extension Test');
$response = curl_exec($ref);
$xml=simplexml_load_string($response) or die('Error: Cannot create object');
$success = (string)$xml->PostResponse->Success;

echo $success;

$resultStatus = curl_getinfo($ref);


?>
<!doctype html>
<html>
  <head>

<script type="text/javascript" src="//code.jquery.com/jquery-1.11.2.min.js"></script>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet" media="screen">

<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>


<style type="text/css">
  #mainPopup {
    padding: 5px;
    height: 200px;
    width: 400px;
    font-family: Helvetica, Ubuntu, Arial, sans-serif;
  }
  .alpaca-message {
    display: none;
  }
</style>

</head>
<body>
<div id="mainPopup">

<?php if($resultStatus['http_code'] == 201) {
	$submit = '<div id="submitted">Item submitted. This window will now close.</div>';
	$submit .= '<script>window.setTimeout(window.close, 5000);</script>';
	if($mail = confEmail($data)){
		mail($mail['to'],$mail['subject'],$mail['message'],$mail['headers']);
	}
	else{
		echo 'Confirmation email error';
	}	
	echo $submit;
}
else{
	$to = 'joesch@liv.ac.uk';
	$subject = 'Wufoo Acquisitions Chrome Submit';
	$headers = "From: joesch@liv.ac.uk";
	$message = 'Curl error: '.curl_error($ref);
	$message .= '<br /><br />';
	$message .= '$_POST array: '.print_r($_POST);
	mail($to,$subject,$message,$headers);
	echo 'There has been an error sending your item. These details have been logged and will be investigated.';
}
?>
</div>

</body>
</html>
