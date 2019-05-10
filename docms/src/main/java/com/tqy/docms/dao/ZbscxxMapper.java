package com.tqy.docms.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.Zbscxx;

public interface ZbscxxMapper {

    int delZbscxxById(String id);

    int saveZbscxx(Zbscxx scxx);

    Zbscxx getZbscxxById(String id);

    int updateZbscxx(Zbscxx scxx);
    
    int queryScxxCount(@Param("zbmc") String zbmc, @Param("zblx") String zblx
    		, @Param("zytd") String zytd, @Param("czdw") String czdw);
    
    List<Zbscxx> getZbscxx(@Param("start") int start, @Param("end") int end
    		, @Param("zbmc") String zbmc, @Param("zblx") String zblx
    		, @Param("zytd") String zytd, @Param("czdw") String czdw);
}