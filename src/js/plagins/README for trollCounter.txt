html
		<script type="text/javascript" src="trollCounter.js" ></script>
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
            duration=3000;  integer(miliseconds)  
            fps=25;    integer 
            startN=0;  integer
            endN=1000;  integer
            separator=" "; string  (separator for thousand (99 999 999))