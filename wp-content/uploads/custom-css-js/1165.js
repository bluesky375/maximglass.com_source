<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
jQuery('span.gotopss.bg-colorss').click(function() {      // When arrow is clicked
    jQuery('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

jQuery("span.comments.bg-colorss").click(function(){
  jQuery(".sharesss").toggleClass("sharesss-show");
});

jQuery(".sharesss-head i.fa.fa-times").click(function(){
  jQuery(".sharesss").removeClass("sharesss-show");
});


jQuery("span.qrcodess.bg-colorss").click(function(){
  jQuery(".qr-modal").toggleClass("qr-modal-show");
});

jQuery("span.qrcodess.bg-colorss").click(function(){
  jQuery("body").toggleClass("body-overflow-hiddn");
});

jQuery(".qr-modal").click(function(){
jQuery(".qr-modal").removeClass("qr-modal-show");
jQuery("body").removeClass("body-overflow-hiddn");
});</script>
<!-- end Simple Custom CSS and JS -->
