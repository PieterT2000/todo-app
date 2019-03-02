// Check off specific Todos By Clicking
$('ul').on('click', 'li', function() {
	$(this).toggleClass('completed');
});

//click on X to delete Todo
$('ul').on('click', 'span', function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});

	event.stopPropagation();
});

//add listener to input
$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		//grabbing new todo from input
		var todoText = $(this).val();
		$(this).val('');
		//create a new li and add to ul
		$('ul').append("<li><span><i class='far fa-trash-alt'></i></span> " + todoText + '</li>');
	}
});

//add listener to - sign
$('.fa-minus').click(function() {
	$('input').fadeOut(function() {
		$('.fa-minus').removeClass().addClass('fas fa-plus');
	});
});

//add listener to + sign
$('h1').on('click', '.fa-plus', function() {
	$('.fa-plus').removeClass().addClass('fas fa-minus');
	$('input').fadeIn(function() {});
});

const container = document.querySelector('#container');
let offX = 0;
let offY = 0;
let initialX;
let initialY;
let currentX;
let currentY;

//logic is as following:
// - First get original position
// - Then calculate the distance to original position
// - Then move the object with tranlate to the new position

//Container listener
container.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);

// Drag Functions
function mouseDown(e) {
	//initialX = original position
	initialX = e.clientX - offX;
	initialY = e.clientY - offY;
	window.addEventListener('mousemove', drag);
}

function drag(e) {
	e.preventDefault();
	//currentX is distant from original position
	currentX = e.clientX - initialX;
	currentY = e.clientY - initialY;

	//set offset to distanst => currentX
	//any moves will be calculated from original position on page load
	offX = currentX;
	offY = currentY;

	setTranslate(currentX, currentY, container);
}
//remove move listener on window
function mouseUp(e) {
	window.removeEventListener('mousemove', drag);
}
//translate to new position with css
function setTranslate(x, y, el) {
	el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}
