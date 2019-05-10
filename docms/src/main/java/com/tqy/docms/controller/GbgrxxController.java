package com.tqy.docms.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Gbgrxx;
import com.tqy.docms.service.GbgrxxService;
import com.tqy.docms.util.PropertiesUtil;

/**
 * 干部个人信息
 *
 */
@RestController
@RequestMapping("/grxx")
public class GbgrxxController {
	
	@Autowired
	private GbgrxxService gbgrxxService;
	
	/**
	 * 保存/修改干部个人信息
	 */
    @RequestMapping("saveGbgrxx")
    public ResultMessage saveGbgrxx(Gbgrxx grxx){
        return gbgrxxService.saveGbgrxx(grxx);
    }
    
    /**
           * 查询干部信息
     */
    @RequestMapping("getGbgrxx")
    public PageResult getGbgrxx(String page, String limit, String name, String jxysj, String xzjysj){
        return gbgrxxService.getGbgrxx(page, limit, name, jxysj, xzjysj);
    }
    
    /**
	     * 查询干部个人信息
	*/
	@RequestMapping("getGbgrxxById")
	public ResultMessage getGbgrxxById(String id){
	  return gbgrxxService.getGbgrxxById(id);
	}
    
    /**
           * 删除干部个人信息
     */
    @RequestMapping("delGbgrxxById")
    public ResultMessage delGbgrxxById(String id){
        return gbgrxxService.delGbgrxxById(id);
    }
    
    /**
            * 上传文件
     */
    @RequestMapping("/fileUpload")
    public ResultMessage handleFormUpload(MultipartFile file, HttpServletRequest request) {
        //设置上传文件的保存地址目录
        String dirPath = PropertiesUtil.getProperties("path") + File.separator + "gbFile" + File.separator;
        return gbgrxxService.upload(file, dirPath);
    }

}
