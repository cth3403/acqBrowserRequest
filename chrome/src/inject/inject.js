var title, url, pub, isbn;

title = jQuery('title').text();
pub = jQuery('#detail_bullets_id ul li:contains("Publisher")').text();
isbn = jQuery('#detail_bullets_id ul li:contains("ISBN-13")').text();
url = window.location.href;
chrome.runtime.sendMessage({method:'setTitle', title: title, url: url, pub: pub, isbn: isbn});
