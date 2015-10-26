package com.ldtec.stpm.workflow.data;



public class MulInkData {
    public MulInkData() {
    }

    public String getUpdateSql() {
        return updateSql;
    }

    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }

    public String getType() {
        return type;
    }

    public void setUpdateSql(String updateSql) {
        this.updateSql = updateSql;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String type="";
    private String name="";
    private String status="";
    private String updateSql="";
}
