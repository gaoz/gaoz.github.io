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


