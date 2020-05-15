var common_inner = "<div id=\"guide\"></div><div id=\"introduction\"></div><div id=\"list\"></div>";

function read_md(filename) {
    document.getElementById("content").innerHTML = common_inner;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filename, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var converter = new showdown.Converter();
            var html = converter.makeHtml(xmlhttp.responseText);
            document.getElementById("introduction").innerHTML = html;
        }
    }
    xmlhttp.send(null);
}

function read_json(filename, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.overrideMimeType("application/json");
    xmlhttp.open('GET', filename, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
            callback(JSON.parse(xmlhttp.responseText));
        }
    };
    xmlhttp.send(null);
}