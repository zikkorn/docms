package com.tqy.docms.service;

import org.springframework.web.multipart.MultipartFile;

import com.tqy.docms.bean.PageResult;
import com.tqy.docms.bean.ResultMessage;
import com.tqy.docms.entity.DailyOffice;
import com.tqy.docms.entity.ShareData;

public interface DailyService {
	
	/**
	 * 保存/修改日常办公信息
	 */
    ResultMessage saveDailyOffice(DailyOffice daily);
    
    PageResult getDailyOffice(String page, String limit, String gwlx, String fbdw, String theme);
    
    ResultMessage getDailyById(String id);
    
    ResultMessage delDailyById(String id);
    
    ResultMessage upload(MultipartFile file, String dirPath);
    
    /**
	 * 保存/修改共享资料信息
	 */
    ResultMessage saveShareData(ShareData share);
    
    PageResult getShareData(String page, String limit, String zllx, String title);
    
    ResultMessage getShareById(String id);
    
    ResultMessage delShareById(String id);
    
    ResultMessage UploadShare(MultipartFile file, String dirPath);

}
