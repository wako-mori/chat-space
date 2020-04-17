$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="each__disply">
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
                    <img src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="each__disply">
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
});