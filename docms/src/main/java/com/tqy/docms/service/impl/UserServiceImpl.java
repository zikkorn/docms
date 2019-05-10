package com.tqy.docms.service.impl;

import com.tqy.docms.bean.BaseStatic;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.dao.UserMapper;
import com.tqy.docms.entity.Activity;
import com.tqy.docms.entity.User;
import com.tqy.docms.service.UserService;
import com.tqy.docms.util.StringUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 用户
 **/
@Service
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserMapper userMapper;

    @Override
    public ResultMessage login(String userName, String userPwd, HttpServletRequest request) {
    	User user = userMapper.getUserByName(userName, userPwd);
    	String userId = user.getId();
        String roleName = userMapper.getRoleByUser(userId);
        Map<String, String> map = new HashMap<String, String>();
        map.put("userId", userId);
        map.put("roleName", roleName);
        request.getSession().setAttribute("user", user.getUsername());
        logger.debug("用户"+userName+"登录成功");
        return new ResultMessage(BaseStatic.SUCCESS_CODE, "登录成功",map);
    }
    
	@Override
	public ResultMessage saveActivity(Activity activity) {
		String id = StringUtil.getUUID();
		activity.setId(id);
		userMapper.saveActivity(activity);
        logger.info("录入活动信息成功");
        return new ResultMessage(BaseStatic.SUCCESS_CODE, "录入成功");
	}
	
	@Override
	public ResultMessage getActivity(String userId) {
		String roleName = userMapper.getRoleByUser(userId);
		List<Activity> list = new ArrayList<Activity>();
		if(roleName.equals("超级用户")) {
			list = userMapper.getAdminActivity(userId);
		}else {
			list = userMapper.getUserActivity(userId);
		}
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询活动信息成功", list);
	}

}
