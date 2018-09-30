function gotoPage(page, str){
    console.log(str)
    $('#page-wrapper').remove();
    $.ajax({
        type: "GET",
        url: "html/" + page + ".html",
        cache: false,
        async: false,
        success: function(data){
            $("#wrapper").append(str + data);
        }
    })
}

function outLogin(){
	
	$.cookie('uAdminCookie','')
	location.href="/login.html"
    
}
