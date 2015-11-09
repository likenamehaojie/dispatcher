package groovy

import static org.junit.Assert.*;

import org.junit.Test;

import com.ldtec.stpm.fmreport.util.GenerExcle;



class GroovyTest {
@Test
void testName() {
		def name = "f:/Test/leve3.xls";
		def var="hello "+
		"world"+
		",groovy!"

		repeat(var)
		

		
		
		
		//GenerExcle.genTest3Leve(name);
		//genTest3Leve(name);

}
def repeat(val){
	for(def i = 0; i < 5; i++){
	 println val
	}
}
public  void genTest3Leve(def name){
	      for(i in 0..5){
			   println "This is ${i}:${val}"
			  }
			def ge = new GenerExcle(null);
			// ge.testAll();
		  
			def reportId = 852;
			GenerExcle.getReportHeaderById(ge, reportId, null);
			def max = 3;
			ge.saveAaSpecName(name);
			
		}
	
}
