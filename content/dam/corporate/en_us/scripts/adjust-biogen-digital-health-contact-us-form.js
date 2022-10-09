$("div.flexiform div.col-md-6").addClass("col-md-offset-3");
$("div.flexiform div.col-md-6").css("max-width","100%");
$("div.flexiform div.col-md-6").css("margin-top","20px");
$("body h2").css("color","#555555");
$("div.flexiform h1").css("color","#555555");
$(".form-group:eq(6)").css("display","none");
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
