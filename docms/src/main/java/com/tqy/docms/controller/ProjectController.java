package com.tqy.docms.controller;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Document;
import com.tqy.docms.entity.Project;
import com.tqy.docms.entity.ProjectZxqk;
import com.tqy.docms.service.ProjectService;
import com.tqy.docms.util.PropertiesUtil;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文档管理
 **/
@RestController
@CrossOrigin
@RequestMapping("doc")
public class ProjectController {

    @Autowired
    private ProjectService documentService;
    
    /**
     * 获取统计数量
     */
    @RequestMapping("getTotalCnt")
    public ResultMessage getTotalCnt() {
    	return documentService.getTotalCnt();
    }
    
    /**
     * 获取文档曲线图
     */
    @RequestMapping("docDateCnt")
    public ResultMessage docDateCnt() {
    	return documentService.docDateCnt();
    }
    
    /**
     * 查询执行统计情况
     */
    @RequestMapping("getProjectZxqk")
    public PageResult getProjectZxqk(String page, String limit, String userId){
        return documentService.getProjectZxqk(page, limit, userId);
    }
    
    /**
     * 查询项目执行过程
     */
    @RequestMapping("getProjectZxqkById")
    public ResultMessage getProjectZxqkById(String id){
        return documentService.getProjectZxqkById(id);
    }
    
    /**
     * 获取当前项目的所有阶段
     */
	/*
	 * @RequestMapping("getProSyJd") public ResultMessage getProSyJd(String
	 * projectId){ return documentService.getProSyJd(projectId); }
	 */
    
    /**
     * 生成执行线
     */
	/*
	 * @RequestMapping("saveProjectZxx") public ResultMessage saveProjectZxx(String
	 * projectId,String zxjd,String sjkd){ return
	 * documentService.saveProjectZxx(projectId,zxjd,sjkd); }
	 */
    
    /**
     * 录入特殊事项
     */
    @RequestMapping("updateTssx")
    public ResultMessage updateTssx(ProjectZxqk zxqk){
        return documentService.updateTssx(zxqk);
    }
    
    /**
     * 删除特殊事项
     */
    @RequestMapping("delTssx")
    public ResultMessage delTssx(String id){
        return documentService.delTssx(id);
    }
    
    /**
     * 获取项目的特殊事项
     */
    @RequestMapping("getTssx")
    public ResultMessage getTssx(String projectId,String zxjd){
        return documentService.getTssx(projectId, zxjd);
    }

    /**
     * 保存/修改新增文件
     */
    @RequestMapping("saveDocument")
    public ResultMessage saveDocument(Document doc){
        return documentService.saveDocument(doc);
    }
    
    /**
     * 查询文件信息
     */
    @RequestMapping("getDocument")
    public PageResult getDocument(String page, String limit, String projectId, 
    		String projectStage, String projectStageChild, String userId){
        return documentService.getDocument(page, limit, projectId, projectStage, projectStageChild, userId);
    }
    
    /**
     * 删除文件信息
     */
    @RequestMapping("delDocument")
    public ResultMessage delDocument(String id){
        return documentService.delDocument(id);
    }
    
    /**
     * 删除项目信息
     */
    @RequestMapping("delProject")
    public ResultMessage delProject(String id){
        return documentService.delProject(id);
    }

    /**
     * 保存/修改项目
     */
    @RequestMapping("saveProject")
    public ResultMessage saveProject(Project pro){
        return documentService.saveProject(pro);
    }
    
    /**
     * 修改父项目名
     */
    @RequestMapping("updateProName")
    public ResultMessage updateProName(String projectId,String projectName){
        return documentService.updateProName(projectId,projectName);
    }
    
    /**
     * 查询项目信息
     */
    @RequestMapping("getProject")
    public PageResult getProject(String page, String limit, String projectName, String dept, String projectLx, String userId){
        return documentService.getProject(page, limit, projectName, dept, projectLx, userId);
    }
    
    /**
     * 上传文档
     * @param file
     * @param request
     * @return
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path");
        return documentService.upload(file, dirPath);
    }
    
    /**
     * 项目名查询
     * @return
     */
    @RequestMapping("/getProjectName")
    public ResultMessage getProjectName(String userId) {
    	return documentService.getProjectName(userId);
    }
    
    /**
     * 所属单位查询
     * @return
     */
    @RequestMapping("/getDeptName")
    public ResultMessage getDeptName(String userId) {
    	return documentService.getDeptName(userId);
    }
    
    /**
     * 根据id查询项目信息
     * @return
     */
    @RequestMapping("/getProjectById")
    public ResultMessage getProjectById(String id) {
    	return documentService.getProjectById(id);
    }
    
    /**
     * 根据id查询文档信息
     * @return
     */
    @RequestMapping("/getDocById")
    public ResultMessage getDocById(String id) {
    	return documentService.getDocById(id);
    }
    
}
