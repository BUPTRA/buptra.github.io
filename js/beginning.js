function change_section(order) {
    var section = document.getElementsByTagName("a");
    for (var i = 0; i < 6; i++) {
        if (i == order) {
            section[i].style.fontWeight = "bold";
        } else {
            section[i].style.fontWeight = "normal";
        }
    }
}

function mission_section() {
    var element = document.getElementById("section");
    element.innerHTML =
        "<hr/>\n" +
        "<a onclick=\"change_section(0);read_md('/md/beginning.md')\">序言</a>\n" +
        "<hr/>\n" +
        "<a onclick=\"change_section(1);read_md('/md/ra2.md');ra2_list()\">RA2原版</a>\n" +
        "<hr/>\n" +
        "<a onclick=\"change_section(2)\">尤里的复仇</a>\n" +
        "<hr/>\n" +
        "<a onclick=\"change_section(3)\">RA3原版</a>\n" +
        "<hr/>\n" +
        "<a onclick=\"change_section(4)\">Uprising</a>\n" +
        "<hr/>\n" +
        "<a onclick=\"change_section(5);read_md('/md/mo.md');mo_list()\">Mental Omega</a>\n" +
        "<hr/>\n";
}