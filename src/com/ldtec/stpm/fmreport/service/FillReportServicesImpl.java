package com.ldtec.stpm.fmreport.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ldtec.stpm.fillreport.dao.FillReportDao;


@Service
public class FillReportServicesImpl  implements FillReportServices{
	@Resource
private FillReportDao fd;
	@Override
	public boolean save(String colNames, String values, String id,
			String tableName) {
	     String sql = "update "+tableName+" set \n";
	     String [] sCol = colNames.split(",");
	     String [] sValue = values.split("&");
	     for(int i  = 0;i<sCol.length&&i<sValue.length;i++){
	    	   sql+=sCol[i]+"='"+sValue[i]+"',";
	    	 
	     }
		
	    sql =sql.substring(0, sql.length()-1);
	    sql +=" where id = "+id;
	    boolean save = fd.save(sql);
		
		return save;
	}



}
