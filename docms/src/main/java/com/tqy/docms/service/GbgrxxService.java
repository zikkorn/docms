package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.Gbgrxx;

public interface GbgrxxService {
	
	ResultMessage saveGbgrxx(Gbgrxx grxx);
	
	PageResult getGbgrxx(String page, String limit, String name, String jxysj, String xzjysj);
	
	ResultMessage getGbgrxxById(String id);
	
	ResultMessage delGbgrxxById(String id);
	
	ResultMessage upload(MultipartFile file, String dirPath);

}
