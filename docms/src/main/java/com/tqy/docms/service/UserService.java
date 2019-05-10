package com.tqy.docms.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Activity;

/**
 * 用户
 **/
public interface UserService {

    /**
     * 登录
     */
	ResultMessage login(String userName, String userPwd, HttpServletRequest request);
    
    /**
     * 录入活动信息
     * @param activity
     * @return
     */
    ResultMessage saveActivity(Activity activity);
    
    ResultMessage getActivity(String userId);

}
