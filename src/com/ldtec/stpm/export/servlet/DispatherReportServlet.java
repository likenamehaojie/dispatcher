package com.ldtec.stpm.export.servlet;

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

import com.ldtec.stpm.fmreport.service.ReportService;
import com.ldtec.stpm.fmreport.util.Constants;
import com.ldtec.stpm.fmreport.util.Excel_Sheet;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@SuppressWarnings("deprecation")
@Component("abreport")
public class DispatherReportServlet extends HttpServlet {
	private static Configuration config;
	private static final String CONTENT_TYPE = "text/html; charset=GBK";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out
				.println("----------------------------------->进入reportServlet");
		response.setContentType(CONTENT_TYPE);
		request.setCharacterEncoding("GBK");
		String action = request.getParameter("action");
			if (action.equals("getReport")) { // 查看表单记录列表
					this.getReportV(request, response);
			} else if (action.equals("exportReport")) {// 做导出处理
					this.exportReport(request, response);
			} else if(action.equals("exportAllReport")){
					this.exportAllReport(request, response);
			}
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
		String realPath = this.getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath =Constants.DOWNPATH;
		Map<String,Font> _caFont = new HashMap<String, Font>();
		Map<String,HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
		try {
		for (String fileName : uuidArray) {
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(downPath+fileName+".xls"));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				wbt= Excel_Sheet.copyRowsInSameSheet(wb, wbt,_caFont,_caHSSFCellStyle);
			
		}
		   
		    Excel_Sheet.setPrintStyle(wbt);
			FileOutputStream fileOut = new FileOutputStream(downPath+uuids+".xls");
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
				inputStream = new FileInputStream(downPath + uuids + ".xls");
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
		String realPath = this.getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath =Constants.DOWNPATH;
		Map<String,Font> _caFont = new HashMap<String, Font>();
		Map<String,HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
		try {
		for (String fileName : uuidArray) {
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(downPath+fileName+".xls"));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				wbt= Excel_Sheet.copyRows(wb, wbt,_caFont,_caHSSFCellStyle);
			
		}
			FileOutputStream fileOut = new FileOutputStream(downPath+uuids+".xls");
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
				inputStream = new FileInputStream(downPath + uuids + ".xls");
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
		
		String realPath = this.getServletContext().getRealPath("/");
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

	private void getReportV(HttpServletRequest req, HttpServletResponse resp) {
		resp.setContentType(CONTENT_TYPE);
		resp.setCharacterEncoding("GBK");
		Long _t = System.currentTimeMillis();
		// 构建模板数据
		Map<String, Object> root = new HashMap<String, Object>();
		// 拿到模板标识
		String reportFlag = req.getParameter("flag");
		ReportService rs = new ReportService();
		rs.generReportByNew(reportFlag, req, root);

		// 开始渲染模板
		Template t;
		try {
			t = config.getTemplate(root.get("templatename").toString(),"gbk");
			Writer out = resp.getWriter();
			t.process(root, out);
			System.out.println("总共花费："+(System.currentTimeMillis()-_t));
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void init() throws ServletException {
		if(config==null){
		config = new Configuration();
		// 设置模板路径
		config.setServletContextForTemplateLoading(getServletContext(),
				"htm\\skins\\reportInfo");
		// 设置freemarker 编码
		config.setEncoding(Locale.CHINA, "gbk");
		}
	}

}
