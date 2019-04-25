const openModal = document.querySelector('#openModal');
const modal = document.querySelector('.modal');
const modalFilter = document.querySelector('.modal-filter');
const cancel = document.querySelector('.cancel');
const save = document.querySelector('.save');
const result = document.querySelector('.result');
const imgSelect = document.querySelector('#img-select');
const filePicker = document.querySelector('#file-picker');
const filterStart = document.querySelector('.filter-start');
const allowFilter = document.querySelector('.allow-filter');
const filterImg = document.querySelector('#canvas');
const imageOptions = document.querySelectorAll('.image-options');
const add = document.querySelector('.add');
const orderNum = document.querySelector('.order-num');
const photos = document.querySelector('.photos');
const buyNow = document.querySelector('.buy-now');
const btnFB = document.querySelector('.btn-fb');
const btnAddress = document.querySelector('.btn-address');
const addText = document.querySelector('.addText');

let rawImg;
let selectedFile;



document.querySelector('.to-close').addEventListener('click', () => {
    modal.classList.remove('modal-visible');
    
});


let containerWidth;
let viewportSize;


if(document.documentElement.clientWidth < 499) {
    containerWidth = document.documentElement.clientWidth;
    viewportSize = 250;
} else if(document.documentElement.clientWidth > 500 && document.documentElement.clientWidth < 600) {
    containerWidth = 500;
    viewportSize = 350;
    modal.style.height = '750px';
} else {
    containerWidth = 600;
    viewportSize = 400;
modal.style.height = '900px';
}

imgSelect.addEventListener("click", function (e) {
if (filePicker) {
    filePicker.click();
}
e.preventDefault(); // prevent navigation to "#"
}, false);

var vanilla = new Croppie(result, {
viewport: { width: viewportSize, height: viewportSize },
boundary: { width: containerWidth, height: containerWidth },
enableExif: true,
});


const chooseImg = function(input) {

const FR = new FileReader();
        FR.onload = function(event) {
            modal.classList.add('modal-visible');
            rawImg = event.target.result;
            // result.src = event.target.result;
            vanilla.bind({
                url: rawImg
            });
        }
        
        FR.readAsDataURL(input.target.files[0]);
        selectedFile = input.target.files[0];
        console.log(selectedFile);
    };
    
    
    
    save.addEventListener('click', function() {
        vanilla.result({
            type: 'canvas',
            format: 'jpeg',
            size: viewportSize ,
            size: "original",
            quality: 1
        }).then(function(response) {
            // let div = document.createElement('div');
            filterStart.setAttribute('src', response);
            // div.append = filterStart;
            // modalFilter.appendChild(div);
    modal.classList.remove('modal-visible');
    filterStart.style.width = `${viewportSize}px`;
    filterStart.style.height = `${viewportSize}px`;
    add.disabled = false;
    modalFilter.classList.add('modal-visible');
    filterStart.addEventListener('load', function() {
        if(filterStart.naturalWidth < '666') {
            modalFilter.classList.remove('modal-visible');
            modal.classList.add('modal-visible');
            alert('Images are too small for our product either zoom out a little bit or choose another image');
        }
    });
    filePicker.value = '';
    document.querySelector('.address-form').style.display = 'block';
});
});

if(modal.classList.contains('modal-visible')) {
// console.log(document.querySelector('.cr-image').naturalWidth);
console.log('hi there');
}

document.querySelector('#file-picker').addEventListener('change', chooseImg, false);

cancel.addEventListener('click', () => {
modal.classList.remove('modal-visible');
});

// save.addEventListener('click', event => {
//     vanilla.result({
//         type: 'base64',
//         format: 'webp',
//         type: "canvas", 
//         size: "original", 
//         quality: 1
//     });
// });
const img = new Image();

document.querySelector('.back').addEventListener('mouseup', function(event) {
modalFilter.classList.remove('modal-visible');
modal.classList.add('modal-visible');
// document.querySelector('.imgEdit').style.display = 'inline-block';
// const image = document.querySelector('.textEdit');
// const canvas = document.querySelector('#canvas');
// image.src = canvas.toDataURL();
});


const applyFilter = id => document.querySelector(id);




applyFilter('#greyscale').addEventListener('click', function() {
const greyscale = document.querySelector('#greyscale');
greyscale.textContent = 'G';
greyscale.classList.add('loadingAnimation');
Caman('#canvas', img, function() {
    if(modalFilter.classList.contains('checked')) {
        this.reloadCanvasData();
        this.revert(false);
        this.render();
        this.greyscale().render( function() {
                greyscale.classList.remove('loadingAnimation');
                greyscale.textContent = 'Greyscale'
            });
       
        }else if(modalFilter.classList.contains('allow-filter')) {
            this.greyscale().render( function() {
                greyscale.classList.remove('loadingAnimation');
                greyscale.textContent = 'Greyscale'
            });
            modalFilter.classList.remove('allow-filter');
            modalFilter.classList.add('checked');
        } else {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            modalFilter.classList.add('allow-filter');
        }
           
    });
});

applyFilter('#vintage').addEventListener('click', function() {
    const vintage = document.querySelector('#vintage');
    vintage.textContent = 'V';
    vintage.classList.add('loadingAnimation');
Caman('#canvas', img, function() {
    if(modalFilter.classList.contains('checked')) {
        this.reloadCanvasData();
        this.revert(false);
        this.render();
        this.vintage().render( function() {
                vintage.classList.remove('loadingAnimation');
                vintage.textContent = 'Vintage'
            });
        }else if(modalFilter.classList.contains('allow-filter')) {
            this.vintage().render( function() {
                vintage.classList.remove('loadingAnimation');
                vintage.textContent = 'Vintage'
            });
            modalFilter.classList.remove('allow-filter');
            modalFilter.classList.add('checked');
        } else {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            modalFilter.classList.add('allow-filter');
        }
    });
});

applyFilter('#oldboot').addEventListener('click', function(event) {
    const oldboot = document.querySelector('#oldboot');
    oldboot.textContent = 'O';
    oldboot.classList.add('loadingAnimation');
    Caman('#canvas', img, function() {
        if(modalFilter.classList.contains('checked')) {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            this.oldBoot().render( function() {
                oldboot.classList.remove('loadingAnimation');
                oldboot.textContent = 'Old Boot'
            });
            }else if(modalFilter.classList.contains('allow-filter')) {
                this.oldBoot().render( function() {
                oldboot.classList.remove('loadingAnimation');
                oldboot.textContent = 'Old Boot'
            });
                modalFilter.classList.remove('allow-filter');
                modalFilter.classList.add('checked');
            } else {
                this.reloadCanvasData();
                this.revert(false);
                this.render();
                modalFilter.classList.add('allow-filter');
            }
        });
});

applyFilter('#orange-peel').addEventListener('click', function() {
    const orange = document.querySelector('#orange-peel');
    orange.textContent = 'O';
    orange.classList.add('loadingAnimation');
Caman('#canvas', img, function() {
    if(modalFilter.classList.contains('checked')) {
        this.reloadCanvasData();
        this.revert(false);
        this.render();
        this.orangePeel().render( function() {
                orange.classList.remove('loadingAnimation');
                orange.textContent = 'Orange'
            });
        orange.style.backgroundColor = '#f70d0e';
        }else if(modalFilter.classList.contains('allow-filter')) {
            this.orangePeel().render( function() {
                orange.classList.remove('loadingAnimation');
                orange.textContent = 'Orange'
            });
            modalFilter.classList.remove('allow-filter');
            modalFilter.classList.add('checked');
        } else {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            modalFilter.classList.add('allow-filter');
        }
    });
})

applyFilter('#love').addEventListener('click', function() {
    const love = document.querySelector('#love');
    love.textContent = 'L';
    love.classList.add('loadingAnimation');
    Caman('#canvas', img, function() {
        if(modalFilter.classList.contains('checked')) {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            this.love().render( function() {
                love.classList.remove('loadingAnimation');
                love.textContent = 'Love'
            });
            love.style.backgroundColor = '#f70d0e';
        }else if(modalFilter.classList.contains('allow-filter')) {
            this.love().render( function() {
                love.classList.remove('loadingAnimation');
                love.textContent = 'Love'
            });
            modalFilter.classList.remove('allow-filter');
            modalFilter.classList.add('checked');
        } else {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            modalFilter.classList.add('allow-filter');
        }
    });
});


applyFilter('#sunrise').addEventListener('click', function() {
    const sunrise = document.querySelector('#sunrise');
    sunrise.textContent = 'S';
    sunrise.classList.add('loadingAnimation');
Caman('#canvas', img, function() {
    if(modalFilter.classList.contains('checked')) {
        this.reloadCanvasData();
        this.revert(false);
        this.render();
        this.sunrise().render(
            function() {
                sunrise.classList.remove('loadingAnimation');
                sunrise.textContent = 'Sunrise'
            }
        );
        sunrise.style.backgroundColor = '#f70d0e';
        }else if(modalFilter.classList.contains('allow-filter')) {
            this.sunrise().render(
                function() {
                    console.log('?');
                    sunrise.classList.remove('loadingAnimation');
                    sunrise.textContent = 'Sunrise'
                }
            );
            modalFilter.classList.remove('allow-filter');
            modalFilter.classList.add('checked');
        } else {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            modalFilter.classList.add('allow-filter');
        }
    });
});


applyFilter('#hazydays').addEventListener('click', function() {
    const hazydays = document.querySelector('#hazydays');
    hazydays.textContent = 'H';
    hazydays.classList.add('loadingAnimation');
    Caman('#canvas', img, function() {
        if(modalFilter.classList.contains('checked')) {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
            this.hazyDays().render(function() {
                hazydays.classList.remove('loadingAnimation');
                hazydays.textContent = 'Hazy'
            });
            hazydays.style.backgroundColor = '#f70d0e';
            }else if(modalFilter.classList.contains('allow-filter')) {
                this.hazyDays().render(function() {
                hazydays.classList.remove('loadingAnimation');
                hazydays.textContent = 'Hazy'
            });
                modalFilter.classList.remove('allow-filter');
                modalFilter.classList.add('checked');
            } else {
                this.reloadCanvasData();
                this.revert(false);
                this.render();
                modalFilter.classList.add('allow-filter');
            }
      
        });
});

applyFilter('#reset').addEventListener('click', function(event) {
    Caman('#canvas', img, function() {
        let reset = document.querySelector('#reset');
        reset.classList.add('loadingAnimation');
        reset.innerHTML = 'R';
        this.reloadCansData();
        this.revert(false);
        this.render(function() {
            reset.classList.remove('loadingAnimation');
            reset.textContent = 'Reset'
        });
    });
});

const priceUpdate = document.querySelector('.price-update');
priceUpdate.innerHTML = 0;
let val = 0;

// const pos = interact('.firstStepP');

// let position = {x: 0, y: 0};

// let caman = Caman('#canvas');
// document.querySelector('.firstStep').addEventListener('click', function() {
//   const p =  document.querySelector('.firstStepP');
//     p.textContent = addText.value;
//     interact('.firstStepP').draggable({
        // listeners: {
        //     start(event) {
        //         console.log(event.type, event.target);
        //     },
            // onmove(event) {
            //     position.x += event.dx;
            //     position.y += event.dy;
            //     event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            //    console.log(position.x, position.y);
            // },
            // restriction: '#canvas'
            
//     });
// });

// Caman('#canvas',img, function() {
//     let x = position.x;
//     let y = position.y;
//     document.querySelector('.applyText').addEventListener('click', function() {
//         let canvas = document.querySelector('#canvas');
//         let ctx = canvas.getContext('2d');
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.font = "100px Arial";
//         ctx.fillText(addText.value, x, y);
//         // addText.textContent = '';
//         console.log(x, y);
//         this.reloadCanvasData();
//     });
// });

let textAnimation = () => {
    let btnImg = document.querySelector('.btn-upload');
        btnImg.classList.add('text-decoration-animation');
};

const next = document.querySelector('.add');

next.addEventListener('click', function(e) {
    next.textContent = 'N'
    next.classList.add('loadingAnimation');
Caman('#canvas', img, function(){
const img = new Image();
img.setAttribute('src', this.toBase64());
img.setAttribute('class', 'result-position');
add.disabled = true;
photos.insertAdjacentElement('afterbegin', img);
modalFilter.classList.remove('modal-visible');
document.querySelector('.is-hidden').style.display = 'block';
document.querySelector('.buy-now-form').style.display = 'block';
document.querySelector('.address-form').style.display = 'none';
document.querySelector('.btn-confirm').style.display = 'none';
this.reloadCanvasData();
this.revert(false);
document.querySelector('.filter-start').removeAttribute('data-camen-id');
document.querySelector('#file-picker').val = '';
vanilla.bind({
    url: ''
});
    window.scrollTo(0,0);
    next.classList.remove('loadingAnimation');
    next.textContent = 'next';
    textAnimation();
});

});

1


// imageOptions.forEach(button => button.addEventListener('click',() => button.classList.toggle('allow')));

// document.querySelectorAll('.result-position').forEach(function() {
//      val += 1;
//     console.log(val);
//     return val;
// });


val += 1;
orderNum.innerHTML = `${val} x tiles.`
if(val < 2 && val > 0) {
priceUpdate.innerHTML = `£${val * 10}`;
} else if(val >= 2 && val < 3) {
 priceUpdate.innerHTML = `£${(val * 0.9) * 10}`;
} else {
 priceUpdate.innerHTML = `£${Math.floor((val * 0.8) * 10)}`;
}
console.log(val);
// });

const fbLogin = function() {
const button = document.createElement('button');
button.setAttribute('class', 'fb-login');
button.onclick = fbLoginSettings();
return button;
};

buyNow.addEventListener('click', function() {
document.querySelector('.is-hidden').style.display = 'none';
firebase.auth().onAuthStateChanged(user => {
 if(user) {
    document.querySelector('.address-form').style.display = 'block';
    document.querySelectorAll('.btn-confirm').style.display = 'block';

} else {
    document.querySelector('.buy-now-form').style.display = 'block'
 }
});
});

Caman('#canvas', img, function() {
this.render();
});


// document.querySelector('.address-form').addEventListener('click', function() {
//     document.querySelector('.buy-now-form').style.display = 'none';
//     document.querySelector('.address-form').style.display = 'block';
// });

// document.querySelector('.fb-login').addEventListener( 'click', e=>{
// const provider = new firebase.auth.FacebookAuthProvider();
// const promise = firebase.auth().signInWithPopup(provider)
// promise.then(function(result) {
//   console.log(result);
//   document.querySelector('.buy-now-form').style.display = 'none';
//   document.querySelector('.address-form').style.display = 'block';
//   document.querySelector('.btn-confirm').style.display = 'block';
//   window.scrollTo({
//     top: 200,
//     behavior: 'smooth'
// });
//   // ...
// }).catch(function(error) {
//         // ...
//         console.log(error);
// });
// })

const redBorder = el => document.querySelector(el).style.border = '2px solid red';

document.querySelector('#btnSignUp').addEventListener('mouseup', event => {
const email = document.querySelector('#txtEmail').value;
const password = document.querySelector('#txtPassword').value;
firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
    document.querySelector('#btnSignUp').setAttribute('class', 'loginButtonAnimation');
    document.querySelector('.buy-now-form').style.display = 'none';
    // document.querySelector('.address-form').style.display = 'block';
    // document.querySelector('.btn-confirm').style.display = 'block';
    showPaypal();
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
  });
}).catch(function(error) {
    if(email != '^[^@]+@[^@]+\.[^@]+$' && password.length < 6) {
        redBorder('#txtEmail');
        redBorder('#txtPassword');
        alert('Email is\'t a valid email address and password must be at least 6 characters');
    }else if(email != '^[^@]+@[^@]+\.[^@]+$') {
        redBorder('#txtEmail');
        alert(`Email isn't a valid email address or is already in use`);
    } else if(password.length < 6) {
        redBorder('#txtPassword');
        alert('Password must contain at least 6 characters');
    }
    
});
});

document.querySelector('#btnLogin').addEventListener('mouseup', event => {
    console.log('clicked');
const email = document.querySelector('#txtEmail').value;
const password = document.querySelector('#txtPassword').value;
firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    document.querySelector('#btnLogin').setAttribute('class', 'loginButtonAnimation');
      document.querySelector('.buy-now-form').style.display = 'none';
//   document.querySelector('.address-form').style.display = 'block';
//   document.querySelector('.btn-confirm').style.display = 'block';
showPaypal();
  window.scrollTo({
    top: 200,
    behavior: 'smooth'
});

}).catch(event => {
    if(email != '^[^@]+@[^@]+\.[^@]+$' && password.length < 6) {
        redBorder('#txtEmail');
        redBorder('#txtPassword');
        alert('Email is\'t a valid email address and password must be at least 6 characters');
    // }else if(email != '^[^@]+@[^@]+\.[^@]+$') {
    //     redBorder('#txtEmail');
    //     alert(`Email isn't a valid email address`);
    } else if(password.length < 6) {
        redBorder('#txtPassword');
        alert('Password must contain at least 6 characters');
    }
});
});

firebase.auth().onAuthStateChanged(user => {
if(user) {
    document.querySelector('#btnLogOut').classList.remove('hide');
} else {
    document.querySelector('#btnLogOut').classList.add('hide');
}
});

document.querySelector('#btnLogOut').addEventListener('click', event => {
firebase.auth().signOut();
console.log('logged out');
});



const sendOrderAddress = document.getElementsByClassName('user-input');

let newOrder = {};

btnAddress.addEventListener('click', function() {
// let timeStamp = Math.round(new Date().getTime()/1000);
let name = document.querySelector('#name').value;
let imgUrl = document.querySelectorAll('.result-position');
let imgUrlList = [];
//const storageRef = storage.ref();
const storageRef = firebase.storage().ref();
var database = firebase.firestore();

let newImg;
let count = 0;
let finalDBEntry;

// imgUrl.forEach(function(img) {
//    count += 1;
//     let findSrc = img.getAttribute('src');
//     newImg = findSrc.substring(22);
    
//     storageRef.child(`${name}/${count}/${timeStamp}`)
//     .putString(`${newImg}`, 'base64', { contentType: 'image/jpeg' })
//     .then(() => {
//         storageRef.child(`${name}/${count}/${timeStamp}`).getDownloadURL().then(function(url) {
//             imgUrlList.push({source: url});
//             for(let i = 0, len = sendOrderAddress.length; i < len; i++) {
//                 let key = sendOrderAddress[i].getAttribute('data-key');
//                 let value = sendOrderAddress[i].value;
//                 newOrder[key] = value;
//             }
 
//             if(imgUrlList.length === imgUrl.length) {
//                 finalDBEntry = Object.assign({}, newOrder, imgUrlList);
                
//                 database.push(finalDBEntry, function(){
//                     console.log('data has been inserted :)')
//                 });
//             }
            
//         })
//     });
// }); 
let strUrl = [];
imgUrl.forEach(function(img) {
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
                for(let i = 0, len = sendOrderAddress.length; i < len; i++) {
                    let key = sendOrderAddress[i].getAttribute('data-key');
                    let value = sendOrderAddress[i].value;
                    newOrder[key] = value;
                }
     
                if(imgUrlList.length === imgUrl.length) {
                    finalDBEntry = Object.assign({}, newOrder, imgUrlList);
                       console.log(finalDBEntry);
                    
                    database.push(finalDBEntry, function(){
                        console.log('data has been inserted :)')
                    });
                }
                
            });
        });
     })
     
 }); 

});





// let fbAlbumsPhotosObj = {};

// btnFB.addEventListener( 'click', e => {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     const promise = firebase.auth().signInWithPopup(provider)
//     promise.then(function(result) {
//         FB.api('/me?fields=albums.limit(5){name,count,cover_photo{picture},photos.limit(10){picture,images}}', response => {
//             console.log(response);

//             const res = response.albums.data.map(x => x.photos.data[0].images[0].source);
//             res.forEach(el => {
//                 const image = new Image();
//                 image.style.width = "400px";
//                 image.style.height = "400px";
//                 image.src = el;
//                 photos.appendChild(image);
//             })
//             console.log(res);

//             let fbAlbumsPhotosObj = {}
//             fbAlbumsPhotosObj = response.albums;
//             console.log(fbAlbumsPhotosObj.data.map(x => x.photos.data[0].images[0].source));
       
//           });
//     });

// });

//    document.body.innerHTML = `<img src="${response.albums.data[0].photos.data[0].images[0].source}" style="width: 400px; height: 400px">`;
