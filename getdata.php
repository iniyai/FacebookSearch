<?php
  $defaultaccess = 'EAAI37UaVnMkBAAHzrF6ypfcCEKlkEbxSDsok87ETZBbY7KcALZB1NolTggvxjSXjJCierGCnisXOBZAwVVd9XIWmu9ZBQTMTXIHHb2sAbhEbmjswl28T3YAW2dK0CZAvbG1qq55L9swgZC7TiKGSoTrcFbyV4HhWQZD';
  if(isset($_GET['req']) && ($_GET['req'] == 1)){
    if(isset($_GET['keyw'])) {
      $keyword = $_GET['keyw'];
      $keyword = trim($keyword);
      $keyword = str_replace(" ", "+", $keyword);
    }
    else {
      $keyword = "USC";
    }
    if(isset($_GET['typ'])) {
      $type = $_GET['typ'];
      $type= trim($type);
      $type = str_replace(" ", "+", $type);
    }
    else {
      $type = "user";
    }
    if(isset($_GET['offset'])) {
      $offset = $_GET['offset'];
      $offset= trim($offset);
    }
    else {
      $offset = "0";
    }
    if($type == 'place' && isset($_GET['center'])) {
      $offset = $_GET['offset'];
      $offset= trim($offset);
      $url = 'https://graph.facebook.com/v2.8/search?center=' . $_GET['center'] .'&q='. $keyword .'&type='. $type . '&offset=' . $offset .'&limit=25&fields=id,name,picture.width(700).height(700)'.'&access_token='.$defaultaccess;
    }
    else {
      $url = 'https://graph.facebook.com/v2.8/search?q='. $keyword .'&type='. $type .'&offset=' . $offset .'&limit=25&fields=id,name,picture.width(700).height(700)'.'&access_token='.$defaultaccess;
    }
    $fbRes = file_get_contents($url);
    echo $fbRes;
  }
  else if(isset($_GET['req']) && ($_GET['req'] == 2)){
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $id = trim($id);
        $id = str_replace(" ", "_", $id);
      }
      else {
        $id = "124984464200434";
      }
      $url = 'https://graph.facebook.com/v2.8/'. $id .'?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)'.'&access_token='.$defaultaccess;
      $fbRes = file_get_contents($url);
      echo $fbRes;
    }
    else if(isset($_GET['req']) && ($_GET['req'] == 3)){
      if(isset($_GET['keyw'])) {
        $keyword = $_GET['keyw'];
        $keyword = trim($keyword);
        $keyword = str_replace(" ", "+", $keyword);
      }
      else {
        $keyword = "USC";
      }
      if(isset($_GET['typ'])) {
        $type = $_GET['typ'];
        $type= trim($type);
        $type = str_replace(" ", "+", $type);
      }
      else {
        $type = "user";
      }
      if(isset($_GET['offset'])) {
        $offset = $_GET['offset'];
        $offset= trim($offset);
      }
      else {
        $offset = "0";
      }
      $url = 'https://graph.facebook.com/v2.8/search?center=' . $_GET['center'] .'&q='. $keyword .'&type='. $type . '&offset=' . $offset .'&limit=25&fields=id,name,picture.width(700).height(700)'.'&access_token='.$defaultaccess;
      $fbRes = file_get_contents($url);
      echo $fbRes;
    }
  else {
      echo "No data";
  }
?>
