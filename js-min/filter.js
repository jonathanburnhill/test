const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const imgSelect = document.querySelector('#img-select');
const filePicker = document.querySelector('#file-picker')
const noFile = document.querySelector('#no-file');
const hideBtns = document.querySelector('.hide-btns');
const text = document.querySelector('.text');


imgSelect.addEventListener("click", function (e) {
    if (filePicker) {
      filePicker.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  }, false);


  const chooseImg = () => {
    const FR = new FileReader();
    FR.onload = function(event) {
        const img = new Image();
        img.addEventListener('load', function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // hideBtns.style.visibility = 'visible';
        });
        img.src = event.target.result;
    }


   FR.readAsDataURL(event.target.files[0]);
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


const crop = document.querySelector('#crop'); 

crop.addEventListener('click', () => {
    // img.src = canvas.toDataURL();
    let vanilla = new Croppie(canvas, {
        viewport: { width: 200, height: 200 },
        boundary: { width: 400, height: 400 },
        showZoomer: true,
        enableResize: true,
        enableOrientation: true,
        mouseWheelZoom: 'ctrl'
    });

    vanilla.bind({
        url: canvas.toDataURL()
    });
});
    // document.querySelector('.logout').addEventListener('click', () => firebase.auth().signOut() && (window.location = 'index.html'));