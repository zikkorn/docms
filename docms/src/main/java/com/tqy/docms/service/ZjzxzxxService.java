package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Zjzxzxx;

public interface ZjzxzxxService {

	/**
	 * 保存/修改专家资讯组信息
	 */
	ResultMessage saveZjzxzxx(Zjzxzxx zjxx);
	
	/**
	 * 查询专家资讯组信息
	*/
	PageResult getZjzxzxx(String page, String limit, String name, String positional
    		, String csly, String sxzy);
	
	/**
	 * 查询专家资讯组个人信息
	*/
	ResultMessage getZjzxzxxById(String id);
	
	/**
     * 删除专家资讯组个人信息
     */
	ResultMessage delZjzxzxxById(String id);
	
	/**
     * 上传文件
     */
	ResultMessage upload(MultipartFile file, String dirPath);
}
