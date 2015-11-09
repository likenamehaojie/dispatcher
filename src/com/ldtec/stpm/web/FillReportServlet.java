package com.ldtec.stpm.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ldtec.stpm.fmreport.service.FillReportServices;

@Controller
public class FillReportServlet {
	@Resource
private FillReportServices fs;
	
	@RequestMapping(value = "/fillReport.mv")
	@ResponseBody
	public Boolean fillReport(
				@RequestParam(value = "colNames" , required = false) String colNames
			   ,@RequestParam(value="values",required = false) String values
			   ,@RequestParam(value = "id",required = false) String id
			   ,@RequestParam(value = "canFillReportTableName",required = false) String canFillReportTableName
			   ,HttpServletResponse response
			){
		System.out.println("like");
		boolean save = fs.save(colNames, values, id, canFillReportTableName);
		
		return save;
	}
	
}
