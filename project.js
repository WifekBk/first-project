$(document).ready(function(){
	var signupForm = $('#signup form');
	var loginForm = $('#login form');
	var welcome = $('#welcome');
	var logoutButton = $('#logout-button');
	var byerbutton = $('#buyer-button');
	var sellerbutton = $('#seller-button');
	var addProd = $('#addProd')
	var buy = $('#buy')
	var products =[];
	var basketProd=[];
	var cost=0;
	var order = $('#order').hide();

//sign Up and Login /////////

function saveUser(username, password) {
	localStorage.setItem(username,password);
	$('#signup-username').val('');
	$('#signup-password').val('');
}


function authenticateUser(username, password) {
	if(localStorage.getItem(username)=== password){
		
		$('#login-username').val('');
		$('#login-password').val('');
		return true;
	}
	else{
		$('#login-username').val('');
		$('#login-password').val('');
		return false;
	}
	}
	signupForm.submit(function(event) {
		event.preventDefault();
		var username = $("#signup-username").val();
		var password = $("#signup-password").val();
		saveUser(username,password);
		$("#signup form")[0].reset();	
	});

	loginForm.submit(function(e) {
		e.preventDefault();
  var username = $("#login-username").val();
  var password = $("#login-password").val();
  if(authenticateUser(username,password)){
	$("#signup").hide();
	$("#login").hide();
	welcome.show();
	logoutButton.show();
  }
  else {
	alert("try again");
  }
	});
	
	var prod = function(name,type,img,price){
		return {
			name,
			type,
			img,
			price
		  }
	}

//buyer space/////////////

	var addProduct = function(prod){
		products.push(prod);
	}
	function displayProducts(products,tag){
		tag.empty();
		 for(var i = 0; i<products.length;i++){
			 var div = $("<div></div>");
			 var name = $(`<h3>${products[i].name}</h3>`);
			 var image =$(`<img src=${products[i].image}>`);
			 var price = $(`<h4>${products[i].price}DT</h4>`);
			 var type = $(`<h3>${products[i].type}</h3>`);
			 var imgInput = $(`<input id='img'></input>`);
			 var imgButton = $(`<button class='button'>update image</button>`);
			 imgButton.on("click",function(){
				var src =  $(this).prevAll("#img").val();
		   $(this).prevAll("img").attr("src",src);
		 var that = $(this);
		   products.filter(function(e){
			 return e.name === $(that.prevAll("h3")[1]).text()
		   })[0].image = src;
			 })
			 var priceInput = $("<input id='price'></input>");
			var priceButton = $("<button class='button'>update price</button>");
			priceButton.on("click",function(){
			 var that = $(this);
		   var price =  $(this).prevAll("#price").val();
		   $(this).prevAll("h4").text(price);
		   products.filter(function(e){
			 return e.name===$(that.prevAll("h3")[1]).text()
		   })[0].price = price;
	 
			})
			div.append(name,image,price,type,imgInput,imgButton,priceInput,priceButton);
		   tag.append(div);
		 }
	 };


	addProd.on('click',function(e){
		e.preventDefault();
		var name =$('#name-prod').val();
		var type =$('#type-prod').val();
		var img =$('#img-src').val();
		var price =$('#price').val();
		var p =prod(name,type,img,price);
		addProduct(p);
		displayProducts(products,$('#proddisplay'));
		$('#name-prod').val('');
		$('#type-prod').val('');
		$('#img-src').val('');
		$('#price').val('');
		
	});

	byerbutton.on('click',function(e){
		e.preventDefault();
		$('#buyer').show();
	});


//seller space//////////////////////	

	function displayForSeller(products,tag){
		for(var i = 0; i<products.length;i++){
			var div = $(`<div></div>`);
			var name = $(`<h3>${products[i].name}</h3>`);
			var img =$(`<img src=${products[i].image}>`);
			var price = $(`<h4>${products[i].price}DT</h4>`);
			var type = $(`<h3>${products[i].type}</h3>`);
			var buttonAdd = $(`<button id='buttonAdd'class='button'>add to basket</button>`);
			buttonAdd.on('click',function(){
				var name =$($(this).prevAll('h3')[1]).text();
		        basketProd.push(name);
				var price=$($(this).prevAll('h4')[0]).text();
		        cost+=Number(price.replace('DT',''));
		        $('#basket').find('#cost').text('basket :'+cost+'DT');

			});

			div.append(name,img,price,type,buttonAdd);
			tag.append(div);
		}

	};


	sellerbutton.on('click',function(e){
		e.preventDefault();
		$('#buyer').hide();
		$('#seller').show();
		displayForSeller(products,$('.seller'));
	});

//buy//////////////////////////


	buy.on('click',function(){
		$('#seller').hide();
		order.show();
		basketProd.forEach(function(e){
			order.append($('<li>'+e+'</li>'));
		});
		var tott = $('#basket').find('#cost').text();
		order.append($('<ul>'+tott+'</ul>'));
		order.append($("<button id ='order-button' class='button'>order</button>"));
		order.append($("<button id ='cancel-button' class='button'>cancel</button>"));

		var or = $('#order-button');
		var cancel = $('#cancel-button');

		or.on('click',function(){
			welcome.hide();
			order.append($('<label>phone number</label>'));
			order.append($("<input type='text'required>"));
			order.append($("<button id ='confirm-button' class='button'>confirm</button>"));
			order.append($("<button id ='logout' class='button'>logout</button>"));
			var orderButton = $('#confirm-button');
			var out = $('#logout');
			orderButton.on('click',function(){
				var phone = $($(this).prevAll('input')[0]).val();
				if(phone.length<7){
					alert('try again')
				}
				else{
					alert('Congratulations')
				}
			})

			out.on('click',function(e){
				e.preventDefault();
		        window.location.reload();

			})

		})

		cancel.on('click',function(){
			order.empty();
			order.hide();
			welcome.show();
			cost=0.00;
			basketProd=[];
			$('#basket').find('#cost').text('basket: 0.00DT');
			$('#seller').show()	;
		})

	})

//logout///////////////////

	logoutButton.click(function(e){
		e.preventDefault();
		window.location.reload()
	});

})