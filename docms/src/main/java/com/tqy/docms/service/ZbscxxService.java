package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Zbscxx;

public interface ZbscxxService {

	/**
	 * 保存/修改手册信息
	 */
	ResultMessage saveZbscxx(Zbscxx zjxx);
	
	/**
	 * 查询手册信息
	*/
	PageResult getZbscxx(String page, String limit,  String zbmc, String zblx
    		, String zytd, String czdw);
	
	/**
	 * 根据id查询手册信息
	*/
	ResultMessage getZbscxxById(String id);
	
	/**
     * 删除手册信息
     */
	ResultMessage delZbscxxById(String id);
	
	/**
     * 上传文件
     */
	ResultMessage upload(MultipartFile file, String dirPath);
}
