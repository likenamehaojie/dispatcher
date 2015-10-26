package  groovy;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import com.ldtec.stpm.fmreport.util.Constants;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.ss.util.Region;

import com.ldtec.base.DB.DBControl;
import com.ldtec.stpm.export.dao.GenerExcelDao;
import com.ldtec.stpm.export.data.SectionData;
import com.ldtec.stpm.fmreport.util.DataModel
import com.ldtec.stpm.fmreport.util.ExcelShower

/**
 *
 * @author like
 *
 */

 class GenerExcleGrooy {
	private  GenerExcelDao ged = null;
	HSSFWorkbook wb = null;
	HSSFSheet sheet = null;
	HSSFCellStyle style = null;
	HSSFCellStyle style2 = null;
	HSSFCellStyle styleBold = null;
	HSSFCellStyle reportHeaderStyle = null;
	HSSFFont font = null;
	private int maxCell = 0;
	HSSFCellStyle st = null;
	HttpServletRequest request = null;

	
	public GenerExcelDao getGed(){
		return this.ged;
	}
	
	public GenerExcleGrooy(HttpServletRequest request){
		this();
		if(request!=null){
			this.request = request;
		}
		ged = new GenerExcelDao(request);
	}
	public GenerExcleGrooy() {

		wb = new HSSFWorkbook();
		
		HSSFFont font = wb.createFont();
		font.setFontName("微软雅黑");
		font.setFontHeightInPoints((short) 12);//设置字体大小
		st = wb.createCellStyle();
		st.setFont(font);
		st.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		st.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		st.setWrapText(true);
		
		
		sheet = wb.createSheet("new   sheet");
		style = wb.createCellStyle(); // 样式对象
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平

		style2 = wb.createCellStyle(); 
		font = wb.createFont();
		font.setFontName("仿宋_GB2312");
		font.setFontHeightInPoints((short) 9);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN); 
		style2.setWrapText(true);
		

		style.setWrapText(true);
		
		styleBold = wb.createCellStyle();
		styleBold.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderRight(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderTop(HSSFCellStyle.BORDER_THIN);
		styleBold.setBorderBottom(HSSFCellStyle.BORDER_THIN);  
		styleBold.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		styleBold.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		styleBold.setWrapText(true);

		reportHeaderStyle  = wb.createCellStyle();
		reportHeaderStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		reportHeaderStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);  
		reportHeaderStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		reportHeaderStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		reportHeaderStyle.setWrapText(true);
		font = wb.createFont();
		font.setFontName("微软雅黑");
		font.setFontHeightInPoints((short) 12);//设置字体大小
		reportHeaderStyle.setFont(font);
		
		
	}

	/**
	 * 保存生成的文件
	 *
	 * @param name
	 */
	public void saveAaSpecName(String name) {
		OutputStream out;
		try {
			out = new FileOutputStream(name);
			wb.write(out);
			System.out.println(out);
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
	 * 从指定行开始添加行
	 *
	 * @param from
	 * @param max
	 */
	public void addRow(int from, int max) {
		for (; from < max; from++) {
			sheet.createRow((short) (from));

		}

	}

	/**
	 * 合并cell并设置值
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
		st.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
		st.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
		st.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
		st.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
		HSSFRow row = sheet.getRow(startRow);
		HSSFCell cell = null;
		if(row!=null)
		 cell= row.createCell(cellMove);
		 else
		 return
		 this.setRegionStyle(sheet, r, reportHeaderStyle);
        row.setHeightInPoints(17L);
		cell.setCellValue(content);
		cell.setCellStyle(st);
     	int length = content.getBytes().length;
		int maxColmunSize = sheet.getColumnWidth(cellMove);
		int currentColmunSize = (short)(length*256);
		if(maxColmunSize<=currentColmunSize){
			//sheet.autoSizeColumn((short)cellMove,true); //调整第二列宽度
			if( row.getCell(cellMove) !=null){
			sheet.setColumnWidth(cellMove, currentColmunSize-10000);
			}
		}

	}

	public StringBuffer excleToHtml() {
		ExcelShower es = new ExcelShower();
		StringBuffer excleToHtml = es.excleToHtml(this.wb, "red", null, null,null);
		return excleToHtml;

	}

	public StringBuffer excleToHtml(String color, List<String> style,
			String flag,HashMap<String,String> rowStyles) {
		ExcelShower es = new ExcelShower();
		StringBuffer excleToHtml = es.excleToHtml(this.wb, color, style, flag,rowStyles);
		//StringBuffer excleToHtml = es.excleToHtmlHasStyle(this.wb, color, style, flag);
		return excleToHtml;

	}

	/**
	 *
	 * @param reportId
	 *            报表的id
	 * @param max
	 *            报表的层级
	 * @param mColmuns
	 *            要合并的列
	 * @param request
	 * @param root
	 * @param reportName
	 */
	public static String generExcleFinal(int reportId, int max,
			String[] mColmuns, String color, List<String> style,
			String flag, HttpServletRequest request, Map<String, Object> root, String reportName,
			HashMap<String, String> rowStyles,int refCol,int movePoint,SectionData sd,List<List<String>> queryDataReturnListWithOutMap ) {

		GenerExcleGrooy ge = new GenerExcleGrooy(request);
		max = ge.getGed().getMaxLevel(reportId);
	print("123d");
		GenerExcleGrooy.getReportHeaderById(ge, reportId, request);
	/*	if (rs != null)
			fillData(max, rs, ge);*/
		if(sd.getRefColmun()!=null&&sd.getRefColmun()!="")
		refCol=Integer.parseInt(sd.getRefColmun());
		if(queryDataReturnListWithOutMap!=null&&queryDataReturnListWithOutMap.size()>0){
			fillDataUseList(max, queryDataReturnListWithOutMap, ge,reportId,sd.getIsUseDataBaseMegreRule());
		}
		
		
		List<Map<String,Integer>> mergeCellBySameContentInfo =null;
		//如果存在参照列则取出参照列信息
		if(refCol>=0){
		//拿到参照列
		 mergeCellBySameContentInfo = ge.mergeCellBySameContentInfo(refCol, max);
		}
		
		/*
		 * 开始按需合并数据
		 */
		if (mColmuns != null) {
			for (int i = 0; i < mColmuns.length; i++) {
				ge.mergeCellBySameContent(Integer.parseInt(mColmuns[i]), max,refCol,mergeCellBySameContentInfo,movePoint);
			}
		}
   
		ge.mergeCellInRowRange("-999");

		if(sd.getIsGenerateReportHeader()!=null&&sd.getIsGenerateReportHeader().equals("false"))
			ge.removeHeader(max);

		StringBuffer excleToHtml = ge.excleToHtml(color, style, flag,rowStyles);
		// 保存所生成的excel
		String uuid = UUID.randomUUID().toString();
		println (uuid);
		//如果是可以生成报表名称则加上
		if(sd.getIsIncludeReportName()==null||sd.getIsIncludeReportName().equals("")||sd.getIsIncludeReportName().equals("true")){
		ge.insertRowInSpecRow(0, 2);
//		// ge.saveAaSpecName("e:/today1.xls");
		int maxCell2 = ge.getMaxCell();
		ge.mergeReportNameArea(0, 0, 1, maxCell2-1,reportName);
		}
	//	String realPath = request.getServletContext().getRealPath("/WEB-INF");
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String downPath = realPath + "/tem/exportExcel/";
		downPath = Constants.DOWNPATH;
		//ge.saveAaSpecName("D:\\upfile\\"+uuid+".xls");
		ge.saveAaSpecName(downPath + uuid + ".xls");
		//如果当前主体被标记为要合并的一部分则存入此名称
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
		if(root.containsKey("uuids"))
		   root.put("uuids",root.get("uuids")+"_"+uuid);
		else
           root.put("uuids",uuid);


		return excleToHtml.toString();

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
	        System.out.println(physicalNumberOfRows);
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
	        					System.out.println(_temCellValue);
	        					
	        				    int [] am = {};
								am[0] = rowPoint;
								am[1]  = cellPoint;
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
	        	System.out.println(physicalNumberOfCells);
	   
	        	
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
	
	
	
	
	


    //在一行内（以行区域为分界线进行指定数据的合并）
	private void mergeCellInRowRange1(String string) {
		   int numMergedRegions = sheet.getNumMergedRegions();
	   int physicalNumberOfRows = sheet.getPhysicalNumberOfRows();
	   int yFrom = 0;
	   int yTo = 0;
	   for(int i = 0;i<physicalNumberOfRows;i++){
			int xFrom = 0;
			int xTo = 0;
		   HSSFRow row = sheet.getRow(i);
            String _t = row.getCell(0).getStringCellValue();
            if(_t.equals("安装队")||_t.equals("抽放队")){
            	xTo+=10;
            }
		   int physicalNumberOfCells = row.getPhysicalNumberOfCells();
		   for(int j=0;j<physicalNumberOfCells;j++){
			   HSSFCell cell = row.getCell(j);
			   System.out.println(cell.getStringCellValue());
			   if(cell.getStringCellValue().equals("安装队")){
				   System.out.println();
			   }
			   if(cell.getStringCellValue().equals(string)){
			   if(xFrom==0){
				   xFrom = j;
			   }
			   xTo += j;
			   row.removeCell(cell);
			   row.createCell(j);
	//   cell.setCellValue("");
			  
			   }
			   
		   }
		   
		//   this.mergeCell(startRow, startCell, endRow, endCell, leve, cellMove, content);
		   if(xTo!=0){
			   
			   	for(int m = 0;m<numMergedRegions;m++){
			   		Region mm = sheet.getMergedRegionAt(m);
			   
			   		if(mm.getRowFrom()==i){
			   			mm.setColumnFrom((short)xFrom);
			   			mm.setColumnTo((short)xTo);
			   			sheet.addMergedRegion(mm);
			  
			   		}
			   		
			   	}
			   
			     Region r = new Region(i, (short) xFrom, i,
					(short) xTo);
			     
		  
		  // for(int ii = xFrom;ii<=xTo;ii++)
		   //row.removeCell(row.getCell(ii));
		//    sheet.addMergedRegion(r);
		    
		   HSSFCell createCell = row.createCell(xFrom);
		    HSSFCell cell = row.getCell(0);
		    HSSFCell leftCell = row.getCell(xFrom-1);
		    if(cell.getStringCellValue().equals("年计划")){
		    	System.out.println(cell.getStringCellValue());
		    }
	
		    createCell.setCellValue("");
		   }
	
	   }
	   
	   
	   
		
	}

	/**
	 * 获取合并信息
	 * @param colNum
	 * @param max
	 */
	public List<Map<String,Integer>> mergeCellBySameContentInfo(int colNum,int max){
		List<Integer> infoLists = new ArrayList<Integer>();
		List<Map<String,Integer>> keyVInfo = new ArrayList<Map<String,Integer>>();
		String flagContent = "";
		// 拿到该表有多少个有效行
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
				 * 如果和下面的内容相同则向下记一行
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
		//如果当前列不是参照列
		if(colNum!=referCol&&mergeCellBySameContentInfo!=null&&mergeCellBySameContentInfo.size()>0){
			
			//遍历参照信息
			for(int i =  0;i<mergeCellBySameContentInfo.size() ; i++){
				
				Map<String, Integer> _map = mergeCellBySameContentInfo.get(i);
				Integer start = null;
				Integer end  = null;
				if(movePoint<0){
				
				//拿到开始合并的行
					start = _map.get("start")+Math.abs(movePoint);
				//拿到结束合并的行
				end= _map.get("end");
				}else{
					

					//拿到开始合并的行
					start = _map.get("start");
					//拿到结束合并的行
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
						 * 如果和下面的内容相同则向下记一行
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
		// 拿到该表有多少个有效行
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
				 * 如果和下面的内容相同则向下记一行
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
	 * 对报表名称做插入处理
	 */
	public void mergeReportNameArea(int startRow, int startCell, int endRow, int endCell,String reportName){
		sheet.addMergedRegion(new Region(startRow, (short) startCell, endRow,
				(short) endCell));


		HSSFFont font = wb.createFont();
		font.setFontName("微软雅黑");
		font.setFontHeightInPoints((short) 14);//设置字体大小
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		HSSFRow row = sheet.getRow(startRow);
		HSSFCell cell = row.createCell(startCell);
		HSSFCellStyle st = cell.getCellStyle();
		st.setFont(font);
		st.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直
		st.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平
		st.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
		st.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
		st.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
		st.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
		st.setWrapText(true);
		cell.setCellValue(reportName);
		cell.setCellStyle(st);



	}
	

	private static void fillDataUseList(int max, List<List<String>> queryDataReturnListWithOutMap, GenerExcleGrooy ge,int reportId,String isUseDataBaseMegerRule) {
		Map<String, Integer> hasCustomCol = ge.getHasCustomCol(reportId,isUseDataBaseMegerRule);
		
		for(int i =0;i<queryDataReturnListWithOutMap.size();i++){
			ge.insertRowAfterLastRow();
			Map<String,Integer> realMove = new HashMap<String, Integer>();
			realMove.put("point", 0);
			List<String> _temList = queryDataReturnListWithOutMap.get(i);
			for(int j = 0;j<_temList.size();j++){
				System.out.println("J的值"+j);
				// 添加一行数据
				ge.fillDataS(max, _temList.get(j), j,0,realMove,hasCustomCol);
				
			}
			max+=1;
			
		}
		
		
	}

	
	/**
	 * 对数据进行填 冲
	 *
	 * @param max
	 * @param rs
	 * @param ge
	 */
	public static void fillData(int max, ResultSet rs, GenerExcleGrooy ge) {
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
					// 添加一行数据
					ge.fillDataS(max, list.get(i), i,0,realMove,hasCustomCol);
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
	
	//获取该报表自定义列不为0的列
	private Map<String,Integer> getHasCustomCol(int reportId, String isUseDataBaseMegerRule){
		return this.getGed().getHasCustomCol(reportId,isUseDataBaseMegerRule);
		
	}
	
	
	
	
	
	
	
	
	
	
	 public static float getExcelCellAutoHeight(String str, float fontCountInline) {
         float defaultRowHeight = 12.00f;//每一行的高度指定
         float defaultCount = 0.00f;
         if(str==null){
        	 return defaultRowHeight;
         }
         for (int i = 0; i < str.length(); i++) {
             float ff = getregex(str.substring(i, i + 1));
             defaultCount = defaultCount + ff;
         }
         return ((int) (defaultCount / fontCountInline) + 1) * defaultRowHeight;//计算
     }

     public static float getregex(String charStr) {
         
         if(charStr==" ")
         {
             return 0.5f;
         }
         // 判断是否为字母或字符
         if (Pattern.compile("^[A-Za-z0-9]+").matcher(charStr).matches()) {
             return 0.5f;
         }
         // 判断是否为全角

         if (Pattern.compile("[u4e00-u9fa5]+").matcher(charStr).matches()) {
             return 1.00f;
         }
         //全角符号 及中文
         if (Pattern.compile("[^x00-xff]").matcher(charStr).matches()) {
             return 1.00f;
         }
         return 0.5f;

     }


	
	
	//test
	private void fillDataS(int max, String com_name, int i,int count,Map<String,Integer> realMoveUp,	Map<String, Integer> hasCustomCol) {
		if(com_name==null){
			com_name="";
		}
		
		if(com_name.startsWith("-999")){
			
			com_name="-999";
			
		}
/*		boolean matches = com_name.matches("^[0-9]+\\.*[0-9]+$");
		if(matches){
			
			double parseDouble = Double.parseDouble(com_name);
			com_name = String.format("%.2f",parseDouble);
			
		}*/
		//拿到该列的列头信息
		HSSFRow rowHeader = sheet.getRow(0);
		String info  = "";
		if(rowHeader!=null){
		int physicalNumberOfCells = rowHeader.getPhysicalNumberOfCells();
		System.out.println("physicalNumberOfCells:"+physicalNumberOfCells);
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
		//得到该报表的有自定义列的信息
		int leftMove = 0;
	
		if(info!=null&&!info.trim().equals("")){
			if(hasCustomCol.containsKey(info.trim())){
			leftMove  = hasCustomCol.get(info.trim());
			}
			
			
		}
		HSSFRow row = sheet.getRow(max);
		HSSFCell cell = row.createCell(realMoveUp.get("point").intValue());
		//如果有位移则进行
		if(leftMove!=0){
			Region region = new Region(max, (short) realMoveUp.get("point").intValue(), max,
					(short) (realMoveUp.get("point").intValue()+leftMove));
			
		sheet.addMergedRegion(region);
		for(int m  =1; m<=leftMove;m++){
			row.createCell(realMoveUp.get("point").intValue()+m);
		}
		
		this.setRegionStyle(sheet, region, styleBold);
		}else{
			cell.setCellStyle(style2);
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
	 * 根据报表ID遍历该报表的所有表头 并以主表头为原子单位进行处理
	 *
	 * @param ge
	 * @param reportId
	 * @param request
	 */
	public static void getReportHeaderById(GenerExcleGrooy ge, int reportId,
			HttpServletRequest request) {
		
		
		// 拿到煤报表的一级所有一级表头
		String sql = "select id,pid,headvalue,leve,custom_col,order_c,ishide\n"+ "            from headerinfo h\n"+ "               where h.pid = 0\n"+ "                   and h.ishide = 0\n"+ "                   and h.report_id = ?\n"+ "             order  by h.order_c";
	
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
			
			
			// 根据最深层添加行
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
				// 当前索引自加1
				currentIndex++;
				index++;
			}
			
			
			
			

	}

public static int converObjToInt(Object o){
	return Integer.parseInt(o.toString());
}
	private static void generAfterHeader(int id, int pid, String headvalue,
			int max,
			GenerExcleGrooy ge, int reportId, int leve, int currentIndex,
			Map<String, Integer> moveInfoMap,
			Map<String, Integer> leveMoveInfoMap,
			Map<String, Map<String, Integer>> repairMovePoint, int index) {
		boolean flag = false;
		/**
		 * 处理多级表头的合并
		 */
		// 但到表头的直接后继表头
		List<Map<String, Object>> dirAfterRetrunPOJO = ge.getGed().getDirAfterRetrunPOJO(id, pid, reportId, leve);
		// 存放直接后继的子头集合
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
			 * 判断该表头有没有直接后继节点 如果有不做向下合并处理 如果没有则合并下面的空格
			 */

			// 如果不是最后一行则会发生空出一格的情况这时候需要进行行合并
			
			int _currentMaxLeve = leveMoveInfoMap.get("currentMaxLeve");
			int _temDownMovePonit = 0;
			if (_leve < _currentMaxLeve && _leve > 1) {
				
				List<Map<String, Object>> dirAfterRetrunPOJO2 = ge.getGed().getDirAfterRetrunPOJO(_id, _pid, reportId, _leve);
				// 如果没有直接后继节点
				if(dirAfterRetrunPOJO2!=null&&dirAfterRetrunPOJO2.size()==0){
			
					// 判断需要向下合并几个位移量
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
		 * 判断该表的最终级别有几列 说明该表的合并列为多少 所有单元格的合并最终是看当前表头开始它的最终有多少个子表头 也就是最后一行
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
	 * 生成表头
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
			int customCol, int max,  GenerExcleGrooy ge, int reportId, int leve,
			int currentIndex, Map<String, Integer> moveInfoMap,
			Map<String, Integer> leveMoveInfoMap) {

		// 获取当前主表头应该跨几列
 		int maxMoveCell = ge.getGed().getMaxCurrentLeveMegreCell(id, reportId, pid);
		Map<String, Integer> _moveInfoMap = new HashMap<String, Integer>();
		// 获得该主表头的层级
		int currentMaxLeve = ge.getGed().getMaxLeve(reportId, id);
		// 获取当前主表头应该占几行
		int mainRowCount = max - (currentMaxLeve - 1);
		if (mainRowCount != max) {

			ge.getGed().getMax(id, pid, reportId, leve, _moveInfoMap, currentMaxLeve);
			
			
			if (_moveInfoMap.get("addOtherCell") != null) {
				String _max = _moveInfoMap.get("addOtherCell").toString();
				maxMoveCell += Integer.parseInt(_max);
			}
		}
		//追加报表的最大列


		// 以主表头层级关系每开一个主表头的位移量想当于下一个主表头的开始量（这是个累加的过程）
		maxMoveCell += customCol;
		ge.setMaxCell(maxMoveCell);
		if (leveMoveInfoMap.get("allColMove") == null) {
			leveMoveInfoMap.put("allColMove", maxMoveCell);
		} else {
			leveMoveInfoMap.put("allColMove", leveMoveInfoMap.get("allColMove")
					+ maxMoveCell);
		}
		/*
		 * 把当前主表头的层级关系带进去 以便控制子表如果下沉合并时的位移量
		 */
		leveMoveInfoMap.put("currentMaxLeve", currentMaxLeve);
		// 初始化每级行的位移量
		for (int i = 1; i <= max; i++) {
			if (leveMoveInfoMap.get(i + "") == null)
				leveMoveInfoMap.put(i + "", 0);
		}
		// 进行单元格合并
		ge.mergeCell(leve - 1, moveInfoMap.get("cellMove"), mainRowCount - 1,
				moveInfoMap.get("cellMove") + maxMoveCell - 1,
				leveMoveInfoMap.get(leve + ""), moveInfoMap.get("cellMove"),
				headvalue);

		moveInfoMap.put("currentIndex", moveInfoMap.get("currentIndex")
				+ maxMoveCell);
		moveInfoMap.put("cellMove", moveInfoMap.get("cellMove") + maxMoveCell);
		// 如果当前表应该占几行与最大行相同则说明该表头没有子表头
		if (mainRowCount == max) {
			// 如果该主表头没有子表则所有单元格只位移1个
			for (int i = 1; i <= max; i++) {
				leveMoveInfoMap.put(i + "", leveMoveInfoMap.get(i + "") + 1
						+ customCol);
			}
			return;
		}
		/**
		 * 开始处理后继表头的合并工作
		 */
		Map<String, Map<String, Integer>> repairMovePoint = new HashMap<String, Map<String, Integer>>();
		Map<String, Integer> _tem = new HashMap<String, Integer>();
		_tem.put("mainRowCount", mainRowCount);
		repairMovePoint.put("mainRowCount", _tem);
		/**
		 * 各个列的子表生成方式
		 */
		generAfterHeader(id, pid, headvalue, maxMoveCell, 
				ge, reportId, leve, currentIndex, moveInfoMap, leveMoveInfoMap,
				repairMovePoint, 0);
		// 当一个主表头以级它下面的子表头的填冲合并工作完成后记录最大移动了多少列
		// 因为下一个主表头的所有数据填冲都会心这个为开始
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
}
