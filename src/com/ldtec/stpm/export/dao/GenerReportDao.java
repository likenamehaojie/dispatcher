package com.ldtec.stpm.export.dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ldtec.base.DB.DBControl;
import com.ldtec.stpm.login.UserSession;

public class GenerReportDao extends BaseDao {

	public GenerReportDao(HttpServletRequest request) {
		this.request = request;
	}


	
	
	
	

	/**
	 * ��ȡԪʼ����������Ӧֵ
	 *
	 * @param viewSql
	 * @param session
	 * @return
	 */
	public Map<String, Object> queryDataReturnMap(String viewSql) {
		viewSql = this.replaceSql(viewSql, null);
		DBControl db = new DBControl(request);

		ResultSet selectDB = db.SelectDB(viewSql);
		ResultSetMetaData rsmd;
		try {
			rsmd = selectDB.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (selectDB.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					map.put(rsmd.getColumnName(i + 1).toLowerCase(), selectDB.getObject(i + 1));
				}
				return map;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeResultSet(selectDB);
                        db.close();
                        db=null;
		}
		return null;
	}

	/**
	 * 
	 * @param viewSql
	 * @param connectPointSplit 
	 * @return
	 * @throws SQLException
	 */
	public List<List<String>> queryDateReturnConnectList(String []viewSql, String[] connectPointSplit) throws SQLException{
	
		 List<List<List<String>>> allList = new ArrayList<List<List<String>>>();
		 for(int i = 0;i<viewSql.length;i++){
			 allList.add(this.queryDataReturnListWithOutMap(viewSql[i]));
		 }
		 //�����õ���ϵ���߸߶�
		 int maxLength = 0;
		 for(int i = 0;i<allList.size();i++){
			 List<List<String>> list = allList.get(i);
			 if(list==null||list.size()<1){
				 continue;
			 }
			int  currentLength = list.size();
			if(maxLength<currentLength){
				maxLength = currentLength;
			}	 
		 }
			//��ʼ����߶�
		 for(int i = 0;i<allList.size();i++){
			 List<List<String>> list = allList.get(i);
		     int temSize = list.size();
			 if(temSize<maxLength){
				 //�����Ӽ���
				 for (int j = 0;j<maxLength-temSize;j++){
					 int currentHeaderInfo = Integer.parseInt(connectPointSplit[i]);
					 List<String> in = new ArrayList<String>();
					 for(int m = 0;m<currentHeaderInfo;m++){
						in.add("");
					 }
					 list.add(in);
					 
					 
				 }
			 }
			 
		 } 
			 
		 List<List<String>> firstList = allList.get(0);
			//��ʼ��װ����
		 for(int i = 1;i<allList.size();i++){
			 List<List<String>> other         = allList.get(i);
		    //������һ��
			 for(int j = 0;j<firstList.size();j++){
				firstList.get(j).addAll(other.get(j));
				 
				 
			 }  
			 
		 } 
			 
			 
			 return firstList;
			 
			 
			 
			 
			 
		
		
	}
	public List<List<String>> queryDataReturnListWithOutMap(String viewSql){
		viewSql = this.replaceSql(viewSql, null);
		DBControl db = new DBControl(request);
		List<List<String>> outList = new ArrayList<List<String>>();
		ResultSet rs = db.SelectDB(viewSql);
		try {
			while (rs.next()) {
				List<String> innerList = new ArrayList<String>();
				int mm = 1;
				int columnCount = rs.getMetaData().getColumnCount();
				while (mm <= columnCount) {
					System.out.println(rs.getString(mm));
					innerList.add(rs.getString(mm));
					mm++;
				}
				
				
				outList.add(innerList);

			
			}
			return outList;

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			db.closeResultSet(rs);
			db.close();
			db = null;
			
		}
		return null;
	}
	
	/**
	 * �ý�����Ƕ����н���ת��
	 * @param viewSql
	 * @return
	 */
	
	public List<List<String>> queryDataReturnListWithOutMapColumnToRow(String viewSql){
		viewSql = this.replaceSql(viewSql, null);
		DBControl db = new DBControl(request);
		List<String > columnNames = new ArrayList<>();
		List<List<String>> outList = new ArrayList<List<String>>();
		ResultSet rs = db.SelectDB(viewSql);
		
		
		
		try {
			
			int temClumnCount = rs.getMetaData().getColumnCount();
			for(int ss = 1;ss<=temClumnCount;ss++){
				columnNames.add( rs.getMetaData().getColumnName(ss) );
			}
			
			while (rs.next()) {
				List<String> innerList = new ArrayList<String>();
				int mm = 1;
				
				int columnCount = rs.getMetaData().getColumnCount();
				while (mm <= columnCount) {
					
					innerList.add(rs.getString(mm));
					mm++;
				}
				
				
				outList.add(innerList);

			
			}
			List<List<String>> newOutList = new ArrayList<>();
			
			System.out.println(columnNames.toString());
			
			for(int cname = 1;cname<columnNames.size();cname++){
				List<String> _temInnerList   = new ArrayList<>();
				String string = columnNames.get(cname);
				String[] split = string .split("-");
				for (String string2 : split) {
					_temInnerList.add(string2);
				}
		//		_temInnerList.add(columnNames.get(cname));
				System.out.println(cname);
			//��ʼ����outList ��outList�����������ת��
			for(int i = 0;i<outList.size();i++){
				
			      _temInnerList.add( outList.get(i).get(cname) );
					
					
					
				}
							
				
			newOutList.add(_temInnerList);
				
				
			}
			
			
			
			System.out.println(newOutList);
			
			
			return newOutList;

		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			db.closeResultSet(rs);
			db.close();
			db = null;
			
		}
		return null;
	}
	
	
	/**
	 * ��ȡԪʼ����������Ӧֵ
	 *
	 * @param viewSql
	 * @param session
	 * @return
	 */
	public List<Map<String, Object>> queryDataReturnList(String viewSql) {
		viewSql = this.replaceSql(viewSql, null);
		DBControl db = new DBControl(request);
		List<Map<String, Object>> _list = new ArrayList<Map<String, Object>>();
		ResultSet selectDB = db.SelectDB(viewSql);
		ResultSetMetaData rsmd;
		try {
			rsmd = selectDB.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (selectDB.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					map.put(rsmd.getColumnName(i + 1).toLowerCase(), selectDB.getObject(i + 1));
				}
				_list.add(map);
			}
			return _list;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeResultSet(selectDB);
                        db.close();
                        db=null;
		}
		return null;
	}

	public String getReportName(String reportId) {
		DBControl db = new DBControl(request);
		String sql = "select r.report_name  from reportname r where r.id =? ";
		db.prepareDB(sql);
		ResultSet preparedQuery = null;
		try {
			db.setObject(1, reportId);
			preparedQuery = db.preparedQuery();
			if (preparedQuery.next()) {
				return preparedQuery.getString(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeResultSet(preparedQuery);
			db.closePrepared();
                        db=null;
		}

		return null;
	}

	public int generHeaderAndReturnReportId(String bSql) {
		bSql = this.replaceSql(bSql, null);
		System.out.println("ִ�У�bSql:" + bSql);

		ResultSet selectDB = null;
		DBControl db = new DBControl(request);
		try {
		selectDB = db.SelectDB(bSql);
		if(selectDB.next())
				return selectDB.getInt(1);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally{
				db.closeResultSet(selectDB);
				db.close();
				db= null;
				
			}
		return -1;

	}

	
	
	
	public String proBefSql(String bFiledList, String bSql) {
		bSql = this.replaceSql(bSql, null);
		String[] strings = bFiledList.split(",");
		for (int i = 0; i < strings.length; i++) {
			String parameter = request.getParameter(strings[i]);
			bSql.replace("$" + strings[i], parameter);
		}

		return bSql;
	}

	public void deleteHeaderInfo(int _reportIds) {
		DBControl db = new DBControl(request);
		try {
			String sql = "delete from  headerinfo  where report_id = '" + _reportIds + "'";
			String _sql = "delete from  reportname  where id = '" + _reportIds + "'";
			db.ExecuteDB(sql);
			db.ExecuteDB(_sql);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			db.close();
			db = null;

		}

	}


	
}
