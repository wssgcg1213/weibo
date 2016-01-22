<?php
session_start();
header("ContentType: text/html");
include_once( 'config.php' );
include_once( 'saetv2.ex.class.php' );

$oauth = new SaeTOAuthV2( WB_AKEY , WB_SKEY );

$token = null;
if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = WB_CALLBACK_URL;
	try {
		$token = $oauth->getAccessToken( 'code', $keys ) ;
	} catch (OAuthException $e) {
	}
}

if ($token) {
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$oauth->client_id, http_build_query($token) );
	$url = 'http://weibo.ilcl.me/';
	echo '授权完成, 进入你的微博列表页';
	echo "<script>location.href = '$url';</script>";
} else {
	echo '授权失败。';
}
