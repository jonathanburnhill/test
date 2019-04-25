
  
  
  
const priceUpdate2 = document.querySelector('.price-update2');
const priceUpdate3 = document.querySelector('.price-update3');
// priceUpdate2.innerHTML = 0;
priceUpdate3.innerHTML = 0;
let val2 = 0;
var oriprice='10.00';
var items2= [];

// function validate() {
      
//          if( document.myForm.Name.value == "" ) {
// 						// alert( "Please provide your name!" );
// 						const nameVal = document.querySelector('#name');
// 						document.myForm.Name.focus() ;
// 						nameVal.addEventListener('blur', function() {
// 							nameVal.style.border = '2px solid red';
// 						});
//             return false;
//          }
//          else if( document.myForm.Address.value == "" ) {
// 						// alert( "Please provide your Address!" );
// 						const addressVal = document.querySelector('#address');
// 						document.myForm.Address.focus();
						
// 						addressVal.addEventListener('blur', function() {
// 							addressVal.style.border = '2px solid red';
// 						});
//             return false;
//          }		 
//          else if( document.myForm.Town.value == "" ) {
// 						// alert( "Please provide your Town!" );
// 						const townVal = document.querySelector('#town');
// 							document.myForm.Town.focus() ;
// 							townVal.addEventListener('blur', function() {
// 								townVal.style.border = '2px solid red';
// 							});
//             return false;
//          }
//         //  if( document.myForm.Zip.value == "" ) {
//         //     const postVal = document.querySelector('#post');
// 				// 		document.myForm.Zip.focus() ;
// 				// 		postVal.addEventListener('blur', function() {
// 				// 			postVal.style.border = '2px solid red';
// 				// 		});
//         //     return false;
// 				//  }
// 				// document.querySelector('.address-form').style.visibility = 'none';
// 				// document.querySelector('.spinner').classList.remove('hide-spinner');
//          return( true && window.scrollTo({
// 			 top: 700,
// 			 behavior: 'smooth'
// 		 }));
//       }
  
function calculateval2(){	
	  getval();
	//   validate();

	//val2 += 1;
	orderNum.innerHTML = `${val2} x tiles.`
	if(val2 < 2 && val2 > 0) {
		// priceUpdate2.innerHTML = `�${val2 * 10}`; 
		priceUpdate3.innerHTML = `£${val2 * 10}`; 
	} else if(val2 >= 2 && val2 < 3) {
		oriprice = (val2 * 0.9) * 10;
		// priceUpdate2.innerHTML = `�${(val2 * 0.9) * 10}`; 
		// priceUpdate2.innerHTML = `�${oriprice}`; 
		priceUpdate3.innerHTML = `£${oriprice}`; 
	} else {
		oriprice = Math.floor((val2 * 0.8) * 10);
		// priceUpdate2.innerHTML = `�${Math.floor((val2 * 0.8) * 10)}`; 
		// priceUpdate2.innerHTML = `�${oriprice}`; 
		priceUpdate3.innerHTML = `£${oriprice}`; 
	}
	console.log('calculateval2:'+val2);
	console.log('items2:',items2);

}
  
function getval(){
	val2 = 0;items2= [];		
	var num = document.querySelectorAll('.result-position').length;	 
	if(num == 1){			
		var SinglItemPrice = "10.00";
	}else if(num == 2){			
		var SinglItemPrice = "9.00";
	}else if(num > 2 ){			
		var SinglItemPrice = "8.00";
	}else{
		var SinglItemPrice = "10.00";			
	}
	
	SinglItemPrice = Math.floor( SinglItemPrice )
		
	 document.querySelectorAll('.result-position').forEach(function() {
		val2 += 1;
		console.log(val2);
		items2.push({
			  "name": "Image "+val2,
			  "sku": "image00"+val2,
			  "price": SinglItemPrice,
			  "currency": "GBP",
			  "amount": SinglItemPrice,
			  "currency_code": "GBP",
			  "quantity": "1"
			})
		return val2;
	 });  
}
  
  
  
  


var db=firebase.firestore();
// document.querySelector('.btn-confirm').addEventListener('click', function() {
	const showPaypal = () => {
document.querySelectorAll('.basket').forEach(show => show.style.display = 'block');
window.scrollTo({
	top: 500,
	behavior: 'smooth'
});
  paypal.Buttons({
	style: {
		color:  'blue',
		shape:  'rect',
		label:  'pay',
		height: 30
	},
	createOrder: function(data, actions) {
	  return actions.order.create({
		purchase_units: [{
		  description: "Insta Tiles",
		  amount: { currency_code: "GBP", value: oriprice } ,
		  item_list	: { items: items2 },
		}]
		
		 
	  });
	},
	onApprove: function(data, actions) {
	  // Capture the funds from the transaction
	  return actions.order.capture().then(function(details) {
	  console.log('details:',details);
		 var res= JSON.parse(JSON.stringify(details));
		 
		 if(details.id){
		   var  Docid='paypal-'+details.id;
			// db.collection('tranasactions').doc(Docid).set(res).then(ref2 => { /* maybe comment this back in?!*/
			// 	console.log(" tranasactions details saved..",ref2);	
			// }).catch(err => {		
			// 		console.log(err);	 	
			// });
			
			// const sendOrderAddress = document.getElementsByClassName('user-input'); /*and this */

			let newOrder = {};
			
				// let timeStamp = Math.round(new Date().getTime()/1000);
				//let name = document.querySelector('#name').value;
				let name = Docid;
				let imgUrl = document.querySelectorAll('.result-position');
				console.log('imgUrl',imgUrl)
				let imgUrlList = [];
				//const storageRef = storage.ref();
				const storageRef = firebase.storage().ref();
				//var database = firebase.firestore();

				let newImg;
				let count = 0;
				let finalDBEntry;

				
				
				imgUrl.forEach(function(img) {
					let strUrl = [];
					count + 1;
					 let findSrc = img.getAttribute('src');
					 newImg = findSrc.substring(22);
					 strUrl.push(newImg);
					 console.log(strUrl);
					 strUrl.forEach(() => {
						let timeStamp = Math.round(new Date().getTime()/ Math.floor(Math.random() * 20));
						storageRef.child(`${name}/${timeStamp}`)
						.putString(`${newImg}`, 'base64', { contentType: 'image/jpeg' })
						.then((response) => {
							console.log(strUrl);
							storageRef.child(`${name}/${timeStamp}`).getDownloadURL().then(function(url) {
								console.log(url);
								imgUrlList.push({time: timeStamp, source: url});
								console.log(imgUrlList);
								// console.log(imgUrlList);
								// for(let i = 0, len = sendOrderAddress.length; i < len; i++) {
								// 	let key = sendOrderAddress[i].getAttribute('data-key');
								// 	let value = sendOrderAddress[i].value;
								// 	newOrder[key] = value;
								// }
					 
								if(imgUrlList.length === imgUrl.length) {
									
									/*
									finalDBEntry = Object.assign({}, newOrder, imgUrlList);
									   console.log(finalDBEntry);
									
									database.push(finalDBEntry, function(){
										console.log('data has been inserted :)')
									});
									*/
									
									// let Username = document.querySelector('#name').value;
									// let UserAddress = document.querySelector('#address').value;
									// let UserTown = document.querySelector('#town').value;			/* And this*/
									// let UserPostcode = document.querySelector('#post').value;
									
									
									// var TransactionInput = { Username: Username, UserAddress:UserAddress, UserTown:UserTown,UserPostcode:UserPostcode, paypalresponse: res, imgUrlList: imgUrlList, itemList: items2};
									var TransactionInput = { Username: details.payer.name.given_name.value,
															 UserAddress: details.payer.address.address_line_1, 
															 UserTown: details.payer.address.admin_area_3, 
															 UserPostcode: details.payer.address.postal_code, 
															 paypalresponse: {'status': 'Failed'}, 
															 imgUrlList: 
															 imgUrlList, 
															 itemList: 
															 items2
															};

									var TransactionInput = JSON.parse(JSON.stringify(TransactionInput));
									db.collection('tranasactions').doc(Docid).set(TransactionInput).then(ref2 => {
										console.log(" tranasactions details saved..",ref2);	
										alert('Your Payment was Succsessfully Completed.')
										return (document.querySelector('.is-hidden').style.display = 'none') && (document.querySelector('.logout').style.display = 'block');
									}).catch(err => {		
										console.log(err);	 
										alert('Error on Your Payment & Image Uploads, Try again')
										// location.reload();										
									});
									
									
								}
								
							});
						});
					 })
					 
				 }); 
			 
			 
			
			
			
			
			
		 }else{
			 
			// let Username = document.querySelector('#name').value;
			// let UserAddress = document.querySelector('#address').value;
			// let UserTown = document.querySelector('#town').value;    					/*and this */
			// let UserPostcode = document.querySelector('#post').value;
			
			// var TransactionInput = { Username: Username, UserAddress:UserAddress, UserTown:UserTown,UserPostcode:UserPostcode, paypalresponse: {'status': 'Failed'}, imgUrlList: imgUrlList, itemList: items2};
			var TransactionInput = { Username: details.payer.name.given_name, UserAddress: details.payer.address.address_line_1, UserTown: details.payer.city, UserPostcode: details.payer.address.postal_code, paypalresponse: {'status': 'Failed'}, imgUrlList: imgUrlList, itemList: items2};
			var TransactionInput = JSON.parse(JSON.stringify(TransactionInput));
			
			db.collection('tranasactions').doc(Docid).set(TransactionInput).then(ref2 => {
				console.log(" tranasactions details saved..",ref2);	
				alert('Your Payment was Succsessfully Completed.')
				location.reload();
			}).catch(err => {		
				console.log(err);	 
				alert('Error on Your Payment & Image Uploads, Try again')
				location.reload();										
			});
			
			alert('Error on Your Payment')	
			location.reload();			
		 }
	  
		// Show a success message to your buyer
		console.log('Transaction completed by ' + details.payer.name.given_name);
	  });
	}
  }).render('#paypal-button-container');
  
// });
	};
  
  
  
  
  
  
  
  