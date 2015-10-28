
package com.ldtec.stpm.fmreport.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Font;

public class Excel_Sheet {

	
	
	public void TestMegreMutPartExcel(String toFilename,String ... filesname){
		try {
			Map<String, Font> _caFont = new HashMap<String, Font>();
			Map<String, HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
			/*
			 * POIFSFileSystem fs = new POIFSFileSystem(new
			 * FileInputStream("f:\\1.xls")); POIFSFileSystem fs_1 = new
			 * POIFSFileSystem(new FileInputStream("f:\\2.xls"));
			 */
			HSSFWorkbook wbt = new HSSFWorkbook();
			for(int i = 0; i<filesname.length;i++){
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(filesname[i]));
				HSSFWorkbook wb = new HSSFWorkbook(fs);
				//wbt = copyRowsInSameSheet(wb, wbt, _caFont, _caHSSFCellStyle);
				wbt = copyRowsInSameSheetTest(wb, wbt, _caFont, _caHSSFCellStyle,i);
			}
			
			
		/*	POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream("f:\\like.xls"));
			POIFSFileSystem fs_1 = new POIFSFileSystem(new FileInputStream("f:\\like11.xls"));
			HSSFWorkbook wb = new HSSFWorkbook(fs);
			HSSFWorkbook wb_1 = new HSSFWorkbook(fs_1);
			// source ,target 为,源sheet 页和目标sheet页,
			
			 * wbt = copyRows(wb,wbt,_caFont,_caHSSFCellStyle); wbt =
			 * copyRows(wb_1,wbt,_caFont,_caHSSFCellStyle);
			 
			wbt = copyRowsInSameSheet(wb, wbt, _caFont, _caHSSFCellStyle);
			wbt = copyRowsInSameSheet(wb_1, wbt, _caFont, _caHSSFCellStyle);*/
			FileOutputStream fileOut = new FileOutputStream(toFilename);
			wbt.write(fileOut);
			fileOut.flush();
			fileOut.close();
			System.out.println("生成完成!");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	
	
	
	
	@SuppressWarnings("deprecation")
	public static HSSFWorkbook copyRowsInSameSheetTest(HSSFWorkbook wb,
			HSSFWorkbook pTargetWb, Map<String, Font> _caFont,
			Map<String, HSSFCellStyle> _caHSSFCellStyle, int index) {

		int pStartRow = 0; // 开始行
		int pEndRow = 0; // 结束行
		int pPosition = 0; // 位置
		String pSourceSheetName = "";
		String pTargetSheetName = "";
		HSSFRow sourceRow = null;
		HSSFRow targetRow = null;
		HSSFCell sourceCell = null;
		HSSFCell targetCell = null;
		HSSFSheet sourceSheet = null;
		HSSFSheet targetSheet = null;
		Region region = null;
		int cType;
		int i;
		short j;

		int targetRowFrom;
		int targetRowTo;
		int targetColFrom;
		int targetColTO;
		if ((pStartRow == -1) || (pEndRow == -1)) {
			return null;
		}
		pSourceSheetName = wb.getSheetName(0);
		pTargetSheetName = pSourceSheetName;
		int pTargetSheetNumber = pTargetWb.getNumberOfSheets() + 1;
		if (pTargetWb.getSheet(pTargetSheetName) != null) {
			pTargetSheetName = pTargetSheetName + pTargetSheetNumber;
		}
		pTargetWb.createSheet(pTargetSheetName);
		sourceSheet = wb.getSheet(pSourceSheetName);
		// targetSheet = pTargetWb.getSheet(pTargetSheetName);
		targetSheet = pTargetWb.getSheetAt(0);
		pPosition = targetSheet.getPhysicalNumberOfRows();
		pEndRow = sourceSheet.getPhysicalNumberOfRows();
		HSSFFont font = pTargetWb.createFont();
		// 拷贝合并的单元格
		for (i = 0; i < sourceSheet.getNumMergedRegions(); i++) {
			region = sourceSheet.getMergedRegionAt(i);
			int _tt = 0;
			if ((region.getRowFrom() >= pStartRow) && (region.getRowTo() <= pEndRow)) {
				
				if(index!=0){
					_tt = index;
					if(region.getRowFrom()<index){
						continue;
					}
				}
				if(region.getRowFrom() ==region.getRowTo()&&region.getColumnFrom() == region.getColumnTo()){
					continue;
				}
				
				targetRowFrom = region.getRowFrom() - pStartRow-_tt + pPosition;
				targetRowTo = region.getRowTo() - pStartRow-_tt + pPosition;
				region.setRowFrom(targetRowFrom);
				region.setRowTo(targetRowTo);
				targetColFrom = region.getColumnFrom();
				targetColTO = region.getColumnTo();
				region.setColumnFrom((short) targetColFrom);
				region.setColumnTo((short) targetColTO);
				targetSheet.addMergedRegion(region);
			}
		}
		// pStartRow = targetSheet.getLastRowNum();
		// 设置列宽
		for (i = pStartRow; i <= pEndRow + targetSheet.getLastRowNum(); i++) {
			sourceRow = sourceSheet.getRow(i);
			if (sourceRow != null) {
				for (j = sourceRow.getLastCellNum(); j > sourceRow.getFirstCellNum(); j--) {
					targetSheet.setColumnWidth(j, sourceSheet.getColumnWidth(j));
					targetSheet.setColumnHidden(j, false);
				}
				break;
			}
		}

		// 拷贝行并填充数据
		for (; i <= pEndRow; i++) {
			sourceRow = sourceSheet.getRow(i+index);

			if (sourceRow == null) {
				continue;
			}
			targetRow = targetSheet.createRow(i + pPosition);
			targetRow.setHeight(sourceRow.getHeight());
			short firstCellNum = sourceRow.getFirstCellNum();
			int physicalNumberOfCells = sourceRow.getPhysicalNumberOfCells();
			System.out.println(firstCellNum + "----->" + physicalNumberOfCells);
			for (j = sourceRow.getFirstCellNum(); j < sourceRow.getPhysicalNumberOfCells() + firstCellNum; j++) {
				int _j = j;
				sourceCell = sourceRow.getCell(j);
				/*
				 * while(sourceCell == null){ sourceRow.getCell(j++); }
				 */

				if (sourceCell == null) {
					sourceRow.createCell(j);
					sourceCell = sourceRow.getCell(j);
					// continue;
				}
				System.out.println("源文件中的值:" + sourceCell.getStringCellValue());
				targetCell = targetRow.createCell(j);
				// targetCell.setEncoding(sourceCell);
				// targetCell.setCellStyle(sourceCell.getCellStyle());
				/*
				 * 这里的表样式需要另外处理，否则不同的Excel的样式不同，会引起错误。 This Style does not
				 * belong to the supplied Workbook. Are you trying to assign a
				 * style from one workbook to the cell of a differnt workbook
				 */
				String sCellstyle = getCellStyle(sourceCell, wb);
				// System.out.println(sCellstyle);
				HSSFFont font1 = pTargetWb.getFontAt((short) 0);
				pTargetWb.getNumberOfFonts();

				// pTargetWb.
				targetCell.setCellStyle(createCellStyle(pTargetWb, sCellstyle, font, _caFont, _caHSSFCellStyle));
				cType = sourceCell.getCellType();

				// 对表的列宽做处理
				int maxColmunSize = sourceSheet.getColumnWidth((short) j);
				if (targetSheet.getColumnWidth(j) <= maxColmunSize)
					targetSheet.setColumnWidth(j, maxColmunSize);

				targetCell.setCellType(cType);
				switch (cType) {
				case HSSFCell.CELL_TYPE_BOOLEAN:
					targetCell.setCellValue(sourceCell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_ERROR:
					targetCell.setCellErrorValue(sourceCell.getErrorCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA:
					// parseFormula这个函数的用途在后面说明
					targetCell.setCellFormula(parseFormula(sourceCell.getCellFormula()));
					break;
				case HSSFCell.CELL_TYPE_NUMERIC:
					targetCell.setCellValue(sourceCell.getNumericCellValue());
					break;
				case HSSFCell.CELL_TYPE_STRING:
					targetCell.setCellValue(sourceCell.getRichStringCellValue());
					break;
				}
				j = (short) _j;
			}
		}
		return pTargetWb;

	}





	/*
	 * 示例，在d盘放两个示例Excel文件（单个Sheet）。 生成后会在D盘产生一个合并好Sheet的Excel文件。exlsample_2.xls
	 */
	public static void main(String[] args) {
		try {
			Map<String, Font> _caFont = new HashMap<String, Font>();
			Map<String, HSSFCellStyle> _caHSSFCellStyle = new HashMap<String, HSSFCellStyle>();
			/*
			 * POIFSFileSystem fs = new POIFSFileSystem(new
			 * FileInputStream("f:\\1.xls")); POIFSFileSystem fs_1 = new
			 * POIFSFileSystem(new FileInputStream("f:\\2.xls"));
			 */
			POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream("f:\\like.xls"));
			POIFSFileSystem fs_1 = new POIFSFileSystem(new FileInputStream("f:\\like11.xls"));
			HSSFWorkbook wb = new HSSFWorkbook(fs);
			HSSFWorkbook wb_1 = new HSSFWorkbook(fs_1);
			HSSFWorkbook wbt = new HSSFWorkbook();
			// source ,target 为,源sheet 页和目标sheet页,
			/*
			 * wbt = copyRows(wb,wbt,_caFont,_caHSSFCellStyle); wbt =
			 * copyRows(wb_1,wbt,_caFont,_caHSSFCellStyle);
			 */
			wbt = copyRowsInSameSheet(wb, wbt, _caFont, _caHSSFCellStyle);
			wbt = copyRowsInSameSheet(wb_1, wbt, _caFont, _caHSSFCellStyle);
			FileOutputStream fileOut = new FileOutputStream("f:\\like222.xls");
			wbt.write(fileOut);
			fileOut.flush();
			fileOut.close();
			System.out.println("生成完成!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static HSSFWorkbook copyRowsInSameSheet(HSSFWorkbook wb, HSSFWorkbook pTargetWb, Map<String, Font> _caFont,
			Map<String, HSSFCellStyle> _caHSSFCellStyle) {

		int pStartRow = 0; // 开始行
		int pEndRow = 0; // 结束行
		int pPosition = 0; // 位置
		String pSourceSheetName = "";
		String pTargetSheetName = "";
		HSSFRow sourceRow = null;
		HSSFRow targetRow = null;
		HSSFCell sourceCell = null;
		HSSFCell targetCell = null;
		HSSFSheet sourceSheet = null;
		HSSFSheet targetSheet = null;
		Region region = null;
		int cType;
		int i;
		short j;

		int targetRowFrom;
		int targetRowTo;
		int targetColFrom;
		int targetColTO;
		if ((pStartRow == -1) || (pEndRow == -1)) {
			return null;
		}
		pSourceSheetName = wb.getSheetName(0);
		pTargetSheetName = pSourceSheetName;
		int pTargetSheetNumber = pTargetWb.getNumberOfSheets() + 1;
		if (pTargetWb.getSheet(pTargetSheetName) != null) {
			pTargetSheetName = pTargetSheetName + pTargetSheetNumber;
		}
		pTargetWb.createSheet(pTargetSheetName);
		sourceSheet = wb.getSheet(pSourceSheetName);
		// targetSheet = pTargetWb.getSheet(pTargetSheetName);
		targetSheet = pTargetWb.getSheetAt(0);
		pPosition = targetSheet.getPhysicalNumberOfRows();
		pEndRow = sourceSheet.getPhysicalNumberOfRows();
		HSSFFont font = pTargetWb.createFont();
		// 拷贝合并的单元格
		for (i = 0; i < sourceSheet.getNumMergedRegions(); i++) {
			region = sourceSheet.getMergedRegionAt(i);
			if ((region.getRowFrom() >= pStartRow) && (region.getRowTo() <= pEndRow)) {
				targetRowFrom = region.getRowFrom() - pStartRow + pPosition;
				targetRowTo = region.getRowTo() - pStartRow + pPosition;
				region.setRowFrom(targetRowFrom);
				region.setRowTo(targetRowTo);
				targetColFrom = region.getColumnFrom();
				targetColTO = region.getColumnTo();
				region.setColumnFrom((short) targetColFrom);
				region.setColumnTo((short) targetColTO);
				targetSheet.addMergedRegion(region);
			}
		}
		// pStartRow = targetSheet.getLastRowNum();
		// 设置列宽
		for (i = pStartRow; i <= pEndRow + targetSheet.getLastRowNum(); i++) {
			sourceRow = sourceSheet.getRow(i);
			if (sourceRow != null) {
				for (j = sourceRow.getLastCellNum(); j > sourceRow.getFirstCellNum(); j--) {
					targetSheet.setColumnWidth(j, sourceSheet.getColumnWidth(j));
					targetSheet.setColumnHidden(j, false);
				}
				break;
			}
		}

		// 拷贝行并填充数据
		for (; i <= pEndRow; i++) {
			sourceRow = sourceSheet.getRow(i);

			if (sourceRow == null) {
				continue;
			}
			targetRow = targetSheet.createRow(i + pPosition);
			targetRow.setHeight(sourceRow.getHeight());
			short firstCellNum = sourceRow.getFirstCellNum();
			int physicalNumberOfCells = sourceRow.getPhysicalNumberOfCells();
			System.out.println(firstCellNum + "----->" + physicalNumberOfCells);
			for (j = sourceRow.getFirstCellNum(); j < sourceRow.getPhysicalNumberOfCells() + firstCellNum; j++) {
				int _j = j;
				sourceCell = sourceRow.getCell(j);
				/*
				 * while(sourceCell == null){ sourceRow.getCell(j++); }
				 */

				if (sourceCell == null) {
					sourceRow.createCell(j);
					sourceCell = sourceRow.getCell(j);
					// continue;
				}
				System.out.println("源文件中的值:" + sourceCell.getStringCellValue());
				targetCell = targetRow.createCell(j);
				// targetCell.setEncoding(sourceCell);
				// targetCell.setCellStyle(sourceCell.getCellStyle());
				/*
				 * 这里的表样式需要另外处理，否则不同的Excel的样式不同，会引起错误。 This Style does not
				 * belong to the supplied Workbook. Are you trying to assign a
				 * style from one workbook to the cell of a differnt workbook
				 */
				String sCellstyle = getCellStyle(sourceCell, wb);
				// System.out.println(sCellstyle);
				HSSFFont font1 = pTargetWb.getFontAt((short) 0);
				pTargetWb.getNumberOfFonts();

				// pTargetWb.
				targetCell.setCellStyle(createCellStyle(pTargetWb, sCellstyle, font, _caFont, _caHSSFCellStyle));
				cType = sourceCell.getCellType();

				// 对表的列宽做处理
				int maxColmunSize = sourceSheet.getColumnWidth((short) j);
				if (targetSheet.getColumnWidth(j) <= maxColmunSize)
					targetSheet.setColumnWidth(j, maxColmunSize);

				targetCell.setCellType(cType);
				switch (cType) {
				case HSSFCell.CELL_TYPE_BOOLEAN:
					targetCell.setCellValue(sourceCell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_ERROR:
					targetCell.setCellErrorValue(sourceCell.getErrorCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA:
					// parseFormula这个函数的用途在后面说明
					targetCell.setCellFormula(parseFormula(sourceCell.getCellFormula()));
					break;
				case HSSFCell.CELL_TYPE_NUMERIC:
					targetCell.setCellValue(sourceCell.getNumericCellValue());
					break;
				case HSSFCell.CELL_TYPE_STRING:
					targetCell.setCellValue(sourceCell.getRichStringCellValue());
					break;
				}
				j = (short) _j;
			}
		}
		return pTargetWb;

	}

	/*
	 * 对SHeet进行复制，将源Excle保存到目标Excle中
	 */
	public static HSSFWorkbook copyRows(HSSFWorkbook wb, HSSFWorkbook pTargetWb, Map<String, Font> _caFont,
			Map<String, HSSFCellStyle> _caHSSFCellStyle) {
		int pStartRow = 0; // 开始行
		int pEndRow = 0; // 结束行
		int pPosition = 0; // 位置
		String pSourceSheetName = "";
		String pTargetSheetName = "";
		HSSFRow sourceRow = null;
		HSSFRow targetRow = null;
		HSSFCell sourceCell = null;
		HSSFCell targetCell = null;
		HSSFSheet sourceSheet = null;
		HSSFSheet targetSheet = null;
		Region region = null;
		int cType;
		int i;
		short j;
		int targetRowFrom;
		int targetRowTo;
		if ((pStartRow == -1) || (pEndRow == -1)) {
			return null;
		}
		pSourceSheetName = wb.getSheetName(0);
		pTargetSheetName = pSourceSheetName;
		int pTargetSheetNumber = pTargetWb.getNumberOfSheets() + 1;
		if (pTargetWb.getSheet(pTargetSheetName) != null) {
			pTargetSheetName = pTargetSheetName + pTargetSheetNumber;
		}
		pTargetWb.createSheet(pTargetSheetName);
		sourceSheet = wb.getSheet(pSourceSheetName);
		targetSheet = pTargetWb.getSheet(pTargetSheetName);
		pEndRow = sourceSheet.getPhysicalNumberOfRows();
		HSSFFont font = pTargetWb.createFont();
		// 拷贝合并的单元格
		for (i = 0; i < sourceSheet.getNumMergedRegions(); i++) {
			region = sourceSheet.getMergedRegionAt(i);
			if ((region.getRowFrom() >= pStartRow) && (region.getRowTo() <= pEndRow)) {
				targetRowFrom = region.getRowFrom() - pStartRow + pPosition;
				targetRowTo = region.getRowTo() - pStartRow + pPosition;
				region.setRowFrom(targetRowFrom);
				region.setRowTo(targetRowTo);
				targetSheet.addMergedRegion(region);
			}
		}
		// 设置列宽
		for (i = pStartRow; i <= pEndRow; i++) {
			sourceRow = sourceSheet.getRow(i);
			if (sourceRow != null) {
				for (j = sourceRow.getLastCellNum(); j > sourceRow.getFirstCellNum(); j--) {
					targetSheet.setColumnWidth(j, sourceSheet.getColumnWidth(j));
					targetSheet.setColumnHidden(j, false);
				}
				break;
			}
		}
		// 拷贝行并填充数据
		for (; i <= pEndRow; i++) {
			sourceRow = sourceSheet.getRow(i);
			if (sourceRow == null) {
				continue;
			}
			targetRow = targetSheet.createRow(i - pStartRow + pPosition);
			targetRow.setHeight(sourceRow.getHeight());
			for (j = sourceRow.getFirstCellNum(); j < sourceRow.getPhysicalNumberOfCells(); j++) {
				sourceCell = sourceRow.getCell(j);
				if (sourceCell == null) {
					continue;
				}
				targetCell = targetRow.createCell(j);
				// targetCell.setEncoding(sourceCell);
				// targetCell.setCellStyle(sourceCell.getCellStyle());
				/*
				 * 这里的表样式需要另外处理，否则不同的Excel的样式不同，会引起错误。 This Style does not
				 * belong to the supplied Workbook. Are you trying to assign a
				 * style from one workbook to the cell of a differnt workbook
				 */
				String sCellstyle = getCellStyle(sourceCell, wb);
				System.out.println(sCellstyle);
				HSSFFont font1 = pTargetWb.getFontAt((short) 0);
				pTargetWb.getNumberOfFonts();

				// pTargetWb.
				targetCell.setCellStyle(createCellStyle(pTargetWb, sCellstyle, font, _caFont, _caHSSFCellStyle));
				cType = sourceCell.getCellType();

				// 对表的列宽做处理
				int maxColmunSize = sourceSheet.getColumnWidth((short) j);
				if (targetSheet.getColumnWidth(j) <= maxColmunSize)
					targetSheet.setColumnWidth(j, maxColmunSize);

				targetCell.setCellType(cType);
				switch (cType) {
				case HSSFCell.CELL_TYPE_BOOLEAN:
					targetCell.setCellValue(sourceCell.getBooleanCellValue());
					break;
				case HSSFCell.CELL_TYPE_ERROR:
					targetCell.setCellErrorValue(sourceCell.getErrorCellValue());
					break;
				case HSSFCell.CELL_TYPE_FORMULA:
					// parseFormula这个函数的用途在后面说明
					targetCell.setCellFormula(parseFormula(sourceCell.getCellFormula()));
					break;
				case HSSFCell.CELL_TYPE_NUMERIC:
					targetCell.setCellValue(sourceCell.getNumericCellValue());
					break;
				case HSSFCell.CELL_TYPE_STRING:
					targetCell.setCellValue(sourceCell.getRichStringCellValue());
					break;
				}
			}
		}
		return pTargetWb;
	}

	/*
	 * 公式处理
	 */
	private static String parseFormula(String pPOIFormula) {
		final String cstReplaceString = "ATTR(semiVolatile)"; //$NON-NLS-1$
		StringBuffer result = null;
		int index;
		result = new StringBuffer();
		index = pPOIFormula.indexOf(cstReplaceString);
		if (index >= 0) {
			result.append(pPOIFormula.substring(0, index));
			result.append(pPOIFormula.substring(index + cstReplaceString.length()));
		} else {
			result.append(pPOIFormula);
		}
		return result.toString();
	}

	/*
	 * 根据传入的单元格格式,设置单元格的样式
	 */
	public static HSSFCellStyle createCellStyle(HSSFWorkbook workbook, String cellStyle, HSSFFont font1,
			Map<String, Font> _caFont, Map<String, HSSFCellStyle> _caHSSFCellStyle) {

		if (_caHSSFCellStyle.containsKey(cellStyle)) {
			return _caHSSFCellStyle.get(cellStyle);
		} else {

			String[] css = cellStyle.split(";");
			HSSFCellStyle style = workbook.createCellStyle();
			style.setAlignment(Short.valueOf((css[0])));
			style.setBorderBottom(Short.valueOf((css[1])));
			style.setBorderLeft(Short.valueOf((css[2])));
			style.setBorderRight(Short.valueOf((css[3])));
			style.setBorderTop(Short.valueOf((css[4])));
			style.setBottomBorderColor(Short.valueOf((css[5])));
			style.setDataFormat(Short.valueOf((css[6])));
			style.setFillBackgroundColor(Short.valueOf((css[7])));
			style.setFillForegroundColor(Short.valueOf((css[8])));
			style.setFillPattern(Short.valueOf((css[9])));
			style.setLeftBorderColor(Short.valueOf((css[10])));
			style.setRightBorderColor(Short.valueOf((css[11])));
			style.setRotation(Short.valueOf((css[12])));
			style.setTopBorderColor(Short.valueOf((css[13])));
			style.setVerticalAlignment(Short.valueOf((css[14])));
			style.setWrapText(Boolean.valueOf(css[15]));
			// HSSFFont font = workbook.createFont();

			Font font = null;
			// 拿到字体
			if (_caFont.containsKey(cellStyle)) {
				font = _caFont.get(cellStyle);
			} else {
				font = workbook.createFont();
				font.setBoldweight(Short.valueOf((css[16])));
				font.setColor(Short.valueOf((css[17])));
				font.setFontHeight(Short.valueOf((css[18])));
				font.setFontHeightInPoints(Short.valueOf((css[19])));
				font.setFontName(css[20]);
				_caFont.put(cellStyle, font);
			}
			System.out.println("---------------->" + workbook.getNumberOfFonts());
			style.setFont(font);
			_caHSSFCellStyle.put(cellStyle, style);

			return style;
		}
	}

	/*
	 * 获取单元格的格式信息,并返回.
	 */
	public static String getCellStyle(HSSFCell cell, HSSFWorkbook wb) {
		System.out.println("???????????????????");
		
		//String temp = "";
	    StringBuilder sb = new StringBuilder();
		HSSFCellStyle style = cell.getCellStyle();
		
		//temp = temp + style.getAlignment() + ";";
		sb.append(style.getAlignment());
		sb.append(";");
		//temp = temp + style.getBorderBottom() + ";";
		sb.append(style.getBorderBottom());
		sb.append(";");
		//temp = temp + style.getBorderLeft() + ";";
		sb.append(style.getBorderLeft());
		sb.append(";");
		//temp = temp + style.getBorderRight() + ";";
		sb.append(style.getBorderRight());
		sb.append(";");
		//temp = temp + style.getBorderTop() + ";";
		sb.append(style.getBorderTop());
		sb.append(";");
		//temp = temp + style.getBottomBorderColor() + ";";
		sb.append(style.getBottomBorderColor());
		sb.append(";");
		//temp = temp + style.getDataFormat() + ";";
		sb.append( style.getDataFormat());
		sb.append(";");
		//temp = temp + style.getFillBackgroundColor() + ";";
		sb.append( style.getFillBackgroundColor());
		sb.append(";");
		//temp = temp + style.getFillForegroundColor() + ";";
		sb.append( style.getFillForegroundColor());
		sb.append(";");
		//temp = temp + style.getFillPattern() + ";";
		sb.append( style.getFillPattern() );
		sb.append(";");
		//temp = temp + style.getLeftBorderColor() + ";";
		sb.append( style.getLeftBorderColor() );
		sb.append(";");
		//temp = temp + style.getRightBorderColor() + ";";
		sb.append( style.getRightBorderColor());
		sb.append(";");
		//temp = temp + style.getRotation() + ";";
		sb.append( style.getRotation());
		sb.append(";");
		//temp = temp + style.getTopBorderColor() + ";";
		sb.append( style.getTopBorderColor());
		sb.append(";");
	//	temp = temp + style.getVerticalAlignment() + ";";
		sb.append(style.getVerticalAlignment() );
		sb.append(";");
	//	temp = temp + style.getWrapText() + ";";
		sb.append(style.getWrapText() );
		sb.append(";");
		// 对字体的处理
	//	temp = temp + style.getFont(wb).getBoldweight() + ";";
		sb.append(style.getFont(wb).getBoldweight() );
		sb.append(";");
		//temp = temp + style.getFont(wb).getColor() + ";";
		sb.append(style.getFont(wb).getColor() );
		sb.append(";");
		//temp = temp + style.getFont(wb).getFontHeight() + ";";
		sb.append(style.getFont(wb).getFontHeight() );
		sb.append(";");
		//temp = temp + style.getFont(wb).getFontHeightInPoints() + ";";
		sb.append(style.getFont(wb).getFontHeightInPoints() );
		sb.append(";");
		//temp = temp + style.getFont(wb).getFontName();
		sb.append( style.getFont(wb).getFontName() );
		return sb.toString();
		//return temp;
	}

}
