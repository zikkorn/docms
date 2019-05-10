package com.tqy.docms.util;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.BaseStatic;
import com.tqy.docms.bean.ResultMessage;

public class FileUtil {
	private static Logger logger = LoggerFactory.getLogger(FileUtil.class);
	
	public static ResultMessage upload(MultipartFile file, String dirPath) {
    	File filePath = new File(dirPath);
    	//如果保存文件的地址不存在，就先创建目录
    	if(!filePath.exists()) {
    		filePath.mkdirs();
    	}
    	String path = "";
    	try {
	    	//获取上传文件的原始名称
	    	String originalFilename = file.getOriginalFilename();
    		//使用MultipartFile接口的方法完成文件上传到指定位置
    		file.transferTo(new File(dirPath + originalFilename));
    		path = dirPath + originalFilename + ",";
    	}catch(Exception e) {
    		logger.error("上传文件出错："+e.getMessage());
    		return new ResultMessage(BaseStatic.ERROR_CODE,"失败",e.getMessage());
    	}
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"成功",path.substring(0, path.length()-1));
    }

}
