package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.Activity;
import com.tqy.docms.entity.User;

public interface UserMapper {

    User getUserByName(@Param("userName") String userName, @Param("userPwd") String userPwd);
    
    /**
     * 获取用户角色
     * @param userId
     * @return
     */
    String getRoleByUser(@Param("userId") String userId);
    
    /**
	 * 录入活动信息
	 * @param activity
	 */
	void saveActivity(Activity activity);
	
	List<Activity> getAdminActivity(String userId);
	
	List<Activity> getUserActivity(String userId);

}

