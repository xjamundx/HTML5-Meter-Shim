// HTML5 METER SHIM
// By Jamund Feguson (@xjamundx)
// And Rob Middleton (@rob__ot)
// Mostly stolen from: https://gist.github.com/667320

// create shim
jQuery.fn.meterShim = function() {

	// don't waste time if you don't need to
	if (jQuery.fn.meterShim.supportsMeter) return $(this)
	
	return $(this).each(function() {
	
		var $meter = $(this)
		
		var min = parseFloat($meter.attr('min'), 10) || 0; // default as per HTML5 spec
		var max = parseFloat($meter.attr('max'), 10) || 1; // default as per HTML5 spec
		var high = parseFloat($meter.attr('high'), 10);
		var low = parseFloat($meter.attr('low'), 10);
		var optimum = parseFloat($meter.attr('optimum'), 10);
	    var value = $meter.attr('value') != null ? parseFloat($meter.attr('value'), 10) : $meter.text();
		var title = $meter.attr('title') != null ? $meter.attr('title') : value;
		var width = 0
		var height = 0
		var it = $("<div>").addClass("meter");
	
		// replace <meter> with a <div class="meter">
		$meter.replaceWith(it)
		$meter = it
		
		// here is the template for our indicator
	    var $indicator = $("<div>").addClass("indicator");
		var $div
		var $child
		
		// delete any text
		$meter.text("")
	
	    /*
	    The following inequalities must hold, as applicable:
		    * minimum ≤ value ≤ maximum
		    * minimum ≤ low ≤ maximum (if low is specified)
		    * minimum ≤ high ≤ maximum (if high is specified)
		    * minimum ≤ optimum ≤ maximum (if optimum is specified)
		    * low ≤ high (if both low and high are specified)
	    */
	
	    if (value < min) {
	        value = min;
	    }
	
	    if (value > max) {
	        value = max;
	    }
	
	    if (low != null && low < min) {
	        low = min;
	    }
	
	    if (high != null && high > max) {
	        high = max;
	    }
		
	    width = $meter.outerWidth();
		// console.log(width + ", " + value + ", " + max)
		width *= value / max;
		width = Math.ceil(width)
		

		// get or create our indicator element
		$child = $meter.children(".indicator:first-of-type")
	    $div = $child.length ? $child : $indicator.clone();	

	    $div.css("width", width);
	
	    if (high && value >= high) {
	        $meter.addClass("meterValueTooHigh");
	    }
	    else if (low && value <= low) {
	        $meter.addClass("meterValueTooLow");
	    } else {
	        $meter.removeClass("meterValueTooHigh");
	        $meter.removeClass("meterValueTooLow");
	    }
	
	    $meter.toggleClass('meterIsMaxed', value >= max);
	    $meter.attr("title", title);
	
		if (!$child.length) {
		    $meter.append($div);
		}
	})
}

// checks and adds support
jQuery.fn.meterShim.supportsMeter = "value" in document.createElement('meter');

/*
// for normal stuff
$(document).ready(function() {
    $("meter").fakeMeter()
})

// for ajaxy stuff
$.get("/my/fancy/meter", function(html) {
	var $awesomeerHtml = $(html).find("meter").fakeMeter()
	$(body).html($awesomeerHtml)
})

$.get("/my/fancy/meter", function(html) {
	$(body).html(html)
    $("meter").fakeMeter()
})
*/