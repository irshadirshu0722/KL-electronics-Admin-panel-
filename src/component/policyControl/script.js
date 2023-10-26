import {$} from 'jquery'

export const script  = ()=>{
    $(document).ready(function (){
         $('.autoresizing').on('input', function () {
        this.style.height = 'auto';

        this.style.height =
            (this.scrollHeight) + 'px';
    });
    })
   
}