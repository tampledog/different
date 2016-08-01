html
		<script type="text/javascript" src="trollCounter.js" ></script>
       <div class="item" data-start-num="0" data-end-num="10464"></div>

        data-attributes is not required.
         for exemple:

                <div class="item" ></div>


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



parameters can be dependencing at data-attribute 
default parameters:
            duration=3000;  integer(miliseconds)                             data-options-duration
            fps=25;    integer                                               (no data-attribute)
            startN=0;  integer                                               data-options-startN
            endN=1000;  integer                                              data-options-endN
            separator=" "; string  (separator for thousand (99 999 999))     data-options-separator


             
