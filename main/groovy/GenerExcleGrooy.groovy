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
		font.setFontName("΢���ź�");
		font.setFontHeightInPoints((short) 12);//���������С
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
			//sheet.autoSizeColumn((short)cellMove,true); //�����ڶ��п��
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
	 *            �����id
	 * @param max
	 *            ����Ĳ㼶
	 * @param mColmuns
	 *            Ҫ�ϲ�����
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
   
		ge.mergeCellInRowRange("-999");

		if(sd.getIsGenerateReportHeader()!=null&&sd.getIsGenerateReportHeader().equals("false"))
			ge.removeHeader(max);

		StringBuffer excleToHtml = ge.excleToHtml(color, style, flag,rowStyles);
		// ���������ɵ�excel
		String uuid = UUID.randomUUID().toString();
		println (uuid);
		//����ǿ������ɱ������������
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
	
	
	
	
	


    //��һ���ڣ���������Ϊ�ֽ��߽���ָ�����ݵĺϲ���
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
            if(_t.equals("��װ��")||_t.equals("��Ŷ�")){
            	xTo+=10;
            }
		   int physicalNumberOfCells = row.getPhysicalNumberOfCells();
		   for(int j=0;j<physicalNumberOfCells;j++){
			   HSSFCell cell = row.getCell(j);
			   System.out.println(cell.getStringCellValue());
			   if(cell.getStringCellValue().equals("��װ��")){
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
		    if(cell.getStringCellValue().equals("��ƻ�")){
		    	System.out.println(cell.getStringCellValue());
		    }
	
		    createCell.setCellValue("");
		   }
	
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
		sheet.addMergedRegion(new Region(startRow, (short) startCell, endRow,
				(short) endCell));


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



	}
	

	private static void fillDataUseList(int max, List<List<String>> queryDataReturnListWithOutMap, GenerExcleGrooy ge,int reportId,String isUseDataBaseMegerRule) {
		Map<String, Integer> hasCustomCol = ge.getHasCustomCol(reportId,isUseDataBaseMegerRule);
		
		for(int i =0;i<queryDataReturnListWithOutMap.size();i++){
			ge.insertRowAfterLastRow();
			Map<String,Integer> realMove = new HashMap<String, Integer>();
			realMove.put("point", 0);
			List<String> _temList = queryDataReturnListWithOutMap.get(i);
			for(int j = 0;j<_temList.size();j++){
				System.out.println("J��ֵ"+j);
				// ���һ������
				ge.fillDataS(max, _temList.get(j), j,0,realMove,hasCustomCol);
				
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
					// ���һ������
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
         if (Pattern.compile("^[A-Za-z0-9]+").matcher(charStr).matches()) {
             return 0.5f;
         }
         // �ж��Ƿ�Ϊȫ��

         if (Pattern.compile("[u4e00-u9fa5]+").matcher(charStr).matches()) {
             return 1.00f;
         }
         //ȫ�Ƿ��� ������
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
		//�õ����е���ͷ��Ϣ
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
	 * ���ݱ���ID�����ñ�������б�ͷ ��������ͷΪԭ�ӵ�λ���д���
	 *
	 * @param ge
	 * @param reportId
	 * @param request
	 */
	public static void getReportHeaderById(GenerExcleGrooy ge, int reportId,
			HttpServletRequest request) {
		
		
		// �õ�ú�����һ������һ����ͷ
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
			GenerExcleGrooy ge, int reportId, int leve, int currentIndex,
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
			int customCol, int max,  GenerExcleGrooy ge, int reportId, int leve,
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
}
