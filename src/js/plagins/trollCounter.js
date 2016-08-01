(function($) {

    var defaults = {
        duration:3000,
        fps:25,
        startN:0,
        endN:1000,
        separator:" "
    };
    var methods = {

        init:function(params) {
            var options = $.extend({}, defaults, params);
            return this.each(function () {

                var object =  $(this);

                var startNum = options.startN;
                var endNum = options.endN;
                var duration = options.duration;
                var separator = options.separator;
                if (typeof object.attr('data-options-startN') !== typeof undefined && object.attr('data-options-startN') !== false){ startNum = parseInt(object.attr('data-options-startN'));}
                if (typeof object.attr('data-options-endN') !== typeof undefined && object.attr('data-options-endN') !== false){endNum = parseInt(object.attr('data-options-endN'));  }
                if (typeof object.attr('data-options-duration') !== typeof undefined && object.attr('data-options-duration') !== false){duration = parseInt(object.attr('data-options-duration'));  }
                if (typeof object.attr('data-options-separator') !== typeof undefined && object.attr('data-options-separator') !== false){separator = object.attr('data-options-separator');  }


                var interval = (endNum - startNum)/duration;

                var currentNum = interval * (1000/options.fps);
                var showNum =currentNum;
                var timer = setInterval(function () {

                    var str = ""+(showNum-showNum%1);
                    str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1'+separator+'');
                    object.text(str);
                    showNum = showNum + currentNum;
                    if (showNum>=endNum){
                        str = ""+endNum;
                        str = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1'+separator+'');
                        object.text(str);
                        clearInterval(timer);
                    }
                }, 1000/options.fps);
            });

        }

    };

    $.fn.trollCounter = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод "' +  method + '" не найден в плагине jQuery.trollCounter' );
        }
    };
})(jQuery);
/**
 * Created by nickolaygotsaliyk on 01.08.16.
 */
