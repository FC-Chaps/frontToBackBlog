
$(document).on("ready", function(){
   getCommentsFromCache("http://frontoback.herokuapp.com/getComments")
})

$("#commentsButton").on("click", function(){
   pushCommentsToMongo("http://frontoback.herokuapp.com/postComments")
})


function getCommentsFromCache (url){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: url,
        success: function (data) {
            for(var i = data.length; i < data.length; i --){
                $("#comments").append("<div><p class = 'username' id = 'username" + i "' ></p><p class = 'contents' id = 'content" + i "'></p><p class = 'time'></p></div>")
                 $("#username" + i ).append(data[i].username);   
                 $("#content" + i ).append(data[i].content); 
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
                user_name: $('#username').val(),
                comment_content: $('#content').val(),
                },,
        dataType: "JSON",
        url: url,
        success: function (data) {
           
        },
        error: function (error) {
            console.log(error);
        }
    });
}

