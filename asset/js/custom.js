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





/*

js for checkbox style in viewdetail plan option panel and checkout process;
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


/*  hide and show content js when click on a checkbox*/

$('.collapse').collapse();
$('.panel-heading h4 a input[type=checkbox]').on('click', function(e){
    e.stopPropagation();
    $(this).parent().trigger('click');   // <---  HERE helps to check the box when click on the component
	
})
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


