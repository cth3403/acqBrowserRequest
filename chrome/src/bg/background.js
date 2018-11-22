var msg;

function checkCat(bibDetails) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    try {

      if(isbn === 'nvjigdoadgnsfhpsfhs[fhgsfhgsfhgfghsfgmaodnfaubfewfibrehba'){
        bibDetails.isbn = "not set";
      }
      var result = JSON.parse(this.responseText);
      console.log('xhr : '+isbn);
      console.log(result.exists);
      var txt = '';
      if(result.exists !== 'false') {
        if(result.exists === 'true' ){
          txt = 'This item already exists in the catalogue.';
        }
        if(result.exists === 'error'){
          txt = 'Unable to search for this item, please check the catalogue manually.';
        }
        msg = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">x</button>'+txt+'</div>';

        jQuery('#warning').html(msg);
      }

      // alpaca form code start
      jQuery("#mainPopup").empty();

      jQuery("#mainPopup").alpaca({
    "view": "bootstrap-edit",
    "schema": {
      "title": "Send Item to Acquistions",
      "description": "Item request for acquisitions",
      "type": "object",
      "properties": {
          "choice": {
          "title": "New / Additional or Missing Item?",
          "type": "string",
          "enum": ["Additional", "Missing"]
          },
          "title": {
          "type": "string",
          "title": "Title",
          "dependencies": ["choice"]
          },
          "author": {
          "type": "string",
          "title": "Author(s)",
          "dependencies": ["choice"]
          },
          "isbn": {
          "type": "string",
          "title": "ISBN",
          "dependencies": ["choice"]
          },
          "edition": {
          "type": "string",
          "title": "Edition",
          "dependencies": ["choice"]
          },
          "plc_publ": {
          "type": "string",
          "title": "Publisher",
          "dependencies": ["choice"]
          },
          "yr_publ": {
          "type": "string",
          "title": "Date of Publication",
          "dependencies": ["choice"]
          },
          "format": {
          "type": "string",
          "title": "Format",
          "enum":['Audio','Book','eBook','DVD','Multiple'],
          "dependencies": ["choice"]
          },
          "fund": {
          "type": "string",
          "title": "Department / Fund",
          "enum":["r7rp","rasab","rasal","rmagb","rmagl","rtatb","rtatl","rschb","rschl","rtcvb","rtcvl","raclb","racll","rmpsb","rmpsl","rhacb","rhacl","rscob","rscol","rcros","rmdeb","rmdel","rseab","rseal","rsecb","rsecl","rserb","rserl","reelb","reell","redeb","redel","raenb","raenl","rtgpb","rtgpl","rmhsb","rmhsl","rahib","rahil","rminb","rminl","rmitb","rmitl","rwirb","rwirl","rllwb","rllwl","rsbsb","rsbsl","londb","londl","ntmsb","ntmsl","rsmtb","rsmtl","rmmdb","rmmdl","ramub","ramul","pogrb","pogrl","raphb","raphl","rspyb","rspyl","rtptb","rtptl","rserb","rserl","rspsb","rspsl","rmpsb","rmpsl","xmsrb","xmsrl","rtsob","rtsol","rmtmb","rmtml","rvveb","rvvel"],
          "dependencies": ["choice"]
          },
          "locn": {
          "type": "string",
          "title": "Library Location",
          "enum":['Archaelogy','Electronic','HCL','Law','London','Music','SJL','VFS'],
          "dependencies": ["choice"]
          },
          "librarian": {
          "type": "string",
          "title": "Requesting Librarian",
          "enum":['Acquisition - libbook@liv.ac.uk','Collection Management - sadaly@liverpool.ac.uk; sugar@liverpool.ac.uk','Customer Services - sjinfsup@liv.ac.uk','Licensing Managers - licences@liverpool.ac.uk','SCA - scastaff@liverpool.ac.uk','Beryl Stanley - bstanley@liv.ac.uk','Carole Rhodes - crhodes@liv.ac.uk','Catherine Mcmanamon - C.Mcmanamon@liv.ac.uk','Clair Sharpe - csharpe@liv.ac.uk','Emma Thompson - ejt@liverpool.ac.uk','Lisa Hawksworth - Lisa.Hawksworth@liv.ac.uk','Louise Minta - lminta@liverpool.ac.uk','Nicola Gregory - ngregory@liverpool.ac.uk','Nicola Kerr - NKerr@liv.ac.uk','Ruth Russell - lonlib@liverpool.ac.uk','Sarah Roughley - sarah13@liv.ac.uk','Shirley Yearwood-Jackman - sjackman@liv.ac.uk','Zelda Chatten - z.chatten@liv.ac.uk','Zoe Gibbs-Monaghan - z.summers@liv.ac.uk','Joe Schulkins - jschulkins@gmail.com','Rachel Schulkins - rachelb@liv.ac.uk'],
          "dependencies": ["choice"]
          },
          "missing": {
          "type": "string",
          "title": "Service Request",
          "enum":['Acquisition - libbook@liv.ac.uk','Collection Management - sadaly@liverpool.ac.uk; sugar@liverpool.ac.uk','Customer Services - sjinfsup@liv.ac.uk','Joe Schulkins - jschulkins@gmail.com','Rachel Schulkins - rachelb@liv.ac.uk'],
          "dependencies": ["choice"]
          },
          "mbi": {
          "enum": ["No","Yes"],
          "dependencies": ["choice"]
          },
          "purpose":{
            "type":"string",
            "title": "This book is for:",
            "enum": ['Coursework','Extra copies','Reading List','Research','Wider collection development'],
            "dependencies": ["choice"]
          },
          "resv": {
          "type": "string",
          "title": "To be reserved?",
          "enum": ["No","Yes"],
          "dependencies": ["choice"]
          },
          "resv_pat":{
          "type": "string",
          "title": "Reserved for patron",
          "dependencies": ["choice","resv"],
          "required": true,
          },
          "urgent": {
          "enum": ["No","Yes"],
          "dependencies": ["choice"]
          },
          "comments": {
          "type": "string",
          "title": "Further details",
          "dependencies": ["choice"]
          },
          "url": {
          "type": "string",
          "dependencies": ["choice"]
          },
          "chrome-version": {
          "type": "string",
          "dependencies": ["choice"]
          }
        },
      "required": ['title','isbn','format','fund','locn','librarian']
    },
    "data":{
      "title": bibDetails.title+'',
      "author": bibDetails.author+'',
      "isbn": bibDetails.isbn+'',
      "edition": bibDetails.edition+'',
      "plc_publ": bibDetails.plc_publ+'',
      "yr_publ": bibDetails.yr_publ+'',
      "mbi": "No",
      "resv": "No",
      "urgent": "No",
      "url": url+'',
      "comments":txt+'',
      "chrome-version":"2.0.1",
    },
    "options":{
        "form":{
          "attributes":{
            "action":"http://libapps.liv.ac.uk/wufooAPI.php",
            "method":"post"
          },
          "buttons":{
            "submit":{
              "click": function() {
                        jQuery(".overlay").show();
                        this.ajaxSubmit().always(function() {
                            alert("Form submitted!");
                            window.close();
                        });
                    }
                  }
          }
        },
       "fields":{
       "choice":{
         "removeDefaultNone": true,
         "optionLabels": ['New / Additional','Missing']
       },
        "title":{
          "helper": "Insert the full title and subtitle of the item requested."
        },
        "author":{
          "helper": "Name of author or editor. First name goes first."
        },
        "isbn":{
          "helper": "Insert the 13 digit ISBN. Insert 000000000000 if the item does not have an ISBN."
        },
        "edition":{
          "helper": "Specify if you request second and subsequent editions."
        },
        "plc_publ":{
          "helper": "Specify the publisher."
        },
        "yr_publ":{
          "helper": "Specify the date that this particular edition was published."
        },
        "format":{
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "helper": "For multiple formats please provide further details below."
        },
        "fund":{
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "helper": "Use the name of the department if you request print material. If you wish to purchase an electronic format choose the department's name with '-E', i.e. for a work of fiction in print format select 'English', but for an ebook select 'English-E'. For any other formats, please give details of the fund to be used at the bottom of the form.",
          "optionLabels": ["Lost and Paid","ACE","ACE-E","Aging and Chronic Disease","Aging and Chronic Disease-E","Architecture","Architecture-E","Chemistry","Chemistry-E","Civic Design","Civic Design-E","Clas","Clas-E","Clinical Psychology","Clinical Psychology-E","Communication","Communication-E","Computer Sciences","Computer Sciences-E","Cross Faculty","Dentistry","Dentistry-E","EarthOcean Sciences","EarthOcean Sciences-E","Ecology","Ecology-E","Education","Education-E","Electrical engineering","Electrical engineering-E","Engineering","Engineering-E","English","English-E","Geography","Geography-E","Health Sciences","Health Sciences-E","History","History-E","Infection and Global Health","Infection and Global Health-E","Integrative Biology","Integrative Biology-E","Irish Studies","Irish Studies-E","Law","Law-E","Life Sciences","Life Sciences-E","London Campus","London Campus-E","Management","Management-E","Maths","Maths-E","Medicine","Medicine-E","Music","Music-E","PGR","PGR-E","Philosophy","Philosophy-E","Physics","Physics-E","Politics","Politics-E","Professional Services","Professional Services-E","Psychology","Psychology-E","Psychology, Health and Society","Psychology, Health and Society-E","SIFT","SIFT-E","Sociology","Sociology-E","Translational Medicine","Translational Medicine-E","Vet","Vet-E"]
        },
        "locn":{
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "helper": "For multiple locations please provide further details below."
        },
        "librarian":{
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "optionLabels": ['Acquisition','Collection Management','Customer Services','Licensing Managers','SCA','Beryl Stanley','Carole Rhodes','Catherine Mcmanamon','Clair Sharpe','Emma Thompson','Lisa Hawksworth','Louise Minta','Nicola Gregory','Nicola Kerr','Ruth Russell','Sarah Roughley','Shirley Yearwood-Jackman','Zelda Chatten','Zoe Gibbs-Monaghan','Joe Schulkins','Rachel Schulkins'],
          "dependencies":{
            "choice": "Additional"
          },
        },
        "missing":{
          "type": "select",
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "optionLabels": ['Acquisition','Collection Management','Customer Services', 'Joe Schulkins - test', 'Rachel Schulkins'],
          "dependencies":{
            "choice": "Missing"
          },
        },
        "mbi":{
          "label": "More Books Initiative",
          "removeDefaultNone": true
        },
        "purpose":{
          "noneLabel": "-- Select --",
          "removeDefaultNone": false,
          "optionLabels": ['Coursework','Extra copies','Reading List','Research','Wider collection development'],
          "dependencies":{
            "choice": "Additional"
          },
        },
        "resv":{
          "removeDefaultNone": true
        },
        "resv_pat":{
          "dependencies":{
            "resv": "Yes"
          },
          "helper": "Specify the reserving patron."
        },
        "urgent":{
          "label": "Is this item urgent?",
          "removeDefaultNone": true
        },
        "comments":{
          "helper": "Please specify type of loan and distribution of multiple copies or any other relevant information, i.e. 5 normal loan copies for the HCL + 1 sjsl."
        },
        "url":{
          "type": "hidden"
        },
        "chrome-version":{
          "type": "hidden"
        }
      }
    },
    "postRender": function(renderedField) {
        var form = renderedField.form;
        if (form) {
            form.registerSubmitHandler(function(e, form) {
                // validate the entire form (top control + all children)
                form.validate(true);
                // draw the validation state (top control + all children)
                form.refreshValidationState(true);
                // now display something
                if (form.isFormValid()) {
                    var value = form.getValue();
                    return true;
                } else {
                    $('#warning').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> There are problems with the form.  Please correct items in red.</div>');
                      $('html,body').scrollTop(0);
                }
                e.stopPropagation();
                return false;
            });
        }
    }
  });

      // alpaca form code end


    } catch(e) {
      // Invalid JSON response
    }
  }
  xhr.onerror = function(e) {
    // Something bad happened
  }
  xhr.open(
    "GET",
    "http://libapps.liv.ac.uk/jQuery/library/location/itemInfo.php?isbn=" + isbn,
    true
  );
  xhr.send();
}


function dataProcess(message){
    console.log(message);
    str = message.title;
    url = message.url;
    pub = message.pub;
    isbn = message.isbn;


 

    if(pub.match(/\((.+)\)/) != null || undefined){
      var date = pub.match(/\((.+)\)/);
      yr_publ = date[1].trim();
    }
    else{
      yr_publ = " ";
    }

    if(pub.match(/;(.+)\(/) != null || undefined){ 
      var edt = pub.match(/;(.+)\(/);
      edition = edt[1].trim();
    }else{
      edition = " ";
    }

    if(pub.match(/:(.+?)(;|\()/) != null || undefined){
      var publisher = pub.match(/:(.+?)(;|\()/);
      plc_publ = publisher[1].trim();
    }else{
      plc_publ = " ";
    }

    publ = pub.split(/[:;()]+/);

    jQuery.each(publ, function(index, val){
      publ[index] = val.trim();
    });

    isbn = isbn.split(" ");
    console.log("split : "+isbn);
    isbn = isbn.pop();
    isbn = isbn.trim();
    isbn = isbn.replace("-","");
  
    console.log('before parse : '+isbn);

    var valid = ISBN.parse(isbn);
    if(valid != null){
      if(valid.isIsbn10() == true || valid.isIsbn13() == true){
          isbn = valid.asIsbn13();
        }
      }
    else{
      isbn = "nvjigdoadgnsfhpsfhs[fhgsfhgsfhgfghsfgmaodnfaubfewfibrehba";
    }


    console.log('after parse : '+isbn);


    console.log(pub);
    split = str.split(":");

    jQuery.each(split, function(index,val){
      split[index] = val.trim();
      console.log(split[index]);
      console.log(split[index].length);
    });


    inc = jQuery.inArray('Amazon.co.uk', split);

    if(inc > -1){
      inc++;
      author = split[inc];
    }else{ author = " "; }

    title = split[0];

    return  {
          author: author,
          title: title,
          isbn: isbn,
          yr_publ: yr_publ,
          edition: edition,
          plc_publ: plc_publ
    }
  }



chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

var bibDetails = dataProcess(message);
checkCat(bibDetails);


});


chrome.tabs.executeScript(null, {file:"/src/inject/jquery.min.js"});
chrome.tabs.executeScript(null, {file:"/src/inject/inject.js"});

