package com.tqy.docms.dao;

import com.tqy.docms.entity.Gbgrxx;
import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface GbgrxxMapper {
	
	int saveGbgrxx(Gbgrxx grxx);
	
	int updateGbgrxx(Gbgrxx grxx);
	
	int queryGrxxCount(@Param("name") String name, @Param("jxysj") String jxysj, @Param("xzjysj") String xzjysj);
	
	List<Gbgrxx> getGbgrxx(@Param("start") int start, @Param("end") int end,
			@Param("name") String name, @Param("jxysj") String jxysj, @Param("xzjysj") String xzjysj);
	
	Gbgrxx getGbgrxxById(String id);
	
    int delGbgrxxById(String id);

}