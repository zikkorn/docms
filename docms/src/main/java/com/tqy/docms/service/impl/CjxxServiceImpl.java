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
import com.tqy.docms.dao.CjxxMapper;
import com.tqy.docms.entity.Cjxx;
import com.tqy.docms.service.CjxxService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

@Service
public class CjxxServiceImpl implements CjxxService {
	private final Logger logger = LoggerFactory.getLogger(CjxxServiceImpl.class);
	
	@Autowired
	private CjxxMapper cjxxmapper;

	@Override
	public ResultMessage saveCjxx(Cjxx cjxx) {
		if(StringUtil.isEmpty(cjxx.getId())){
			cjxx.setId(StringUtil.getUUID());
			cjxx.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
			cjxxmapper.saveCjxx(cjxx);
            logger.info("保存厂家信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
        }else{
        	cjxx.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	cjxxmapper.updateCjxx(cjxx);
            logger.info("修改厂家信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
        }
	}

	@Override
	public PageResult getCjxx(String page, String limit, String czdw, String gyzgbm) {
		int totalSize = cjxxmapper.queryCjxxCount(czdw, gyzgbm);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Cjxx> list = cjxxmapper.getCjxx(start, end, czdw, gyzgbm);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询厂家信息成功", list, totalSize);
	}

	@Override
	public ResultMessage getCjxxById(String id) {
		Cjxx cjxx = cjxxmapper.getCjxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",cjxx);
	}

	@Override
	public ResultMessage delCjxxById(String id) {
		cjxxmapper.delCjxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除成功");
	}

	@Override
	public ResultMessage upload(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}

}
