function getFromCache (url){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: url,
        success: function (data) {
            // do something with your data
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function pushToMongo (url){
    $.ajax({
        type: "POST",
        data: JSON.parse(data),
        dataType: "JSON",
        url: url,
        success: function (data) {
            // do something with your data
        },
        error: function (error) {
            console.log(error);
        }
    });
}
