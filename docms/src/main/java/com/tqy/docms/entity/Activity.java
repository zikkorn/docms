package com.tqy.docms.entity;

public class Activity {
	
	private String id;//活动事件id
	private String title;//活动标题
	private String activity_description;//活动内容
	private String userId;;//用户id
	private String name;//所属用户名
	private String datetime;//创建时间
	private String lx;//类型：公有，私有
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getActivity_description() {
		return activity_description;
	}
	public void setActivity_description(String activity_description) {
		this.activity_description = activity_description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public String getLx() {
		return lx;
	}
	public void setLx(String lx) {
		this.lx = lx;
	}

}
