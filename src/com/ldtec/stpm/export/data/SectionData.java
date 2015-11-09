package com.ldtec.stpm.export.data;




public class SectionData {
	  private String viewSql="";
	  private String sectionName="";
	  private String connect ="";
	  private String megreCols="";
	  private String rowStyle = "";

	  private String megrePointLose;//位移量丢失
	  
	  private String refColmun;//参照列
	  
	  private String isIncludeReportName;//导出excel报表时 是否包含 报表名称
	  
	  private String isGenerateLiteTittle;//
	  
	  private String connectPoint;
	  
      private String tittleGenerRule;
      
      private String headerWidth;
      
      private String dateHasNoBoder;
      
      private String avgHight;
	 
	  
	  public String getAvgHight() {
		return avgHight;
	}

	public void setAvgHight(String avgHight) {
		this.avgHight = avgHight;
	}

	public String getDateHasNoBoder() {
		return dateHasNoBoder;
	}

	public void setDateHasNoBoder(String dateHasNoBoder) {
		this.dateHasNoBoder = dateHasNoBoder;
	}

	public String getHeaderWidth() {
		return headerWidth;
	}

	public void setHeaderWidth(String headerWidth) {
		this.headerWidth = headerWidth;
	}

	public String getTittleGenerRule() {
		return tittleGenerRule;
	}

	public void setTittleGenerRule(String tittleGenerRule) {
		this.tittleGenerRule = tittleGenerRule;
	}

	public String getConnectPoint() {
		return connectPoint;
	}

	public void setConnectPoint(String connectPoint) {
		this.connectPoint = connectPoint;
	}

	public String getIsGenerateLiteTittle() {
		return isGenerateLiteTittle;
	}

	public void setIsGenerateLiteTittle(String isGenerateLiteTittle) {
		this.isGenerateLiteTittle = isGenerateLiteTittle;
	}
	private String isMegreBody;//该section是否是合并主体
	  
	  private String isConvertColToRow;
	  
	  private String isUseDataBaseMegreRule;
	  
	  private String isGenerateReportHeader;
	  
	  private String isExportHeader;
	  public String getIsExportHeader() {
		return isExportHeader;
	}

	public void setIsExportHeader(String isExportHeader) {
		this.isExportHeader = isExportHeader;
	}

	public String getIsGenerateReportHeader() {
		return isGenerateReportHeader;
	}

	public void setIsGenerateReportHeader(String isGenerateReportHeader) {
		this.isGenerateReportHeader = isGenerateReportHeader;
	}

	public String getIsUseDataBaseMegreRule() {
		return isUseDataBaseMegreRule;
	}

	public void setIsUseDataBaseMegreRule(String isUseDataBaseMegreRule) {
		this.isUseDataBaseMegreRule = isUseDataBaseMegreRule;
	}

	public String getIsConvertColToRow() {
		return isConvertColToRow;
	}

	public void setIsConvertColToRow(String isConvertColToRow) {
		this.isConvertColToRow = isConvertColToRow;
	}

	public void setIsIncludeReportName(String isIncludeReportName ){
		  this.isIncludeReportName = isIncludeReportName;
	  }
	  
	  public String getIsIncludeReportName(){
		  return this.isIncludeReportName;
	  }
	  
	  public void setIsMegreBody(String isMegreBody){
		  this.isMegreBody = isMegreBody;
	  }
	  
	  public String getIsMegreBody(){
		  return this.isMegreBody;
	  }
	  public void setRefColmun(String refColmun){
		  this.refColmun = refColmun;
		  
	  }
	  public String getRefColmun(){
		  return this.refColmun;
	  }
	  
	  public String getMegrePointLose(){
		  return this.megrePointLose;
	  }
	  public void setMegrePointLose(String megrePointLose){
		  this.megrePointLose = megrePointLose;
	  }
	  public String getRowStyle (){
		  return this.rowStyle;
		  
	  }
	  public void setRowStyle (String rowStyle){
		  this.rowStyle = rowStyle;
	  }
	  
	  public String getViewSql() {
		return viewSql;
	}
	public void setViewSql(String viewSql) {
		this.viewSql = viewSql;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	public String getConnect() {
		return connect;
	}
	public void setConnect(String connect) {
		this.connect = connect;
	}
	public String getMegreCols() {
		return megreCols;
	}
	public void setMegreCols(String megreCols) {
		this.megreCols = megreCols;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getBackgroundColor() {
		return backgroundColor;
	}
	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}
	public String getID() {
		return iD;
	}
	public void setID(String iD) {
		this.iD = iD;
	}
	public String getFillPostion() {
		return fillPostion;
	}
	public void setFillPostion(String fillPostion) {
		this.fillPostion = fillPostion;
	}
	public String getHeaderName() {
		return headerName;
	}
	public void setHeaderName(String headerName) {
		this.headerName = headerName;
	}
	public String getExportName() {
		return exportName;
	}
	public void setExportName(String exportName) {
		this.exportName = exportName;
	}
	private String style = "";
	  private String backgroundColor = "";
	  private String iD = "";
	  private String fillPostion = "";
	  private String headerName = "";
	  private String exportName = "";
	  
}
