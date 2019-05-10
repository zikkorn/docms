package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.DailyOffice;

public interface DailyMapper {
	
	/**
	 * 保存日常办公信息
	 */
	void saveDailyOffice(DailyOffice daily);
	
	/**
	 *更新日常办公信息
	 */
	int updateDailyOffice(DailyOffice daily);
	
	/**
	 * 查询日常办公总条数
	 * @param gwlx 	公文类型
	 * @param fbdw 	发布单位
	 * @param theme	主题
	 * @return
	 */
	int queryDailyCount(@Param("gwlx") String gwlx, @Param("fbdw") String fbdw, @Param("theme") String theme);

	
	List<DailyOffice> getDailyOffice(@Param("start") int start, @Param("end") int end, 
			@Param("gwlx") String gwlx, @Param("fbdw") String fbdw, @Param("theme") String theme);
	
	DailyOffice getDailyById(String id);
	/**
	 * 删除日常办公信息
	 */
	void delDailyById(String id);
}
