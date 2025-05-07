$(document).ready(function(){
    $("#menuToggle").hide()
    if ($(window).width() <= 768) {
        $("#menuToggle").show()
        $("#navLinks").hide()
        console.log("Screen is 768px or smaller");
      }
})

$("#menuToggle").click(function(){
    $("#navLinks").toggle()
})