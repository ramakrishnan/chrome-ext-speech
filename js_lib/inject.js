chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(sender.tab) {
    } else {
      if(request.init == "speech") {
        $("div, span, p, a")
          .on('mousemove', selectDon)
          .on('mouseout', deSelectDon)
          .on('click', readText);
        }
    }
  });

function deSelectDon(event) {
  $(event.target)
    .removeClass('js-selected');
}

function selectDon(event) {
    $(event.target)
      .addClass('js-selected');
}

function readText(e) {
  e.preventDefault();
  if($(e.target).hasClass('js-selected')) {
    $("div, span, p, a")
      .off('click')
      .off('mousemove');
    if ($(e.target).children().length < 10) {
      var text = $.trim($(e.target).text());
      text = text.replace(/(\r\n|\n|\r|\t)/gm,"")
      playThis(text);
    } else {
      alert("The selected area is too deep.")
    }
  }
}

function playThis(message) {
  var blocks = message.split(' ');
  var charCount = 0;
  var longStr = [];
  // Logic to split the words into blocks which will be a best fit for API
  // TODO add a better logic to consider punctuations and group words accordingly.
  for (i=0; i < blocks.length; i++) {
      if ((charCount + blocks[i].length ) < 100) {
        charCount = charCount + blocks[i].length;
        longStr.push(blocks[i]);
      } else {
        i--;
        playAudio(longStr.join(' '))
        longStr = []
        charCount = 0
      }
  }
  if (longStr.length > 0) {
    playAudio(longStr.join(' '))
  }
}

function playAudio(textMessage) {
  var msg = new SpeechSynthesisUtterance(textMessage);
  window.speechSynthesis.speak(msg);
}
