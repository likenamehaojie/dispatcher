package com.ldtec.stpm.export.data;

import java.util.ArrayList;


public class ReportInfoData {
	private String TId="";
	private String templatePath= "";
	private String filedList = "";
	private String isMegreDisplay = "";//是否合并后显示
	private String canFillReport = "";
	private String tableName = "";
	
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getCanFillReport() {
		return canFillReport;
	}

	public void setCanFillReport(String canFillReport) {
		this.canFillReport = canFillReport;
	}

	public void setIsMegreDisplay(String isMegreDisplay){
		this.isMegreDisplay = isMegreDisplay;
	}
	
	public String getIsMegreDisplay(){
		return this.isMegreDisplay;
		
	}
	public void setBefSqlList(ArrayList befSqlList) {
		this.befSqlList = befSqlList;
	}
	public ArrayList getReportSection() {
		return reportSection;
	}
	public String getFiledList() {
		return filedList;
	}
	public void setFiledList(String filedList) {
		this.filedList = filedList;
	}
	public String getTId() {
		return TId;
	}
	public void setTId(String tId) {
		TId = tId;
	}
	public String getTemplatePath() {
		return templatePath;
	}
	public void setTemplatePath(String templatePath) {
		this.templatePath = templatePath;
	}

	public String getIsDynamic() {
		return isDynamic;
	}
	public void setIsDynamic(String isDynamic) {
		this.isDynamic = isDynamic;
	}
	public BeforeSqlData getBsd() {
		return bsd;
	}
	public void setBsd(BeforeSqlData bsd) {
		this.bsd = bsd;
	}
	public void setMainInfos(ArrayList mainInfos) {
		this.mainInfos = mainInfos;
	}
	private String isDynamic = "";
	private BeforeSqlData bsd  = null;
	private ArrayList befSqlList = new ArrayList();
	private ArrayList headerList=new ArrayList();
	private ArrayList reportSection = new ArrayList();
	private ArrayList mainInfos = new ArrayList();
	
	public ArrayList getMainInfos (){
		
		return this.mainInfos;
	}
	public void setMainInfos(MainInfoData mid){
	   	this.mainInfos.add(mid);
	}
	public ArrayList getBefSqlList(){
		return befSqlList;
	}
	
	public void setbefSqlList(BeforeSqlData bsd){
		this.befSqlList.add(bsd);
		
	}
	
	    public ArrayList getHeaderList() {
				return headerList;
			}
			public void setHeaderList(ArrayList headerList) {
				this.headerList = headerList;
			}
			 public void setHeaderListByViewData(HeaderInfoData vdata){
				   this.headerList.add(vdata);
			 }
			 public ArrayList getSectionList(){
				 return reportSection;
			 }
			 public void setReportSection(ArrayList reportSection){
				 this.reportSection = reportSection;
				 
			 }
			 public void setReportSectionListByViewData(SectionData vdata){
				   this.reportSection.add(vdata);
			 }
}
