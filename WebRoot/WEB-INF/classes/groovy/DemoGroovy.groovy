package groovy

import com.ldtec.stpm.export.dao.GenerExcelDao

class DemoGroovy {

	 public static main(){
		 GenerExcelDao gd = new GenerExcelDao();
		 
	 }
	 public String getString(String name){
		 println("你好1"+name);
		 return "这个是改过后的东西"
	 }
	 
	 
	
}
