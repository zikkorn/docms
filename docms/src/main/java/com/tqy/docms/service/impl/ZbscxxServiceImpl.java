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
import com.tqy.docms.dao.ZbscxxMapper;
import com.tqy.docms.entity.Zbscxx;
import com.tqy.docms.service.ZbscxxService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

@Service
public class ZbscxxServiceImpl implements ZbscxxService {
	private final Logger logger = LoggerFactory.getLogger(ZbscxxServiceImpl.class);
	
	@Autowired
	private ZbscxxMapper scxxmapper;

	@Override
	public ResultMessage saveZbscxx(Zbscxx scxx) {
		if(StringUtil.isEmpty(scxx.getId())){
			scxx.setId(StringUtil.getUUID());
			scxx.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
			scxxmapper.saveZbscxx(scxx);
            logger.info("保存手册信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
        }else{
        	scxx.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	scxxmapper.updateZbscxx(scxx);
            logger.info("修改手册信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
        }
	}

	@Override
	public PageResult getZbscxx(String page, String limit, String zbmc, String zblx
    		, String zytd, String czdw) {
		int totalSize = scxxmapper.queryScxxCount(zbmc, zblx, zytd, czdw);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Zbscxx> list = scxxmapper.getZbscxx(start, end, zbmc, zblx, zytd, czdw);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询手册信息成功", list, totalSize);
	}

	@Override
	public ResultMessage getZbscxxById(String id) {
		Zbscxx zjxx = scxxmapper.getZbscxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",zjxx);
	}

	@Override
	public ResultMessage delZbscxxById(String id) {
		scxxmapper.delZbscxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除成功");
	}

	@Override
	public ResultMessage upload(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}

}
