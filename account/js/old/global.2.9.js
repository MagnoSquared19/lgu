

/*
window.location.href returns the href (URL) of the current page
window.location.hostname returns the domain name of the web host
window.location.pathname returns the path and filename of the current page
window.location.protocol returns the web protocol used (http: or https:)
window.location.assign loads a new document
*/



/* my library */

var j =function(context){ return new j.init(context); };
j.init=function(context){ this.context = context; };
j.alert_ = function(str){ alert(str); };

/* ---- */
var MyClass = function(context) {
    // Call the constructor
    return new MyClass.init(context);
};

// Static methods
MyClass.init = function(context) {
    // Save the context
    this.context = context;
};
MyClass.messageBox = function(str) {
    alert(str);
};


// Instance methods
MyClass.init.prototype.print = function() {
    return "Printing";
};
MyClass.init.prototype.move = function() { return this.context; };

// Method chaining example
MyClass.init.prototype.flash = function() {
    document.body.style.backgroundColor = '#ffc';
    setInterval(function() {
        document.body.style.backgroundColor = '';
    }, 5000);
    return this;
};
/* ---- */

/* my library end here */
$(document).ready(function(e)
{
	//j.alert_("hello");
	//MyClass.messageBox('Hello, world!');
});


/* --------------------------------- */
var p = document.createElement("p");
p.innerText = "Lorem ipsum...";

// jQuery-like object
var CustomObject = function (element){ return new CustomObject.prototype.init(element); };
// constructor
CustomObject.prototype.init = function (element) 
{
    this.el = element;
    this.text = element.innerText;
};
/*var MyDiv1 = document.getElementById('DIV1');
   var MyDiv2 = document.getElementById('DIV2');
   MyDiv2.innerHTML = MyDiv1.innerHTML;*/
// instance methods
CustomObject.prototype.txt 	= function (){	console.log(this.text); return this; };	//document.getElementById("one").innerHTML
CustomObject.prototype.log 		= function (){ console.log(this.text); return this; };
CustomObject.prototype.add2body = function (delay){ document.body.appendChild(this.el); return this; };
// Assign the prototype of CustomObject to CustomObject.prototype.init
CustomObject.prototype.init.prototype = CustomObject.prototype;

// testing
$(document).ready(function(e)
{
	//var obj = CustomObject(p).add2body().log();
});

(function() 
{
	//var obj = CustomObject(p).add2body().log();
	var obj = CustomObject(p).txt();


})();


