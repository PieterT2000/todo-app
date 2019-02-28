// Check off specific Todos By Clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

//click on X to delete Todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});

	event.stopPropagation();

});

//add listener to input
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo from input
		var todoText = $(this).val();
		$(this).val("");
		//create a new li and add to ul
		$("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " + todoText + "</li>");
	}
});

//add listener to - sign
$(".fa-minus").click(function() {
	$("input").fadeOut(function(){
		$(".fa-minus").removeClass().addClass("fas fa-plus");
	});
});

//add listener to + sign
$("h1").on("click", ".fa-plus", function() {
	$(".fa-plus").removeClass().addClass("fas fa-minus");
	$("input").fadeIn(function() {
		
	});
});


