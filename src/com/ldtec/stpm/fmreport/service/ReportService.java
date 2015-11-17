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
		
		//��װTABLEKEYWORD
		String[] split = tableKeyWords.split("\\|");
		for(int i = 0;i<split.length;i++){
			root.put("TABLEKEYWORD"+(i+1), split[i]);
			
		}
		}
		
		// ��ȡ������Ϣ
		String realPath = request.getSession().getServletContext().getRealPath("/");
		GenerReportDao grd = new GenerReportDao(request);
		GenerateReportParNew grp = new GenerateReportParNew();
		ReportInfoData rif = grp.getXMLDataByTemplateId(realPath,
				reportFlag);
		if(rif.getCanFillReport()!=null&&rif.getCanFillReport()!=""&&rif.getCanFillReport().trim().equals("true"))
            root.put("canFillReportTableName", rif.getTableName());
		if (rif == null) {
			System.out.println("ReportInfoData:Ϊ��");

		}

		// �õ�befsql�ļ���
		ArrayList befSqlList = rif.getBefSqlList();
		// �õ����б�����Ϣ
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
		
		//��ROOTֵ����  Constants.ALLINONENAMEkeyֵ������
		if(root.containsKey(Constants.ALLINONENAME)){
		Object object = root.get(Constants.ALLINONENAME);
		if(object instanceof List){
			List <String> _list = (List<String>)object;
			for(int i =0;i<_list.size();i++){
				String string = _list.get(i);
				//���i ==0 ȥ����β</table>
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
		//��Ҫ�ϲ���������н�����
		//���root�а�����Ҫ�������������KEY��˵������Ҫ�ϲ�������
		if(root.containsKey(Constants.MEGREBODYNAME)){
			String info =root.get(Constants.MEGREBODYUUID).toString();
			root.put(root.get(Constants.MEGREBODYNAME).toString().trim(),info);
			
		}
		
		
		
		
		
		
		// ��ʼ��������Ϣ��������
		generateOtherDate(root, request, rif, grd);

	}
	/**
	 * ���������Ϣ
	 * @param root
	 * @param request
	 * @param rif
	 * @param grd
	 */
	private void generateOtherDate(Map<String, Object> root,
			HttpServletRequest request, ReportInfoData rif, GenerReportDao grd) {
		// �õ�����������Ϣ��Ҫ�������� header
		ArrayList mainInfos = rif.getMainInfos();
		for (int j = 0; j < mainInfos.size(); j++) {
			MainInfoData mid = (MainInfoData) mainInfos.get(j);

			String vSql = mid.getVSql();
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
				vSql = vSql.replace("$" + params[i], parameter);
			}
			Long _t = System.currentTimeMillis();
		
			List<Map<String, Object>> queryDataReturnList = grd
					.queryDataReturnList(vSql);
			System.out.println("Other���ѣ�"+(System.currentTimeMillis()-_t));
			if (queryDataReturnList != null && queryDataReturnList.size() > 0
					&& queryDataReturnList.size() == 1) {
				root.putAll(queryDataReturnList.get(0));
			} else {
				root.put(mid.getName(), queryDataReturnList);
			}
		}

	}
    /**
     * ������������
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
		// �õ��ϲ�����Ϣ
		String megreCols = sd.getMegreCols();
		String[] mColumns = null;
		if (megreCols != null && !megreCols.equals("")) {
			mColumns = megreCols.split(",");
		}
		// �õ����õĲ����б����ô����Ĳ���ֵ�滻
		String filedList = rif.getFiledList();
		// �����б�һ���Զ��ŷָ�
		String[] params = filedList.split(",");

		String befSql = bsd.getViewSql();
		String sectionSql = sd.getViewSql();
		for (int i = 0; i < params.length; i++) {
			if (params[i] == null || params[i] == "")
				continue;
			// �õ������б��е�ֵ
			String parameter = request.getParameter(params[i]);
			// ��ͷ��Ϣsql��������Ϣsql�����滻
			befSql = befSql.replace("$" + params[i], parameter);
			sectionSql = sectionSql.replace("$" + params[i], parameter);
		}
		int reportId = -1;
		
		Long _t = System.currentTimeMillis();
		// ͨ��BeforeSql���ɻ��õ�reportId
		reportId = grd.generHeaderAndReturnReportId(befSql);
		System.out.println("befSql����:"+(System.currentTimeMillis()-_t));
		String generExcleFinal = "";
		
		
			/**
			 * �õ����������
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
			
			
			System.out.println("sectionSql����:"+(System.currentTimeMillis()-_t));
			// ��ʼ����Ƭ����Ϣ
			String color = sd.getBackgroundColor();
			String flag = sd.getID();
			String style = sd.getStyle();
			List<String> styles = new ArrayList<String>();
			String[] strings = style.split(",");
			// ������ʽ����list��
			for (String string : strings) {
				styles.add(string);
			}
			HashMap<String,String> rowStyles = new HashMap<String,String>() {
			};
			//�õ�����ʽ���� ����ʽ�ԡ�_�� �ָ�
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
			String refColmun = sd.getRefColmun();//��ȡ�������н��кϲ�
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
			
			// ��������
			root.put("templatename", rif.getTemplatePath());
			root.put(sd.getSectionName(), generExcleFinal);
			
			System.out.println("���� �Ķ�-----������"+generExcleFinal);
			
			//���������allinone���key
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
			
			// ����Ƕ�̬���ɵ�reportId �Դ�reportId��ɾ������
			if (bsd.getIsDynamic() != null
					&& bsd.getIsDynamic().trim().equals("true")) {
				grd.deleteHeaderInfo(reportId);
			}
			System.out.println("ɾ�����ˣ�"+(System.currentTimeMillis()-_tt));
	
	}
		public String opeOtherExtend(){
			DemoGroovy dg = new DemoGroovy();
			return dg.getString("like");
			
			
			
		}
}
