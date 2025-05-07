$(document).ready(function(){
    $("#game").hide()    
})

var score = 0;

$("#startBtn").click(function(){
    $("#start").hide()
    $("#playerIn").val('')
    $("#game").show()
    fetch('../js/quests.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // or response.text() / response.blob() based on the expected data
        })
        .then(data => {
            // console.log('Data received:', data);
            const int = Math.floor(Math.random() * data.length)
            // console.log(data[int])
            // $("#article").text("'____'")
            $("#tense").text(data[int].tense)
            $("#pronoun").text(data[int].pronoun)
            $("#inf").text(data[int].infinitive)
            $("#quest").text(data[int].empty)
            $("#playerIn").data("verb", data[int].verb)
            $("#playerIn").val("", data[int].verb)
            // You can call another function to handle this data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });            
})

function parseInput() {
  const accents = {
    'a': 'á',
    'e': 'é',
    'i': 'í',
    'o': 'ó',
    'u': 'ú',
    'A': 'Á',
    'E': 'É',
    'I': 'Í',
    'O': 'Ó',
    'U': 'Ú',
    'n': 'ñ',
    'N': 'Ñ'
  }
  const raw = $("#playerIn").val()
  const indiT = raw.indexOf("~")
  const indiA = raw.indexOf("'")
  if (raw.includes("'") && accents[raw[indiA-1]]) {
    const start = raw.slice(0,(indiA-1))
    const end = raw.slice(indiA+1)
    let parsedInput = (start + accents[raw[indiA-1]] + end)
    $("#playerIn").data("newInput", parsedInput)
  } else if (raw.includes("~") && accents[raw[indiT-1]]) {
    const start = raw.slice(0,(indiT-1))
    const end = raw.slice(indiT+1)
    let parsedInput = (start + accents[raw[indiT-1]] + end)
    $("#playerIn").data("newInput", parsedInput)
  } else {
    let parsedInput = raw
    $("#playerIn").data("newInput", parsedInput)
  }
}

$('#submit').click(function(){
    parseInput()
    if ($("#playerIn").data("newInput").toLowerCase() === $("#playerIn").data("verb").toLowerCase()) {
        $("#message").html("<h3>Correct. Great job!</h3>");
        score++
        // console.log(score)
        $("#score").text("Score: " + score);
        fetch('../js/quests.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            $("#playerIn").val('')
            return response.json(); // or response.text() / response.blob() based on the expected data
        })
        .then(data => {
            // console.log('Data received:', data);
            const int = Math.floor(Math.random() * data.length)
            // console.log(data[int])
            // $("#article").text("'____'")
            $("#tense").text(data[int].tense)
            $("#pronoun").text(data[int].pronoun)
            $("#inf").text(data[int].infinitive)
            $("#quest").text(data[int].empty)
            $("#playerIn").data("verb", data[int].verb)
            // You can call another function to handle this data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        
    }
    if ($("#playerIn").data("newInput").toLowerCase() !== $("#playerIn").data("verb").toLowerCase()) {
        // console.log($("#playerIn").data("newInput").toLowerCase())
        // console.log($("#playerIn").data("verb").toLowerCase())
        $("#message").html("<h3>Incorrect. Dont't give up, try again!</h3>");
        
    }
})
