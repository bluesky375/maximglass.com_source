(function( $ ) {
	"use strict";

	jQuery(document).ready(function($){
		
		var handle = $( "#custom-handle" );
		$( "#slider" ).slider({
		  create: function() {			 
			handle.text( $( this ).slider( "value" ) );
			handle.text( $('#myfixed_opacity').val() );
			handle.css('left', $('#myfixed_opacity').val() + '%')
		  },
		  slide: function( event, ui ) {
			$('#myfixed_opacity').val(ui.value);
			handle.text( ui.value );
		  }
		});
		jQuery(
		  '<div class="pt_number"><div class="pt_numberbutton pt_numberup">+</div><div class="pt_numberbutton pt_numberdown">-</div></div>'
		).insertAfter("input.mysticky-number1");

		jQuery(".mystickynumber1").each(function() {

			var spinner = jQuery(this),
			input = spinner.find('input[type="number"]'),
			btnUp = spinner.find(".pt_numberup"),
			btnDown = spinner.find(".pt_numberdown"),
			min = input.attr("min"),
			max = input.attr("max"),
			valOfAmout = input.val(),
			newVal = 0;

			btnUp.on("click", function() {

				var oldValue = parseFloat(input.val());

				if (oldValue >= max) {
				  var newVal = oldValue;
				} else {
				  var newVal = oldValue + 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
				console.log(newVal);
			});
			btnDown.on("click", function() {
				var oldValue = parseFloat(input.val());
				if (oldValue <= min) {
				var newVal = oldValue;
				} else {
				var newVal = oldValue - 1;
				}
				spinner.find("input").val(newVal);
				spinner.find("input").trigger("change");
			});
		});


		$(".confirm").on( 'click', function() {
			return window.confirm("Reset to default settings?");
		});

		var flag = 0;
		$( "#mystickymenu-select option" ).each(function( i ) {
			
			if ($('select#mystickymenu-select option:selected').val() !== '' ) {
				flag = 1;
			}
			if( $('select#mystickymenu-select option:selected').val() == $(this).val() ){
				$('#mysticky_class_selector').show();
			}else {
				$('#mysticky_class_selector').hide();
			}
		});
		if ( flag === 0 ) {
			$('#mysticky_class_selector').show();
			$("select#mystickymenu-select option[value=custom]").attr('selected', 'selected');
		}
		
		$("#mystickymenu-select").on( 'change', function() {
			if ($(this).val() == 'custom' ) {
				$('#mysticky_class_selector').show();
			}else {
				$('#mysticky_class_selector').hide();
			}

		});

	});

})(jQuery);