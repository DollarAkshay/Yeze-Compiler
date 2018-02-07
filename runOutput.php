<?php

    error_reporting(E_ERROR);
    header("Content-Type: application/json");

    $file_extension=array("python"=>"py", "c++"=>"cpp", "c"=>"c");

    $result = (object)[];
    $language = isset($_POST['language']) ? $_POST['language'] : 'null';
    $sourceCode = isset($_POST['sourceCode']) ? $_POST['sourceCode'] : 'null';
    $input = isset($_POST['input']) ? $_POST['input'] : 'null';

    // echo("Language : ".$language."<br>");
    // echo("Source Code : ".$sourceCode."<br>");
    // echo("Input : ".$input."<br>");
    // echo("File Extension : ".$file_extension[$language]."<br><br>");

    $folder = "sessions/".str_replace(" ", "_", strval(microtime()));

    if (!file_exists($folder)) {

        //Create the folder
        mkdir($folder, 0777, true);
        
        // Create the files
        file_put_contents($folder."/program.".$file_extension[$language], $sourceCode);
        file_put_contents($folder."/input.txt", $input);
        copy("scripts/".$language."_script.sh", $folder."/script.sh");

        // Run Docker
        shell_exec('powershell docker run -m 512M --rm --mount type=bind,source=${PWD}/'.$folder.',target=/home/usercode -w /home/usercode virtual_machine');
        while (!file_exists($folder."/output.txt")) {
            sleep(1);
        }
        

        $fileExec = file($folder."/status.txt", FILE_IGNORE_NEW_LINES);
        foreach ($fileExec as &$line) {
            if ( preg_match("/^real/", $line) ){
                $result->execTime = substr($line, strpos($line, 'm')+1, -1) ;
                break;
            }
        }

        
        $result->output = file_get_contents($folder."/output.txt");
        echo json_encode($result);

    }
    else{
        echo "Folder Exists. Possibly unning to fast";
    }
    
?>