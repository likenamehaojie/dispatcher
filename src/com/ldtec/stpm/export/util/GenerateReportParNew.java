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
	// �޲ι�
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


	private static String HEADERINFO = "headerinfo";

	private static String SECTION = "section";// ����Ƭ����Ϣ

	private static String BEFORESQL = "beforeSql";// ����ǰ��ִ��SQL

	private static String BEFOREFILEDLIST = "befFileList";

	private static String SECTIONNAME = "sectionName";

	private static String ISDYNAMIC = "isDynamic";

	private static String CONNECT = "connect";// ��ͷ��Ϣ�ͱ�������Ϣ����������

	private static String EXPORTNAME = "exportName";

	private static String MEGRECOLS = "megreCols";

	private static String REPORTID = "reportId";

	private static String MAININFO = "mainInfo";

	private static String NAME = "name";

	private static HashMap WfTableTemplates = null; // ����ÿ�����������ļ�����

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
	/**
	 * ��������templates
	 * 
	 * @param realpath
	 *
	 */

	private static void getWfTableTemplates(String realpath, String name) {
		try {
			String _name = "reportInfo";
			SAXBuilder builder = new SAXBuilder();
			Element root = null;

			String path = realpath + "\\WEB-INF\\conf\\" + _name + ".xml";
			System.out.println(path + "<--");
			Document doc = builder.build(new File(path));
			root = doc.getRootElement();
			if (WfTableTemplates == null)
				WfTableTemplates = new HashMap();
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
				WfTableTemplates.put(wtName, initWFTableTemplateData(templateEle, wtName));
			else {
				if (name.equals(wtName)) {
					WfTableTemplates.put(wtName, initWFTableTemplateData(templateEle, wtName));
					System.out.println("VIEWDOC��ִ�и��£�");
					break;
				}
			}
		}
		if (f)
			System.out.println("VIEWDOCִ��ȫ�����أ�");
	}

	private static ReportInfoData initWFTableTemplateData(Element templateEle, String wtName) {
		ReportInfoData tData = new ReportInfoData();
		tData.setTId(wtName);
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
			vdata.setMegrePointLose(tableEle.getAttributeValue(MEGREPOINTLOSE));
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
	 * ��������getXMLTableDataByTableName ����������tableName�õ���Ӧ�����ļ�������
	 * 
	 * @param realpath
	 *            �����ļ�·��
	 * @param tableName
	 *            ����ʱ�䣺2008��11��1 �����ص㣺�Դ�Ƽ�
	 */
	public static ReportInfoData getXMLTableDataByTemplateId(String realpath, String tid) {
		// this.realpath = realpath;
		if (WfTableTemplates == null) {// û�д���HashMap
			getWfTableTemplates(realpath, null);// ����������дȡ�ô����������ļ��е����ݣ����浽HashMap��
			return (ReportInfoData) WfTableTemplates.get(tid);
		} else {// ������HashMap
			if (WfTableTemplates.get(tid) == null) {// �Ƿ���ڸñ�
				System.out.println("viewTableRecord TemplateIdΪ��" + tid + " ���������ļ��У����֤����������񣡣���");
				return null;
			} else {
				return (ReportInfoData) WfTableTemplates.get(tid);
			}
		}
	}

	public static void reloadWfTableTemplates(String realpath, String name) {
		getWfTableTemplates(realpath, name);// name=nullʱȫ�����¼��أ�����ֻ����name�ڵ��Ӧ����Ϣ
	}

}
