package com.ldtec.stpm.export.data;

import java.util.ArrayList;

public class PeopleInfoData {

	private String tid;
	private String templatepath;
	private String filedList;
	private String exportName;
	private ArrayList<InfoData> infos = new ArrayList<InfoData>();

	public String getExportName() {
		return this.exportName;
	}

	public void setExportName(String exportName) {
		this.exportName = exportName;

	}

	public ArrayList<InfoData> getInfos() {
		return infos;
	}

	public void setInfosByAddInfoData(InfoData info) {
		this.infos.add(info);

	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getTemplatepath() {
		return templatepath;
	}

	public void setTemplatepath(String templatepath) {
		this.templatepath = templatepath;
	}

	public String getFiledList() {
		return filedList;
	}

	public void setFiledList(String filedList) {
		this.filedList = filedList;
	}

}
