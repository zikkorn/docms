package com.tqy.docms.entity;

public class Zjzxzxx {
    private String id;//专家资讯组信息id
    private String name;//姓名
    private String bzb;//部职别
    private String birthday;//出生年月
    private String positional;//职称
    private String csly;//从事领域
    private String sxzy;//所学专业
    private String record;//学历
    private String filepath;//文档路径
    private String bz;//备注
    private String createDate;
    private String updateDate;

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

    public String getBzb() {
        return bzb;
    }

    public void setBzb(String bzb) {
        this.bzb = bzb == null ? null : bzb.trim();
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday == null ? null : birthday.trim();
    }

    public String getPositional() {
        return positional;
    }

    public void setPositional(String positional) {
        this.positional = positional == null ? null : positional.trim();
    }

    public String getCsly() {
        return csly;
    }

    public void setCsly(String csly) {
        this.csly = csly == null ? null : csly.trim();
    }

    public String getSxzy() {
        return sxzy;
    }

    public void setSxzy(String sxzy) {
        this.sxzy = sxzy == null ? null : sxzy.trim();
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record == null ? null : record.trim();
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath == null ? null : filepath.trim();
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz == null ? null : bz.trim();
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate == null ? null : createDate.trim();
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate == null ? null : updateDate.trim();
    }
}