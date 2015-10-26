package com.ldtec.stpm.export.data;

import java.io.Serializable;
import java.util.ArrayList;

public class GenerateWordData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String TId = "";
	private String templatePath = "";
	private String headerSize = "";
	private String isGenerateAll = "";
	private String templateHeader = "";
	private String filedList = "";

	public String getFiledList() {
		return filedList;
	}

	public void setFiledList(String filedList) {
		this.filedList = filedList;
	}

	public String getTemplateHeader() {
		return templateHeader;
	}

	public void setTemplateHeader(String templateHeader) {
		this.templateHeader = templateHeader;
	}

	public String getIsGenerateAll() {
		return isGenerateAll;
	}

	public void setIsGenerateAll(String isGenerateAll) {
		this.isGenerateAll = isGenerateAll;
	}

	private ArrayList tableList = new ArrayList();

	public ArrayList getTableList() {
		return tableList;
	}

	public void setTableList(ArrayList tableList) {
		this.tableList = tableList;
	}

	public void setTableListByViewData(SecurityData vdata) {
		this.tableList.add(vdata);
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

	public String getHeaderSize() {
		return headerSize;
	}

	public void setHeaderSize(String headerSize) {
		this.headerSize = headerSize;
	}

}
