package com.tqy.docms.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Cjxx;
import com.tqy.docms.service.CjxxService;
import com.tqy.docms.util.PropertiesUtil;

@RestController
@RequestMapping("/cjxx")
public class CjxxController {
	
	@Autowired
	private CjxxService cjxxService;
	
	/**
	 * 保存/修改厂家信息
	 */
    @RequestMapping("saveCjxx")
    public ResultMessage saveCjxx(Cjxx cjxx){
        return cjxxService.saveCjxx(cjxx);
    }
    
    /**
           * 查询厂家信息
     */
    @RequestMapping("getCjxx")
    public PageResult getCjxx(String page, String limit, String czdw, String gyzgbm){
        return cjxxService.getCjxx(page, limit, czdw, gyzgbm);
    }
    
    /**
	     * 根据id查询厂家信息
	*/
	@RequestMapping("getCjxxById")
	public ResultMessage getCjxxById(String id){
	  return cjxxService.getCjxxById(id);
	}
    
    /**
           * 删除厂家信息
     */
    @RequestMapping("delCjxxById")
    public ResultMessage delCjxxById(String id){
        return cjxxService.delCjxxById(id);
    }
    
    /**
            * 上传文件
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "zjFile" + File.separator;
        return cjxxService.upload(file, dirPath);
    }

}
