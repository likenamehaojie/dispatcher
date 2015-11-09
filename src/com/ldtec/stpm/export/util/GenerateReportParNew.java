package com.ldtec.stpm.export.util;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

import com.jacob.com.ComThread;
import com.ldtec.stpm.export.dao.ExportWordDao;
import com.ldtec.stpm.export.data.BeforeSqlData;
import com.ldtec.stpm.export.data.GenerateWordData;
import com.ldtec.stpm.export.data.HeaderInfoData;
import com.ldtec.stpm.export.data.MainInfoData;
import com.ldtec.stpm.export.data.ReportInfoData;
import com.ldtec.stpm.export.data.SectionData;
import com.ldtec.stpm.export.data.SecurityData;
import com.ldtec.stpm.login.UserSession;

public class GenerateReportParNew {
	// 无参构
	public GenerateReportParNew() {
	};

	private static String TEMPLATE = "reportInfo";

	private static String TID = "tid";

	private static String FILEDLIST = "filedList";

	private static String HEADERNAME = "headerName";

	private static String TEMPLATEPATH = "templatePath";
	
	private static String ISMEGREDISPLAY = "isMegreDisplay";
	
	private static String ISMEGREBODY="isMegreBody";
	
	private static String ISINCLUDEREPORTNAME = "isIncludeReportName";
    
   private static String ISEXPORTHEADER = "isExportHeader";

	private static String HEADERINFO = "headerinfo";

	private static String SECTION = "section";// 定义片断信息

	private static String BEFORESQL = "beforeSql";// 定义前置执行SQL

	private static String BEFOREFILEDLIST = "befFileList";

	private static String SECTIONNAME = "sectionName";

	private static String ISDYNAMIC = "isDynamic";

	private static String CONNECT = "connect";// 表头信息和表主体信息的连接桥梁

	private static String EXPORTNAME = "exportName";

	private static String MEGRECOLS = "megreCols";

	private static String REPORTID = "reportId";

	private static String MAININFO = "mainInfo";

	private static String NAME = "name";

	private static HashMap Templates = null; // 保存每个社区配置文件内容

	private static String ROWSTYLE = "rowStyle";

	private static String ID = "id";
	private static String STYLE = "style";
	private static String BACKGROUNDCOLOR = "backgroundColor";
	private static String FILLPOSTION = "fillPostion";
	private static String REFCOLMUN = "refColmun";
	private static String MEGREPOINTLOSE = "megrePointLose";
	private static String ISCONVERTCOLTOROW = "isConvertColToRow";
	private static String ISUSEDATABASEMEGRERULE = "isUseDataBaseMegreRule";
	private static String ISGENERATEREPORTHEADER ="isGenerateReportHeader";
	private static String ISGENERATELITETITTLE = "isGenerateLiteTittle";
	private static String CONNECTPOINT = "connectPoint";
	private static String TITTLEGENERRULE = "tittleGenerRule";
	private static String HEADERWIDTH = "headerWidth";
	private static String DATEHASNOBODER = "dateHasNoBoder";
	private static String AVGHIGHT = "avgHight";
	
	
	
	///////////reportInfo 新增规则 ///////////////////
	private static String CANFILLREPORT = "canFillReport";
	private static String TABLENAME = "tableName";
	/**
	 * 解析所有templates
	 * 
	 * @param realpath
	 *
	 */

	private static void getTemplates(String realpath, String name) {
		try {
			String _name = "reportInfo";
			SAXBuilder builder = new SAXBuilder();
			Element root = null;

			String path = realpath + "\\WEB-INF\\conf\\" + _name + ".xml";
			System.out.println(path + "<--");
			Document doc = builder.build(new File(path));
			root = doc.getRootElement();
			if (Templates == null)
				Templates = new HashMap();
			initTableTemplates(root, name);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	
	
	
	/**
	 * initTableTemplates
	 *
	 * @param root
	 *            Element
	 */
	private static void initTableTemplates(Element root, String name) {
		List templateList = root.getChildren(TEMPLATE);
		boolean f = (name == null);
		for (Iterator it = templateList.iterator(); it.hasNext();) {
			Element templateEle = (Element) it.next();
			String wtName = templateEle.getAttributeValue(TID);
			if (f)
				Templates.put(wtName, initTemplateData(templateEle, wtName));
			else {
				if (name.equals(wtName)) {
					Templates.put(wtName, initTemplateData(templateEle, wtName));
					System.out.println("REPORTINFO已执行更新！");
					break;
				}
			}
		}
		if (f)
			System.out.println("REPORTINFO执行全部加载！");
	}

	private static ReportInfoData initTemplateData(Element templateEle, String wtName) {
		ReportInfoData tData = new ReportInfoData();
		tData.setTId(wtName);
		tData.setTableName(templateEle.getAttributeValue(TABLENAME));
		tData.setCanFillReport(templateEle.getAttributeValue(CANFILLREPORT));
		tData.setIsMegreDisplay(templateEle.getAttributeValue(ISMEGREDISPLAY));
		tData.setTemplatePath(templateEle.getAttributeValue(TEMPLATEPATH));
		tData.setIsDynamic(templateEle.getAttributeValue(ISDYNAMIC));
		tData.setFiledList(templateEle.getAttributeValue(FILEDLIST));
		List tableList = templateEle.getChildren(HEADERINFO);
		for (Iterator table = tableList.iterator(); table.hasNext();) {
			HeaderInfoData vdata = new HeaderInfoData();
			Element tableEle = (Element) table.next();
			vdata.setReportId(tableEle.getAttributeValue(REPORTID));
			vdata.setHeaderName(tableEle.getAttributeValue(HEADERNAME));
			vdata.setViewSql(tableEle.getTextTrim());
			vdata.setConnect(tableEle.getAttributeValue(CONNECT));
			tData.setHeaderListByViewData(vdata);
		}
		List sectionList = templateEle.getChildren(SECTION);
		for (Iterator table = sectionList.iterator(); table.hasNext();) {
			SectionData vdata = new SectionData();
			Element tableEle = (Element) table.next();
			vdata.setAvgHight(tableEle.getAttributeValue(AVGHIGHT));
			vdata.setDateHasNoBoder(tableEle.getAttributeValue(DATEHASNOBODER));
			vdata.setHeaderWidth(tableEle.getAttributeValue(HEADERWIDTH));
			vdata.setTittleGenerRule(tableEle.getAttributeValue(TITTLEGENERRULE));
			vdata.setConnectPoint(tableEle.getAttributeValue(CONNECTPOINT));
			vdata.setIsGenerateLiteTittle(tableEle.getAttributeValue(ISGENERATELITETITTLE));
			vdata.setMegrePointLose(tableEle.getAttributeValue(MEGREPOINTLOSE));
			vdata.setIsExportHeader(tableEle.getAttributeValue(ISEXPORTHEADER));
			vdata.setIsConvertColToRow(tableEle.getAttributeValue(ISCONVERTCOLTOROW));
			vdata.setIsUseDataBaseMegreRule(tableEle.getAttributeValue(ISUSEDATABASEMEGRERULE));
			vdata.setIsGenerateReportHeader(tableEle.getAttributeValue(ISGENERATEREPORTHEADER));
			vdata.setIsIncludeReportName(tableEle.getAttributeValue(ISINCLUDEREPORTNAME));
			vdata.setIsMegreBody(tableEle.getAttributeValue(ISMEGREBODY));
			vdata.setRefColmun(tableEle.getAttributeValue(REFCOLMUN));
			vdata.setRowStyle(tableEle.getAttributeValue(ROWSTYLE));
			vdata.setSectionName(tableEle.getAttributeValue(SECTIONNAME));
			vdata.setExportName(tableEle.getAttributeValue(EXPORTNAME));
			vdata.setHeaderName(tableEle.getAttributeValue(HEADERNAME));
			vdata.setID(tableEle.getAttributeValue(ID));
			vdata.setStyle(tableEle.getAttributeValue(STYLE));
			vdata.setBackgroundColor(tableEle.getAttributeValue(BACKGROUNDCOLOR));
			vdata.setViewSql(tableEle.getTextTrim());
			vdata.setFillPostion(tableEle.getAttributeValue(FILLPOSTION));
			vdata.setMegreCols(tableEle.getAttributeValue(MEGRECOLS));
			vdata.setConnect(tableEle.getAttributeValue(CONNECT));
			tData.setReportSectionListByViewData(vdata);
		}
		List beforeSql = templateEle.getChildren(BEFORESQL);
		for (Iterator table = beforeSql.iterator(); table.hasNext();) {

			BeforeSqlData bdata = new BeforeSqlData();
			Element tableEle = (Element) table.next();
			bdata.setIsDynamic(tableEle.getAttributeValue(ISDYNAMIC));
			bdata.setFiledList(tableEle.getAttributeValue(BEFOREFILEDLIST));
			bdata.setViewSql(tableEle.getTextTrim());
			bdata.setBackgroundColor(tableEle.getAttributeValue(BACKGROUNDCOLOR));
			bdata.setFillPostion(tableEle.getAttributeValue(FILLPOSTION));
			bdata.setHeaderName(tableEle.getAttributeValue(HEADERNAME));
			bdata.setID(tableEle.getAttributeValue(ID));
			bdata.setConnect(tableEle.getAttributeValue(CONNECT));
			bdata.setMegreCols(tableEle.getAttributeValue(MEGRECOLS));
			bdata.setStyle(tableEle.getAttributeValue(STYLE));
			tData.setBsd(bdata);
			tData.setbefSqlList(bdata);
		}
		List mainInfos = templateEle.getChildren(MAININFO);
		for (Iterator table = mainInfos.iterator(); table.hasNext();) {

			MainInfoData mid = new MainInfoData();
			Element tableEle = (Element) table.next();
			mid.setName(tableEle.getAttributeValue(NAME));
			mid.setVSql(tableEle.getTextTrim());
			tData.setMainInfos(mid);
		}
		return tData;
	}

	/**
	 * 方法名：getXMLTableDataByTableName 描述：根据tableName得到相应配置文件的内容
	 * 
	 * @param realpath
	 *            配置文件路径
	 * @param tableName
	 *            创建时间：2008－11－1 创建地点：略达科技
	 */
	public static ReportInfoData getXMLDataByTemplateId(String realpath, String tid) {
		// this.realpath = realpath;
		if (Templates == null) {// 没有创建HashMap
			getTemplates(realpath, null);// 根据社区缩写取得此社区配置文件中的内容，保存到HashMap中
			return (ReportInfoData) Templates.get(tid);
		} else {// 创建了HashMap
			if (Templates.get(tid) == null) {// 是否存在该表
				System.out.println("viewTableRecord TemplateId为：" + tid + " 不在配置文件中，请查证，或重起服务！！！");
				return null;
			} else {
				return (ReportInfoData) Templates.get(tid);
			}
		}
	}

	public static void reloadTemplates(String realpath, String name) {
		getTemplates(realpath, name);// name=null时全部从新加载，否则只加载name节点对应的信息
	}

}
