package com.tqy.docms.service.impl;

import com.tqy.docms.bean.BaseStatic;
import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.dao.ProjectMapper;
import com.tqy.docms.dao.UserMapper;
import com.tqy.docms.entity.Document;
import com.tqy.docms.entity.Project;
import com.tqy.docms.entity.ProjectZxqk;
import com.tqy.docms.service.ProjectService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    @Autowired
    private ProjectMapper documentMapper;
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    public ResultMessage getTotalCnt() {
    	Map<String, Object> tns = new HashMap<String, Object>();
    	tns.put("projectTotalCnt: ", documentMapper.getProjectCnt());
    	tns.put("documentTotalCnt: ", documentMapper.getDocCnt());
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改文档成功",tns);
    }
    
    @Override
    public ResultMessage docDateCnt() {
    	Map<String, Object> dateCnt = new HashMap<String, Object>();
    	List<Map<String, Object>> docDateCnt = documentMapper.docDateCnt();
    	for(int i=docDateCnt.size();i>0;i--) {
    		dateCnt.put(docDateCnt.get(i).get("createDate").toString(), docDateCnt.get(i).get("total"));
    	}
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改文档成功",dateCnt);
    }
    
    @Override
    public PageResult getProjectZxqk(String page, String limit, String userId) {
		int totalSize = documentMapper.queryZxqkCount(userId);
		int start = 0;
		int end = 0;
		if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
			start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
			end = Integer.parseInt(limit);
		}else{
			end = totalSize;
		}
    	List<Map<String, Object>> list = documentMapper.getProjectZxqk(start, end, userId);
    	for(Map<String, Object> pro : list) {
    		//根据项目id获取特殊事项
    		String projectId = pro.get("pId").toString();
    		String ssjd = "";
    		if(pro.get("pSsjd") != null && StringUtil.isNotEmpty(pro.get("pSsjd").toString())) {
    			ssjd = pro.get("pSsjd").toString();
    		}else {
    			pro.put("pSsjd", "尚未执行");
    		}
    		if(StringUtil.isNotEmpty(pro.get("cId").toString())) {
    			projectId = pro.get("cId").toString();
    			if(pro.get("cSsjd") != null && StringUtil.isNotEmpty(pro.get("pSsjd").toString())) {
        			ssjd = pro.get("cSsjd").toString();
        		}else {
        			pro.put("cSsjd", "尚未执行");
        		}
    		}
    		List<ProjectZxqk> tssx = documentMapper.getTssx(projectId,ssjd);
    		pro.put("tssxCount", tssx.size());
    		if(tssx.size() > 0) {
    			pro.put("znd", tssx.get(0).getZnd());
    			pro.put("jbsx", tssx.get(0).getJbsx());
    		}
    	}
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询项目成功", list, totalSize);
    }
    
    @Override
    public ResultMessage getTssx(String projectId,String zxjd) {
    	List<ProjectZxqk> list = documentMapper.getTssx(projectId, zxjd);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",list);
    }
    
    @Override
    public ResultMessage getProjectZxqkById(String id) {
    	Map<String, Object> map = documentMapper.getProSyJd(id);
    	Map<String, Object> xmjd = getJdsj(map);
    	xmjd.put("id", map.get("id"));
    	xmjd.put("projectName", map.get("projectName"));
    	xmjd.put("zxjd", map.get("zxjd"));
    	List<ProjectZxqk> tssx = documentMapper
    			.getTssx(map.get("id").toString(),"");
    	if(tssx.size() > 0) {
    		xmjd.put("执行结束时间", tssx.get(0).getZxsj());
    		xmjd.put("执行开始时间", xmjd.get("计划开始时间").toString());
    	}
    	xmjd.put("zxsjkd", getZxSj(tssx,xmjd.get("计划开始时间").toString(),(List<String>) xmjd.get("xmjd")));
    	xmjd.put("tssx", tssx);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询进度成功",xmjd);
    }
    
    @Override
    public ResultMessage getProSyJd(String projectId){
    	Map<String, Object> xmjd = getJdsj(documentMapper.getProSyJd(projectId));
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",xmjd);
    }
    
    @Override
    public ResultMessage saveProjectZxx(String projectId,String zxjd,String sjkd) {
    	Project p = new Project();
    	p.setId(projectId);
    	//更新项目执行阶段
    	p.setZxjd(zxjd);
    	//更新项目中对应阶段的时间跨度
    	if(zxjd.equals("立项阶段")) {
    		p.setLxjdDate(sjkd);
    	}else if(zxjd.equals("研制总要求阶段")) {
    		p.setYzzyqjdDate(sjkd);
    	}else if(zxjd.equals("方案阶段")) {
    		p.setFajdDate(sjkd);
    	}else if(zxjd.equals("正样阶段")) {
    		p.setZyjdDate(sjkd);
    	}else if(zxjd.equals("性能鉴定阶段")) {
    		p.setXnjdjdDate(sjkd);
    	}else if(zxjd.equals("作战试验阶段")) {
    		p.setZzsyjdDate(sjkd);
    	}else if(zxjd.equals("列装阶段")) {
    		p.setLzdxjdDate(sjkd);
    	}
    	documentMapper.updateProSj(p);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"保存成功");
    }
    
    @Override
    public ResultMessage updateTssx(ProjectZxqk zxqk) {
    	Project p = new Project();
    	p.setId(zxqk.getProjectId());
    	//更新项目执行阶段
    	p.setZxjd(zxqk.getSsjd());
    	documentMapper.updateProSj(p);
    	
    	//保存/更新特殊事项
    	if(StringUtil.isEmpty(zxqk.getId())){
    		zxqk.setId(StringUtil.getUUID());
        	zxqk.setLrsj(StringUtil.getTimeStamp("yyyy/MM/dd HH:mm:ss"));
            documentMapper.saveProjectZxx(zxqk);
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"录入成功");
        }else{
        	zxqk.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
            documentMapper.updateProjectZxx(zxqk);
            logger.info("修改事项成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
        }
    }
    
    @Override
    public ResultMessage delTssx(String id) {
    	documentMapper.delTssx(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除成功");
    }

    @Override
    public ResultMessage saveDocument(Document doc) {
    	 String path = doc.getDocPath();
    	 doc.setDocName(new File(path).getName());
         if(StringUtil.isEmpty(doc.getId())){
             doc.setId(StringUtil.getUUID());
             doc.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
             documentMapper.saveDocument(doc);
             logger.info("保存文档成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存文档成功");
         }else{
             doc.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
             documentMapper.updateDocument(doc);
             logger.info("修改文档成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改文档成功");
         }
    }
    
    @Override
    public PageResult getDocument(String page, String limit, String projectId, 
    		String projectStage, String projectStageChild, String userId){
    	int totalSize = documentMapper.queryDocCount(projectId, projectStage, projectStageChild,userId);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Map<String, Object>> list = documentMapper
    			.getdocument(start, end, projectId, projectStage, projectStageChild,userId);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询文档成功", list, totalSize);
    }
    
    @Override
    public ResultMessage delDocument(String id){
    	documentMapper.delDocument(id);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"删除文档成功");
    }
    
    @Override
    public ResultMessage delProject(String id){
    	documentMapper.delProject(id);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"删除项目成功");
    }

    @Override
    public ResultMessage saveProject(Project pro) {
    	if(StringUtil.isEmpty(pro.getParentId())){
    		pro.setParentId(null);
    	}
        if(StringUtil.isEmpty(pro.getId())){
        	String id = StringUtil.getUUID();
            pro.setId(id);
            pro.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
            documentMapper.saveProject(pro);
            logger.info("保存项目成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存项目成功",id);
        }else{
        	pro.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
            documentMapper.updateProject(pro);
            logger.info("修改项目成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改项目成功",pro.getId());
        }
    }
    
    @Override
    public ResultMessage updateProName(String projectId,String projectName) {
    	documentMapper.updateProName(projectId,projectName);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改项目名成功");
    }
    
    @Override
    public PageResult getProject(String page, String limit, 
    		String projectName, String dept, String projectLx, String userId){
    	String roleName = userMapper.getRoleByUser(userId);
    	if(roleName.equals("超级用户")) {
    		userId = "";
    	}
    	int totalSize = documentMapper.queryProCount(projectName, dept, projectLx, userId);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Map<String, Object>> list = documentMapper.getProject(start, end, 
    			projectName, dept, projectLx, userId);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询项目成功", list, totalSize);
    }
    
    @Override
    public ResultMessage upload(MultipartFile file, String dirPath) {
    	return FileUtil.upload(file, dirPath);
    }
    
    @Override
    public ResultMessage getProjectName(String userId) {
    	String roleName = userMapper.getRoleByUser(userId);
    	if(roleName.equals("超级用户")) {
    		userId = "";
    	}
    	//获取父项目信息
    	List<Map<String, Object>> list = documentMapper.getParentPro(userId);
    	for(Map<String, Object> parent : list) {
    		List<Map<String, Object>> list2 = documentMapper
    				.getChildPro(parent.get("id").toString());
    		parent.put("child", list2);
    	}
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"成功",list);
    }
    
    @Override
    public ResultMessage getDeptName(String userId) {
    	String roleName = userMapper.getRoleByUser(userId);
    	if(roleName.equals("超级用户")) {
    		userId = "";
    	}
    	List<Map<String, String>> list = documentMapper.getDeptName(userId);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"成功",list);
    }
    
    @Override
    public ResultMessage getProjectById(String id) {
    	Project project = documentMapper.getProjectById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"成功",project);
    }
    
    @Override
    public ResultMessage getDocById(String id) {
    	Document doc = documentMapper.getDocById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"成功",doc);
    }
    
    //获取计划时间跨度
    private static Map<String, Object> getJdsj(Map<String, Object> rs){
    	List<String> allJd = new LinkedList<String>();
    	Map<String, Object> xmjd = new LinkedHashMap<String, Object>();
    	String kssj = "";
    	String jssj = "";
    	if(rs.get("lxjd_date") != null && StringUtil.isNotEmpty(rs.get("lxjd_date").toString())) {
    		String lxsj = rs.get("lxjd_date").toString();
    		kssj = lxsj.split("-")[0];
    		allJd.add("立项阶段");
    		xmjd.put("立项阶段", lxsj);
    	}
    	if(rs.get("yzzyqjd_date") != null && StringUtil.isNotEmpty(rs.get("yzzyqjd_date").toString())) {
    		String yzsj = rs.get("yzzyqjd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = yzsj.split("-")[1];
    		}else {
    			kssj = yzsj.split("-")[0];
    		}
    		allJd.add("研制总要求阶段");
    		xmjd.put("研制总要求阶段",yzsj);
    	}
    	if(rs.get("fajd_date") != null && StringUtil.isNotEmpty(rs.get("fajd_date").toString())) {
    		String fasj = rs.get("fajd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = fasj.split("-")[1];
    		}else {
    			kssj = fasj.split("-")[0];
    		}
    		allJd.add("方案阶段");
    		xmjd.put("方案阶段",fasj);
    	}
    	if(rs.get("zyjd_date") != null && StringUtil.isNotEmpty(rs.get("zyjd_date").toString())) {
    		String zysj = rs.get("zyjd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = zysj.split("-")[1];
    		}else {
    			kssj = zysj.split("-")[0];
    		}
    		allJd.add("正样阶段");
    		xmjd.put("正样阶段",zysj);
    	}
    	if(rs.get("xnjdjd_date") != null && StringUtil.isNotEmpty(rs.get("xnjdjd_date").toString())) {
    		String xnsj = rs.get("xnjdjd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = xnsj.split("-")[1];
    		}else {
    			kssj = xnsj.split("-")[0];
    		}
    		allJd.add("性能鉴定阶段");
    		xmjd.put("性能鉴定阶段",xnsj);
    	}
    	if(rs.get("zzsyjd_date") != null && StringUtil.isNotEmpty(rs.get("zzsyjd_date").toString())) {
    		String zzsj = rs.get("zzsyjd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = zzsj.split("-")[1];
    		}else {
    			kssj = zzsj.split("-")[0];
    		}
    		allJd.add("作战试验阶段");
    		xmjd.put("作战试验阶段",zzsj);
    	}
    	if(rs.get("lzdxjd_date") != null && StringUtil.isNotEmpty(rs.get("lzdxjd_date").toString())) {
    		String lzsj = rs.get("lzdxjd_date").toString();
    		if(StringUtil.isNotEmpty(kssj)) {
    			jssj = lzsj.split("-")[1];
    		}else {
    			kssj = lzsj.split("-")[0];
    		}
    		if(StringUtil.isEmpty(jssj)) {
    			jssj = lzsj.split("-")[1];
    		}
    		allJd.add("列装阶段");
    		xmjd.put("列装阶段",lzsj);
    	}
    	xmjd.put("计划开始时间",kssj);
    	xmjd.put("计划结束时间",jssj);
    	xmjd.put("xmjd", allJd);
    	return xmjd;
    }
    
    //获取执行时间跨度
    private static Map<String, Object> getZxSj(List<ProjectZxqk> tssx, String kssj, List<String> jds) {
		/*
		 * List<String> jds = new ArrayList<String>(); for(ProjectZxqk zxqk : tssx) {
		 * String ssjd = zxqk.getSsjd(); if(!jds.contains(ssjd)) { jds.add(ssjd); } }
		 */
    	//System.out.println(jds.toString());
    	Map<String, Object> map = new LinkedHashMap<String, Object>();
    	if(jds.size() > 0) {
    		map.put(jds.get(0), kssj);
    		for(String zxjd : jds) {
    			for(int i=tssx.size()-1; i>=0; i--) {
    				String ssjd = tssx.get(i).getSsjd();
    				String zxsj = tssx.get(i).getZxsj();
    				if(zxjd.equals(ssjd)) {
    					if(map.get(ssjd) == null) {
    						map.put(ssjd, zxsj);
    						kssj = zxsj;
    						map.put(ssjd, kssj + "-" + zxsj);
    					}else {
    						map.put(ssjd, kssj + "-" + zxsj);
    					}
    				}
    			}
    		}
    	}
    	return map;
    }

}
