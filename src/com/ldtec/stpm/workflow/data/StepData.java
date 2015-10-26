package com.ldtec.stpm.workflow.data;

import java.util.*;

public class StepData {
    public StepData() {
    }
    public ArrayList getUpdateFieldList() {
        return updateFieldList;
    }
    public void setUpdateFieldList(String field){
      updateFieldList.add(field);
    }

    public void addStepDefaulValueList(String fieldName,DefaultFieldData defData){
      stepDefaulValueList.put(fieldName,defData);
    }

    public DefaultFieldData getStepDefaulValueListBykey(String key){
      return (DefaultFieldData)stepDefaulValueList.get(key);
    }

    public HashMap getStepDefaulValueList() {
        return stepDefaulValueList;
    }

    public String getMulSelectFields() {
        return mulSelectFields;
    }

    public void setMulSelectFields(String mulSelectFields) {
        this.mulSelectFields = mulSelectFields;
    }

    public void setHtmUrl(String htmUrl) {
        this.htmUrl = htmUrl;
    }

    public void setMdata(MulInkData mdata) {
        this.mdata = mdata;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTodoNum(String todoNum) {
        this.todoNum = todoNum;
    }

    public void setHaveDefValue(boolean haveDefValue) {
        this.haveDefValue = haveDefValue;
    }

    public void setHaveMulInk(boolean haveMulInk) {
        this.haveMulInk = haveMulInk;
    }

    public void setFirstStatus(String firstStatus) {
        this.firstStatus = firstStatus;
    }

    public void setNextStatus(String nextStatus) {
        this.nextStatus = nextStatus;
    }

    public void setCantodo(String cantodo) {
        this.cantodo = cantodo;
    }

    public void setNoteInfo(String noteInfo) {
        this.noteInfo = noteInfo;
    }

    public void setNoteSql(String noteSql) {
        this.noteSql = noteSql;
    }

    public void setParaNum(int paraNum) {
        this.paraNum = paraNum;
    }

    public void addSelectField(String field){
      mulSelectFields=mulSelectFields+field+"|";
    }

    public ArrayList getAttList() {
      return attList;
    }

    public String getHtmUrl() {
        return htmUrl;
    }

    public void setAttList(String field){
      attList.add(field);
    }

    public ArrayList getStepTodoList() {
      return stepTodoList;
    }

    public MulInkData getMdata() {
        return mdata;
    }

    public String getNumber() {
        return number;
    }

    public String getTitle() {
        return title;
    }

    public String getTodoNum() {
        return todoNum;
    }

    public boolean isHaveDefValue() {
        return haveDefValue;
    }

    public boolean isHaveMulInk() {
        return haveMulInk;
    }

    public String getFirstStatus() {
        return firstStatus;
    }

    public String getNextStatus() {
        return nextStatus;
    }

    public String getCantodo() {
        return cantodo;
    }

    public String getNoteInfo() {
        return noteInfo;
    }

    public String getNoteSql() {
        return noteSql;
    }

    public int getParaNum() {
        return paraNum;
    }

    public void setStepTodoList(TodoData field){
      stepTodoList.add(field);
    }

    private ArrayList attList= new ArrayList();
    private String htmUrl="";
    private ArrayList updateFieldList=new ArrayList();
    private String mulSelectFields="|";
    private HashMap stepDefaulValueList= new HashMap();
    private boolean haveDefValue=false;
    private String todoNum="";
    private ArrayList stepTodoList=new ArrayList();
    private MulInkData mdata=new MulInkData();
    private boolean haveMulInk=false;
    private String number="";
    private String title="";
    private String firstStatus="";
    private String nextStatus="";
    private String cantodo="";
    private String noteInfo=null;
    private String noteSql=null;
    private int paraNum;
}
