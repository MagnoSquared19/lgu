/* Base functions */
var wScreen = "";
$(document).ready(function(e)
{
	device_(), $(window).resize(function(e){device_();});
});

function device_(){wScreen = ($(window).width()>=800)?"pc":"mobile";}




/* to be Validated */
function isIE(){ var ua = window.navigator.userAgent; return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0 }
/* to be Validated end here */






















