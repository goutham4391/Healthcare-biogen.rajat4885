$("div.flexiform div.col-md-6").css("max-width","100%");
$("body h2").css("color","#555555");
$("div.flexiform h1").css("color","#555555");
$(".form-group:eq(5)").css("display","none");
$("#captcha_ErrMsg").css("color", "rgb(255, 0, 0)");
$("#captcha_ErrMsg").css("font-weight", "600");
$(".form-group:eq(6)").css("margin-bottom","0rem");
$("#submit-form").css("background","#0076bc");
$("#submit-form").css("color","#ffffff");
$("#submit-form").css("padding","0.35em 1.2em");
$("#submit-form").css("border-radius","0.12em");
$("#submit-form").css("border","2px solid #0076bc");
$("#submit-form").css("margin-top","20px");

$("#submit-form" ).mouseenter(function() {
  $(this).css("background","#ffffff");
  $(this).css("color","#0076bc");
});

$("#submit-form" ).mouseleave(function() {
  $(this).css("background","#0076bc");
  $(this).css("color","#ffffff");
});

$("#submit-form" ).click(function() {
  $(".error").css("color","red");
});

$('#profession').prop("readonly", true); 

$('#profession').css({'background-color':'white','cursor':'pointer'});

$('.dropdown-toggle').css({'outline':'none','box-shadow':'0 0 0 0 rgba(0, 0, 0, 0)'});

$('.dropdown-toggle .caret').css({'margin-top':'8px','border-top':'8px solid','border-right':'8px solid transparent','border-left':'8px solid transparent'});

$('#profession,.dropdown-toggle').click(function(){
  $(".inquiry-profession-field").css({'display':'block','width':'70%','list-style-type':'none','margin-left':'0px'});
    if($(window).width() < 767)
  {
    $(".inquiry-profession-field").css({'width':'90%'});
  }
});

$(document).click(function() {
  $(".inquiry-profession-field").css('display','none');
});
