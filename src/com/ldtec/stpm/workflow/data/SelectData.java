package com.ldtec.stpm.workflow.data;

import java.util.*;

public class SelectData {
    public SelectData() {
    }


    public String getRecordCountSql() {
        return recordCountSql;
    }

    public String getSqlClos() {
        return sqlClos;
    }

    public String getSqlTables() {
        return sqlTables;
    }

    public String getIKey() {
        return IKey;
    }

    public String getOKey() {
        return OKey;
    }

    public String getOType() {
        return OType;
    }

    public int getPageSize() {
        return pageSize;
    }

    public ArrayList getSelectFieldList() {
        return selectFieldList;
    }

    public String getDistinct() {
        return distinct;
    }

    public void setSqlTables(String sqlTables) {
        this.sqlTables = sqlTables;
    }

    public void setSqlClos(String sqlClos) {
        this.sqlClos = sqlClos;
    }

    public void setRecordCountSql(String recordCountSql) {
        this.recordCountSql = recordCountSql;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setDistinct(String distinct) {
        this.distinct = distinct;
    }

    public void setOType(String OType) {
        this.OType = OType;
    }

    public void setOKey(String OKey) {
        this.OKey = OKey;
    }

    public void setIKey(String IKey) {
        this.IKey = IKey;
    }
    public void SetSelectFieldList(String field){
      selectFieldList.add(field);
    }
    public String getSelectFieldById(int i){
      return (String)selectFieldList.get(i);
    }


    private String sqlClos="";
    private String sqlTables="";
    private int pageSize=0;
    private String recordCountSql="";
    private String IKey;
    private String OKey;
    private String OType;
    private String distinct;
    private ArrayList selectFieldList=new ArrayList();
}
