package com.tqy.docms.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Zbscxx;
import com.tqy.docms.service.ZbscxxService;
import com.tqy.docms.util.PropertiesUtil;

@RestController
@RequestMapping("/scxx")
public class ZbscxxController {
	
	@Autowired
	private ZbscxxService scxxService;
	
	/**
	 * 保存/修改装备手册信息
	 */
    @RequestMapping("saveZbscxx")
    public ResultMessage saveZbscxx(Zbscxx zjxx){
        return scxxService.saveZbscxx(zjxx);
    }
    
    /**
           * 查询装备手册信息
     */
    @RequestMapping("getZbscxx")
    public PageResult getZbscxx(String page, String limit, String zbmc, String zblx
    		, String zytd, String czdw){
        return scxxService.getZbscxx(page, limit, zbmc, zblx, zytd, czdw);
    }
    
    /**
	     *根据id查询装备手册信息
	*/
	@RequestMapping("getZbscxxById")
	public ResultMessage getZbscxxById(String id){
	  return scxxService.getZbscxxById(id);
	}
    
    /**
           * 删除装备手册信息
     */
    @RequestMapping("delZbscxxById")
    public ResultMessage delZbscxxById(String id){
        return scxxService.delZbscxxById(id);
    }
    
    /**
            * 上传文件
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "scFile" + File.separator;
        return scxxService.upload(file, dirPath);
    }

}
