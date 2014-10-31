var writeToDom = (function(){
    return function writeToDom(content) {
        // TODO: make this function to add an id??
        $(".comments").append(content)
    }
}());

$(document).on("ready", function(){
   getCommentsFromCache("http://0.0.0.0:8080/getComments");
})

$("#commentsButton").on("click", function(){
    var user = $("#username").html()
    var content = $("#content").val()
    var date = new Date();

    pushCommentsToMongo("http://0.0.0.0:8080/postComments")
    $("#content").val("");
    writeToDom(user, content, date);  
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

