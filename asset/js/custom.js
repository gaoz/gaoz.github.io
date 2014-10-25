// JavaScript Document


	
/* Div clickable with link that links to a <a> tag inside it-------------------------------------
+-Div----------+
|                |
| mouse click    |
|                | 
|  redirect to   |
|  view detail   | 
|                | 
+----------------+ 
----------------------------------------------- */

$(".programs-card").click(function(){
     window.location=$(this).find(".view-detail").attr("href"); 
     return false;
});
$(".mobile-program-card").click(function(){
     window.location=$(this).find(".view-detail").attr("href"); 
     return false;
});
$(".card-item").click(function(){
     window.location=$(this).find(".view-detail").attr("href"); 
     return false;
});

/*

jQuery Viewport Checker – A nifty little script that checks if an element is in the viewport and then adds a class to it.
http://www.web2feel.com/tutorial-for-animated-scroll-loading-effects-with-animate-css-and-jquery/


*/

(function($){
    $.fn.viewportChecker = function(useroptions){
        // Define options and extend with user
        var options = {
            classToAdd: 'visible',
            offset: 100,
            repeat: false,
            callbackFunction: function(elem, action){}
        };
        $.extend(options, useroptions);

        // Cache the given element and height of the browser
        var $elem = this,
            windowHeight = $(window).height(),
            scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');

        this.checkElements = function(){
        
            // Set some vars to check with
            var viewportTop = $(scrollElem).scrollTop(),
                viewportBottom = (viewportTop + windowHeight);

            $elem.each(function(){
                var $obj = $(this);
                // If class already exists; quit
                if ($obj.hasClass(options.classToAdd) && !options.repeat){
                    return;
                }

                // define the top position of the element and include the offset which makes is appear earlier or later
                var elemTop = Math.round( $obj.offset().top ) + options.offset,
                    elemBottom = elemTop + ($obj.height());

                // Add class if in viewport
                if ((elemTop < viewportBottom) && (elemBottom > viewportTop)){
                    $obj.addClass(options.classToAdd);

                    // Do the callback function. Callback wil send the jQuery object as parameter
                    options.callbackFunction($obj, "add");
                    
                // Remove class if not in viewport and repeat is true
                } else if ($obj.hasClass(options.classToAdd) && (options.repeat)){
                    $obj.removeClass(options.classToAdd);

                    // Do the callback function.
                    options.callbackFunction($obj, "remove");
                }
            });
        
        };

        // Run checkelements on load and scroll
        $(window).bind("load scroll touchmove", this.checkElements);

        // On resize change the height var
        $(window).resize(function(e){
            windowHeight = e.currentTarget.innerHeight;
        });
        
        return this;
    };
})(jQuery);





/* animation script 
use those .left-in .right-in below to animation components in our page.
*/

// this script is used with viewcheck js (inside custom.js) to control the animation (animate.css) in the page when scroll. 
		$('.left-in').viewportChecker({
			classToAdd: 'animated fadeInLeft', // Class to add to the elements when they are visible
			offset: -100, // The offset of the elements (let them appear earlier or later)
			callbackFunction: function(elem, action){} // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
		});
		$('.right-in').viewportChecker({
			classToAdd: 'animated fadeInRight', // Class to add to the elements when they are visible
			offset: -100, // The offset of the elements (let them appear earlier or later)
			callbackFunction: function(elem, action){} // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
		});
		$('.fade-in').viewportChecker({
			classToAdd: 'animated  fadeInUp', // Class to add to the elements when they are visible
			offset: -100, // The offset of the elements (let them appear earlier or later)
			callbackFunction: function(elem, action){} // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
		});
		$('.bounce-in').viewportChecker({
			classToAdd: 'animated bounceIn', // Class to add to the elements when they are visible
			offset: -100, // The offset of the elements (let them appear earlier or later)
			callbackFunction: function(elem, action){} // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed
		});








/*

customized checkbox style in viewdetail plan option panel and checkout process;
Used Glyphicon check and uncheck icon to modify the checkbox style.

>>>>used with type 1 checkbox js at line 227<<<<

*/



$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
          

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
    
    $('#get-checked-data').on('click', function(event) {
        event.preventDefault(); 
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
    });
});

/*  Type 1 checkbox: 
Modified icon with js above. Simply hide and show content when click on a checkbox*/

$('.collapse').collapse();
$('.panel-heading h4 a input[type=checkbox]').on('click', function(e){
    e.stopPropagation();
    $(this).parent().trigger('click');   // <---  HERE helps to check the box when click on the component
	
})
/*
$('#collapse1').on('show.bs.collapse', function(e){
    if( ! $('.panel-heading h4 a input[type=checkbox]').is(':checked') )
    {
        return false;
    }
});

$('#collapse2').on('show.bs.collapse', function(e){
    if( ! $('.panel-heading h4 a input[type=checkbox]').is(':checked') )
    {           
        return false;
    }
});
*/






/*  Type 2 checkbox: No style added, used default checkbox style. 
multiple box to hide and show content when click on a checkbox*/

/* fixed code*/
/* this is for transportation group pick up option panel */
$(document).ready(function(){  
	$('input[type="radio"]').click(function(){
		if($(this).attr("value")=="trans1"){
			$(".mybox0").hide();
			$(".trans1").show();
		}
		if($(this).attr("value")=="trans2"){
			$(".mybox0").hide();
			$(".trans2").show();
		}
		if($(this).attr("value")=="trans3"){
			$(".mybox0").hide();
			$(".trans3").show();

		}
	});
});






/* 
JS for person info panel

when looping this code, remeber to increase 

raido-set#
hotel#
other#
mybox#

************
# = number
************

*/
$(document).ready(function(){  /* this is for each hotel/other address options(transportation panel, each person panel)*/
	$('input[type="radio"]').click(function(){
		if($(this).attr("value")=="hotel1"){
			$(".mybox1").hide();
			$(".hotel1").show();
		}
		if($(this).attr("value")=="other1"){
			$(".mybox1").hide();
			$(".other1").show();
		}

	});
});


$(document).ready(function(){   /* this is for each hotel/other address options(transportation panel, each person panel)*/
	$('input[type="radio"]').click(function(){
		if($(this).attr("value")=="hotel2"){
			$(".mybox2").hide();
			$(".hotel2").show();
		}
		if($(this).attr("value")=="other2"){
			$(".mybox2").hide();
			$(".other2").show();
		}

	});
});
/* */


/* js that check whether has item in the cart and display a 0 item in the cart in a new panel */
var repeater;
function doWork() {
 		if ( $( "#cart-item" ).length ) {
			
		}else{
			
			$(".cart-with-items").hide();
			$(".cart-without-items").show();	
		}
 repeater = setTimeout(doWork, 1000);
}
doWork();



/* delete buttons */
$('.delete-person').on("click", function () {
    $(this).parents('div.item-person').fadeOut("slow", function() {
		$(this).remove();
		
	});


});

$('.delete-item').on("click", function () {
	
    $(this).parents('div.item').fadeOut("slow", function() {
		$(this).remove();
		
	});
		
});

/* div auto scroll and backup - not being used.*/
/*
var div = $('div.newsfeed');
setInterval(function(){
    var pos = div.scrollTop();
	div.animate({ scrollTop: (pos + 100) });
	if (div[0].scrollHeight - div.scrollTop() == div.outerHeight()) 
	{	
		div.animate({ scrollTop: 0 });
	}
}, 5000)
*/



/*
	Add to cart fly effect with jQuery. - May 05, 2013
	(c) 2013 @ElmahdiMahmoud - fikra-masri.by
	license: http://www.opensource.org/licenses/mit-license.php
*/   





