package com.tqy.docms.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tqy.docms.entity.Document;
import com.tqy.docms.entity.Project;
import com.tqy.docms.entity.ProjectZxqk;

public interface ProjectMapper {
	
	/**
	 * 获取项目总数
	 */
	int getProjectCnt();
	
	/**
	 * 获取文档总数
	 */
	int getDocCnt();
	
	/**
	 * 获取项目执行情况总数
	 */
	int queryZxqkCount(String userId);
	
	/**
	 * 获取项目首页执行情况
	 */
	List<Map<String, Object>> getProjectZxqk(@Param("start") int start, @Param("end") int end
			, @Param("userId") String userId);
	
	/**
	 * 根据id获取项目的所有阶段
	 */
	Map<String, Object> getProSyJd(String id);
	
	/**
	 * 更新项目阶段时间跨度
	 */
	int updateProSj(Project pro);
	
	 /**
	  * 获取文档曲线图
     */
	List<Map<String, Object>> docDateCnt();

    /**
     * 保存文档
     */
    int saveDocument(Document doc);
    /**
     * 修改文档
     */
    int updateDocument(Document doc);
    
    Document getDocById(String id);
    /**
     * 查询文档总数量
     */
    int queryDocCount(@Param("projectId") String projectId, 
    		@Param("projectStage") String projectStage, 
    		@Param("projectStageChild") String projectStageChild,
    		@Param("userId") String userId);
    
    /**
     * 获取所以文档信息
     */
    List<Map<String, Object>> getdocument(@Param("start") int start, @Param("end") int end,
            @Param("projectId") String projectId, @Param("projectStage") String projectStage, 
            @Param("projectStageChild") String projectStageChild,
    		@Param("userId") String userId);
    /**
     * 保存项目
     */
    int saveProject(Project pro);
    /**
     * 修改项目
     */
    int updateProject(Project pro);
    
    int updateProName(@Param("id") String id, @Param("projectName") String projectName);
    
    /**
     * 查询项目总数量
     */
    int queryProCount(@Param("projectName") String projectName, @Param("dept") String dept, 
    		@Param("projectLx") String projectLx, @Param("userId") String userId);
    
    /**
     * 获取所有项目信息
     */
    List<Map<String, Object>> getProject(@Param("start") int start, @Param("end") int end,
            @Param("projectName") String projectName, @Param("dept") String dept, 
            @Param("projectLx") String projectLx, @Param("userId") String userId);
    
    /**
     * 获取父项目
     */
    List<Map<String, Object>> getParentPro(@Param("userId") String userId);
    
    /**
     * 获取子项目
     */
    List<Map<String, Object>> getChildPro(@Param("parentId") String parentId);
    
    /**
     * 获取所属单位名
     */
    List<Map<String, String>> getDeptName(@Param("userId")String userId);
    
    Project getProjectById(String id);
    
    /**
     * 删除文档
     */
    void delDocument(String id);
    
    /**
     * 删除项目
     */
    void delProject(String id);
    
    int saveProjectZxx(ProjectZxqk zxqk);
    
    int updateProjectZxx(ProjectZxqk zxqk);
    
    int delTssx(String id);
    
    List<ProjectZxqk> getTssx(@Param("projectId") String projectId,@Param("zxjd") String zxjd);

}

