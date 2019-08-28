jQuery(document).ready(function($){
    jQuery('.my-color-field').wpColorPicker();
    jQuery(".sticky-header-menu ul li a").click(function(e){
        e.preventDefault();
        if(!jQuery(this).hasClass("active")) {
           jQuery(".sticky-header-menu ul li a").removeClass("active");
           jQuery(this).addClass("active");
           thisHref = jQuery(this).attr("href");
           jQuery(".sticky-header-content").hide();
           jQuery(thisHref).show();
        }
    });
    jQuery(".sticky-header-upgrade-now").click(function(e){
        e.preventDefault();
        jQuery(".sticky-header-menu ul li a:last").trigger("click");
    });
});