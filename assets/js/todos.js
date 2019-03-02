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

//info about position of div
let offX = 0;
let offY = 0;
let initialX;
let initialY;
let currentX;
let currentY;

let offset;

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
	//get offset of container div
	offset = $('#container').offset();
	//save offset to local storage
	setItemInStorage('offset', offset);
}
//remove move listener on window
function mouseUp(e) {
	window.removeEventListener('mousemove', drag);
	//get position
}
//translate to new position with css
function setTranslate(x, y, el) {
	el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}

//local storage functionality
function setItemInStorage(dataKey, data) {
	localStorage.setItem(dataKey, JSON.stringify(data));
}

function getItemFromStorage(dataKey) {
	//retrieve data and convert to object
	const data = localStorage.getItem(dataKey);
	return data ? JSON.parse(data) : null;
}

//set initial position retrieved from local storage
const localOffset = getItemFromStorage('offset');
if (localOffset) {
	$('#container').offset(localOffset);
}

//Save position data to localstorage
//1. Get the position
//2. save it on local storage (convert object to string JSON)
//3. On reload, retrieve saved data + convert to object
// localStorage.clear();
