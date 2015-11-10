package com.ldtec.stpm.fmreport.util;

import java.awt.Font;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.Region;

import com.ldtec.base.DB.DBControl;
import com.ldtec.stpm.export.dao.GenerExcelDao;
import com.ldtec.stpm.export.data.ReportInfoData;
import com.ldtec.stpm.export.data.SectionData;
import com.ldtec.stpm.login.UserSession;

/**
 *
 * @author like
 *
 */
@SuppressWarnings("deprecation")
public class GenerExcle {
	private  GenerExcelDao ged = null;
	private HSSFWorkbook wb = null;
	private static HSSFCellStyle publicHSSFCellStyle = null;
	private static HSSFFont publicHSSFFont = null;
	public HSSFWorkbook getWb() {
		return wb;
	}

	public void setWb(HSSFWorkbook wb) {
		this.wb = wb;
	}


public HSSFCellStyle getHSSFCellStyle(){
	           if(publicHSSFCellStyle == null){
	        	   publicHSSFCellStyle=this.wb.createCellStyle();
	           }
	        	   return publicHSSFCellStyle;
	           
}
public HSSFFont getHSSFont(){
	if(publicHSSFFont == null){
		
		publicHSSFFont = wb.createFont();
		
	}
	return  publicHSSFFont;
	
	
}



	HSSFSheet sheet = null;
	HSSFCellStyle style = null;
	HSSFCellStyle style2 = null;
	HSSFCellStyle styleBold = null;
	HSSFCellStyle reportHeaderStyle = null;
	HSSFCellStyle hasNoBoder = null;
	HSSFFont font = null;
	private int maxCell = 0;
	HSSFCellStyle st = null;
	HSSFCellStyle pub = null;
	HttpServletRequest request = null;

	
	public GenerExcelDao getGed(){
		return this.ged;
	}
	
	public GenerExcle(HttpServletRequest request){
		this();
		if(request!=null){
			this.request = request;
		}
		ged = new GenerExcelDao(request);
	}
	public GenerExcle() {

		wb = new HSSFWorkbook();
		pub = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setFontName("����_GB2312");
		font.setFontHeightInPoints((short) 12);//���������С
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		st = wb.createCellStyle();
		st.setFont(font);
		st.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		st.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		st.setWrapText(true);
		
		
		sheet = wb.createSheet("new   sheet");
		style = wb.createCellStyle(); // ��ʽ����
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ

		style2 = wb.createCellStyle(); 
		font = wb.createFont();
		font.setFontName("����_GB2312");
		font.setFontHeightInPoints((short) 9);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); 
		style2.setWrapText(true);
		
		hasNoBoder = wb.createCellStyle();
		hasNoBoder.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		hasNoBoder.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		hasNoBoder.setBorderTop(HSSFCellStyle.BORDER_THIN);
		hasNoBoder.setWrapText(true);
		hasNoBoder.setFont(font);
		
		
		
		style.setWrapText(true);
		
		styleBold = wb.createCellStyle();
		styleBold.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderRight(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderTop(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderBottom(HSSFCellStyle.BORDER_THIN);  
		styleBold.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		styleBold.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		styleBold.setWrapText(true);

		reportHeaderStyle  = wb.createCellStyle();
		reportHeaderStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);  
		reportHeaderStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		reportHeaderStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		reportHeaderStyle.setWrapText(true);
		font = wb.createFont();
		font.setFontName("΢���ź�");
		font.setFontHeightInPoints((short) 12);//���������С
		reportHeaderStyle.setFont(font);
		
		
	}

	
	public   void setWidth(String widths){
		String[] split = widths.split(",");
		HSSFRow row = sheet.getRow(0);
		
		if(row!=null){
		
			int lastCellNum = row.getPhysicalNumberOfCells();
			for(int i = 0;i<lastCellNum;i++){
				if(i>split.length){
					return;
				}
		    sheet.setColumnWidth(i, Integer.parseInt(split[i])*256);
				
			}
	
			
		}
		
	}
	
	/**
	 * �������ɵ��ļ�
	 *
	 * @param name
	 */
	public void saveAaSpecName(String name) {
		OutputStream out;
		try {
			out = new FileOutputStream(name);
			wb.write(out);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void addRow(int count) {
		for (int i = 0; i < count; i++) {
			sheet.createRow((short) (i));
		}

	}

	/**
	 * ��ָ���п�ʼ�����
	 *
	 * @param from
	 * @param max
	 */
	public void addRow(int from, int max) {
		for (; from < max; from++) {
			sheet.createRow((short) (from));

		}

	}

	
	public void mergeCellUseSpecStyle(int startRow, int startCell, int endRow, int endCell,HSSFCellStyle hs,String content){
	    Region r = new Region(startRow, (short) startCell, endRow,
					(short) endCell);
	       pub.cloneStyleFrom(hs);
			sheet.addMergedRegion(r);
			pub.setBorderBottom(HSSFCellStyle.BORDER_THIN); //�±߿�
			pub.setBorderLeft(HSSFCellStyle.BORDER_THIN);//��߿�
			pub.setBorderTop(HSSFCellStyle.BORDER_THIN);//�ϱ߿�
			pub.setBorderRight(HSSFCellStyle.BORDER_THIN);//�ұ߿�
			
			HSSFRow row = sheet.getRow(startRow);
			if(row==null){
				row=	sheet.createRow(startRow);
			}
			HSSFCell cell = row.createCell(0);
			 this.setRegionStyle(sheet, r, reportHeaderStyle);
	        row.setHeightInPoints(17L);
			cell.setCellValue(content);
			cell.setCellStyle(pub);


		
		
		
	}
	
	
	/**
	 * �ϲ�cell������ֵ
	 *
	 * @param startRow
	 * @param startCell
	 * @param endRow
	 * @param endCell
	 * @param leve
	 * @param cellMove
	 * @param content
	 */
	@SuppressWarnings("deprecation")
	public void mergeCell(int startRow, int startCell, int endRow, int endCell,
			int leve, int cellMove, String content) {
		      Region r = new Region(startRow, (short) startCell, endRow,
				(short) endCell);
		     
		sheet.addMergedRegion(r);
		st.setBorderBottom(HSSFCellStyle.BORDER_THIN); //�±߿�
		st.setBorderLeft(HSSFCellStyle.BORDER_THIN);//��߿�
		st.setBorderTop(HSSFCellStyle.BORDER_THIN);//�ϱ߿�
		st.setBorderRight(HSSFCellStyle.BORDER_THIN);//�ұ߿�
		HSSFRow row = sheet.getRow(startRow);
		HSSFCell cell = row.createCell(cellMove);
		 this.setRegionStyle(sheet, r, reportHeaderStyle);
        row.setHeightInPoints(17L);
        if(content.contains("<br/>")){
        	content=content.replace("<br/>","\n");
        	cell.setCellValue(content);
        }else{
		cell.setCellValue(content);
        }
		cell.setCellStyle(st);
		
     	int length = content.getBytes().length;
     	
		int maxColmunSize = sheet.getColumnWidth(cellMove);
		int currentColmunSize = (short)(length*256);
		if(maxColmunSize<=currentColmunSize){
			//sheet.autoSizeColumn((short)cellMove,true); //�����ڶ��п��
			sheet.setColumnWidth(cellMove, currentColmunSize-10000);

		}

	}

	public StringBuffer excleToHtml() {
		ExcelShower es = new ExcelShower();
		StringBuffer excleToHtml = es.excleToHtml(this.wb, "red", null, null,null,0);
		return excleToHtml;

	}

	public StringBuffer excleToHtml(String color, List<String> style,
			String flag,HashMap<String,String> rowStyles, int _temMax,ReportInfoData rif) {
		ExcelShower es = new ExcelShower();
		StringBuffer excleToHtml = new StringBuffer();
		if(rif!=null&&rif.equals("true")){
			excleToHtml = es.excleToHtml(this.wb, color, style, flag,rowStyles,_temMax,rif);
		}else
		 excleToHtml = es.excleToHtml(this.wb, color, style, flag,rowStyles,_temMax);
		//StringBuffer excleToHtml = es.excleToHtmlHasStyle(this.wb, color, style, flag);
		return excleToHtml;

	}

	/**
	 *
	 * @param reportId
	 *            �����id
	 * @param max
	 *            ����Ĳ㼶
	 * @param mColmuns
	 *            Ҫ�ϲ�����
	 * @param request
	 * @param root
	 * @param reportName
	 * @param rif 
	 */
	public static String generExcleFinal(int reportId, int max,
			String[] mColmuns, String color, List<String> style,
			String flag, HttpServletRequest request, Map<String, Object> root, String reportName,
			HashMap<String, String> rowStyles,int refCol,int movePoint,SectionData sd,List<List<String>> queryDataReturnListWithOutMap, ReportInfoData rif ) {

		GenerExcle ge = new GenerExcle(request);
		max = ge.getGed().getMaxLevel(reportId);
	
		GenerExcle.getReportHeaderById(ge, reportId, request);
	/*	if (rs != null)
			fillData(max, rs, ge);*/
		if(sd.getRefColmun()!=null&&sd.getRefColmun()!="")
		refCol=Integer.parseInt(sd.getRefColmun());
		if(queryDataReturnListWithOutMap!=null&&queryDataReturnListWithOutMap.size()>0){
			//fillDataUseList(max, queryDataReturnListWithOutMap, ge,reportId,sd.getIsUseDataBaseMegreRule());
			fillDataUseList(max, queryDataReturnListWithOutMap, ge,reportId,sd);
		}
		ge.mergeCellInRowRange("-999");
		ge.setRowHeigth(sd,max);
		
		
		List<Map<String,Integer>> mergeCellBySameContentInfo =null;
		//������ڲ�������ȡ����������Ϣ
		if(refCol>=0){
		//�õ�������
		 mergeCellBySameContentInfo = ge.mergeCellBySameContentInfo(refCol, max);
		}
		
		/*
		 * ��ʼ����ϲ�����
		 */
		if (mColmuns != null) {
			for (int i = 0; i < mColmuns.length; i++) {
				ge.mergeCellBySameContent(Integer.parseInt(mColmuns[i]), max,refCol,mergeCellBySameContentInfo,movePoint);
			}
		}
   
		
		int _temMax = 0;
		if(sd.getIsGenerateReportHeader()!=null&&sd.getIsGenerateReportHeader().equals("false")){
			ge.hidenRowHeader(max);
			
			
			//ge.removeHeader(max);
			_temMax = max;
		}
       StringBuffer excleToHtml = ge.excleToHtml(color, style, flag,rowStyles,_temMax,rif);
		// ���������ɵ�excel
		String uuid = UUID.randomUUID().toString();
		int maxCell2 = ge.getMaxCell();
		String headerWidth = sd.getHeaderWidth();
	
		
		
		
		//����ǿ������ɱ������������
		if(sd.getIsIncludeReportName()==null||sd.getIsIncludeReportName().equals("")||sd.getIsIncludeReportName().equals("true")){
			HSSFCellStyle hs = ge.getHSSFCellStyle();
			HSSFFont hssFont = ge.getHSSFont();
			hssFont.setColor(HSSFColor.RED.index);
			hs.setFont(hssFont);
			hs.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
			UserSession session=  SqlReplaceUseSysStrUtil.getUserSessionByRequest(request);
			 String exportName = sd.getExportName();
			 exportName= SqlReplaceUseSysStrUtil.replaceSql(sd.getExportName(), session);
			 
			 
			
	  if(sd.getIsGenerateLiteTittle()!=null&&
	
	     sd.getIsGenerateLiteTittle().trim().equals("true")&&
	     sd.getConnect()!=null&&
	     (sd.getConnect().trim().equals("1")||sd.getConnect().trim().equals("0"))){
		  String tittleGenerRule = sd.getTittleGenerRule();
			
		  
		  
		  String infos ="";
		  if(tittleGenerRule!=null&&!tittleGenerRule.equals("")){
			// �õ����õĲ����б����ô����Ĳ���ֵ�滻
				String filedList = rif.getFiledList();
				// �����б�һ���Զ��ŷָ�
				String[] params = filedList.split(",");

			
			
				for (int i = 0; i < params.length; i++) {
					if (params[i] == null || params[i] == "")
						continue;
					// �õ������б��е�ֵ
					String parameter = request.getParameter(params[i]);
					// ��ͷ��Ϣsql��������Ϣsql�����滻
					tittleGenerRule = tittleGenerRule.replace("$" + params[i], parameter);

				}
		  GenerExcelDao ged2 = ge.getGed();
		  infos= ged2.queryData(tittleGenerRule);
		  }
		  
		  ge.insertRowInSpecRow(0, 3);
		  String date = request.getParameter("dayInMonth");
		  if(date!=null&&(date.equals("��ǰ��")||date.equals("����"))){
			  Date d = new Date();
			  SimpleDateFormat sdf  = new SimpleDateFormat("yyyy��MM��dd��");
			  date= sdf.format(d);
			  date ="����:"+date;
			  sdf = null;
			 }else if(date!=null&&(date.equals("��ǰ��")||date.equals("����"))){
				  Date d = new Date();
				  SimpleDateFormat sdf  = new SimpleDateFormat("yyyy��MM");
				  date= sdf.format(d); 
				  date ="����:"+date;
				  sdf = null;
			 }else{
				 if(date!=null){
					 if(!date.contains("��")){
						 SimpleDateFormat sdf  = new SimpleDateFormat("yyyy-MM-dd");
						 try {
							Date parse = sdf.parse(date);
							date = "����:"+(parse.getYear()+1990)+"��"+(parse.getMonth()+1)+"��"+parse.getDate()+"��";
							
						} catch (ParseException e) {
						
							e.printStackTrace();
						}
					 }else{
						  date ="����:"+date;
					 }
				 }
		
			 }
		  infos+=date;
		  ge.mergeCellUseSpecStyle(2, 0, 2, maxCell2-1, hs, infos);
	  }else{
		  ge.insertRowInSpecRow(0, 2);
		 
	  }
	  ge.mergeReportNameArea(0, 0, 1, maxCell2-1,exportName);
//		// ge.saveAaSpecName("e:/today1.xls");
		
		

		
	
		

	
		}
		if(headerWidth!=null&&!headerWidth.equals(""))
			ge.setWidth(headerWidth);
	//	String realPath = request.getServletContext().getRealPath("/WEB-INF");
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath = Constants.DOWNPATH;
		//ge.saveAaSpecName("D:\\upfile\\"+uuid+".xls");
		ge.saveAaSpecName(downPath + uuid + ".xls");
		//�����ǰ���屻���ΪҪ�ϲ���һ��������������
		if(sd.getIsMegreBody()!=null&&sd.getIsMegreBody().trim().equals("true")){
		if(root.containsKey(Constants.MEGREBODYNAME)){
			root.put(Constants.MEGREBODYNAME, root.get(Constants.MEGREBODYNAME)+"_"+sd.getSectionName());
		}else{
		root.put(Constants.MEGREBODYNAME, sd.getSectionName());
		}
		if(root.containsKey(Constants.MEGREBODYUUID)){
			root.put(Constants.MEGREBODYUUID, root.get(Constants.MEGREBODYUUID)+"_"+uuid);
		}else{
		root.put(Constants.MEGREBODYUUID, uuid);
		}
		}
		root.put("uuid", uuid);
		int _tem = 0;
		if(sd.getIsExportHeader()!=null&&sd.getIsExportHeader().equals("false")){
			_tem = max;
		}else{
			_tem = 0;
		}
		
		if(root.containsKey("uuids"))
		   root.put("uuids",root.get("uuids")+"_"+uuid+"|"+_tem);
		else{
			
           root.put("uuids",uuid+"|"+_tem);
		}

		return excleToHtml.toString();

	}

	


	

	
	
	


	private void hidenRowHeader(int max) {
	      for(int i = 0;i<max;i++){
	    	  HSSFRow row = sheet.getRow(i);
	    	  if(row!=null){
	    		  row.setHeight((short) 0);
	    	  }
	      }
		
	}

	private void setRowHeigth(SectionData sd,int max) {
		
		if(sd.getAvgHight()!=null&&!sd.getAvgHight().equals("")){
			int height = Integer.parseInt(sd.getAvgHight());
			int avg = 0;
			int physicalNumberOfRows = sheet.getPhysicalNumberOfRows();
			if(physicalNumberOfRows==0){
				return;
			}else{
				avg = height/physicalNumberOfRows;
			}
			for(int i = 0;i<physicalNumberOfRows;i++){
				HSSFRow row = sheet.getRow(i);
				if(row!=null){
					if(i<max){
						 row.setHeight((short)(40*20));
					}else{
					row.setHeight((short) (avg*20));
				}
				}
			}
			
			
			
		}
		
	}

	private void removeHeader(int max) {
		for(int i  =0 ;i<max;i++){
		sheet.removeRow(sheet.getRow(i));
		}
		
	}

	private void mergeCellInRowRange(String string){
		int xFrom=0;
		int xTo = 0;
		int yFrom = 0;
		int yTo = 0;
	     int physicalNumberOfRows = sheet.getPhysicalNumberOfRows();
	     
	        List<int []> pointList = new ArrayList<>();
	        for(int rowPoint = 0;rowPoint<physicalNumberOfRows;rowPoint++){
	        	HSSFRow row = sheet.getRow(rowPoint);
	        	int physicalNumberOfCells = row.getPhysicalNumberOfCells();
	        	for(int cellPoint=0;cellPoint<physicalNumberOfCells;cellPoint++){
	        		HSSFCell cell = row.getCell(cellPoint);
	        		if(cell!=null){
	        			if(cell.getCellType()==HSSFCell.CELL_TYPE_BLANK){
	        				continue;
	        			}else{
	        				String _temCellValue =cell.getRichStringCellValue().toString();
	        				if(_temCellValue.startsWith("-999")){
	        					
	        					
	        				    int [] am = new int[]{rowPoint,cellPoint};
	        				    if(pointList!=null&&pointList.size()>0){
	        				  if(rowPoint>pointList.get(pointList.size()-1)[0]+1||cellPoint>pointList.get(pointList.size()-1)[1]+1){
	        					  break;
	        				  }
	        				    }
	        				    pointList.add(am);
	        				    row.removeCell(cell);
	        				    HSSFCell createCell = row.createCell(cellPoint);
	        				    if(pointList.size()==1){
	        				    	createCell.setCellValue("");
	        				    }
	        				}
	        				
	        				
	        			}
	        			
	        		}
	        		
	        		
	        	}
	     
	   
	        	
	        }
	     	if(pointList.size()>0){
        	    xFrom = pointList.get(0)[1];
		        yFrom = pointList.get(0)[0];
		        yTo = pointList.get(pointList.size()-1)[0];
		        xTo = pointList.get(pointList.size()-1)[1];
		       // CellRangeAddress c = new CellRangeAddress(yFrom,yTo, xFrom, xTo);
		        Region r = new Region(yFrom, (short)xFrom, yTo, (short)xTo);
		        int addMergedRegion = sheet.addMergedRegion(r);
        	}
	}
	
	
	
	
	



	/**
	 * ��ȡ�ϲ���Ϣ
	 * @param colNum
	 * @param max
	 */
	public List<Map<String,Integer>> mergeCellBySameContentInfo(int colNum,int max){
		List<Integer> infoLists = new ArrayList<Integer>();
		List<Map<String,Integer>> keyVInfo = new ArrayList<Map<String,Integer>>();
		String flagContent = "";
		// �õ��ñ��ж��ٸ���Ч��
		int lastRowNum = sheet.getLastRowNum();

		for (int m = max; m <= lastRowNum; m++) {
			int mergeRowsPoint = m;
			HSSFRow row = sheet.getRow(m);
			HSSFCell cell = row.getCell(colNum);
			try {
				flagContent = ExcelShower.getCellValue(cell).toString();
			} catch (IOException e) {
				e.printStackTrace();
			}
			for (int mm = m + 1; mm <= lastRowNum; mm++) {

				HSSFRow _row = sheet.getRow(mm);
				HSSFCell _cell = _row.getCell(colNum);
				String _tem = _cell.getStringCellValue();
				/**
				 * ����������������ͬ�����¼�һ��
				 */
				if (flagContent.trim().equals(_tem.trim())) {
					//_row.createCell(colNum);
					mergeRowsPoint += 1;

				} else {
					break;
				
				}

			}
		/*	sheet.addMergedRegion(new Region(m, (short) colNum, mergeRowsPoint,
					(short) colNum));*/
			if(m!=mergeRowsPoint){
				infoLists.add(mergeRowsPoint-m);
				Map<String,Integer> _tem = new HashMap<String,Integer>();
				_tem.put("start", m);
				_tem.put("end", mergeRowsPoint);
				keyVInfo.add(_tem);
			}
			if (m == mergeRowsPoint)
				m = m + 1;
		
			
			m = mergeRowsPoint;

		}
		return  keyVInfo;
		
	}
	
	
	
	@SuppressWarnings("deprecation")
	public void mergeCellBySameContent(int colNum, int max,int referCol,List<Map<String,Integer>> mergeCellBySameContentInfo,int movePoint) {
		String flagContent = "";
		//�����ǰ�в��ǲ�����
		if(colNum!=referCol&&mergeCellBySameContentInfo!=null&&mergeCellBySameContentInfo.size()>0){
			
			//����������Ϣ
			for(int i =  0;i<mergeCellBySameContentInfo.size() ; i++){
				
				Map<String, Integer> _map = mergeCellBySameContentInfo.get(i);
				Integer start = null;
				Integer end  = null;
				if(movePoint<0){
				
				//�õ���ʼ�ϲ�����
					start = _map.get("start")+Math.abs(movePoint);
				//�õ������ϲ�����
				end= _map.get("end");
				}else{
					

					//�õ���ʼ�ϲ�����
					start = _map.get("start");
					//�õ������ϲ�����
					end= _map.get("end")-movePoint;
				}
				
				for (int m = start; m <= end; m++) {
					int mergeRowsPoint = m;
					HSSFRow row = sheet.getRow(m);
					HSSFCell cell = row.getCell(colNum);
					try {
						flagContent = ExcelShower.getCellValue(cell).toString();
					} catch (IOException e) {
						e.printStackTrace();
					}
					for (int mm = m + 1; mm <= end; mm++) {

						HSSFRow _row = sheet.getRow(mm);
						HSSFCell _cell = _row.getCell(colNum);
						String _tem = _cell.getStringCellValue();
						/**
						 * ����������������ͬ�����¼�һ��
						 */
						if (flagContent.trim().equals(_tem.trim())) {
							_row.createCell(colNum);
							mergeRowsPoint += 1;

						} else {
							break;
						}

					}
					if(m!=mergeRowsPoint){
						Region r = new Region(m, (short) colNum, mergeRowsPoint,
								(short) colNum);
				
					sheet.addMergedRegion(r);
					setRegionStyle(sheet,r,styleBold);
					}
					if (m == mergeRowsPoint)
						m = m + 1;
					m = mergeRowsPoint;

				}
				
				
				
				
			}
			
			
			
			
			
			
		}else{
		// �õ��ñ��ж��ٸ���Ч��
		int lastRowNum = sheet.getLastRowNum();
 
		
		for (int m = max; m <= lastRowNum; m++) {
			int mergeRowsPoint = m;
			HSSFRow row = sheet.getRow(m);
			HSSFCell cell = row.getCell(colNum);
			try {
				flagContent = ExcelShower.getCellValue(cell).toString();
			} catch (IOException e) {
				e.printStackTrace();
			}
			for (int mm = m + 1; mm <= lastRowNum; mm++) {

				HSSFRow _row = sheet.getRow(mm);
				HSSFCell _cell = _row.getCell(colNum);
				String _tem ="";
				if(_cell!=null)
					_tem=_cell.getStringCellValue();
				/**
				 * ����������������ͬ�����¼�һ��
				 */
				if (flagContent.trim().equals(_tem.trim())) {
					_row.createCell(colNum);
					mergeRowsPoint += 1;

				} else {
					break;
				}

			}
			Region region = new Region(m, (short) colNum, mergeRowsPoint,
					(short) colNum);
			
			sheet.addMergedRegion(region);
			this.setRegionStyle(sheet, region, styleBold);
			if (m == mergeRowsPoint)
				m = m + 1;
			m = mergeRowsPoint;

		}
		}
		

	}

	 private void setRegionStyle(HSSFSheet sheet, Region region , HSSFCellStyle cs) {
		    
	        for (int i = region.getRowFrom(); i <= region.getRowTo(); i ++) {
	            HSSFRow row = sheet.getRow(i);
	            if(row == null){
	            	continue;
	            }
	            for (int j = region.getColumnFrom(); j <= region.getColumnTo(); j++) {
	                HSSFCell cell = row.getCell(j);
	                if(cell == null){
	                	cell = row.createCell(j);
	                }
	                cell.setCellStyle(cs);
	            }
	        }
	 }
	/**
	 * �Ա������������봦��
	 */
	public void mergeReportNameArea(int startRow, int startCell, int endRow, int endCell,String reportName){
		Region r = new Region(startRow, (short) startCell, endRow,
				(short) endCell);
		sheet.addMergedRegion(r);
		


		HSSFFont font = wb.createFont();
		font.setFontName("΢���ź�");
		font.setFontHeightInPoints((short) 14);//���������С
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		HSSFRow row = sheet.getRow(startRow);
		HSSFCell cell = row.createCell(startCell);
		HSSFCellStyle st = cell.getCellStyle();
		st.setFont(font);
		st.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// ��ֱ
		st.setAlignment(HSSFCellStyle.ALIGN_CENTER);// ˮƽ
		st.setBorderBottom(HSSFCellStyle.BORDER_THIN); //�±߿�
		st.setBorderLeft(HSSFCellStyle.BORDER_THIN);//��߿�
		st.setBorderTop(HSSFCellStyle.BORDER_THIN);//�ϱ߿�
		st.setBorderRight(HSSFCellStyle.BORDER_THIN);//�ұ߿�
		st.setWrapText(true);
		cell.setCellValue(reportName);
		cell.setCellStyle(st);
		this.setRegionStyle(sheet, r, st);


	}
	
	private static void fillDataUseList(int max,
			List<List<String>> queryDataReturnListWithOutMap, GenerExcle ge,
			int reportId, SectionData sd) {
		
	Map<String, Integer> hasCustomCol = ge.getHasCustomCol(reportId,sd.getIsUseDataBaseMegreRule());
		
		for(int i =0;i<queryDataReturnListWithOutMap.size();i++){
			ge.insertRowAfterLastRow();
			Map<String,Integer> realMove = new HashMap<String, Integer>();
			realMove.put("point", 0);
			List<String> _temList = queryDataReturnListWithOutMap.get(i);
			for(int j = 0;j<_temList.size();j++){
				
				// ���һ������
				ge.fillDataS(max, _temList.get(j), j,0,realMove,hasCustomCol,sd);
				
			}
			max+=1;
			
		}
		
		
	}
	private static void fillDataUseList(int max, List<List<String>> queryDataReturnListWithOutMap, GenerExcle ge,int reportId,String isUseDataBaseMegerRule) {
		Map<String, Integer> hasCustomCol = ge.getHasCustomCol(reportId,isUseDataBaseMegerRule);
		
		for(int i =0;i<queryDataReturnListWithOutMap.size();i++){
			ge.insertRowAfterLastRow();
			Map<String,Integer> realMove = new HashMap<String, Integer>();
			realMove.put("point", 0);
			List<String> _temList = queryDataReturnListWithOutMap.get(i);
			for(int j = 0;j<_temList.size();j++){
				
				// ���һ������
				ge.fillDataS(max, _temList.get(j), j,0,realMove,hasCustomCol,null);
				
			}
			max+=1;
			
		}
		
		
	}

	
	/**
	 * �����ݽ����� ��
	 *
	 * @param max
	 * @param rs
	 * @param ge
	 */
	public static void fillData(int max, ResultSet rs, GenerExcle ge) {
		List<String> list = new ArrayList<String>();
		Map<String, Integer> hasCustomCol = ge.getHasCustomCol(5,"true");
		try {
			while (rs.next()) {
				int mm = 1;
				int columnCount = rs.getMetaData().getColumnCount();
				while (mm <= columnCount) {
					list.add(rs.getString(mm));
					mm++;
				}
				ge.insertRowAfterLastRow();
				Map<String,Integer> realMove = new HashMap<String, Integer>();
				realMove.put("point", 0);
				
				for (int i = 0; i < list.size(); i++) {
					// ���һ������
					ge.fillDataS(max, list.get(i), i,0,realMove,hasCustomCol,null);
				}

				list.clear();
				max += 1;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public void insertRowInSpecRow(int insertRowNum,int count){

		sheet.shiftRows(insertRowNum, sheet.getLastRowNum(), count,true,false);
		sheet.createRow(insertRowNum);

	}

	private void insertRowAfterLastRow() {
		sheet.createRow(sheet.getLastRowNum() + 1);
	}

	//
	
	//��ȡ�ñ����Զ����в�Ϊ0����
	private Map<String,Integer> getHasCustomCol(int reportId, String isUseDataBaseMegerRule){
		return this.getGed().getHasCustomCol(reportId,isUseDataBaseMegerRule);
		
	}
	
	
	
	
	
	
	
	
	
	
	 public static float getExcelCellAutoHeight(String str, float fontCountInline) {
         float defaultRowHeight = 12.00f;//ÿһ�еĸ߶�ָ��
         float defaultCount = 0.00f;
         if(str==null){
        	 return defaultRowHeight;
         }
         for (int i = 0; i < str.length(); i++) {
             float ff = getregex(str.substring(i, i + 1));
             defaultCount = defaultCount + ff;
         }
         return ((int) (defaultCount / fontCountInline) + 1) * defaultRowHeight;//����
     }

     public static float getregex(String charStr) {
         
         if(charStr==" ")
         {
             return 0.5f;
         }
         // �ж��Ƿ�Ϊ��ĸ���ַ�
         if (Pattern.compile("^[A-Za-z0-9]+$").matcher(charStr).matches()) {
             return 0.5f;
         }
         // �ж��Ƿ�Ϊȫ��

         if (Pattern.compile("[u4e00-u9fa5]+$").matcher(charStr).matches()) {
             return 1.00f;
         }
         //ȫ�Ƿ��� ������
         if (Pattern.compile("[^x00-xff]").matcher(charStr).matches()) {
             return 1.00f;
         }
         return 0.5f;

     }


	
	
	//test
	private void fillDataS(int max, String com_name, int i,int count,Map<String,Integer> realMoveUp,	Map<String, Integer> hasCustomCol, SectionData sd) {
		HSSFCellStyle style = this.styleBold;
		if(sd!=null){
			if(sd.getDateHasNoBoder()!=null&&!sd.getDateHasNoBoder().equals("")&&sd.getDateHasNoBoder().trim().equals("true")){
				style = hasNoBoder;
			}
			
			
		}
		
		
		if(com_name==null){
			com_name="";
		}
		
		if(com_name.startsWith("-999")){
			
			com_name="-999";
			
		}
       if(com_name.endsWith("<edit/>")){
    	   com_name= com_name.replace("<edit/>", "\r");
       }
       if(com_name.endsWith("<input/>")){
    	   com_name= com_name.replace("<input/>", "\b");
       }
		//�õ����е���ͷ��Ϣ
		HSSFRow rowHeader = sheet.getRow(0);
		String info  = "";
		if(rowHeader!=null){
		int physicalNumberOfCells = rowHeader.getPhysicalNumberOfCells();
	
		HSSFCell cellHeader = rowHeader.getCell(realMoveUp.get("point"));
		while(cellHeader==null){
			cellHeader=	rowHeader.getCell(i);
			i+=1;
			if(i>physicalNumberOfCells){
				break;
			}
		}
		
		if(cellHeader!=null)
			info= cellHeader.getStringCellValue();
		}
		//�õ��ñ�������Զ����е���Ϣ
		int leftMove = 0;
	
		if(info!=null&&!info.trim().equals("")){
			if(hasCustomCol.containsKey(info.trim())){
			leftMove  = hasCustomCol.get(info.trim());
			}
			
			
		}
		HSSFRow row = sheet.getRow(max);
		HSSFCell cell = row.createCell(realMoveUp.get("point").intValue());
		//�����λ�������
		if(leftMove!=0){
			Region region = new Region(max, (short) realMoveUp.get("point").intValue(), max,
					(short) (realMoveUp.get("point").intValue()+leftMove));
			
		sheet.addMergedRegion(region);
		for(int m  =1; m<=leftMove;m++){
			row.createCell(realMoveUp.get("point").intValue()+m);
		}
		
		this.setRegionStyle(sheet, region, style);
		}else{
			cell.setCellStyle(style);
		}
		//font2.setFontHeightInPoints((short) 9);
		
		
		
		
		float _tem = getExcelCellAutoHeight(com_name, 40f);
	
		row.setHeightInPoints(_tem);

		
		cell.setCellValue(com_name);
		if(leftMove==0){
			realMoveUp.put("point", realMoveUp.get("point")+1);
			
		}else{
			realMoveUp.put("point", realMoveUp.get("point")+leftMove+1);
			
		}
	}



	/**
	 * ���ݱ���ID�����ñ�������б�ͷ ��������ͷΪԭ�ӵ�λ���д���
	 *
	 * @param ge
	 * @param reportId
	 * @param request
	 */
	public static void getReportHeaderById(GenerExcle ge, int reportId,
			HttpServletRequest request) {
		
		
		// �õ�ú�����һ������һ����ͷ
		String sql = "select id,pid,headvalue,leve,custom_col,order_c,ishide\n"
				+ "            from headerinfo h\n"
				+ "               where h.pid = 0\n"
				+ "                   and h.ishide = 0\n"
				+ "                   and h.report_id = ?\n"
				+ "             order  by h.order_c";
	
		int max = 0;
			List<Map<String, Object>> queryDataReturnList = ge.getGed().queryDataReturnList(sql,reportId);
			
			for(int i = 0;i<queryDataReturnList.size();i++){
				
				Map<String, Object> map = queryDataReturnList.get(i);
				String object = map.get("id").toString();
				int id = Integer.parseInt(object);
				int maxLeve = ge.getGed().getMaxLeve(reportId, id);
				if (maxLeve > max) {
					max = maxLeve;
				}
			}
			
			
			// ��������������
			ge.addRow(max);
			int currentIndex = 0;
			int index = 0;
			Map<String, Integer> moveInfoMap = new HashMap<String, Integer>();
			Map<String, Integer> leveMoveInfoMap = new HashMap<String, Integer>();

			moveInfoMap.put("currentIndex", 0);
			moveInfoMap.put("cellMove", 0);

			
			for(int i = 0;i<queryDataReturnList.size();i++){
				moveInfoMap.put("index", index);
				Map<String, Object> map = queryDataReturnList.get(i);
				String object = map.get("id").toString();
				int id = Integer.parseInt(object);
			    int pid = Integer.parseInt(map.get("pid").toString());
			    String headvalue = map.get("headvalue").toString();
			    int leve = Integer.parseInt(map.get("leve").toString());
			    int custom_col =  Integer.parseInt(map.get("custom_col").toString());
			    if (leveMoveInfoMap.get(leve + "") == null) {
					leveMoveInfoMap.put(leve + "", 0);
				}
				generHeader(id, pid, headvalue, custom_col, max, ge, reportId, leve, currentIndex,
						moveInfoMap, leveMoveInfoMap);
				// ��ǰ�����Լ�1
				currentIndex++;
				index++;
			}
			
			
			
			

	}

public static int converObjToInt(Object o){
	return Integer.parseInt(o.toString());
}
	private static void generAfterHeader(int id, int pid, String headvalue,
			int max,
			GenerExcle ge, int reportId, int leve, int currentIndex,
			Map<String, Integer> moveInfoMap,
			Map<String, Integer> leveMoveInfoMap,
			Map<String, Map<String, Integer>> repairMovePoint, int index) {
		boolean flag = false;
		/**
		 * ����༶��ͷ�ĺϲ�
		 */
		// ������ͷ��ֱ�Ӻ�̱�ͷ
		List<Map<String, Object>> dirAfterRetrunPOJO = ge.getGed().getDirAfterRetrunPOJO(id, pid, reportId, leve);
		// ���ֱ�Ӻ�̵���ͷ����
		List<DataModel> listResultSets = new ArrayList<DataModel>();
		
		
		
		for(int i = 0;i<dirAfterRetrunPOJO.size();i++){
			Map<String, Object> map = dirAfterRetrunPOJO.get(i);
			int _id = converObjToInt(map.get("id"));
			int _pid = converObjToInt(map.get("pid"));
			String _headvalue = map.get("headervalue").toString();
			int _leve = converObjToInt(map.get("leve"));
			if (leveMoveInfoMap.get(_leve + "") == null) {
				leveMoveInfoMap.put(_leve + "", 0);
			}
			Map<String, Integer> infoMovePlus = null;
			if (repairMovePoint.get(_leve + 1 + "") == null) {
				infoMovePlus = new HashMap<String, Integer>();
			} else {
				infoMovePlus = repairMovePoint.get(_leve + 1 + "");
			}
			infoMovePlus.put(0 + "", 0);
			infoMovePlus.put((i+1) + "", 0);
			repairMovePoint.put(_leve + 1 + "", infoMovePlus);
			/**
			 * �жϸñ�ͷ��û��ֱ�Ӻ�̽ڵ� ����в������ºϲ����� ���û����ϲ�����Ŀո�
			 */

			// ����������һ����ᷢ���ճ�һ��������ʱ����Ҫ�����кϲ�
			
			int _currentMaxLeve = leveMoveInfoMap.get("currentMaxLeve");
			int _temDownMovePonit = 0;
			if (_leve < _currentMaxLeve && _leve > 1) {
				
				List<Map<String, Object>> dirAfterRetrunPOJO2 = ge.getGed().getDirAfterRetrunPOJO(_id, _pid, reportId, _leve);
				// ���û��ֱ�Ӻ�̽ڵ�
				if(dirAfterRetrunPOJO2!=null&&dirAfterRetrunPOJO2.size()==0){
			
					// �ж���Ҫ���ºϲ�����λ����
					_temDownMovePonit = 3 - _leve;
					infoMovePlus.put((i+1) + "",
							infoMovePlus.get((i+1) - 1 + "") + 1);
				}

			}
			int plusPoint = 0;
			if (!flag) {
				if (repairMovePoint.get(_leve + "") != null) {
					Map<String, Integer> _map = repairMovePoint.get(_leve
							+ "");
					for (int ii = 1; ii <= index; ii++)
						if (_map.get(ii + "") != null) {
							plusPoint = _map.get(ii + "");
						}
					flag = true;

				}
			}
			
			
			int sizeMoveCount = leveMoveInfoMap.get(_leve + "") + plusPoint;
			int start = _leve
					- 1
					+ (repairMovePoint.get("mainRowCount").get(
							"mainRowCount") - 1);
			int maxCurrentLeveMegreCell=ge.getGed().getMaxCurrentLeveMegreCell(_id, reportId, _pid);
			ge.mergeCell(start, sizeMoveCount, start + _temDownMovePonit,
					sizeMoveCount + maxCurrentLeveMegreCell - 1, _leve,
					sizeMoveCount, _headvalue);
			leveMoveInfoMap.put(_leve + "", sizeMoveCount
					+ maxCurrentLeveMegreCell);
			DataModel dm = new DataModel();
			dm.setId(_id);
			dm.setPid(_pid);
			dm.setHeadvalue(_headvalue);
			dm.setMax(max);
			dm.setRs(null);
			dm.setPs(null);
			dm.setConnection(null);
			dm.setGe(ge);
			dm.setReportId(reportId);
			dm.setLeve(_leve);
			dm.setCurrentIndex(currentIndex);
			dm.setMoveInfoMap(leveMoveInfoMap);
			dm.setLeveMoveInfoMap(leveMoveInfoMap);
			dm.setRepairMoveInfo(repairMovePoint);

			listResultSets.add(dm);
		
		}
		
		/**
		 * �жϸñ�����ռ����м��� ˵���ñ�ĺϲ���Ϊ���� ���е�Ԫ��ĺϲ������ǿ���ǰ��ͷ��ʼ���������ж��ٸ��ӱ�ͷ Ҳ�������һ��
		 */
		if (listResultSets != null && listResultSets.size() > 0) {

			for (int iii = 0; iii < listResultSets.size(); iii++) {
				DataModel dModel = listResultSets.get(iii);
				dModel.setIndex(iii);
				generAfterHeader(dModel.getId(), dModel.getPid(),
						dModel.getHeadvalue(), dModel.getMax(),
						 dModel.getGe(),
						dModel.getReportId(), dModel.getLeve(),
						dModel.getCurrentIndex(), dModel.getMoveInfoMap(),
						dModel.getLeveMoveInfoMap(),
						dModel.getRepairMoveInfo(), dModel.getIndex());

			}
		
	
	}
		
		}

	/**
	 * ���ɱ�ͷ
	 *
	 * @param id
	 * @param pid
	 * @param headvalue
	 * @param max
	 * @param max
	 * @param rs
	 * @param ps
	 * @param connection
	 * @param ge
	 * @param leve
	 * @param currentIndex
	 * @param moveInfoMap
	 * @param leveMoveInfoMap
	 */
	private static void generHeader(int id, int pid, String headvalue,
			int customCol, int max,  GenerExcle ge, int reportId, int leve,
			int currentIndex, Map<String, Integer> moveInfoMap,
			Map<String, Integer> leveMoveInfoMap) {

		// ��ȡ��ǰ����ͷӦ�ÿ缸��
		int maxMoveCell = ge.getGed().getMaxCurrentLeveMegreCell(id, reportId, pid);
		Map<String, Integer> _moveInfoMap = new HashMap<String, Integer>();
		// ��ø�����ͷ�Ĳ㼶
		int currentMaxLeve = ge.getGed().getMaxLeve(reportId, id);
		// ��ȡ��ǰ����ͷӦ��ռ����
		int mainRowCount = max - (currentMaxLeve - 1);
		if (mainRowCount != max) {

			ge.getGed().getMax(id, pid, reportId, leve, _moveInfoMap, currentMaxLeve);
			
			
			if (_moveInfoMap.get("addOtherCell") != null) {
				String _max = _moveInfoMap.get("addOtherCell").toString();
				maxMoveCell += Integer.parseInt(_max);
			}
		}
		//׷�ӱ���������


		// ������ͷ�㼶��ϵÿ��һ������ͷ��λ�����뵱����һ������ͷ�Ŀ�ʼ�������Ǹ��ۼӵĹ��̣�
		maxMoveCell += customCol;
		ge.setMaxCell(maxMoveCell);
		if (leveMoveInfoMap.get("allColMove") == null) {
			leveMoveInfoMap.put("allColMove", maxMoveCell);
		} else {
			leveMoveInfoMap.put("allColMove", leveMoveInfoMap.get("allColMove")
					+ maxMoveCell);
		}
		/*
		 * �ѵ�ǰ����ͷ�Ĳ㼶��ϵ����ȥ �Ա�����ӱ�����³��ϲ�ʱ��λ����
		 */
		leveMoveInfoMap.put("currentMaxLeve", currentMaxLeve);
		// ��ʼ��ÿ���е�λ����
		for (int i = 1; i <= max; i++) {
			if (leveMoveInfoMap.get(i + "") == null)
				leveMoveInfoMap.put(i + "", 0);
		}
		// ���е�Ԫ��ϲ�
		ge.mergeCell(leve - 1, moveInfoMap.get("cellMove"), mainRowCount - 1,
				moveInfoMap.get("cellMove") + maxMoveCell - 1,
				leveMoveInfoMap.get(leve + ""), moveInfoMap.get("cellMove"),
				headvalue);

		moveInfoMap.put("currentIndex", moveInfoMap.get("currentIndex")
				+ maxMoveCell);
		moveInfoMap.put("cellMove", moveInfoMap.get("cellMove") + maxMoveCell);
		// �����ǰ��Ӧ��ռ�������������ͬ��˵���ñ�ͷû���ӱ�ͷ
		if (mainRowCount == max) {
			// ���������ͷû���ӱ������е�Ԫ��ֻλ��1��
			for (int i = 1; i <= max; i++) {
				leveMoveInfoMap.put(i + "", leveMoveInfoMap.get(i + "") + 1
						+ customCol);
			}
			return;
		}
		/**
		 * ��ʼ�����̱�ͷ�ĺϲ�����
		 */
		Map<String, Map<String, Integer>> repairMovePoint = new HashMap<String, Map<String, Integer>>();
		Map<String, Integer> _tem = new HashMap<String, Integer>();
		_tem.put("mainRowCount", mainRowCount);
		repairMovePoint.put("mainRowCount", _tem);
		/**
		 * �����е��ӱ����ɷ�ʽ
		 */
		generAfterHeader(id, pid, headvalue, maxMoveCell, 
				ge, reportId, leve, currentIndex, moveInfoMap, leveMoveInfoMap,
				repairMovePoint, 0);
		// ��һ������ͷ�Լ���������ӱ�ͷ�����ϲ�������ɺ��¼����ƶ��˶�����
		// ��Ϊ��һ������ͷ������������嶼�������Ϊ��ʼ
		for (int i = 1; i <= max; i++) {
			leveMoveInfoMap.put(i + "", leveMoveInfoMap.get("allColMove"));
		}
	}





      public void setMaxCell(int maxCell){
    	  this.maxCell+=maxCell;
      }
      public int getMaxCell(){
    	  return this.maxCell;

      }

	public void removeSpecRow(int i,String name) {
		name = "F:/Test/like11.xls";
		try {
			HSSFWorkbook wbs = new HSSFWorkbook(new FileInputStream(name));
			HSSFSheet sheetAt = wbs.getSheetAt(0);
    	//	this.removeRow(sheetAt, 0);
		//    this.removeRow(sheetAt, 1);
			sheetAt.removeRow(sheetAt.getRow(0));
			sheetAt.removeRow(sheetAt.getRow(1));
			int lastRowNum = sheetAt.getLastRowNum();

		     List<Integer> mergedRegionIndex = getMergedRegionIndex(sheetAt, 0, 0);
		     for(int j=0;mergedRegionIndex!=null&&j<mergedRegionIndex.size();j++){
		    	 sheetAt.removeMergedRegion(mergedRegionIndex.get(j));
		    	 
		    	 
		     }
		     List<Integer> mergedRegionIndex1 = getMergedRegionIndex(sheetAt, 1, 0);
		     for(int j=0;mergedRegionIndex1!=null&&j<mergedRegionIndex1.size();j++){
		    	 sheetAt.removeMergedRegion(mergedRegionIndex1.get(j));
		    	 
		    	 
		     }
			
			
			sheetAt.shiftRows(3, lastRowNum, -3,true,false);
			wbs.write(new FileOutputStream("F:/Test/demo.xls"));

	
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*name = "F:/Test/like11.xls";
		 sheet.removeRow(sheet.getRow(0));
		 sheet.removeRow(sheet.getRow(1));

		 sheet.shiftRows(1, 2, -1);*/
	
	//	this.removeRow(this.sheet, 0);
		//this.removeRow(this.sheet, 1);
	//	this.removeRow(this.sheet, 0);
	}
	
	
	
	 /**
	 * Remove a row by its index
	 * @param sheet a Excel sheet
	 * @param rowIndex a 0 based index of removing row
	 */
	public static void removeRow(HSSFSheet sheet, int rowIndex) {
	    int lastRowNum=sheet.getLastRowNum();
	    if(rowIndex>=0&&rowIndex<lastRowNum)
	        sheet.shiftRows(rowIndex+1,lastRowNum,-1);//���к�ΪrowIndex+1һֱ���к�ΪlastRowNum�ĵ�Ԫ��ȫ������һ�У��Ա�ɾ��rowIndex��
	    if(rowIndex==lastRowNum){
	        HSSFRow removingRow=sheet.getRow(rowIndex);
	        if(removingRow!=null)
	            sheet.removeRow(removingRow);
	    }
	}
	
	public static void delteRow(){
		 try{
	            FileInputStream is = new FileInputStream("d://1.xls");
	            HSSFWorkbook workbook = new HSSFWorkbook(is);
	            HSSFSheet sheet = workbook.getSheetAt(0);
	            int ls=sheet.getLastRowNum();
	            sheet.shiftRows(1, ls, -1);
	            Row row=sheet.getRow(ls);
	            sheet.removeRow(row);
	            FileOutputStream os = new FileOutputStream("d://3.xls");
	            workbook.write(os);
	            is.close();
	            os.close();
	        } catch(Exception e) { 
	            e.printStackTrace();
	        }
	}
	
	
	
	
	
	
	/**

	 * ��ȡ���� Region

	 * @param sheet

	 * @param row

	 * @param column

	 * @return

	*/

	public static List<Integer>  getMergedRegionIndex(Sheet sheet, int row, int column) { 

		List<Integer> _temI = new ArrayList<Integer>();
	int sheetMergeCount = sheet.getNumMergedRegions(); 



	for (int i = 0; i < sheetMergeCount; i++) { 



	org.apache.poi.ss.util.CellRangeAddress ca = sheet.getMergedRegion(i); 



	int firstColumn = ca.getFirstColumn(); 



	int lastColumn = ca.getLastColumn(); 



	int firstRow = ca.getFirstRow(); 



	int lastRow = ca.getLastRow(); 





	if (row >= firstRow && row <= lastRow) { 




/*	if (column >= firstColumn && column <= lastColumn) { 





	return i; 




	}*/
		 _temI.add(i);


	}


	}


	return _temI;


	}
	
	
	
	
}
