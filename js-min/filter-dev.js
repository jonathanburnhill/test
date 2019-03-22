/*

use the file picker system pick a image and upload into canvas tag

sperate functions to 
push image into canvas -in progress
and create a thumnail

object of global functions - done/in progress for updates


make a function that uses the dollar sign to grab
the id's we need -done

Main project use pica!!
*/





// get canvas tag and set its context
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
// canvas.height = canvas.width / 2;

const imgSelect = document.querySelector('#img-select');
const filePicker = document.querySelector('#file-picker')
const noFile = document.querySelector('#no-file');
const hideBtns = document.querySelector('.hide-btns');

imgSelect.addEventListener("click", function (e) {
    if (filePicker) {
      filePicker.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  }, false);

// this function chooses the file and pushes it into the
// cavas tag
const chooseImg = (e) => {
// check if user has attempted to upload images and handle request
    // if(this.files && this.files[0]) {
        //Start new file reader and put inside variable
        const FR = new FileReader();
        // handle FR load behaviour
        FR.onload = function(event) {
            // initiate new image for canvas
            const img = new Image();
            // handle image load behaviour
            img.addEventListener('load', function() {
                noFile.innerHTML = '';
                hideBtns.style.visibility = 'visible';
                let imageWidth;
        let imageHeight;
        const imageAspectRatio = img.width / img.height;
        const containerAspectRatio = canvas.width / canvas.height;
        const widthFirst = getWidthFirst(scaleMode, imageAspectRatio, containerAspectRatio);

        if(widthFirst) {
            imageWidth = canvas.width;
            imageHeight = imageWidth / imageAspectRatio;
        }else {
            imageHeight = canvas.height;
            imageWidth = imageHeight * imageAspectRatio;
        }

        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height, (canvas.width - imageWidth) / 2, (canvas.height - imageHeight) / 2, imageWidth, imageHeight);
            });
            // add image source
            img.src = event.target.result;
        };
        
        // Read data as url
        FR.readAsDataURL(event.target.files[0]);
        // }
    };
    
let scaleMode = "showAll";


   function onImageLoad() {
        

    };


    function getWidthFirst(scaleMode, imageAspectRatio, containerAspectRatio) {
        if(scaleMode === "showAll") {
            return imageAspectRatio > containerAspectRatio;
          }
          else {
            return imageAspectRatio < containerAspectRatio;
          }
    };

    document.querySelector('#file-picker').addEventListener('change', chooseImg, false);
    
const img = new Image();
const applyFilter = id => document.querySelector(id);

    applyFilter('#greyscale').addEventListener('click', function(event) {
        Caman('#canvas', img, function() {
            this.greyscale().render();
        });
    });

    applyFilter('#vintage').addEventListener('click', function() {
        Caman('#canvas', img, function() {
            this.vintage(400).render();
        })
    });

    applyFilter('#oldboot').addEventListener('click', function(event) {
         Caman('#canvas', img, function() {
            this.oldBoot().render();

         });
    });

    applyFilter('#orange-peel').addEventListener('click', function() {
        Caman('#canvas', img, function() {
            this.orangePeel().render();
        })
    })

    applyFilter('#love').addEventListener('click', function() {
        Caman('#canvas', img, function() {
            this.love().render();
        });
    });


    applyFilter('#sunrise').addEventListener('click', function() {
        Caman('#canvas', img, function() {
            this.sunrise().render();
        });
    });


    applyFilter('#hazydays').addEventListener('click', function() {
        Caman('#canvas', img, function() {
            this.hazyDays().render();
        });
    });

    applyFilter('#reset').addEventListener('click', function(event) {
        Caman('#canvas', img, function() {
            this.reloadCanvasData();
            this.revert(false);
            this.render();
        });
    });

    /*
take the value of textbox
add box to canvas

use buttons to change position from top to
    */



    
    // Problem ALERT images need to be resized according to canvas size!
    
    //MAYBE USE THE FOLLOWING LATER 
    //             var MAX_WIDTH = 600;
    //    var MAX_HEIGHT = 450;
    //    var width = img.width;
    //    var height = img.height;
 
    //    if (width > height) {
    //      if (width > MAX_WIDTH) {
    //        height *= MAX_WIDTH / width;
    //        width = MAX_WIDTH;
    //      }
    //    } else {
    //      if (height > MAX_HEIGHT) {
    //        width *= MAX_HEIGHT / height;
    //        height = MAX_HEIGHT;
    //      }
    //    }
    //    canvas.width = width;
    //    canvas.height = height;
    //    var ctx = canvas.getContext("2d");
    //    ctx.drawImage(img, 0, 0, width, height);


// <!--
// build canvas tag fully responsive -done
// //build button for user to press to upload images
// //script to allow users to choose from device

// //Set chosen image inside of canvas tag

// design and build buttons for filters
// textbox for users to type things

// use caman library to allow customization
// connect caman script to buttons to allow people to manipulate images inside canvas tag

// research touch motions for users to place text in any position or angle
// -->
// <!-- Get thumbnails of uplaoded images -->