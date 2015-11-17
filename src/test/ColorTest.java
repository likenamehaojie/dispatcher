package test;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jxl.Cell;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.junit.Test;

import com.ldtec.stpm.fmreport.util.Constants;

public class ColorTest {

	
	@Test
	public void testColor(){
		String color = "<color rgb(100,200,3000)  >";
		Pattern pattern = Pattern.compile("^<color *rgb.*");
		 Matcher matcher = pattern.matcher(color);
		 boolean matches = matcher.matches();
		 
		 Pattern pattern1 = Pattern.compile("[( ) ,]+");
		 String[] strs = pattern1.split(color);
		 for (int i=0;i<strs.length;i++) {
				
			 Pattern pattern3 =     Pattern.compile("[0-9]{0,3}");
			 Matcher matcher2 = pattern3.matcher(strs[i].trim());
			 boolean matcher22 = matcher2.matches();
			 if(matcher22)
				System.out.println(strs[i]);
		 } 
		System.out.println();
		
		
		
	}
	@Test public void genColor(){
		try {
			//POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(Constants.COLOR_TEMPLATE_PATH+"/tem.xls"));
			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet createSheet = wb.createSheet();
           int count  = 8;
			for(int i =1;i<=6;i++){
				HSSFRow createRow = createSheet.createRow(i-1);
				for(int j=1;j<=8;j++){
					HSSFCell createCell = createRow.createCell(j-1);
					HSSFCellStyle createCellStyle = wb.createCellStyle();
					createCellStyle.setFillForegroundColor((short)(count++));
		     		
					createCellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
					createCell.setCellStyle(createCellStyle);
					createCell.setCellValue(createRow.getRowNum()+","+createCell.getCellNum());
					
				}
				
			}
			FileOutputStream fileOut =new FileOutputStream(Constants.COLOR_TEMPLATE_PATH+"/tem.xls");
			
			wb.write(fileOut);
			fileOut.flush();
			fileOut.close();
			
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}
}

