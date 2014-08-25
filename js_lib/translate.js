$(document).ready(function() {
        $("#speak").on('click', playThis);
        timeOut = 0;
        index = -1;
        toSpeak = [];
        vs = $('#audio_content');
        vt = $('#vtag');
        $(vt).on('loadedmetadata', function(e) {
          timeOut = e.currentTarget.duration * 1000;
          if (toSpeak.length > 0) {
            index = index + 1;
            if (index < toSpeak.length ) {
              setTimeout(function() {
                playAudio(toSpeak[index])
              }, timeOut);
            }
          }
        });
      });

      function playThis() {
        var message = $("#content").val();
        var blocks = message.split(' ');
        var charCount = 0;
        var longStr = [];
        // Logic to split the words into blocks which will be a best fit for
        // Google translate API
        for (i=0; i < blocks.length; i++) {
            if ((charCount + blocks[i].length + 1) < 100) {
              charCount = charCount + blocks[i].length + 1;
              longStr.push(blocks[i]);
            } else {
              i--;
              toSpeak.push(longStr.join(' '))
              longStr = []
              charCount = 0
            }
        }
        if (longStr.length > 0) {
          toSpeak.push(longStr.join(' '))
        }
        playAudio(toSpeak.shift());
      }

      function playAudio(textMessage) {
        textMessage = escape(textMessage);
        var inputAudio = "https://translate.google.co.in/translate_tts?ie=UTF-8&q="+ textMessage + "&tl=en&total=1&idx=0&textlen=5&client=t&prev=input";
          vs.attr('src', inputAudio);
          vt.get(0).load();
          // vt.get(0).play();
      }
