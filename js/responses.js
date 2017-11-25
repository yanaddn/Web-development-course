window.addEventListener('load', function () {
    function updateOnlineStatus(event) {
        if (isOnline()) {
            readOfflineComments();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function addReview() {
    if ($('#name').val() === "" || $('#text').val() === "") {
        alert('Заповніть всі поля');
        return false;
    }

    if (isOnline()){

        var date = new Date;
        var author = document.getElementById('name').value;
        var text = document.getElementById('text').value;
        var parentElem = document.getElementById('media');
        var out = document.createElement('div');
        out.id = 'reviews';
        out.innerHTML =
            "<div class='media-body'>" +
            "   <span class='review-author'>" + author + "</span>" +
            "   <span class='review-date'>" + date + "</span>" +
            "   <p><br>" + text + "</p></div><hr><br>";
        parentElem.appendChild(out);
        document.getElementById('form').reset();
    } else {
            var date = new Date;
            var author = document.getElementById('name').value;
            var text = document.getElementById('text').value;
            i++;
            var list = [];
            list.push({"name": author, "text": text, "date": date});
            localStorage.setItem('review' + i, JSON.stringify(list));
        document.getElementById('form').reset();
    }
}

function readOfflineComments() {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            review = JSON.parse(localStorage.getItem('review' + k));
            var parentElem = document.getElementById('media');
            var out = document.createElement('div');
            out.id = 'review';
            out.innerHTML =
                "<div class='media-body'>" +
                "   <span class='review-author'>" + review[0].author + "</span>" +
                "   <span class='review-date'>" + review[0].date + "</span>" +
                "   <p><br>" + review[0].text + "</p></div><hr><br>";
            parentElem.appendChild(out);
            localStorage.removeItem(k);
        }
}
