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
import com.tqy.docms.dao.ZjzxzxxMapper;
import com.tqy.docms.entity.Zjzxzxx;
import com.tqy.docms.service.ZjzxzxxService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

@Service
public class ZjzxzxxServiceImpl implements ZjzxzxxService {
	private final Logger logger = LoggerFactory.getLogger(ZjzxzxxServiceImpl.class);
	
	@Autowired
	private ZjzxzxxMapper zjzxmapper;

	@Override
	public ResultMessage saveZjzxzxx(Zjzxzxx zjxx) {
		if(StringUtil.isEmpty(zjxx.getId())){
			zjxx.setId(StringUtil.getUUID());
			zjxx.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
			zjzxmapper.saveZjzxzxx(zjxx);
            logger.info("保存专家个人信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
        }else{
        	zjxx.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	zjzxmapper.updateZjzxzxx(zjxx);
            logger.info("修改专家个人信息成功");
            return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
        }
	}

	@Override
	public PageResult getZjzxzxx(String page, String limit, String name, 
			String positional, String csly, String sxzy) {
		int totalSize = zjzxmapper.queryZjxxCount(name, positional, csly, sxzy);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<Zjzxzxx> list = zjzxmapper.getZjzxzxx(start, end, name, positional, csly, sxzy);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询专家个人信息成功", list, totalSize);
	}

	@Override
	public ResultMessage getZjzxzxxById(String id) {
		Zjzxzxx zjxx = zjzxmapper.getZjzxzxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",zjxx);
	}

	@Override
	public ResultMessage delZjzxzxxById(String id) {
		zjzxmapper.delZjzxzxxById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除成功");
	}

	@Override
	public ResultMessage upload(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}

}
