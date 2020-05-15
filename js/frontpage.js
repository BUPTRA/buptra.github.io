function change_button(order)
{
    var btn = document.getElementsByTagName("input");
    for(var i = 0 ; i < btn.length ; i++)
    {
        if(i == order)
        {
            btn[i].style.color = "yellow";
        }
        else
        {
            btn[i].style.color = "white";
        }
    }
}

function index_section()
{
    var element = document.getElementById("section");
    element.innerHTML = 
    "<hr/>\n" +
    "<strong><a>写在前面的话</a></strong>\n" +
    "<hr/>\n";
}