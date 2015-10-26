package com.ldtec.stpm.workflow.data;

public class DefaultFieldData {
    public DefaultFieldData() {
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getFieldType() {
        return fieldType;
    }

    public String getOpttype() {
        return opttype;
    }

    public String getSql() {
        return sql;
    }

    public boolean isIsUnit() {
        return isUnit;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public void setOpttype(String opttype) {
        this.opttype = opttype;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public void setIsUnit(boolean isUnit) {
        this.isUnit = isUnit;
    }

    private String fieldName="";
    private String fieldType="";
    private String opttype="";
    private String sql="";
    private boolean isUnit=false;
}
