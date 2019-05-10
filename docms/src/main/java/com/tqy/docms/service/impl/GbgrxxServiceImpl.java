package com.tqy.docms.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.BaseStatic;
import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.dao.GbgrxxMapper;
import com.tqy.docms.entity.Gbgrxx;
import com.tqy.docms.service.GbgrxxService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

@Service
public class GbgrxxServiceImpl implements GbgrxxService {
	private final Logger logger = LoggerFactory.getLogger(GbgrxxServiceImpl.class);
	
	@Autowired
	private GbgrxxMapper grxxMapper;

	@Override
	public ResultMessage saveGbgrxx(Gbgrxx grxx) {
		 if(StringUtil.isEmpty(grxx.getId())){
			 grxx.setId(StringUtil.getUUID());
			 grxx.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
			 grxxMapper.saveGbgrxx(grxx);
             logger.info("保存干部个人信息成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
         }else{
        	 grxx.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	 grxxMapper.updateGbgrxx(grxx);
             logger.info("修改干部个人信息成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
         }
	}

	@Override
	public PageResult getGbgrxx(String page, String limit, String name, String jxysj, String xzjysj) {
		int totalSize = grxxMapper.queryGrxxCount(name, jxysj, xzjysj);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Gbgrxx> list = grxxMapper.getGbgrxx(start, end, name, jxysj, xzjysj);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询干部个人信息成功", list, totalSize);
	}
	
	@Override
	public ResultMessage getGbgrxxById(String id) {
		Gbgrxx grxx = grxxMapper.getGbgrxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",grxx);
	}


	@Override
	public ResultMessage delGbgrxxById(String id) {
		grxxMapper.delGbgrxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除干部个人信息成功");
	}

	@Override
	public ResultMessage upload(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}

}
