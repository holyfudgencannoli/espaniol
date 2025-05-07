$(document).ready(function(){
    $("#game").hide()    
})

var score = 0;

$("#startBtn").click(function(){
    $("#start").hide()
    $("#playerIn").val('')
    $("#game").show()
    fetch('../js/Gender.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // or response.text() / response.blob() based on the expected data
        })
        .then(data => {
            // console.log('Data received:', data);
            const int = Math.floor(Math.random() * 100)
            // console.log(data[int])
            $("#article").text("'____'")
            $("#noun").text(data[int].noun)
            $("#playerIn").data("article", data[int].article)
            // You can call another function to handle this data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });            
})

$('#submit').click(function(){
    if ($("#playerIn").val().toLowerCase() === $("#playerIn").data().article) {
        $("#message").html("<h3>Correct. Great job!</h3>");
        score++
        console.log(score)
        $("#score").text("Score: " + score);
        fetch('../js/Gender.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // or response.text() / response.blob() based on the expected data
        })
        .then(data => {
            // console.log('Data received:', data);
            $("#playerIn").val("");    
            const int = Math.floor(Math.random() * 100)
            // console.log(data[int])
            $("#article").text("'____'")
            $("#noun").text(data[int].noun)
            $("#playerIn").data("article", data[int].article)
            // You can call another function to handle this data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        
    }
    if ($("#playerIn").val().toLowerCase() !== $("#playerIn").data().article) {
        $("#message").html("<h3>Incorrect. Dont't give up, try again!</h3>");
        
    }
})
