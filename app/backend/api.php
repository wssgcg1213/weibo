<?php
/**
 * Created by PhpStorm.
 * User: Liuchenling
 * Date: 16/1/22
 * Time: 16:24
 */
session_start();
header("Content-Type: application/json");

function json($obj) {
    return json_encode($obj);
}

include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

if (!isset($_POST['api'])) {
    die(json(array(
        'status' => 400,
        'info' => '无效请求'
    )));
}
$api = $_POST['api'];

if (!isset($_SESSION['token']['access_token'])) {
    die(json(array(
        'status' => 400,
        'info' => '登陆失效, 请重新登陆'
    )));
}

$saeClient = new SaeTClientV2( WB_AKEY , WB_SKEY , $_SESSION['token']['access_token'] );

switch ($api) {
    case 'timeline': die(json(getTimeLine($saeClient))); break;
    case 'userinfo': die(json(getUserInfo($saeClient))); break;
    default: die(json(array('status' => 400, info => "mathod not found")));
}


//method definitions
function getTimeLine ($saeClient) {
    return $saeClient->home_timeline(1, 30); // timeline
}

function getUserInfo ($saeClient) {
    $uid_info = $saeClient->get_uid();
    $userInfo = $saeClient->show_user_by_id($uid_info['uid']);//根据ID获取用户等基本信息
    return $userInfo;
}