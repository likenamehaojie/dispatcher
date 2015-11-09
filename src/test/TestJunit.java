package test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFSimpleShape;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.util.Region;
import org.junit.Test;

import com.ldtec.stpm.export.dao.GenerReportDao;
import com.ldtec.stpm.fmreport.util.DBUtil;
import com.ldtec.stpm.fmreport.util.ExcelShower;
import com.ldtec.stpm.fmreport.util.Excel_Sheet;
import com.ldtec.stpm.fmreport.util.GenerExcle;

public class TestJunit
{
	
	/**
	 * @param args
	 * @throws FileNotFoundException 
	 */
	public static void main(String[] args) throws FileNotFoundException
	{
		

		
		
		HSSFWorkbook workbook = new HSSFWorkbook();
		HSSFSheet sheet = workbook.createSheet();
		
		HSSFRow row = sheet.createRow(0) ;
		row.setHeight((short) 500) ;
		sheet.setColumnWidth(0, 4000) ;
		
		HSSFCellStyle cellStyle = workbook.createCellStyle() ;
		cellStyle.setWrapText(true);
		cellStyle.setAlignment((short)2) ;
		cellStyle.setVerticalAlignment((short)1) ;

		
		HSSFCell cell = row.createCell(1) ;
		cell.setCellValue("姓名            密码") ;
		cell.setCellStyle(cellStyle) ;

		//画线(由左上到右下的斜线)
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		HSSFClientAnchor a = new HSSFClientAnchor(0, 0, 1023, 255, (short)1, 1, (short)1, 1);
		HSSFSimpleShape shape1 = patriarch.createSimpleShape(a);
		shape1.setShapeType(HSSFSimpleShape.OBJECT_TYPE_LINE); 
		shape1.setLineStyle(HSSFSimpleShape.LINESTYLE_SOLID) ;
		
		OutputStream outputStream = new  FileOutputStream("f:\\test1.xls") ;
		try
		{
			workbook.write(outputStream);
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		System.out.println("generate  excel success ! ");
		
	}
	
	@Test
	public void ReportTestGenerateTop(){
		String name = "f:/Test/today1.xls";
	//	GenerExcle.genTop(name);
		this.genTop(name);
	}
	@Test
	public void ReportTestGenerateBody(){
		String name = "f:/Test/like11.xls";
	//	GenerExcle.genAfter(name);
		this.genAfter(name);
	}
	@Test
	public void generateJunit(){
		String name = "f:/Test/likesecurity.xls";
	//	GenerExcle.genSecurity(name);
		this.genSecurity(name);
	}
	
	@Test public void delete(){
	
	//	 File file = new File("f:/Test/likesecurity.xls");
		// file.deleteOnExit();
		 try {
			Runtime.getRuntime().exec("explorer f:/Test/likesecurity.xls");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	@Test public void testExcelToHtml(){
		//String name = "f:/Test/dayAllData.xls";
		String name = "f:/Test/html.xls";
		//String name = "f:/Test/like11.xls";
		ExcelShower es = new ExcelShower();
		try {
			es.TestExcelToHtml(name);
			
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test public void testMegreMutPartExcel(){
		String name = "f:/Test/today1.xls";
		String name2 = "f:/Test/like11.xls";
		String name3 = "f:/Test/dayAllData.xls";
		Excel_Sheet es = new Excel_Sheet();
		es.TestMegreMutPartExcel(name3, name,name2);
	}
	
	@Test public void getClassPath(){
		
		 File f = new File(this.getClass().getResource("").getPath());  
		 f = new File("res/dbPool.conf");
		System.out.println(f.getAbsolutePath());
		
		
		
	}
	@Test public void genTest3Leve(){
		String name = "f:/Test/leve3.xls";
		//GenerExcle.genTest3Leve(name);
		this.genTest3Leve(name);

		
		
		
	}
	
	
	@Test public void tes(){
		String name = "f:/Test/leve3.xls";
		GenerExcle ge = new GenerExcle(null);
		ge.removeSpecRow(2,name);
		
	}
	@Test public void removeSpceRow(){
		
		
		
	}
	
	@Test public void TestSplit(){
		String tem = "exec [dbo].[proc_chengjiao_day_report_STATISTICS] '$dayInMonth' ,'$COMMUNITYID'|exec [dbo].[proc_chengjiao_juejin_day_report_STATISTICS] '$dayInMonth' ,'$COMMUNITYID' ";
		String[] split = tem.split("\\|");
		System.out.println();
		
	}
	
	@Test public void testConnectList(){
		String right = "proc_chengjiao_day_report_STATISTICS '2015-10-28' ,'646'";
		String left = "proc_chengjiao_juejin_day_report_STATISTICS '2015-10-28' ,'646'";
		GenerReportDao grd = new GenerReportDao(null);
		try {
			grd.queryDateReturnConnectList(new String[]{right,left},new String []{"8","8"});
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	@Test public void testDate() throws ParseException{
		String d = "2015年10月";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年mm月");
		Date parse = sdf.parse(d);
		System.out.println(parse);
		
	}
	@Test public void w(){
		String _tem = "like";
		System.out.println(_tem.getBytes().length);
	}
	
	
	public  void genTop(String name){
		
		GenerExcle ge = new GenerExcle(null);
		int reportId = 4;
		GenerExcle.getReportHeaderById(ge, reportId, null);
		int max = 2;

		String sql1 =
				"select '当日生产'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '提矸',   94,  159,  209,  462,  4755\n" +
						"union all\n" + 
						"select '本月累计'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '下料',   94,  159,  209,  462,  4755\n" + 
						"union all\n" + 
						"select '本月计划'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '下空车 ',   94,  159,  209,  462,  4755";


		PreparedStatement ps = null;
		ResultSet rs = null;
		Connection connection = null;
		try {
			connection = DBUtil.getConnection();
			ps = connection.prepareStatement(sql1);
			rs = ps.executeQuery();
			int maxCell2 = ge.getMaxCell();
			GenerExcle.fillData(max, rs, ge);
			ge.insertRowInSpecRow(0, 2);
			ge.mergeReportNameArea(0, 0, 1, maxCell2-1, "车集煤矿调度日报表");
			ge.saveAaSpecName(name);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		//List<Map<String, Integer>> mergeCellBySameContentInfo = ge.mergeCellBySameContentInfo(0,2);
		
	
	
	
	
	
	
	
	
	}
	
	
	public  void genAfter(String name){
		

		GenerExcle ge = new GenerExcle(null);
		// ge.testAll();
	
		int reportId = 5;
		GenerExcle.getReportHeaderById(ge, reportId, null);
		int max = 2;
		String sql2 = 


				"select '综采一队',  '2311工作面',      'T',  8200,  328,  8200,  0 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" +
				"union all\n" + 
				"select '综采二队',  '2312工作面',      'T',  820,  3128,  82001,  10 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
				"union all\n" + 
				"select '综采三队',  '2311工作面',      'T',  8200,  328,  255,  0 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" +
				"union all\n" + 
				"select '掘一队',  '2316上巷',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
				"union all\n" + 
				"select '掘一队',  '2316下巷',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
				"union all\n" + 
				"select '掘一队',  '2316上,下巷硐室',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
				"union all\n" + 
				"select '掘一队',  '小计',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'"+
	         	"union all\n" + 
		"select '安装队',  '-999',      '-999',  -999,-999,-999, -999 ,-999,   -999,'-999'";
		PreparedStatement ps = null;
		ResultSet rs = null;
		Connection connection = null;
		try {
			connection = DBUtil.getConnection();
			ps = connection.prepareStatement(sql2);
			rs = ps.executeQuery();

			GenerExcle.fillData(max, rs, ge);
		

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		List<Map<String, Integer>> mergeCellBySameContentInfo = ge.mergeCellBySameContentInfo(0,2);
		
		/*
		 * 开始按需合并数据
		 */
		int colNum = 7;
	   ge.mergeCellBySameContent(colNum, max,0,mergeCellBySameContentInfo,0);
	   ge.mergeCellBySameContent(0, max,0,mergeCellBySameContentInfo,0);
		int maxCell2 = ge.getMaxCell();
		System.out.println(maxCell2);
		String string = ge.excleToHtml("red", null, "id='test'",null,0,null).toString();
		System.out.println(string);
		ge.saveAaSpecName(name);
		 ge.excleToHtml();
						
	}
	
	
	
	public  void genSecurity(String name){
		GenerExcle ge = new GenerExcle(null);
		int reportId = 6;
		GenerExcle.getReportHeaderById(ge, reportId, null);
		String sql3 = 
				"select '一',  '核定生产能力(万吨)',  1380.00  ,150.00  ,450.00,  280.00,  500.00,  0  ,0,  0,  0  ,0  ,0,  0,  0,  0\n" +
						"union all\n" + 
						"select '一',  '核定生产能力(万吨)',  1380.00  ,150.00  ,450.00,  280.00,  500.00,  0  ,0,  0,  0  ,0  ,0,  0,  0,  0";

		int max = 1;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Connection connection = null;
		try {
			connection = DBUtil.getConnection();
			ps = connection.prepareStatement(sql3);
	//ps.ex
			rs = ps.executeQuery();

			GenerExcle.fillData(max, rs, ge);
		

		} catch (SQLException e) {
			e.printStackTrace();
		}
		ge.saveAaSpecName(name);
	}
	
	public  void genTest3Leve(String name){

		GenerExcle ge = new GenerExcle(null);
		// ge.testAll();
	
		int reportId = 852;
	//	GenerExcle.getReportHeaderById(ge, reportId, null);
		int max = 3;
	//	ge.removeSpecRow(2);
		ge.removeSpecRow(2, name);
		
		ge.saveAaSpecName(name);
		
	}
	


	public static void feiqi(String[] args) {
		
		if (true) {
			//genTop("");
			
			 return;
		}
		
		
		GenerExcle ge = new GenerExcle();
		// ge.testAll();
	
		int reportId = 5;
		GenerExcle.getReportHeaderById(ge, reportId, null);

	//	ge.saveAaSpecName("f:/like.xls");

		// j最大层级
		int max = 2;
		// String sql = "select * from demo_data";
		// String sql =
		// "select MS.FLAG,MS.DTSJ_EXAMOBJ,MS.PROBLEM,MS.POINTS,MS.SCORE from DBO.DTSJ_SUMMARY_MAJOR_SUB MS";
		
		
		String sql1 =
				"select '当日生产'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '提矸',   94,  159,  209,  462,  4755\n" +
						"union all\n" + 
						"select '本月累计'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '下料',   94,  159,  209,  462,  4755\n" + 
						"union all\n" + 
						"select '本月计划'  ,3810,   26.45,   6.0,   12.95 ,  3881,   25.9 ,  25.9   ,3.2,   12.1,   12.1,   859.0,   13934.9,   0.0,   5.6,   '下空车 ',   94,  159,  209,  462,  4755";

		
		String sql = "select 1,222222222222222222222222222222222222 ,3";
		
		
		
		
		String sql2 = 


"select '综采一队',  '2311工作面',      'T',  8200,  328,  8200,  0 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" +
"union all\n" + 
"select '综采二队',  '2312工作面',      'T',  820,  3128,  82001,  10 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
"union all\n" + 
"select '综采三队',  '2311工作面',      'T',  8200,  328,  255,  0 ,  -328,   0,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" +
"union all\n" + 
"select '掘一队',  '2316上巷',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
"union all\n" + 
"select '掘一队',  '2316下巷',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
"union all\n" + 
"select '掘一队',  '2316上,下巷硐室',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'\n" + 
"union all\n" + 
"select '掘一队',  '小计',      'm',  130,5.2,255,  4.0 ,  -1.2,   40.8,'沿空留巷第107次注浆（4m），累计332m，中班18:00-19:10装药放炮61个眼，割煤2刀，夜班3:50- 4:58装药放炮61个眼，割煤2刀，瓦斯最大值：工作面0.4%、回风0.32%、充填作业道0.39%'";

		
		
	

		PreparedStatement ps = null;
		ResultSet rs = null;
		Connection connection = null;
		try {
			connection = DBUtil.getConnection();
			ps = connection.prepareStatement(sql2);
			rs = ps.executeQuery();

			GenerExcle.fillData(max, rs, ge);
		

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		List<Map<String, Integer>> mergeCellBySameContentInfo = ge.mergeCellBySameContentInfo(0,2);
		
		/*
		 * 开始按需合并数据
		 */
		int colNum = 7;
	   ge.mergeCellBySameContent(colNum, max,0,mergeCellBySameContentInfo,0);
	   ge.mergeCellBySameContent(0, max,0,mergeCellBySameContentInfo,0);
	//	ge.insertRowInSpecRow(0, 2);
		// ge.saveAaSpecName("e:/today1.xls");
		int maxCell2 = ge.getMaxCell();
       //  ge.autoSizeColumn(maxCell2);



	//	ge.mergeReportNameArea(0, 0, 1, maxCell2-1, "车集煤矿调度日报表");
		System.out.println(maxCell2);

		String string = ge.excleToHtml("red", null, "id='test'",null,0,null).toString();
		System.out.println(string);

		ge.saveAaSpecName("f:/like11.xls");

		 ge.excleToHtml();

	}
	
	@Test public void genByStr(){
		
		String str = "id,mtcl,pjrc,jjzjc,pjrj,ktjc,ktrjc,dbcfhjcjh,dbcfhrjc,wscfzkjc ,wscfl,dbzkjc,zjl,yearandmonth,shijitianshu,tianbaoren";
		
		String[] split = str.split(",");
		String _tem = "";
		for (String string : split) {
			_tem+="<td>{"+string+"}&nbsp;</td>\n";
		}
		
		
		System.out.println(_tem);
		
		
		
		
	}
	@Test public void genH(){
		
		String str = "煤炭产量,平均日产,掘进总进尺,平均日进,其中：开拓进尺,开拓日进尺,底板抽放巷进尺计划,底板抽放巷日进尺,瓦斯抽放钻孔进尺,瓦斯抽放量,底板钻孔进尺,注浆量";
		
		String[] split = str.split(",");
		String _tem = "";
		String w = 100/split.length+"";
		for (String string : split) {
			_tem+="<th width=\""+5+"%\">"+string+"</th>\n";
		}
		
		
		System.out.println(_tem);
		
		
		
		
	}
	
	@Test public void copySpcJarToSpc(){
		String [] jarNames = new String[]{
				"spring-core",
				"spring-beans",
				"spring-messaging",
				"spring-webmvc",
				"spring-expression",
				"spring-context",
				"spring-context-support",
				"spring-aop",
				"spring-web"
			
				
				
				
		};
		String v = "4.2.1.RELEASE";
		String baseUrl = "C:\\Users\\Administrator\\.m2\\repository\\org\\springframework\\";
		for(int i = 0;i<jarNames.length;i++){
		String f = baseUrl+jarNames[i]+"\\"+v+"\\"+jarNames[i]+"-"+v+".jar";
		try {
			FileInputStream fis = new FileInputStream(f);
			FileOutputStream fos = new FileOutputStream("d:/jar/"+jarNames[i]+"-"+v+".jar");
			int in=fis.read();
			while(in!=-1){
				fos.write(in);
				in=fis.read();
				}
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		}
		
		
	}
	@Test public void testIsNum(){
		String test = "123";
		boolean matches = test.matches("^[0-9]+\\.*[0-9]+$");
		String m = String.format("%.2f","ff");
		System.out.println(m);
		
		
		System.out.println(matches);
		
		
		
		
	}
	
	@SuppressWarnings("deprecation")
	@Test public void megreBySameContent(){
		
		int xFrom=0;
		int xTo = 0;
		int yFrom = 0;
		int yTo = 0;
		
		File file = new File("f:/Test/html.xls");
		try {
			List<int []> pointList = new ArrayList<>();
			BufferedInputStream in = new BufferedInputStream(new FileInputStream(
			           file));
			  POIFSFileSystem fs = new POIFSFileSystem(in);
		        HSSFWorkbook wb = new HSSFWorkbook(fs);
			HSSFSheet sheetAt = wb.getSheetAt(0);
		        int physicalNumberOfRows = sheetAt.getPhysicalNumberOfRows();
		        System.out.println(physicalNumberOfRows);
		        
		        for(int rowPoint = 0;rowPoint<physicalNumberOfRows;rowPoint++){
		        	HSSFRow row = sheetAt.getRow(rowPoint);
		        	int physicalNumberOfCells = row.getPhysicalNumberOfCells();
		        	for(int cellPoint=0;cellPoint<physicalNumberOfCells;cellPoint++){
		        		HSSFCell cell = row.getCell(cellPoint);
		        		if(cell!=null){
		        			if(cell.getCellType()==HSSFCell.CELL_TYPE_BLANK){
		        				continue;
		        			}else{
		        				String _temCellValue =cell.getRichStringCellValue().toString();
		        				if(_temCellValue.startsWith("like")){
		        					System.out.println(_temCellValue);
		        					
		        				    int [] am = new int[]{rowPoint,cellPoint};
		        				  if(rowPoint>pointList.get(pointList.size()-1)[0]+1||cellPoint>pointList.get(pointList.size()-1)[1]+1){
		        					  break;
		        				  }
		        				    pointList.add(am);
		        				
		        					
		        				}
		        				
		        				
		        			}
		        			
		        		}
		        		
		        		
		        	}
		        	System.out.println(physicalNumberOfCells);
		        	
		        	
		        }
		        xFrom = pointList.get(0)[1];
		        yFrom = pointList.get(0)[0];
		        yTo = pointList.get(pointList.size()-1)[0];
		        xTo = pointList.get(pointList.size()-1)[1];
		       // CellRangeAddress c = new CellRangeAddress(yFrom,yTo, xFrom, xTo);
		        Region r = new Region(yFrom, (short)xFrom, yTo, (short)xTo);
		        int addMergedRegion = sheetAt.addMergedRegion(r);
		       System.out.println(addMergedRegion);
		        
		        
		        
		        
		        
		        
		        
		        
		        
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		
		
		
		
	}
	
	
	@Test public void testRowToCol(){
		GenerReportDao dao = new GenerReportDao(null);
		dao.queryDataReturnListWithOutMapColumnToRow("proc_PROCEDURE_otherspec_month_sum_STATISTICS '2015-09-24'");
		
		
	}
}