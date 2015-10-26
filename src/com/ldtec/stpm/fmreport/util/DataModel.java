package com.ldtec.stpm.fmreport.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;

public class DataModel {
      int id;
	  int pid;
      String headvalue;
      int max;
      ResultSet rs;
      PreparedStatement ps;
      Connection connection; 
      GenerExcle ge;
      int reportId;
      int leve;
      int currentIndex;
      int index;
      public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	Map<String, Integer> moveInfoMap;
      Map<String, Integer> leveMoveInfoMap;
      Map<String ,Map<String,Integer>> repairMoveInfo;
	public Map<String, Map<String, Integer>> getRepairMoveInfo() {
		return repairMoveInfo;
	}
	public void setRepairMoveInfo(Map<String, Map<String, Integer>> repairMoveInfo) {
		this.repairMoveInfo = repairMoveInfo;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getHeadvalue() {
		return headvalue;
	}
	public void setHeadvalue(String headvalue) {
		this.headvalue = headvalue;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}
	public ResultSet getRs() {
		return rs;
	}
	public void setRs(ResultSet rs) {
		this.rs = rs;
	}
	public PreparedStatement getPs() {
		return ps;
	}
	public void setPs(PreparedStatement ps) {
		this.ps = ps;
	}
	public Connection getConnection() {
		return connection;
	}
	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	public GenerExcle getGe() {
		return ge;
	}
	public void setGe(GenerExcle ge) {
		this.ge = ge;
	}
	public int getReportId() {
		return reportId;
	}
	public void setReportId(int reportId) {
		this.reportId = reportId;
	}
	public int getLeve() {
		return leve;
	}
	public void setLeve(int leve) {
		this.leve = leve;
	}
	public int getCurrentIndex() {
		return currentIndex;
	}
	public void setCurrentIndex(int currentIndex) {
		this.currentIndex = currentIndex;
	}
	public Map<String, Integer> getMoveInfoMap() {
		return moveInfoMap;
	}
	public void setMoveInfoMap(Map<String, Integer> moveInfoMap) {
		this.moveInfoMap = moveInfoMap;
	}
	public Map<String, Integer> getLeveMoveInfoMap() {
		return leveMoveInfoMap;
	}
	public void setLeveMoveInfoMap(Map<String, Integer> leveMoveInfoMap) {
		this.leveMoveInfoMap = leveMoveInfoMap;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
}
