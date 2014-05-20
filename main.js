//***To-Do
// - List all items with template using handlebars

$(function() {

//I can ride my bike with no
// var source   = $("#productbars").html();
// var template = Handlebars.compile(source);

//Load up products
for (var i = 0; i < default_products.length; i++) {
	var thing = default_products[i].name;
	var sku = default_products[i].sku;
	var party = $("<li>" + thing + "</li>");
	//thing = thing.replace(/\s+/g, '');
	//party.addClass(thing);
	party.attr('data-sku', sku);
	var sup = $("<button>Add</button>");
	party.append(sup);
	$("ul.products").append(party);
};


var cart = {};

var cartUI = $(".cart");

function addItem(name, quantity) {
	cart[name] += quantity;
}

function removeItem(name, quantity) {
	if (cart[name] > 1) {
		cart[name] -= quantity;	
	} else {
		delete cart[name];
	}
	renderView();
}

function addOrUpdate(className) {
	var cartItem = $("ul.cart ." + className);
	
	itemSubtract = $('<button>Remove</button>');
	itemSubtract.addClass(className + 'Sub');
	
	//**********************
    var where;
	
	for(var i = 0; i < default_products.length; i++) {
	    if (default_products[i].sku === className) {
	        where = i;
	        break;
	    }
	}

	imageUrl = default_products[where].thumbnail;
	itemImage = $('<img src=' + imageUrl + '>');
	//**********************

	if(cartItem.length == 0) {
		cartItem = $('<li>');

		

		cartItem.addClass(className);
		cart[className] = 1;
		cartItem.text(default_products[where].name + ": " + (cart[className]));

		cartItem.append(itemSubtract)
				.append(itemImage)
				.appendTo(cartUI);
	} else {
		cart[className]++;
		cartItem.text(default_products[where].name + ": " + (cart[className]));

		cartItem.append(itemSubtract)
				.append(itemImage)
				.appendTo(cartUI);
	}
}

function onProductClick(event) {
	var productName = $(this).parent().attr('data-sku');
	
	addOrUpdate(productName);
	
	//addItem(productName, 1);

	console.log(cart);
}

//Remove All
function onRemoveClick(event) {
	var byeKids = $("ul.cart").children();
	var kidNums = $("ul.cart");
	byeKids.remove();

	cart[kidNums] = 0;
}

//Remove 1 Item
$('body').on('click', 'ul.cart button', function() {
	removeItem($(this).parent().attr('class'), 1);

	console.log(cart);
});

//Render View
var renderView = function() {
	
	// Wipe out whatever DOM is currently in the cart
	$('.cart').html('');

	// Loop the entire cart, and build the whole thing
	for (q in cart) {

		$('<li>')
			.append(q + ': ' + cart[q])
			.append('<button>Remove</button>')
			.append(itemImage)
			.addClass(q)
			.appendTo('.cart');
	}

}

var productButton = $("ul.products button");
productButton.click(onProductClick);

var removeButton = $("button.byebye");
removeButton.click(onRemoveClick)

});