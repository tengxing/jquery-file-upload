$(function(){

    var ul = $('#upload ul');

    $('#drop a').click(function(){
        $(this).parent().find('input').click();
    });

    // Init
    $('#upload').fileupload({

        url:"file/upload",
        sequentialUploads:true,

        dropZone: $('#drop'),

        add: function (e, data) {

            var tpl = $('<li class="working"><input type="text" value="0" data-width="48" data-height="48"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#00BCD4" /><p></p><span></span></li>');

            tpl.find('p').text(data.files[0].name)
                         .append('<i>' + formatFileSize(data.files[0].size) + '</i>');

            data.context = tpl.appendTo(ul);

            tpl.find('input').knob();

            tpl.find('span').click(function(){

                if(tpl.hasClass('working')){
                    jqXHR.abort();
                }

                tpl.fadeOut(function(){
                    tpl.remove();
                });

            });

            var jqXHR = data.submit()
                .success(function (e, data){})
                .error(function (e,data){alert("error")})
                .complete();
        },

        progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);
            data.context.find('input').val(progress).change();

            if(progress == 100){
                data.context.removeClass('working');
            }
        },

        fail:function(e, data){
            data.context.addClass('error');
        }

    });


    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });
    
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }
        return (bytes / 1000).toFixed(2) + ' KB';
    }

});