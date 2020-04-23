$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="each__disply" data-message-id=${message.id}>
                    <div class="comenter">
                      <div class="comenter--username">
                        ${message.user_name} 
                      </div>
                      <div class="comenter--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message">
                      <p class="messages">
                        ${message.content}
                      </p>
                    </div>
                    <img class="messages__image" src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="each__disply" data-message-id=${message.id}>
                    <div class="comenter">
                      <div class="comenter--username">
                        ${message.user_name} 
                      </div>
                      <div class="comenter--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message">
                      <p class="messages">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html =buildHTML(data);
      $('.main__disply').append(html);
      $('.main__disply').animate({ scrollTop: $('.main__disply')[0].scrollHeight});
      $('#message_content').val("");
      $('.send--btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
  var reloadMessages = function(){
    if(window.location.href.match(/messages/)){
    var last_message_id = $('.each__disply:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main__disply').append(insertHTML);
        $('.main__disply').animate({ scrollTop: $('.each__disply')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
    }
  };
    setInterval(reloadMessages, 7000);
});