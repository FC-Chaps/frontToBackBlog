
$(document).on("ready", function(){
   getCommentsFromCache("http://0.0.0.0:8080/getComments")
})

$("#commentsButton").on("click", function(){
   pushCommentsToMongo("http://0.0.0.0:8080/postComments")
})


function getCommentsFromCache (url){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: url,
        success: function (data) {
            console.log(data.comments[0]);
            for(var i = 0; i >= data.comments.length-1; i+=1){
                $(".comments").append("<div><p class = 'username' id = 'username" + i + "' ></p><p class = 'contents' id = 'content" + i + "'></p><p class = 'time'></p></div>")
                 $("#username" + i ).append(data.comments[i].username);   
                 $("#content" + i ).append(data.comments[i].content); 
                 console.log("popp")
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
                },
        dataType: "JSON",
        url: url,
        success: function (data) {
           
        },
        error: function (error) {
            console.log(error);
        }
    });
}

