package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Cjxx;

public interface CjxxService {

	/**
	 * 保存/修改厂家信息
	 */
	ResultMessage saveCjxx(Cjxx cjxx);
	
	/**
	 * 查询厂家信息
	*/
	PageResult getCjxx(String page, String limit, String czdw, String gyzgbm);
	
	/**
	 * 根据id查询厂家信息
	*/
	ResultMessage getCjxxById(String id);
	
	/**
     * 删除厂家信息
     */
	ResultMessage delCjxxById(String id);
	
	/**
     * 上传文件
     */
	ResultMessage upload(MultipartFile file, String dirPath);
}
