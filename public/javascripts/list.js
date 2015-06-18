/**
 * Created by Administrator on 2015/6/18.
 */
var getField = function($parent){
    return {
        "id": 0,
        "name":$parent.find("input[name='title']").val(),
        "image":$parent.find("input[name='image']").val(),
        "des":$parent.find("input[name='des']").val()
    };
};
$("#add").click(function(){
    var $add = $("#add_template");
    if($add.length===0){
        $add = $("<div id=\"add_template\"></div>");
        $add.html($("#template").html().replace(/<\$(.+)?\$>/ig,''));
        $add.find("input[type='button']").click(function(){
            $.ajax({
                url: '/product/save',
                data: getField($add),
                cache: false,
                dataType: "json",
                type: "POST",
                success: function (result) {
                    if(result.isSuccess)
                        location.reload();
                }
            });
        });
        $(this).after($add);
    }else
        $add.toggle();
    return false;
});
$("a[oper='delete']").click(function(){
    var $id = $(this).attr("rel");
    if(confirm("确定要删除吗")) {
        $.ajax({
            url: '/product/delete',
            data: {id: $id},
            cache: false,
            dataType: "json",
            type: "POST",
            success: function (result) {
                if (result.isSuccess){
                    $("div[data-id='"+$id+"']").slideUp(function(){
                        $(this).remove();
                    });
                }
            }
        });
    }
    return false;
});
$("a[oper='edit']").click(function(){
    var $id = $(this).attr("rel");
    var $parent = $(this).parent();
    var $dom = $(this).next().next("div");
    if($dom.length===0){
        $dom = $("<div type=\"edit_template\"></div>");
        var $temp = $("#template").html().replace('<$title$>',$parent.find("h3 a").text());
        $temp = $temp.replace('<$image$>',$parent.find("img").attr('src'));
        $temp = $temp.replace('<$des$>',$parent.find("p:eq(1)").text());
        $dom.html($temp);
        $dom.find("input[type='button']").click(function(){
            var postdata = getField($dom);
            postdata.id = $id;
            $.ajax({
                url: '/product/save',
                data: postdata,
                cache: false,
                dataType: "json",
                type: "POST",
                success: function (result) {
                    if(result.isSuccess)
                        location.reload();
                }
            });
        });
        $(this).next().after($dom);
    }else
        $dom.toggle();

    return false;
});