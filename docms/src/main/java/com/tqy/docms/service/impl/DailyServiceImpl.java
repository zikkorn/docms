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
import com.tqy.docms.dao.DailyMapper;
import com.tqy.docms.dao.ShareDataMapper;
import com.tqy.docms.entity.DailyOffice;
import com.tqy.docms.entity.ShareData;
import com.tqy.docms.service.DailyService;
import com.tqy.docms.util.FileUtil;
import com.tqy.docms.util.StringUtil;

@Service
public class DailyServiceImpl implements DailyService{
	private final Logger logger = LoggerFactory.getLogger(DailyServiceImpl.class);
	
	@Autowired
	private DailyMapper dailyMapper;
	
	@Autowired
	private ShareDataMapper shareMapper;

	@Override
	public ResultMessage saveDailyOffice(DailyOffice daily) {
         if(StringUtil.isEmpty(daily.getId())){
        	 daily.setId(StringUtil.getUUID());
        	 daily.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
             dailyMapper.saveDailyOffice(daily);
             logger.info("保存日常办公成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
         }else{
        	 daily.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
             dailyMapper.updateDailyOffice(daily);
             logger.info("修改日常办公成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
         }
	}

	@Override
	public PageResult getDailyOffice(String page, String limit, String gwlx, String fbdw, String theme) {
		int totalSize = dailyMapper.queryDailyCount(gwlx, fbdw, theme);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<DailyOffice> list = dailyMapper.getDailyOffice(start, end, gwlx, fbdw, theme);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询日常办公信息成功", list, totalSize);
	}
	
	@Override
	public ResultMessage getDailyById(String id) {
		DailyOffice daily = dailyMapper.getDailyById(id);
		return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",daily);
	}

	@Override
	public ResultMessage delDailyById(String id) {
		dailyMapper.delDailyById(id);
    	return new ResultMessage(BaseStatic.SUCCESS_CODE,"删除日常办公成功");
	}

	@Override
	public ResultMessage upload(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}
	
	@Override
	public ResultMessage saveShareData(ShareData share) {
         if(StringUtil.isEmpty(share.getId())){
        	 share.setId(StringUtil.getUUID());
        	 share.setCreateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	 shareMapper.saveShareData(share);
             logger.info("保存共享资料成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE, "保存成功");
         }else{
        	 share.setUpdateDate(StringUtil.getTimeStamp("yyyy-MM-dd"));
        	 shareMapper.updateShareData(share);
             logger.info("修改共享资料成功");
             return new ResultMessage(BaseStatic.SUCCESS_CODE,"修改成功");
         }
	}

	@Override
	public PageResult getShareData(String page, String limit, String zllx, String title) {
		int totalSize = shareMapper.queryShareCount(zllx, title);
    	int start = 0;
    	int end = 0;
    	if(!StringUtil.isNullOrBlank(page) && !StringUtil.isNullOrBlank(limit)){
    		start = (Integer.parseInt(page)-1) * Integer.parseInt(limit);
    		end = Integer.parseInt(limit);
    	}else{
    		end = totalSize;
    	}
    	List<ShareData> list = shareMapper.getShareData(start, end, zllx, title);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"查询共享资料成功", list, totalSize);
	}
	
	@Override
	public ResultMessage getShareById(String id){
		ShareData share = shareMapper.getShareById(id);
		return new ResultMessage(BaseStatic.SUCCESS_CODE,"查询成功",share);
	}

	@Override
	public ResultMessage delShareById(String id) {
		shareMapper.delShareById(id);
    	return new PageResult(BaseStatic.SUCCESS_CODE,"删除共享资料成功");
	}

	@Override
	public ResultMessage UploadShare(MultipartFile file, String dirPath) {
		return FileUtil.upload(file, dirPath);
	}

}
