function videoThree(block){

    $(block).each(function() { //initializating all videos

        var src = $(this).data('video');
        var poster = $(this).data('poster');

        /*var video = document.createElement('video');
        video.src = 'video/megaVideo.mp4';
        video.poster = true;
        video.preload = 'metadata';
        $(this).find('.video-wrap-container').append(video);*/

        var video = $('<video />',{
            src: src,
            preload:'none',
            poster: poster,
            controls:false
        });
        $(this).find('.video-wrap-container').append(video);

        var parentBlock = $(this);
        var currentVideoBlock = $(this).find('video');
        var currentVideo = currentVideoBlock.get(0);

        currentVideo.ontimeupdate = function(){
            updateVideoTime(parentBlock, currentVideoBlock, currentVideo);

        };

        currentVideo.onprogress = function(){
            loadedVideo(parentBlock, currentVideoBlock, currentVideo);
        };

        currentVideo.oncanplay = function(){
            videoDuration(currentVideoBlock, currentVideo);
        };

    });

    //

    function updateVideoTime(parent, videoBlock, video){
        var currentTimeField = parent.find('.current-time');
        var currentTime = parseInt(video.currentTime);
        var videoDuration = parseInt(video.duration);
        var currentSeconds = currentTime - (parseInt(currentTime/60))*60;
        var currentMinutes = parseInt(currentTime/60);
        var currentHours = parseInt(currentTime/3600);
        if(currentSeconds<10){
            currentSeconds='0'+currentSeconds;
        }
        if(currentMinutes<10){
            currentMinutes='0'+currentMinutes;
        }
        if(currentHours<10){
            currentHours='0'+currentHours;
        }
        currentTimeField.text(currentHours+':'+currentMinutes+':'+currentSeconds);

        var currentTimeLine = parent.find('.video-time-line').width();
        var point = (currentTime * currentTimeLine)/videoDuration;

        scrollVideoLineWidth(parent, point);
    };

    function scrollVideoLineWidth(parent, point){
        var currentTimeLine = parent.find('.video-time-line').width();
        var percCurrentTimeLine = (point * 100)/currentTimeLine;
        parent.find('.video-time-line-current').width(percCurrentTimeLine+'%');
    }

    //

    function videoDuration(videoBlock, video){
        var parent = videoBlock.parents('.video-wrap-main');
        var currentTimeField = parent.find('.end-time');
        var durationTime = parseInt(video.duration);
        var currentSeconds = durationTime - (parseInt(durationTime/60))*60;
        var currentMinutes = parseInt(durationTime/60);
        var currentHours = parseInt(durationTime/3600);
        if(currentSeconds<10){
            currentSeconds='0'+currentSeconds;
        }
        if(currentMinutes<10){
            currentMinutes='0'+currentMinutes;
        }
        if(currentHours<10){
            currentHours='0'+currentHours;
        }
        currentTimeField.text(currentHours+':'+currentMinutes+':'+currentSeconds);
    }

    //

    function loadedVideo(parent, videoBlock, video){
        var buffered = parseInt(video.buffered.end(0));
        var videoDuration = parseInt(video.duration);
        var lineWidth = parent.find('.video-time-line').width();
        var point = (((lineWidth * buffered)/videoDuration)*100)/lineWidth;
        parent.find('.video-time-line-load').width(point+'%');
    }

    //

    $('.play-pause-video').bind('click.loadVideo', function(){
        var parent = $(this).parents('.video-wrap-main');
        var videoTime = parent.find('.video-time');
        var video = parent.find('video').get(0);
        video.load();
        console.log(parent.find('.volume-line-current').width());
        video.volume = parseInt(parent.find('.volume-line-current').width());
        videoTime.addClass('i-see-you');
    });

    //

    $(document).on('click','.play-pause-video', function(){

        var parent = $(this).parents('.video-wrap-main');
        var video = parent.find('video').get(0);
        var videoTime = parent.find('.video-time');

        if($(this).is('.active')){
            $(this).removeClass('active');
            video.pause();
        }
        else{
            $(block).each(function() {
                if($(this).find('.play-pause-video').is('.active')){
                    $(this).find('.play-pause-video').removeClass('active');
                    $(this).find('video').get(0).pause();
                }
            });
            $(this).addClass('active');
            $(this).unbind('.loadVideo');

            video.play();
        }
    });

    //

    function setVideoParams(parentClass, line){

        var checking = 0;

        $(document).on('click', line, function(e){

            var parent = $(this).parents(parentClass);
            var position = e.offsetX;
            var video = parent.find('video').get(0);
            if(line == '.video-time-line'){
                scrollVideoLineWidth(parent, position);
                video.currentTime = parseInt((position * parseInt(video.duration))/parent.find('.video-time-line').width());
                parent.find('.play-pause-video').addClass('active');
                parent.find('.video-time').addClass('i-see-you');
            }
            else if(line == '.volume-line'){
                $(this).find('.volume-line-current').width((position * 100)/parent.find('.volume-line').width()+'%');
                video.volume = position/parent.find('.volume-line').width();
            }

        });

        $(document).on('mousedown',line,function(){
            checking = 1;
            var video = $(this).parents(parentClass).find('video').get(0);
            if(line == '.video-time-line'){
                video.pause();
                $(this).parents(parentClass).find('.play-pause-video').addClass('active');
                $(this).parents(parentClass).find('.video-time').addClass('i-see-you');
            }
        });

        $(document).on('mouseup',line,function(){
            checking = 0;
            if(line == '.video-time-line'){
                $(this).parents(parentClass).find('video').get(0).play();
            }
        });

        $(document).on('mouseleave', line, function(){
            if(checking == 1){
                checking = 0;
                if(line == '.video-time-line'){
                    $(this).parents(parentClass).find('video').get(0).play();
                }
            }
        });

        $(document).on('mousemove',line,function(e){
            var parent = $(this).parents(parentClass);
            var video = parent.find('video').get(0);
            var point = e.offsetX;
            if(point<0){
                point=0;
            }
            if(point> parent.find(line).width()){
                point = parent.find(line).width();
            }
            if(checking != 0){
                if(line == '.video-time-line'){
                    scrollVideoLineWidth(parent, point);
                    video.currentTime = parseInt((point * parseInt(video.duration))/parent.find('.video-time-line').width());
                }
                else if(line == '.volume-line'){
                    parent.find(line+' .volume-line-current').width((point*100)/parent.find(line).width()+'%');
                    video.volume = point/parent.find(line).width();
                }
            }
        });

    }

   setVideoParams(block, '.video-time-line');
   setVideoParams(block, '.volume-line');

    //

    function videoTimeLineWidth(parent){

        function setTimeLineWidth(){
            $(parent).each(function(){
                $(this).find('.video-time-line').removeAttr('style');
                var parentWidth = $(this).find('.video-controls').width();
                var lineWidth = parentWidth - $(this).find('.static-controls.left').width()-$(this).find('.static-controls.right').width();
                $(this).find('.video-time-line').width(lineWidth);
            });
        }

        $(document).on('click','.fullscreen-icon',function(){

            var parentBlock = $(this).parents('.video-wrap-main');

            if(!$(this).is('.active')){
                $(this).addClass('active');
                $('body').addClass('overflow');
                parentBlock.addClass('fullscreen');
            }
            else{
                $(this).removeClass('active');
                $('body').removeClass('overflow');
                parentBlock.removeClass('fullscreen');
            }

            setTimeLineWidth(parentBlock);
        });

        setTimeLineWidth(block);

        $(window).resize(function(){
            setTimeLineWidth();
        });

    };

    videoTimeLineWidth(block);

}



$(document).ready(function(){

});
$(window).load(function(){

    videoThree('.video-wrap-main');

});