$(function (){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data: {
            page: 1,
            pageSize: 5
          },
        dataType:'json',
        success:function (info){
             console.log(info);
             var str =template('tmp',info);
             $('tbody').html(str);
        }

    })
})