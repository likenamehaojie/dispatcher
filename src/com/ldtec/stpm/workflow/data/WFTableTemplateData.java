package com.ldtec.stpm.workflow.data;

import java.util.*;

public class WFTableTemplateData {
    public WFTableTemplateData() {
    }

    public String getTId() {
        return TId;
    }

    public ArrayList getTableList() {
        return tableList;
    }

    public String getSingleness() {
        return singleness;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public String getDownFileTitle() {
        return downFileTitle;
    }

    public void setTId(String TId) {
        this.TId = TId;
    }
    public void setTableListByViewData(ViewData vdata){
      this.tableList.add(vdata);
    }

    public void setSingleness(String singleness) {
        this.singleness = singleness;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public void setDownFileTitle(String downFileTitle) {
        this.downFileTitle = downFileTitle;
    }
     
    private ArrayList tableList=new ArrayList();
    private String TId="";
    private String singleness= "";
    private String projectTitle=""; 
    private String downFileTitle="";
    private String headerSize =""; 

}
