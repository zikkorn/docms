package com.tqy.docms.entity;

import java.io.File;
import java.io.Serializable;

public class DailyOffice implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;	//日常办公id
	private String gwlx;//公文类型
	private String fbdw;//发布单位
	private String theme;//主题
	private String createDate;//创建时间
	private String updateDate;//更新时间
	private String filepath;//文档路径
	private String filesize;//文件大小
	private String bz;//备注
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGwlx() {
		return gwlx;
	}
	public void setGwlx(String gwlx) {
		this.gwlx = gwlx;
	}
	public String getFbdw() {
		return fbdw;
	}
	public void setFbdw(String fbdw) {
		this.fbdw = fbdw;
	}
	public String getTheme() {
		return theme;
	}
	public void setTheme(String theme) {
		this.theme = theme;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	public String getFilepath() {
		return filepath;
	}
	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}
	public String getFilesize() {
		return filesize;
	}
	public void setFilesize(String filesize) {
		File f = new File(this.filepath);
		this.filesize = f.length()/1024 + "." + f.length()%1024 + "Kb";
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}

}
