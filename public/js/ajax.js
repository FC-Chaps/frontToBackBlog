var writeToDom = (function(){
    return function writeToDom(content) {
        // TODO: make this function to add an id
        $(".comments").append(content)
    }
}());

$(document).on("ready", function(){
   getCommentsFromCache("http://fronttoback.herokuapp.com/getComments");
})

function formatData (user, content, date) {
    var content = '<div>' +
        '<p class="username">' + user + ': </p>' + 
        '<p class="contents">' + content + '</p>' +
        '<p class="time">' + date + '</p>' +
        '<p class="likes">0 likes</p>' +
   '</div>';
   return content;
}

$("#commentsButton").on("click", function(){
    pushCommentsToMongo("http://fronttoback.herokuapp.com/postComments")
    var user = $("#username").html();
    var content = $("#content").val();
    var date = new Date(); 
    writeToDom(formatData(user, content, date));
})

function getCommentsFromCache (url){
    $.ajax({
        type: "GET",
        dataType: "html",
        url: url,
        success: function (data) {
            $(".comments").empty();
            console.log(data);
            writeToDom(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function pushCommentsToMongo (url){
    $.ajax({
        type: "POST",
        data:{
            comment_content: $('#content').val(),
            postId: $("#postId").val()
        },
        dataType: "JSON",
        url: url,
        complete: function (data) {

        },
        error: function (error) {
            console.log(error);
        }
    });
}

