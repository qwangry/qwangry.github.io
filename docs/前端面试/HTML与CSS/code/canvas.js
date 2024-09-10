(function () {
    var tool = 'huabi';
    var size = 10;
    var sub = $('.sub');
    var flag = false;
    var shape = 'rect';
    var color = '#000';

    $('.container').onclick = function (e) {
        var id = event.target.id;
        switch (id) {
            case 'huabi':
                tool = 'huabi';
                flag = false;
                break
            case 'shuazi':
                tool = 'shuazi';
                flag = false;
                break
            case 'penqiang':
                tool = 'penqiang';
                flag = false;
                break
            case 'xiangpi':
                tool = 'xiangpi';
                flag = true;
                break

        }

        if (flag) {
            sub.style.visibility = 'visible';
        } else {
            sub.style.visibility = 'hidden';
        }
    }

    $('select').onchange = function () {
        shape = this.value;
    }

    $('.size').oninput = function () {
        size = this.value;
    }

    $('.color').onchange = function () {
        color = this.value;
    }
    var x, y;
    var canvas = $('canvas');
    var ctx = canvas.getContext('2d');

    canvas.onmousedown = function (e) {
        x = e.clientX - this.offsetLeft;
        y = e.clientY - this.offsetTop;
        document.onmousemove = function (e) {
            var x1 = e.clientX - canvas.offsetLeft;
            var y1 = e.clientY - canvas.offsetTop;
            switch (tool) {
                case 'huabi':
                    huabi(x, y, x1, y1, ctx, color);
                    break;
                case 'shuazi':
                    shuazi(x, y, x1, y1, ctx, color);
                    break;
                case 'penqiang':
                    penqiang(x, y, ctx);
                    break;
                case 'xiangpi':
                    xiangpi(x, y, x1, y1, ctx, size, shape, color);
                    break;
                case 'xiangpi':
                    xiangpi(x, y, x1, y1, ctx, size, shape);
                    break;
            }
            x = x1;
            y = y1;
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }

    $('.button').onclick = function () {
        const image = new Image()
        // canvas.toDataURL 返回的是一串Base64编码的URL
        image.src = canvas.toDataURL("image/png");
        // Use other methods to save the image, such as downloading it
        var link = document.createElement('a');
        link.href = image.src;
        link.download = 'canvas.png';
        link.click();
    }
})();

function $(selector) {
    return document.querySelector(selector);
}


function huabi(startX, startY, endX, endY, ctx, color) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
}

function shuazi(startX, startY, endX, endY, ctx, color) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
}

function penqiang(startX, startY, ctx, color) {
    for (var i = 0; i < 10; i++) {
        var randomNum = Math.random() * 15;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.globalAlpha = 0.5;
        ctx.arc(startX + randomNum, startY + randomNum, 1, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function xiangpi(startX, startY, endX, endY, ctx, size, shape) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    switch (shape) {
        case 'rect':
            ctx.lineWidth = size;
            ctx.strokeStyle = "#fff";
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, startY);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'circle':
            ctx.fillStyle = "#fff";
            ctx.arc(startX, startY, size, 0, 2 * Math.PI);
            ctx.fill();
            break;
    }
}