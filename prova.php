<?php


    $intestazione   = file_get_contents("Commons/intestazione.html");
    $content        = file_get_contents("Pagine/Content/clienti.html");
    $pie            = file_get_contents("Commons/pie.html");

    echo $intestazione;
    echo $content;
    echo $pie;
    
    


?>