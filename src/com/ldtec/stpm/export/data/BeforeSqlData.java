package com.ldtec.stpm.export.data;




public class BeforeSqlData {
	  private String viewSql="";
	  private String filedList="";
	  private String headerName = "";
	  private String fillPostion = "";
	  private String megreCols="";
	  private String style = "";
	  private String backgroundColor = "";
	  public String getViewSql() {
		return viewSql;
	}
	public void setViewSql(String viewSql) {
		this.viewSql = viewSql;
	}
	public String getFiledList() {
		return filedList;
	}
	public void setFiledList(String filedList) {
		this.filedList = filedList;
	}
	public String getHeaderName() {
		return headerName;
	}
	public void setHeaderName(String headerName) {
		this.headerName = headerName;
	}
	public String getFillPostion() {
		return fillPostion;
	}
	public void setFillPostion(String fillPostion) {
		this.fillPostion = fillPostion;
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
	public String getConnect() {
		return connect;
	}
	public void setConnect(String connect) {
		this.connect = connect;
	}
	public String getIsDynamic() {
		return isDynamic;
	}
	public void setIsDynamic(String isDynamic) {
		this.isDynamic = isDynamic;
	}
	private String iD = "";
	  private String connect = "";
	  private String isDynamic = "";
}
