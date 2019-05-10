package com.tqy.docms.entity;

import java.io.Serializable;

public class Document implements Serializable {
    private static final long serialVersionUID = 2030838869501825729L;
    private String id; // 文档ID
    private String docName; //文档名
    private String docPath;// 文档路径
    private String createDate;//创建时间
    private String updateDate;//更新时间
    private String projectId;//所属项目id
    private String projectName;//项目名称
    private String projectStage;//项目类型
    private String projectStageChild;//所属子类型
    private String userId;//用户id

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocPath() {
        return docPath;
    }

    public void setDocPath(String docPath) {
        this.docPath = docPath;
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

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectStage() {
        return projectStage;
    }

    public void setProjectStage(String projectStage) {
        this.projectStage = projectStage;
    }

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectStageChild() {
		return projectStageChild;
	}

	public void setProjectStageChild(String projectStageChild) {
		this.projectStageChild = projectStageChild;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
    
}
