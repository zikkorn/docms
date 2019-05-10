package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.Zjzxzxx;

public interface ZjzxzxxMapper {

    int delZjzxzxxById(String id);

    int saveZjzxzxx(Zjzxzxx record);

    int updateZjzxzxx(Zjzxzxx record);
	
	int queryZjxxCount(@Param("name") String name, @Param("positional") String positional, 
			@Param("csly") String csly, @Param("sxzy") String sxzy);
	
	List<Zjzxzxx> getZjzxzxx(@Param("start") int start, @Param("end") int end,
			@Param("name") String name, @Param("positional") String positional, 
			@Param("csly") String csly, @Param("sxzy") String sxzy);
	
	Zjzxzxx getZjzxzxxById(String id);
	
}