var assetElems = document.querySelectorAll(".ale"),
    urlCreator = window.URL || window.webkitURL;

[].forEach.call(assetElems, loadAsset);

function loadAsset(elem) {
    var progressBarElem = getProgressBarElem(),
        isVid = elem.getAttribute("data-ale-isVid") != undefined ? elem.getAttribute("data-ale-isVid") : false,
        assetLoc = elem.getAttribute("data-ale-src");

    var req = new XMLHttpRequest();
    req.onload = loadFinished;
    req.onprogress = loading;
    req.open('GET', assetLoc, true);
    req.responseType = 'blob';
    req.send();

    function getProgressBarElem() {
        var type = elem.getAttribute("data-ale-type");
        if(type !== "diagonal") {
            console.log("A diagonal type was not given! Creating one anyway");
        } else {
            var line = new ProgressBar.Line(elem);
            line.svg.setAttribute("preserveAspectRatio", "xMinYMid");
            return line;
        }
    }

    function loading(evt) {
        if (evt.lengthComputable) {
            progressBarElem.animate(evt.loaded / evt.total);
        }
    }
    function loadFinished() {
        if(!isVid) {
            var imgUrl = urlCreator.createObjectURL(req.response);
            elem.style.backgroundImage = 'url(' + imgUrl + ')';
        } else {
            var video = document.createElement('video');
            video.controls = true;
            video.src = urlCreator.createObjectURL(req.response);
            elem.appendChild(video);
        }
        progressBarElem.animate(1, function () {
            elem.classList.add("complete");
        });
    }
}

var clickTag = "https://www.geico.com/";
 document.getElementById('wrapper').addEventListener('click', clickHandler, false);
    function clickHandler(event) {
        window.open(window.clickTag);
    }

$('.NoFilter').addClass('animated slideInLeft');
$('.NoRegrets').addClass('animated slideInLeft');
$('.SaveMoney').addClass('animated slideInLeft');
$('.gecko').addClass('animated slideInLeft');
$('.logo').addClass('animated slideInLeft');
$('.btn').addClass('animated slideInLeft');
