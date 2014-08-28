// JavaScript Document

$(function(){
	
	/* social media icon hang over effect Service hovers */
	$("#social ul li").hover(
		function() {
			$("#social").addClass($(this).data("network")).addClass("active");
			$("#socialmediatext").html($(this).data("text"));
		},
		function() {
			$("#social").removeClass();
			$("#socialmediatext").html("Find me on the web");
		}
	);
	
	
	
/* Pull down on-row-fluid-------------------------------------
+-span6----------+
|                |
| content        |
| that           | 
| is tall        | +-span6----------+    
|                | |short content   |
+----------------+ +----------------+
----------------------------------------------- */
	$('.pull-down').each(function() {
    	$(this).css('margin-top', $(this).parent().height()-$(this).height())
	});
		
});



	
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