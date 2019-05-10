package com.tqy.docms.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.DailyOffice;
import com.tqy.docms.entity.ShareData;
import com.tqy.docms.service.DailyService;
import com.tqy.docms.util.PropertiesUtil;

/**
 * 日常办公
 */
@RestController
@RequestMapping("/daily")
public class DailyController {
	
	@Autowired
	private DailyService dailyService;
	
	/**
	 * 保存/修改日常办公信息
	 */
    @RequestMapping("saveDailyOffice")
    public ResultMessage saveDailyOffice(DailyOffice daily){
        return dailyService.saveDailyOffice(daily);
    }
    
    /**
           * 查询日常办公信息
     */
    @RequestMapping("getDailyOffice")
    public PageResult getDailyOffice(String page, String limit, String gwlx, String fbdw, String theme){
        return dailyService.getDailyOffice(page, limit, gwlx, fbdw, theme);
    }
    
    /**
	     * 根据id查询日常办公信息
	*/
	@RequestMapping("getDailyById")
	public ResultMessage getDailyById(String id){
	  return dailyService.getDailyById(id);
	}
    
    /**
           * 删除日常办公信息
     */
    @RequestMapping("delDailyById")
    public ResultMessage delDailyById(String id){
        return dailyService.delDailyById(id);
    }
    
    /**
            * 上传文件
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "dailyFile" + File.separator;
        return dailyService.upload(file, dirPath);
    }
    
    /**
	 * 保存/修改共享资料信息
	 */
    @RequestMapping("saveShareData")
    public ResultMessage saveShareData(ShareData share){
        return dailyService.saveShareData(share);
    }
    
    /**
           * 查询共享资料信息
     */
    @RequestMapping("getShareData")
    public PageResult getShareData(String page, String limit, String zllx, String title){
        return dailyService.getShareData(page, limit, zllx, title);
    }
    
    /**
	     * 根据id查询共享资料信息
	*/
	@RequestMapping("getShareById")
	public ResultMessage getShareById(String id){
	  return dailyService.getShareById(id);
	}
    
    /**
           * 删除共享资料信息
     */
    @RequestMapping("delShareById")
    public ResultMessage delShareById(String id){
        return dailyService.delShareById(id);
    }
    
    /**
            * 上传共享文件
     */
    @RequestMapping("/UploadShare")
    public ResultMessage UploadShare(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "shareFile" + File.separator;
        return dailyService.upload(file, dirPath);
    }
	
}
