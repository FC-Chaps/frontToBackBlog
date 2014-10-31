var writeToDom = (function(){
    var counter = 0;
    return function writeToDom(username, content) {
        if(typeof username === undefined){
            var username = "anonymouse";
        }
        $(".comments").append("<div><p class = 'username' id = 'username" + counter + "' ></p><p class = 'contents' id = 'content" + counter + "'></p><p class = 'time'></p></div>")
        $("#username" + counter ).append(username + " says:");   
        $("#content" + counter ).append(content); 
        $("#time" + counter).append(date);
        counter+=1
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
        dataType: "JSON",
        url: url,
        success: function (data) {
            $(".comments").empty();
            console.log(data.comments);
            for(var i = 0; i <= data.comments.length-1; i+=1){
                writeToDom(data.comments[i].username, data.comments[i].content, data.comments[i].date);
            } 
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

