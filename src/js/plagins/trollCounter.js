(function($) {

    var defaults = {
        duration:3000,
        fps:25,
        startN:0,
        endN:1000
    };
    var methods = {

        init:function(params) {
            var options = $.extend({}, defaults, params);
            return this.each(function () {

                var object =  $(this);

                var startNum = options.startN;
                var endNum = options.endN;
                if (typeof object.attr('data-start-num') !== typeof undefined && object.attr('data-start-num') !== false){ startNum = parseInt(object.attr('data-start-num'));}
                if (typeof object.attr('data-end-num') !== typeof undefined && object.attr('data-end-num') !== false){endNum = parseInt(object.attr('data-end-num'));  }


                var interval = (endNum - startNum)/options.duration;

                var currentNum = interval * (1000/options.fps);
                var showNum =currentNum;
                var timer = setInterval(function () {


                    object.text(showNum-showNum%1);
                    showNum = showNum + currentNum;
                    if (showNum>=endNum){
                        object.text(endNum);
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
