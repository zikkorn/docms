package com.tqy.docms.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Zjzxzxx;
import com.tqy.docms.service.ZjzxzxxService;
import com.tqy.docms.util.PropertiesUtil;

@RestController
@RequestMapping("/zjzx")
public class ZjzxzxxController {
	
	@Autowired
	private ZjzxzxxService zjzxService;
	
	/**
	 * 保存/修改专家资讯组信息
	 */
    @RequestMapping("saveZjzxzxx")
    public ResultMessage saveZjzxzxx(Zjzxzxx zjxx){
        return zjzxService.saveZjzxzxx(zjxx);
    }
    
    /**
           * 查询专家资讯组信息
     */
    @RequestMapping("getZjzxzxx")
    public PageResult getZjzxzxx(String page, String limit, String name, String positional
    		, String csly, String sxzy){
        return zjzxService.getZjzxzxx(page, limit, name, positional, csly, sxzy);
    }
    
    /**
	     * 查询专家资讯组个人信息
	*/
	@RequestMapping("getZjzxzxxById")
	public ResultMessage getZjzxzxxById(String id){
	  return zjzxService.getZjzxzxxById(id);
	}
    
    /**
           * 删除专家资讯组个人信息
     */
    @RequestMapping("delZjzxzxxById")
    public ResultMessage delZjzxzxxById(String id){
        return zjzxService.delZjzxzxxById(id);
    }
    
    /**
            * 上传文件
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "zjFile" + File.separator;
        return zjzxService.upload(file, dirPath);
    }

}
