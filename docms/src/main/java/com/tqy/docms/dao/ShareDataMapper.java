package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.ShareData;

public interface ShareDataMapper {
    /**
	 * 保存共享资料信息
	 */
	void saveShareData(ShareData share);
	
	/**
	 *更新共享资料信息
	 */
	int updateShareData(ShareData share);
	
	/**
	 * 查询共享资料总条数
	 * @param zllx 	资料类型
	 * @param title 标题
	 * @return
	 */
	int queryShareCount(@Param("zllx") String zllx, @Param("title") String title);

	
	List<ShareData> getShareData(@Param("start") int start, @Param("end") int end, 
			@Param("zllx") String zllx, @Param("title") String title);
	
	ShareData getShareById(String id);
	
	/**
	 * 删除共享资料信息
	 */
	void delShareById(String id);
	
}