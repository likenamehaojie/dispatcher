package com.ldtec.stpm.workflow.data;

import java.util.*;

import com.ldtec.stpm.genericTable.data.*;

public class WorkFlowData {
    public WorkFlowData() {
    }

    public ArrayList getAttList() {
        return attList;
    }

    public SelectData getSdata() {
        return sdata;
    }

    public String getTableName() {
        return tableName;
    }

    public String getListHtml() {
        return listHtml;
    }

    public String getViewTemplateId() {
        return viewTemplateId;
    }

    public HashMap getStepList() {
        return stepList;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public void setSdata(SelectData sdata) {
        this.sdata = sdata;
    }

    public void setListHtml(String listHtml) {
        this.listHtml = listHtml;
    }

    public void setViewTemplateId(String viewTemplateId) {
        this.viewTemplateId = viewTemplateId;
    }

    public void setExcelTohtml(boolean excelTohtml) {
        this.excelTohtml = excelTohtml;
    }

    public void setAttList(String field){
      attList.add(field);
    }

    public void setStepDataToMap(String key,StepData sdata){
      stepList.put(key,sdata);
    }

    public StepData getStepDataFromMap(String key){
      return (StepData)stepList.get(key);
    }

    public void addCountList(CountData countLdata) {
        if(CountList==null)
          CountList=new ArrayList();
        this.CountList.add(countLdata);
    }

    public ArrayList getCountList() {
        return CountList;
    }
    public void addFilterSqlList(String sql) {
        if(filterSql==null)
          filterSql=new ArrayList();
        this.filterSql.add(sql);
    }
    public ArrayList getFilterSql() {
        return filterSql;
    }

    public boolean isExcelTohtml() {
        return excelTohtml;
    }

    private String tableName="";
    private String viewTemplateId="";
    private ArrayList attList= new ArrayList();
    private SelectData sdata=new SelectData();
    private HashMap stepList = new HashMap();
    private String listHtml="";
    private ArrayList CountList= null;
    private ArrayList filterSql=null;
    private boolean excelTohtml=false;
}
