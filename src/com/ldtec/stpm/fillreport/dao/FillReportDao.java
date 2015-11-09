package com.ldtec.stpm.fillreport.dao;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Repository;

import com.ldtec.base.DB.DBControl;

@Repository
public class FillReportDao {
@Resource
private HttpServletRequest request;

public boolean save(String sql){
	DBControl db = new DBControl(request);
	boolean executeDB = db.ExecuteDB(sql);
	return executeDB;
	
	
}


}
