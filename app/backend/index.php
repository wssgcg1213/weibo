<?php
/**
 * Created by PhpStorm.
 * User: Liuchenling
 * Date: 16/1/9
 * Time: 18:39
 */

session_start();

include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );
if (!isset($_SESSION['token']['access_token'])) {
    $oauth = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
    $url = $oauth->getAuthorizeURL( WB_CALLBACK_URL );
    header("Location: $url");
    die('');
}
header('Content-Type: text/html');
echo file_get_contents('index.html');