<?php

    $file_extension=array("python"=>"py", "c++"=>"cpp", "c"=>"c");

    $language = isset($_POST['language']) ? $_POST['language'] : 'null';
    $sourceCode = isset($_POST['sourceCode']) ? $_POST['sourceCode'] : 'null';
    $input = isset($_POST['input']) ? $_POST['input'] : 'null';

    // echo("Language : ".$language."<br>");
    // echo("Source Code : ".$sourceCode."<br>");
    // echo("Input : ".$input."<br>");
    // echo("File Extension : ".$file_extension[$language]."<br><br>");

    $folder = "sessions/".strval(time());

    if (!file_exists($folder)) {

        //Create the folder
        mkdir($folder, 0777, true);
        
        // Create the files
        file_put_contents($folder."/program.".$file_extension[$language], $sourceCode);
        file_put_contents($folder."/input.txt", $input);
        copy("scripts/".$language."_script.sh", $folder."/script.sh");

        // Run Docker
        shell_exec('powershell docker run --rm -v ${PWD}/'.$folder.':/home/usercode -w /home/usercode virtual_machine');
        while (!file_exists($folder."/output.txt")) {
            sleep(1);
        }
        
        
        echo file_get_contents($folder."/output.txt");

    }
    else{
        echo "Folder Exists. Possibly unning to fast";
    }
    
?>