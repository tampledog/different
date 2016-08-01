html
       <div class="item" data-start-num="0" data-end-num="10464"></div>
        data-attributes is not required.
         for exemple:
                <div class="item" ></div>
                or
                <div class="item"  data-end-num="10464"></div>
                or
                <div class="item" data-start-num="0" ></div>







initialization in js


    $(document).ready(function(){
        $('.item').trollCounter();
    });

    initialization with parameters:

        $(document).ready(function(){
                $('.item').trollCounter({
                    startN:20,
                    endN:50
                    });
            });

default parameters:
            duration=3000;
            fps=25;
            startN=0;
            endN=1000;