package com.ldtec.stpm.fmreport.service;

import org.springframework.stereotype.Service;


public interface FillReportServices {

	
	public boolean save(String colNames,String values,String id,String tableName);
	
}
