<?php
/**
 * Created by PhpStorm.
 * User: Liuchenling
 * Date: 16/1/22
 * Time: 16:24
 */
session_start();
include_once('config.php');
include_once('saetv2.ex.class.php');

class Api {
    private $saeClient;
    private $apiType;
    private $accessToken;
    private $req_error;
    private $login_error;
    private $method_not_found ;

    /**
     * 构造函数
     */
    function __construct () {
        $this->req_error = array('status' => 400, 'info' => '无效请求');
        $this->login_error = array('status' => 400, 'info' => '登陆失效, 请重新登陆');
        $this->method_not_found = array('status' => 400, 'info' => 'method not found');

        $this->preCheck();
        $this->saeClient = new SaeTClientV2(WB_AKEY, WB_SKEY, $this->accessToken);
        $this->route($this->apiType);
    }

    /**
     * HOOK FUNC: 预先检测
     */
    private function preCheck () {
        if (!isset($_POST['api'])) {
            $this->ajaxReply($this->req_error);
        } else if (!isset($_SESSION['token']['access_token'])) {
            $this->ajaxReply($this->login_error);
        } else {
            $this->accessToken = $_SESSION['token']['access_token'];
            $this->apiType = $_POST['api'];
            $this->postData = isset($_POST['data']) ? $_POST['data'] : null;
        }
    }

    private function route ($api) {
        $result = $this->method_not_found;
        switch ($api) {
            case 'timeline':
                $result = $this->getTimeLine($this->postData);
                break;

            case 'userinfo':
                $result = $this->getUserInfo($this->postData);
                break;
        }

        $this->ajaxReply($result);
    }

    private function ajaxReply($obj) {
        header("Content-Type: application/json");
        echo json_encode($obj);
        die('');
    }

    private function getTimeLine ($data) {
        $data = json_decode($data, true);
        $page = $data['page'] ? $data['page'] : 1;
        $count = $data['count'] ? $data['count'] : 30;
        return $this->saeClient->home_timeline($page, $count); // timeline
    }

    private function getUserInfo ($data) {
        $uid_info = $this->saeClient->get_uid();
        $userInfo = $this->saeClient->show_user_by_id($uid_info['uid']);//根据ID获取用户等基本信息
        return $userInfo;
    }

}

new Api();