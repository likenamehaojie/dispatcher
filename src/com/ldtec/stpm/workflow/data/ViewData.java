package com.ldtec.stpm.workflow.data;

import java.util.*;

public class ViewData {
    public ViewData() {
        try {
            jbInit();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    public ArrayList getViewFieldList() {
        return viewFieldList;
    }
    public ArrayList getAttList() {
        return attList;
    }

    public String getViewSql() {
        return viewSql;
    }

    public String getRecordId() {
        return recordId;
    }

    public String getTableName() {
        return tableName;
    }

    public String getRowName() {
        return rowName;
    }

    public int getWordRecordCount() {
        return wordRecordCount;
    }

    public String getWordSql() {
        return wordSql;
    }

    public boolean isExcelTohtml() {
        return excelTohtml;
    }

    public void setViewSql(String viewSql) {
        this.viewSql = viewSql;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public void setWordRecordCount(int wordRecordCount) {
        this.wordRecordCount = wordRecordCount;
    }

    public void setWordSql(String wordSql) {
        this.wordSql = wordSql;
    }

    public void setExcelTohtml(boolean excelTohtml) {
        this.excelTohtml = excelTohtml;
    }

    public void SetViewFieldList(String field){
      viewFieldList.add(field);
    }

    public void SetAttList(String field){
      attList.add(field);
    }
    public void setImageList(String field){
      imageList=field;
    }
    public String getImageList(){
      return imageList;
    }

    private String viewSql="";
    private String wordSql="";
    private String recordId="";
    private String tableName="";
    private ArrayList viewFieldList=new ArrayList();
    private String rowName="";
    private int wordRecordCount=0;
    private ArrayList attList= new ArrayList();
    private String imageList= null;
    private boolean excelTohtml=false;
    /**
     * getViewFieldById
     *
     * @param i int
     * @return String
     */
    public String getViewFieldById(int i) {
        return (String)viewFieldList.get(i);
    }

    private void jbInit() throws Exception {
    }
}
