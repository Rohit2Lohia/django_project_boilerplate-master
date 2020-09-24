console.log("Done!");
window.onload = initAll;

var useDefault = document.getElementById('use_default_shipping');
useDefault.addEventListener("click",initAll);

function initAll(){
   if( useDefault.checked ){
      useDefault.onclick = autoFill;
   }
   else{
      useDefault.onclick = unFill;
   }
}

function unFill() {
   var ad1 = document.getElementById("id_street_address");
   var ad2 = document.getElementById("id_apartment_address");
   var country = document.getElementById("id_country");
   var zip = document.getElementById("id_zip");
   var setDef = $('.id_set_default');
   ad1.disabled = false;
   ad1.value = '';
   ad2.disabled = false;
   ad2.value = '';
   country.disabled = false;
   country.value = '';
   zip.disabled = false;
   zip.value = '';
   setDef.show();
   console.log("Unfill Done");
}

function autoFill() {

  var req = new XMLHttpRequest();
  var url = '/default-shipping';
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var data = eval( req.responseText );
     console.log("Data received!");
     console.log(data);
     var ad1 = document.getElementById("id_street_address");
     var ad2 = document.getElementById("id_apartment_address");
     var country = document.getElementById("id_country");
     var zip = document.getElementById("id_zip");
     var setDef = $('.id_set_default');
     ad1.value = data[0].street_address;
     ad2.value = data[0].apartment_address;
     zip.value = data[0].zip;
     country.value = data[0].country;
     ad1.disabled = true;
     ad2.disabled = true;
     country.disabled = true;
     zip.disabled = true;
     setDef.hide();
     console.log("Finished filling");
    }
  };
  req.open("GET", url, true);
  req.send();
}


function applyCoupon() {
   console.log("In apply");
   var codeBox = document.getElementById("couponID");
   var code = codeBox.value;
   console.log(code);
  var req = new XMLHttpRequest();
  var url = '/add-coupon-new?code='+code;
  var message_coupon = document.getElementById("message_coupon");
  var div_coupon = document.getElementById("div_coupon");
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if( req.responseText == 'false'){
         var data = eval( req.responseText );  //EVAL was used for JSON data to convert it to objects
         console.log(data);
         div_coupon.className = 'alert alert-warning';
         message_coupon.innerHTML = 'Invalid Coupon!!!';
      }
      else{
         var data = eval( req.responseText );  //EVAL was used for JSON data to convert it to objects
         console.log(data);
         var coupon_code = document.getElementById("coupon_code");
         var coupon_amount = document.getElementById("coupon_amount");
         var total_saved = document.getElementById("total_saved");
         var total_amount = document.getElementById("total_amount");
         coupon_code.innerHTML = data[0][0].fields.code;
         coupon_amount.innerHTML = '-$'+data[0][0].fields.amount;
         total_saved.innerHTML = 'Saving $'+data[1].total_saved;
         total_amount.innerHTML = '$'+data[1].total;
         div_coupon.className = 'alert alert-success';
         message_coupon.innerHTML = 'Coupon applied succesfully!';
      }
     console.log("Finished filling");
     codeBox.value='';
    }
  };
  req.open("GET", url, true);
  req.send();
}
