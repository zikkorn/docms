package com.tqy.docms.entity;

public class Cjxx {
    private String id; //配套厂家信息id
    private String czdw;//承制单位
    private String jc;//简称
    private String zgjdj;//主管军代局
    private String zgjds;//主管军代室
    private String place;//地点
    private String gyzgbm;//工业主管部门
    private String qyxz;//企业性质
    private String yfrw;//研发任务
    private String scrw;//生产任务
    private String filepath;//文件路径
    private String bz;//备注
    private String createDate;
    private String updateDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCzdw() {
        return czdw;
    }

    public void setCzdw(String czdw) {
        this.czdw = czdw == null ? null : czdw.trim();
    }

    public String getJc() {
        return jc;
    }

    public void setJc(String jc) {
        this.jc = jc == null ? null : jc.trim();
    }

    public String getZgjdj() {
        return zgjdj;
    }

    public void setZgjdj(String zgjdj) {
        this.zgjdj = zgjdj == null ? null : zgjdj.trim();
    }

    public String getZgjds() {
        return zgjds;
    }

    public void setZgjds(String zgjds) {
        this.zgjds = zgjds == null ? null : zgjds.trim();
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place == null ? null : place.trim();
    }

    public String getGyzgbm() {
        return gyzgbm;
    }

    public void setGyzgbm(String gyzgbm) {
        this.gyzgbm = gyzgbm == null ? null : gyzgbm.trim();
    }

    public String getQyxz() {
        return qyxz;
    }

    public void setQyxz(String qyxz) {
        this.qyxz = qyxz == null ? null : qyxz.trim();
    }

    public String getYfrw() {
        return yfrw;
    }

    public void setYfrw(String yfrw) {
        this.yfrw = yfrw == null ? null : yfrw.trim();
    }

    public String getScrw() {
        return scrw;
    }

    public void setScrw(String scrw) {
        this.scrw = scrw == null ? null : scrw.trim();
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