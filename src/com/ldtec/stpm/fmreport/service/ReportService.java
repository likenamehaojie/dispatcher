package com.ldtec.stpm.fmreport.service;

import groovy.DemoGroovy;
import groovy.GenerExcleGrooy;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ldtec.stpm.export.dao.GenerReportDao;
import com.ldtec.stpm.export.data.BeforeSqlData;
import com.ldtec.stpm.export.data.MainInfoData;
import com.ldtec.stpm.export.data.ReportInfoData;
import com.ldtec.stpm.export.data.SectionData;
import com.ldtec.stpm.export.util.GenerateReportParNew;
import com.ldtec.stpm.fmreport.util.Constants;
import com.ldtec.stpm.fmreport.util.GenerExcle;
import com.ldtec.stpm.genericTable.util.XMLTableKeyWordPar;

public class ReportService {



	public String getReportName(String reportId, HttpServletRequest request) {
		GenerReportDao grd = new GenerReportDao(request);
		return grd.getReportName(reportId);
	}

	



	public void generReportByNew(String reportFlag, HttpServletRequest request,
			Map<String, Object> root) {
		
		
		
		
		String tablekeywordsId = request.getParameter("tablekeyword");
		if(tablekeywordsId!=null&&!tablekeywordsId.equals("")){
		String tableKeyWords = XMLTableKeyWordPar.getTableKeyWords(request.getSession().getServletContext().getRealPath("/"),tablekeywordsId);
		
		//组装TABLEKEYWORD
		String[] split = tableKeyWords.split("\\|");
		for(int i = 0;i<split.length;i++){
			root.put("TABLEKEYWORD"+(i+1), split[i]);
			
		}
		}
		
		// 获取配置信息
		String realPath = request.getSession().getServletContext().getRealPath("/");
		GenerReportDao grd = new GenerReportDao(request);
		GenerateReportParNew grp = new GenerateReportParNew();
		ReportInfoData rif = grp.getXMLDataByTemplateId(realPath,
				reportFlag);
		if(rif.getCanFillReport()!=null&&rif.getCanFillReport()!=""&&rif.getCanFillReport().trim().equals("true"))
            root.put("canFillReportTableName", rif.getTableName());
		if (rif == null) {
			System.out.println("ReportInfoData:为空");

		}

		// 拿到befsql的集合
		ArrayList befSqlList = rif.getBefSqlList();
		// 拿到所有报表信息
		ArrayList sectionList = rif.getSectionList();

		for (int i = 0; i < befSqlList.size(); i++) {
			BeforeSqlData bsd = (BeforeSqlData) befSqlList.get(i);
			for (int j = 0; j < sectionList.size(); j++) {
				SectionData sd = (SectionData) sectionList.get(j);
				if (bsd.getConnect().trim().equals(sd.getConnect().trim())) {
					generateData(bsd, sd, root, request, grd, rif);
				}
			}

		}
		StringBuffer sb = new StringBuffer();
		
		//对ROOT值域中  Constants.ALLINONENAMEkey值做处理
		if(root.containsKey(Constants.ALLINONENAME)){
		Object object = root.get(Constants.ALLINONENAME);
		if(object instanceof List){
			List <String> _list = (List<String>)object;
			for(int i =0;i<_list.size();i++){
				String string = _list.get(i);
				//如果i ==0 去掉表尾</table>
				if(i==0){
					string=string.replaceAll("</table>", "");
					sb.append(string);
				}else if(i==_list.size()-1 ){
					string = string.substring(string.indexOf(">")+1).replaceAll("<table>", "");
					sb.append(string);
				}else{
					string=string.substring(string.indexOf(">")+1,string.length()-8);
					sb.append(string);
				}
			}
			
			
		}

		
		}
		root.put(Constants.ALLINONENAME, sb.toString());
		//对要合并的主体进行解析，
		//如果root中包含了要处理的主体名称KEY则说明有需要合并的主体
		if(root.containsKey(Constants.MEGREBODYNAME)){
			String info =root.get(Constants.MEGREBODYUUID).toString();
			root.put(root.get(Constants.MEGREBODYNAME).toString().trim(),info);
			
		}
		
		
		
		
		
		
		// 开始对其它信息进行生成
		generateOtherDate(root, request, rif, grd);

	}
	/**
	 * 生成填冲信息
	 * @param root
	 * @param request
	 * @param rif
	 * @param grd
	 */
	private void generateOtherDate(Map<String, Object> root,
			HttpServletRequest request, ReportInfoData rif, GenerReportDao grd) {
		// 拿到其它主体信息主要用于生成 header
		ArrayList mainInfos = rif.getMainInfos();
		for (int j = 0; j < mainInfos.size(); j++) {
			MainInfoData mid = (MainInfoData) mainInfos.get(j);

			String vSql = mid.getVSql();
			// 拿到配置的参数列表，以用传来的参数值替换
			String filedList = rif.getFiledList();
			// 参数列表一般以逗号分隔
			String[] params = filedList.split(",");

			for (int i = 0; i < params.length; i++) {
				if (params[i] == null || params[i] == "")
					continue;
				// 得到参数列表中的值
				String parameter = request.getParameter(params[i]);
				// 对头信息sql和主体信息sql进行替换
				vSql = vSql.replace("$" + params[i], parameter);
			}
			Long _t = System.currentTimeMillis();
		
			List<Map<String, Object>> queryDataReturnList = grd
					.queryDataReturnList(vSql);
			System.out.println("Other花费："+(System.currentTimeMillis()-_t));
			if (queryDataReturnList != null && queryDataReturnList.size() > 0
					&& queryDataReturnList.size() == 1) {
				root.putAll(queryDataReturnList.get(0));
			} else {
				root.put(mid.getName(), queryDataReturnList);
			}
		}

	}
    /**
     * 生成主表数据
     * @param bsd
     * @param sd
     * @param root
     * @param request
     * @param grd
     * @param rif
     */
	private void generateData(BeforeSqlData bsd, SectionData sd,
			Map<String, Object> root, HttpServletRequest request,
			GenerReportDao grd, ReportInfoData rif) {
		// 拿到合并列信息
		String megreCols = sd.getMegreCols();
		String[] mColumns = null;
		if (megreCols != null && !megreCols.equals("")) {
			mColumns = megreCols.split(",");
		}
		// 拿到配置的参数列表，以用传来的参数值替换
		String filedList = rif.getFiledList();
		// 参数列表一般以逗号分隔
		String[] params = filedList.split(",");

		String befSql = bsd.getViewSql();
		String sectionSql = sd.getViewSql();
		for (int i = 0; i < params.length; i++) {
			if (params[i] == null || params[i] == "")
				continue;
			// 得到参数列表中的值
			String parameter = request.getParameter(params[i]);
			// 对头信息sql和主体信息sql进行替换
			befSql = befSql.replace("$" + params[i], parameter);
			sectionSql = sectionSql.replace("$" + params[i], parameter);
		}
		int reportId = -1;
		
		Long _t = System.currentTimeMillis();
		// 通过BeforeSql生成或拿到reportId
		reportId = grd.generHeaderAndReturnReportId(befSql);
		System.out.println("befSql花费:"+(System.currentTimeMillis()-_t));
		String generExcleFinal = "";
		
		
			/**
			 * 拿到报表的名称
			 */
			String reportName = grd.getReportName(reportId + "");
			root.put(sd.getHeaderName(), reportName);
			_t = System.currentTimeMillis();
			
			List<List<String>> queryDataReturnListWithOutMap = null;
			if(sd.getIsConvertColToRow()!=null&&sd.getIsConvertColToRow().equals("true")){
				queryDataReturnListWithOutMap = grd.queryDataReturnListWithOutMapColumnToRow(sectionSql);
			}else{
				if(sectionSql.contains("|")){
					String[] split = sectionSql.split("\\|");
					String connectPoint = sd.getConnectPoint();
					String[] connectPointSplit = connectPoint.split(",");
				try {
					queryDataReturnListWithOutMap = grd.queryDateReturnConnectList(split,connectPointSplit)	;
				} catch (SQLException e) {
					e.printStackTrace();
				}
				}else{
				queryDataReturnListWithOutMap=grd.queryDataReturnListWithOutMap(sectionSql);
				}
			}
			
			
			System.out.println("sectionSql花费:"+(System.currentTimeMillis()-_t));
			// 开始生成片断信息
			String color = sd.getBackgroundColor();
			String flag = sd.getID();
			String style = sd.getStyle();
			List<String> styles = new ArrayList<String>();
			String[] strings = style.split(",");
			// 将列样式加入list中
			for (String string : strings) {
				styles.add(string);
			}
			HashMap<String,String> rowStyles = new HashMap<String,String>() {
			};
			//拿到行样式规则 行样式以‘_’ 分隔
			String rowStyle = sd.getRowStyle();
			if(rowStyle!=null&&rowStyle!=""){
			String[] split = rowStyle.trim().split("#");
			for (String string : split) {
				String[] split2 = string.split("_");
				rowStyles.put(split2[0], split2[1]);
			
			}
			}
			int refCol = 0;
			int movePoint = 0;
			String refColmun = sd.getRefColmun();//获取参照哪列进行合并
			String megrePointLose = sd.getMegrePointLose();
			if(refColmun==null||refColmun.equals("")){
				refCol = -1;
			}else{
				refCol = Integer.parseInt(refColmun);
				if(megrePointLose==null||megrePointLose.equals("")){
					movePoint = 0;
				}else{
					movePoint = Integer.parseInt(megrePointLose);
				}
				
				
			}
			String headerColor = bsd.getBackgroundColor();
			generExcleFinal = GenerExcle.generExcleFinal(reportId, 1, mColumns,
					color, styles, flag, request, root,reportName,rowStyles,refCol,movePoint,sd,queryDataReturnListWithOutMap,rif, headerColor);
			/*	
			generExcleFinal = GenerExcleGrooy.generExcleFinal(reportId, 1, mColumns,
					color, styles, flag, request, root,reportName,rowStyles,refCol,movePoint,sd,queryDataReturnListWithOutMap);
			*/
			
			root.put(sd.getSectionName()+"_"+"uuid", root.get("uuid").toString());

			if(root.containsKey("uuid"))
		    	root.remove("uuid");
			
			// 构建数据
			root.put("templatename", rif.getTemplatePath());
			root.put(sd.getSectionName(), generExcleFinal);
			
			System.out.println("生成 的断-----》》》"+generExcleFinal);
			
			//如果不存在allinone这个key
			if(!root.containsKey(Constants.ALLINONENAME)){
				List<String> _list = new ArrayList<String>();
				_list.add(generExcleFinal);
				root.put(Constants.ALLINONENAME, _list);
			}else{
				Object object = root.get(Constants.ALLINONENAME);
				if(object instanceof List){
					@SuppressWarnings("unchecked")
					List<String> _list = (List<String>) object;
					_list.add(generExcleFinal);
					root.put(Constants.ALLINONENAME, _list);
				}
				
			}
			Long _tt = System.currentTimeMillis();
			
			// 如果是动态生成的reportId 对此reportId做删除处理
			if (bsd.getIsDynamic() != null
					&& bsd.getIsDynamic().trim().equals("true")) {
				grd.deleteHeaderInfo(reportId);
			}
			System.out.println("删除用了："+(System.currentTimeMillis()-_tt));
	
	}
		public String opeOtherExtend(){
			DemoGroovy dg = new DemoGroovy();
			return dg.getString("like");
			
			
			
		}
}
