package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Document;
import com.tqy.docms.entity.Project;
import com.tqy.docms.entity.ProjectZxqk;

/**
 * 文档管理
 **/
public interface ProjectService {
	
	/**
     * 获取统计数量
     */
	ResultMessage getTotalCnt();
	
	/**
     * 获取文档曲线图
     */
	ResultMessage docDateCnt();
	
	/**
	 * 获取项目执行情况
	 */
	PageResult getProjectZxqk(String page, String limit, String userId);
	
	/**
     * 获取当前项目的所有阶段
    */
	ResultMessage getProSyJd(String projectId);
	
	/**
     * 查询项目执行过程
    */
	ResultMessage getProjectZxqkById(String id);
	
	/**
     * 生成执行线
    */
	ResultMessage saveProjectZxx(String projectId,String zxjd,String sjkd);
	
	/**
     * 录入特殊事项
     */
	ResultMessage updateTssx(ProjectZxqk zxqk);
	
	ResultMessage delTssx(String id);
	
	ResultMessage getTssx(String projectId,String zxjd);

    /**
     * 保存/修改文档
     */
    ResultMessage saveDocument(Document doc);
    
    /**
     * 查询文档
     */
    PageResult getDocument(String page, String limit, String projectId, 
    		String projectStage, String projectStageChild, String userId);
    
    ResultMessage getDocById(String id);
    
    /**
     * 删除文档
     */
    ResultMessage delDocument(String id);
    
    /**
     * 删除项目
     */
    ResultMessage delProject(String id);
    
    /**
     * 保存/修改项目
     */
    ResultMessage saveProject(Project pro);
    
    ResultMessage updateProName(String projectId,String projectName);
    
    /**
     * 查询项目
     */
    PageResult getProject(String page, String limit, 
    		String projectName, String dept, String projectLx, String userId);
    
    /**
     * 文件上传
     * @param file
     * @param dirPath
     * @return
     */
    ResultMessage upload(MultipartFile file, String dirPath);
    
    /**
     * 获取所有项目名
     * @return
     */
    ResultMessage getProjectName(String userId);
    
    /**
     * 获取所属单位名
     * @return
     */
    ResultMessage getDeptName(String userId);
    
    ResultMessage getProjectById(String id);

}
