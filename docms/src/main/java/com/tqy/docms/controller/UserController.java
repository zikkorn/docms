package com.tqy.docms.controller;

import com.tqy.docms.bean.BaseStatic;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Activity;
import com.tqy.docms.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户
 **/
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 登录接口
     */
    @RequestMapping("login")
    public ResultMessage login(String userName, String userPwd, HttpServletRequest request){
    	 return userService.login(userName,userPwd,request);
    }
    
    /**
	 * 录入活动事件信息
	 */
    @RequestMapping("saveActivity")
    public ResultMessage saveActivity(Activity activity){
        return userService.saveActivity(activity);
    }
    
    /**
	     * 查询活动信息
	*/
	@RequestMapping("getActivity")
	public ResultMessage getActivity(String userId){
		return userService.getActivity(userId);
	}
    
}
