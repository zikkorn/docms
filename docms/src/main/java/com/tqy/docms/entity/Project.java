package com.tqy.docms.entity;

import java.io.Serializable;

public class Project implements Serializable {
    private static final long serialVersionUID = 2030838869501825729L;
    private  String id ; //项目ID
    private  String projectName; //项目名
    private  String createDate; //创建时间
    private  String updateDate; //修改时间
    private  String dept;  //所属单位
    private  String projectLx; //项目类型
    private  String parentId;//父项目id
    private  String yzdw;//研制单位
    private  String fzr;//主要负责人
    private  String zjtd;//专家团队
    private  String lxjdDate;//立项阶段时间
    private  String yzzyqjdDate;//研制总要求阶段时间
    private  String fajdDate;//方案阶段时间
    private  String zyjdDate;//正样阶段时间
    private  String xnjdjdDate;//性能鉴定阶段
    private  String zzsyjdDate;//作战试验阶段
    private  String lzdxjdDate;//列装定性阶段
    private  String userId;//用户id
    private  String zxjd;//执行阶段
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getProjectLx() {
		return projectLx;
	}

	public void setProjectLx(String projectLx) {
		this.projectLx = projectLx;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getYzdw() {
		return yzdw;
	}

	public void setYzdw(String yzdw) {
		this.yzdw = yzdw;
	}

	public String getFzr() {
		return fzr;
	}

	public void setFzr(String fzr) {
		this.fzr = fzr;
	}

	public String getZjtd() {
		return zjtd;
	}

	public void setZjtd(String zjtd) {
		this.zjtd = zjtd;
	}

	public String getLxjdDate() {
		return lxjdDate;
	}

	public void setLxjdDate(String lxjdDate) {
		this.lxjdDate = lxjdDate;
	}

	public String getYzzyqjdDate() {
		return yzzyqjdDate;
	}

	public void setYzzyqjdDate(String yzzyqjdDate) {
		this.yzzyqjdDate = yzzyqjdDate;
	}

	public String getFajdDate() {
		return fajdDate;
	}

	public void setFajdDate(String fajdDate) {
		this.fajdDate = fajdDate;
	}

	public String getZyjdDate() {
		return zyjdDate;
	}

	public void setZyjdDate(String zyjdDate) {
		this.zyjdDate = zyjdDate;
	}

	public String getXnjdjdDate() {
		return xnjdjdDate;
	}

	public void setXnjdjdDate(String xnjdjdDate) {
		this.xnjdjdDate = xnjdjdDate;
	}

	public String getZzsyjdDate() {
		return zzsyjdDate;
	}

	public void setZzsyjdDate(String zzsyjdDate) {
		this.zzsyjdDate = zzsyjdDate;
	}

	public String getLzdxjdDate() {
		return lzdxjdDate;
	}

	public void setLzdxjdDate(String lzdxjdDate) {
		this.lzdxjdDate = lzdxjdDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getZxjd() {
		return zxjd;
	}

	public void setZxjd(String zxjd) {
		this.zxjd = zxjd;
	}
	
	
	
}
