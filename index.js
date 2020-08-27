 $('#btn').click(() => {
    let text = $('#text').val()
    if(text.length == 0){
        window.alert('Please Enter Text in the Text Area')
        return
    }
    clearTable()
    let words = getWords(text)
    let wordCounts = getWordCounts(words)
    let sortedWordCounts = wordCounts.sort((a,b) => b[1]-a[1])
    printTable(sortedWordCounts)
    generateChart(sortedWordCounts)
}) 

function getWords(text){
    text = text.toLowerCase()
    text = text.replace("[\t\n\r]",' ')
    let chars = text.split('')
    let newText = ''
    for(let ch of chars){
        if(ch>='a'&&ch<='z'){
            newText+=ch
        }
        else if(ch==' '){
            newText+=' '
        }
    }
    return newText.split(' ')
}

function getWordCounts(words){
    let wordCounts = {}
    for(let word of words){
        if(wordCounts[word] == null){
            wordCounts[word] = 1
        }
        else{
            wordCounts[word] += 1
        }
    }
    let wordCountsArray = []
    Object.keys(wordCounts).forEach((word) => wordCountsArray.push([word,wordCounts[word]]))
    return wordCountsArray.slice(0,50)
}

function printTable(wordCounts){
      let table = $('#wc-table')
      table.append(
          $('<tr>').append($('<th>').text('Word'))
                   .append($('<th>').text('Frequency'))
      )
      wordCounts.forEach((wordCount) => {
          table.append(
              $('<tr>').append($('<td>').text(wordCount[0]))
             .append($('<td>').text(wordCount[1]))
          )
      })
}

function generateChart(wordCounts){
    var ctx = document.getElementById('wc-chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: wordCounts.map((wordCount) => wordCount[0]),
            datasets: [{
                label: 'Word Frequency Chart',
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                data: wordCounts.map((wordCount) => wordCount[1])
            }]
        },
    });
}

function clearTable(){
    let rows = $('#wc-table').children('tr')
    for(let row of rows){
        row.remove()
    }
    
}