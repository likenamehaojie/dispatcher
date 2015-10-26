package com.ldtec.stpm.export.data;

import java.util.ArrayList;




public class HeaderInfoData {
	  private String viewSql="";
	  private String headerName="";
	  private String connect ="";
	  
	  public String getViewSql() {
		return viewSql;
	}

	public void setViewSql(String viewSql) {
		this.viewSql = viewSql;
	}

	public String getHeaderName() {
		return headerName;
	}

	public void setHeaderName(String headerName) {
		this.headerName = headerName;
	}

	public String getConnect() {
		return connect;
	}

	public void setConnect(String connect) {
		this.connect = connect;
	}

	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	private String reportId = "";

}
