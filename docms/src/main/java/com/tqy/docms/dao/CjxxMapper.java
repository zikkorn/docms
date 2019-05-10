package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.Cjxx;

public interface CjxxMapper {
    int delCjxxById(String id);

    int saveCjxx(Cjxx cjxx);

    Cjxx getCjxxById(String id);

    int updateCjxx(Cjxx cjxx);
    
    int queryCjxxCount(@Param("czdw") String czdw,@Param("gyzgbm") String gyzgbm);
	
	List<Cjxx> getCjxx(@Param("start") int start, @Param("end") int end,
			@Param("czdw") String czdw,@Param("gyzgbm") String gyzgbm);
	
}