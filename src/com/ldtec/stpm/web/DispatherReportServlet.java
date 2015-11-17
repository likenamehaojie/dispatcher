package com.ldtec.stpm.web;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Font;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.ldtec.stpm.fmreport.service.ReportService;
import com.ldtec.stpm.fmreport.util.Constants;
import com.ldtec.stpm.fmreport.util.Excel_Sheet;
import com.ldtec.stpm.fmreport.util.SqlReplaceUseSysStrUtil;
import com.ldtec.stpm.genericTable.util.XMLTableKeyWordPar;
import com.ldtec.stpm.login.UserSession;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@SuppressWarnings("deprecation")
@Controller
public class DispatherReportServlet{
	private static Configuration config;
	private static final String CONTENT_TYPE = "text/html; charset=GBK";
    @Resource
	private HttpServletRequest request;
   

	@RequestMapping("/report.mv")
	public ModelAndView genReport(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out
				.println("----------------------------------->进入reportServlet");
		response.setContentType(CONTENT_TYPE);
		request.setCharacterEncoding("GBK");
		String action = request.getParameter("action");
			if (action.equals("getReport")) { // 查看表单记录列表
					return this.getReportV(request, response);
			} else if (action.equals("exportReport")) {// 做导出处理
					this.exportReport(request, response);
					return null;
			} else if(action.equals("exportAllReport")){
					this.exportAllReport(request, response);
					return null;
			}
			return null;
	}
	

	

	private void exportAllReport(HttpServletRequest request, HttpServletResponse response) {

                //拿 到uuids以便报表合并
		        String uuids = request.getParameter("uuids");
		        //拿到可读名
		        String humanRead = request.getParameter("exportName");
		        //拿到导出方式 
		        String exportModel = request.getParameter("exportModel");
		        //如果导出模式为多inMulitpar 说明 该导出模式为合并到一个excel文件中的多个sheet
		        if(exportModel == null||exportModel.equals("inMulitpart")){
		        	//将报表合并到一个sheet中的
		        	this.generateExcelInMulitPartSheet(uuids,humanRead,response);
		        }else if(exportModel!= null&&exportModel.equals("allInOne")){
		        	//将报表合并到
		        	this.generateExcelAllInOne(uuids,humanRead,response);
		        }
		
	}

	private void generateExcelAllInOne(String uuids,String humanCanRead,HttpServletResponse response) {
		//拿到各个uuid    
		String[] uuidArray = uuids.split("_");
		HSSFWorkbook wbt = new  HSSFWorkbook();
		String realPath = this.request.getSession().getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath =Constants.DOWNPATH;
		Map<String,Font> _caFont = new HashMap<String, Font>();
		Map<String,HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
		try {
			for(int i = 0;i<uuidArray.length;i++){
				String _temStr = uuidArray[i];
				String[] sStr = _temStr.split("\\|");
				String fileName = sStr[0];
				int flagExportHeader = Integer.parseInt(sStr[1]);
				
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(downPath+fileName+".xls"));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				wbt= Excel_Sheet.copyRowsInSameSheetTest(wb, wbt,_caFont,_caHSSFCellStyle,flagExportHeader);
				
			}
			 if(wbt.isWriteProtected()){
			wbt.unwriteProtectWorkbook();
			
			 }
/*		for (String fileName : uuidArray) {
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(downPath+fileName+".xls"));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				wbt= Excel_Sheet.copyRowsInSameSheet(wb, wbt,_caFont,_caHSSFCellStyle);
			
		}*/
			String _uuids = UUID.randomUUID().toString();
			
			FileOutputStream fileOut = new FileOutputStream(downPath+_uuids+".xls");
		    Excel_Sheet.setPrintStyle(wbt);
			wbt.write(fileOut);
			fileOut.flush();
			fileOut.close();
			
			//开始响应页面
			OutputStream outputStream = null;
			InputStream inputStream = null;
			UserSession session=  SqlReplaceUseSysStrUtil.getUserSessionByRequest(this.request);
			humanCanRead = SqlReplaceUseSysStrUtil.replaceSql(humanCanRead,session);
			String dayInMonth = request.getParameter("dayInMonth");
			if(dayInMonth!=null){
				humanCanRead+=" "+dayInMonth;
			}
			humanCanRead+=".xls";
			response.reset();
			response.setContentType("application/vnd.ms-excel; charset=GBK");
			response.addHeader("Content-Disposition", "attachment; filename=\""
					+ new String(humanCanRead.getBytes("GBK"), "8859_1") + "\"");
			response.setHeader("Pragma", "no-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			try {
				outputStream = response.getOutputStream();
				inputStream = new FileInputStream(downPath + _uuids + ".xls");
				byte[] buffer = new byte[1024];
				int i = -1;
				while ((i = inputStream.read(buffer)) != -1) {
					outputStream.write(buffer, 0, i);
				}
				outputStream.flush();
				outputStream.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (inputStream != null) {
					try {
						inputStream.close();
						if (outputStream != null) {
							outputStream.close();
						}
					} catch (IOException e) {

					}

				}

			}
			
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}
	
	private void generateExcelInMulitPartSheet(String uuids,String humanCanRead,HttpServletResponse response) {
		//拿到各个uuid
		String[] uuidArray = uuids.split("_");
		HSSFWorkbook wbt = new  HSSFWorkbook();
		String realPath = this.request.getSession().getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath =Constants.DOWNPATH;
		Map<String,Font> _caFont = new HashMap<String, Font>();
		Map<String,HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
		try {
		for (String fileName : uuidArray) {
			
			String[] sStr = fileName.split("\\|");
			String ffileName = sStr[0];

				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(downPath+ffileName+".xls"));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				wbt= Excel_Sheet.copyRows(wb, wbt,_caFont,_caHSSFCellStyle);
			
		}
		String _uuids = UUID.randomUUID().toString();
			FileOutputStream fileOut = new FileOutputStream(downPath+_uuids+".xls");
			wbt.write(fileOut);
			fileOut.flush();
			fileOut.close();
			
			//开始响应页面
			OutputStream outputStream = null;
			InputStream inputStream = null;
			humanCanRead+=".xls";
			response.reset();
			response.setContentType("application/vnd.ms-excel; charset=GBK");
			response.addHeader("Content-Disposition", "attachment; filename=\""
					+ new String(humanCanRead.getBytes("GBK"), "8859_1") + "\"");
			response.setHeader("Pragma", "no-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			try {
				outputStream = response.getOutputStream();
				inputStream = new FileInputStream(downPath + _uuids + ".xls");
				byte[] buffer = new byte[1024];
				int i = -1;
				while ((i = inputStream.read(buffer)) != -1) {
					outputStream.write(buffer, 0, i);
				}
				outputStream.flush();
				outputStream.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (inputStream != null) {
					try {
						inputStream.close();
						if (outputStream != null) {
							outputStream.close();
						}
					} catch (IOException e) {

					}

				}

			}
			
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}

	/**
	 * 对报表做导出处理
	 * 
	 * @param request
	 * @param response
	 * @throws UnsupportedEncodingException
	 */
	private void exportReport(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		
		String realPath = this.request.getSession().getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		String uuidName = request.getParameter("uuid");
		String replaceName = request.getParameter("exportName");
		replaceName += ".xls";
		OutputStream outputStream = null;
		InputStream inputStream = null;
		response.reset();
		response.setContentType("application/vnd.ms-excel; charset=GBK");
		response.addHeader("Content-Disposition", "attachment; filename=\""
				+ new String(replaceName.getBytes("GBK"), "8859_1") + "\"");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		downPath = Constants.DOWNPATH;
		try {
			outputStream = response.getOutputStream();
			inputStream = new FileInputStream(downPath + uuidName + ".xls");
			
			byte[] buffer = new byte[1024];
			int i = -1;
			while ((i = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, i);
			}
			outputStream.flush();
			outputStream.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
					if (outputStream != null) {
						outputStream.close();
					}
				} catch (IOException e) {

				}

			}

		}

	}

	private ModelAndView getReportV(HttpServletRequest req, HttpServletResponse resp) {
	
		
		
		// 构建模板数据
		Map<String, Object> root = new HashMap<String, Object>();
		// 拿到模板标识
		String reportFlag = req.getParameter("flag");
		String ITNO = req.getParameter("ITNO");
		String tablekeyword = req.getParameter("tablekeyword");
		String dateformat = req.getParameter("dateformat");
		ReportService rs = new ReportService();
		root.put("flag", reportFlag);
		root.put("ITNO",ITNO);
		root.put("tablekeyword",tablekeyword);
		root.put("dateformat", dateformat);
	    //System.out.println(rs.opeOtherExtend());
	
		rs.generReportByNew(reportFlag, req, root);
		System.out.println(root.get("allinone"));
		String view = root.get("templatename").toString();
		ModelAndView mav = new ModelAndView(view);
		mav.addAllObjects(root);
	//	mav.addObject(root);
	//	mav.addObject("test", root);

		
		
		return mav;
	}
	


}
