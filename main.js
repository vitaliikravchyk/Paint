var Paint  = {
    options: {
        canvas: document.getElementById('canvas'),
        context: canvas.getContext('2d'),
        clear: document.getElementById('clear'),
        download: document.getElementById('download'),
        upload: document.getElementById('file'),
        drawOnCanvasMoveFunction: '',
        pointerColor: '',
        cleaner: document.getElementById('cleaner'),
        sizeRect: '',
        img: null
        
        
    },
    init: function(){
        var setPointColorFunction = this.setPointColor.bind(this);
        var drawOnCanvasFunction = this.drawOnCanvas.bind(this);
        var clearRectFunction = this.clearRect.bind(this);
        var downloadImgFunction = this.downloadImg.bind(this);
        var getCanvasFunction = this.getCanvas.bind(this);
        var uploadImgFunction = this.uploadImg.bind(this);
        var cleanerPointerFunction = this.cleanerPointer.bind(this);
        this.getCanvas();
        this.addListener(canvas, 'mousedown', drawOnCanvasFunction)
        this.addListener(color, 'change', setPointColorFunction);
        this.addListener(clear , 'click', clearRectFunction);
        this.addListener(download, 'click', downloadImgFunction);
        this.addListener(window, 'resize', getCanvasFunction);
        this.addListener(this.options.upload, 'change', uploadImgFunction);
        this.addListener(this.options.cleaner,'click', cleanerPointerFunction)
    },
    getCanvas: function(){
        this.setCanvasSize();
        this.setCanvasBackground();
        this.setCanvasFrame();
        this.setPointColor();
        this.setImage();
        
    },
    // SETTINGS
    setCanvasSize: function(){
        canvas.width = 0.8 * document.documentElement.clientWidth;
        canvas.height = 350;
        canvas.style.width = canvas.width;
        canvas.style.height = canvas.height;
    },
    setCanvasBackground: function(){
        this.drawRect("white", 0, 0, canvas.width,canvas.height)
    },
    setCanvasFrame: function(){
        this.options.context.strokeRect(0,0,canvas.width, canvas.height);
    },
    setPointColor: function(){
        var color = document.getElementById('color');
        this.options.pointerColor = color.value;
        this.options.sizeRect = 10;
    },
    setImage: function(){
        if(this.options.img != null){

        this.options.context.drawImage(this.options.img,0,0, canvas.width, canvas.height);
        }
        return;
    },
    //DRAWING
    drawOnCanvas: function(){
        var drawOnCanvasMoveFunction = this.drawOnCanvasMove.bind(this);
        canvas.addEventListener('mousemove', drawOnCanvasMoveFunction);
        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', drawOnCanvasMoveFunction);
        })
    },
    drawOnCanvasMove: function(){
        this.drawRect(this.options.pointerColor, event.offsetX, event.offsetY, this.options.sizeRect,this.options.sizeRect);
    },

    addListener: function(elem, event, fnc){
        elem.addEventListener(event, fnc, false);
    },
    drawRect: function(style, startX, startY, endX, endY){
        this.options.context.fillStyle = style;
        this.options.context.fillRect(startX, startY, endX, endY);
    },
    clearRect: function(){
        this.drawRect("white", 0, 0, canvas.width, canvas.height);
        this.setCanvasFrame();
    },
    downloadImg: function(){
        this.options.download.setAttribute('href', canvas.toDataURL('image/png'));
    },
    uploadImg: function(){
        var self = this;
        var img = new Image();
        var reader = new FileReader();
        var file = event.target.files[0];
        reader.onload = function(){
            img.src = reader.result;
            self.options.img = img;
            img.onload = function() {
            self.setImage();
            }
        }
        reader.readAsDataURL(file);
    },
    cleanerPointer: function(){
        var subMenu = document.getElementById('subMenu');
        subMenu.style.display = "block";
        this.options.cleaner.style.opacity = 0;
        var self = this;
        this.addListener(subMenu, 'click', function(){
            self.options.sizeRect = event.target.value;
            self.options.pointerColor = 'white';
            subMenu.style.display = "none";
            self.options.cleaner.style.opacity = 1;
        })
    }
}