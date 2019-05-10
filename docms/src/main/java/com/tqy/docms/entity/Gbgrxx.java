package com.tqy.docms.entity;

public class Gbgrxx {

    private String id;//干部个人信息id
    private String name;//姓名
    private String birthday;//出生年月日
    private String dtsj;//党团时间
    private String rwsj;//入伍时间
    private String jg;//籍贯
    private String xzjysj;//现职级与时间
    private String jxysj;//军衔与时间
    private String zyjszgysj;//专业技术资格与时间
    private String qrzxl;//全日制学历
    private String jgz;//军官证
    private String sfz;//身份证
    private String bz;//备注
    private String filepath;//上传文档
	private String createDate;//创建时间
	private String updateDate;//更新时间

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday == null ? null : birthday.trim();
    }

    public String getDtsj() {
        return dtsj;
    }

    public void setDtsj(String dtsj) {
        this.dtsj = dtsj == null ? null : dtsj.trim();
    }

    public String getRwsj() {
        return rwsj;
    }

    public void setRwsj(String rwsj) {
        this.rwsj = rwsj == null ? null : rwsj.trim();
    }

    public String getJg() {
        return jg;
    }

    public void setJg(String jg) {
        this.jg = jg == null ? null : jg.trim();
    }

    public String getXzjysj() {
        return xzjysj;
    }

    public void setXzjysj(String xzjysj) {
        this.xzjysj = xzjysj == null ? null : xzjysj.trim();
    }

    public String getJxysj() {
        return jxysj;
    }

    public void setJxysj(String jxysj) {
        this.jxysj = jxysj == null ? null : jxysj.trim();
    }

    public String getZyjszgysj() {
        return zyjszgysj;
    }

    public void setZyjszgysj(String zyjszgysj) {
        this.zyjszgysj = zyjszgysj == null ? null : zyjszgysj.trim();
    }

    public String getQrzxl() {
        return qrzxl;
    }

    public void setQrzxl(String qrzxl) {
        this.qrzxl = qrzxl == null ? null : qrzxl.trim();
    }

    public String getJgz() {
        return jgz;
    }

    public void setJgz(String jgz) {
        this.jgz = jgz == null ? null : jgz.trim();
    }

    public String getSfz() {
        return sfz;
    }

    public void setSfz(String sfz) {
        this.sfz = sfz == null ? null : sfz.trim();
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz == null ? null : bz.trim();
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath == null ? null : filepath.trim();
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
    
}