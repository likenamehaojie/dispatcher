package com.ldtec.stpm.export.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ldtec.base.DB.DBControl;
import com.ldtec.stpm.fmreport.util.DBUtil;
import com.ldtec.stpm.fmreport.util.DataModel;
import com.ldtec.stpm.fmreport.util.SqlReplaceUseSysStrUtil;

public class GenerExcelDao extends BaseDao {

	private HttpServletRequest request;

	public GenerExcelDao() {
	}

	public GenerExcelDao(HttpServletRequest request) {
		if (request != null)
			this.request = request;
	}

	/**
	 * 获取最大层级
	 *
	 * @param request
	 */
	public int getMaxLevel(int reportId) {
		ResultSet rs = null;
		String sql = "select id,pid,headvalue,leve,custom_col,order_c,ishide\n" + "            from headerinfo h\n"
				+ "               where h.pid = 0\n" + "                   and h.ishide = 0\n"
				+ "                   and h.report_id = ?\n" + "             order  by h.order_c";

		// ps.setInt(2, reportId);
		DBControl db = null;
		try {
			db = new DBControl(request);
			db.prepareDB(sql);

			db.setInt(1, reportId);

			rs = db.preparedQuery();
			int max = 0;

			while (rs.next()) {
				int id = rs.getInt("id");
				// 先判断最深层有多少层
				int maxLeve = getMaxLeve(reportId, id);
				if (maxLeve > max) {
					max = maxLeve;
				}

			}
			return max;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeResultSet(rs);
			db.closePrepared();
			db = null;

		}

		return -1;

	}

	public int getMaxLeve(int reportId, int id) {
		ResultSet rs = null;
		String sql = "with tem_header(id,pid,headervalue,leve) as(\n" + "\n"
				+ "select id ,pid, headvalue,leve from dbo.headerinfo where pid = 0 and report_id = ? and id = ?\n"
				+ "and ishide = 0 \n" + "union all\n"
				+ "select  a.id,a.pid,a.headvalue,a.leve from dbo.headerinfo a ,tem_header b\n" + "where a.pid = b.id\n"
				+ " and a.ishide = 0" + "\n" + "and  a.report_id = ?" + "\n" + ")\n"
				+ "select count(1) from (select t.leve from tem_header t group by t.leve) mm";
		DBControl db = null;
		try {
			db = new DBControl(request);
			db.prepareDB(sql);
			db.setObject(1, reportId);
			db.setObject(2, id);
			db.setObject(3, reportId);
			rs = db.preparedQuery();
			if (rs.next())
				return rs.getInt(1);
			return -1;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeResultSet(rs);
			db.closePrepared();
			db = null;
		}
		return 0;
	}

	/**
	 * 获取元始数据列名对应值
	 *
	 * @param viewSql
	 * @param session
	 * @return
	 */
	public List<Map<String, Object>> queryDataReturnList(String viewSql, int reportId) {
		viewSql = this.replaceSql(viewSql, null);
		ResultSet selectDB = null;
		ResultSetMetaData rsmd;
		DBControl db = new DBControl(request);
		List<Map<String, Object>> _list = new ArrayList<Map<String, Object>>();
		db.prepareDB(viewSql);
		try {
			db.setInt(1, reportId);
			selectDB = db.preparedQuery();
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
			db.closePrepared();
			db = null;
		}
		return null;
	}

	public int getMaxCurrentLeveMegreCell(int id, int reportId, int pid) {
		DBControl db = new DBControl(request);
		ResultSet rs = null;
		String maxCell =

		"with tem_header(id,pid,headervalue,leve) as(\n" + "\n"
				+ "            select id ,pid, headvalue,leve from dbo.headerinfo where pid = ? and report_id = ?  and id =?\n"
				+ " and ishide = 0" + "            union all\n"
				+ "            select  a.id,a.pid,a.headvalue,a.leve from dbo.headerinfo a ,tem_header b\n"
				+ "            where a.pid = b.id\n" + "              and a.ishide = 0"
				+ "             and a.report_id = ?\n" + "\n" + "\n" + "            )\n" + "\n" + "\n"
				+ "            select top 1 aa.a  from (select count(1) a ,leve le from tem_header   group by leve) aa order by aa.le desc";

		try {

			db.prepareDB(maxCell);

			db.setInt(1, pid);
			db.setInt(2, reportId);
			db.setInt(3, id);
			db.setInt(4, reportId);
			rs = db.preparedQuery();
			if (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e1) {
			e1.printStackTrace();
		} finally {
			db.closeResultSet(rs);
			db.closePrepared();
			db = null;

		}
		return 0;
	}

	public void getMax(int id, int pid, int reportId, int leve, Map<String, Integer> moveInfoMap, int currentMaxLeve) {
		/**
		 * 处理多级表头的合并
		 */
		// 但到表头的直接后继表头
		List<Map<String, Object>> outDirAfterRetrunPOJO = getDirAfterRetrunPOJO(id, pid, reportId, leve);
		// 存放直接后继的子头集合
		List<DataModel> listResultSets = new ArrayList<DataModel>();
		for (int m = 0; m < outDirAfterRetrunPOJO.size(); m++) {
			int _id = Integer.parseInt(outDirAfterRetrunPOJO.get(m).get("id").toString());
			int _pid = Integer.parseInt(outDirAfterRetrunPOJO.get(m).get("pid").toString());
			String _headvalue = outDirAfterRetrunPOJO.get(m).get("headervalue").toString();
			int _leve = Integer.parseInt(outDirAfterRetrunPOJO.get(m).get("leve").toString());
			// 如果当前层级不是最深层
			// 判断该表头有没有直接后继节点
			if (_leve < currentMaxLeve) {

				List<Map<String, Object>> dirAfterRetrunPOJO = getDirAfterRetrunPOJO(_id, _pid, reportId, _leve);
				// 如果没有直接后继节点
				if (dirAfterRetrunPOJO != null && dirAfterRetrunPOJO.size() == 0) {

					if (moveInfoMap.get("addOtherCell") == null) {
						moveInfoMap.put("addOtherCell", 0);
						moveInfoMap.put("addOtherCell", moveInfoMap.get("addOtherCell") + 1);
					} else {
						moveInfoMap.put("addOtherCell", moveInfoMap.get("addOtherCell") + 1);
					}

				}

			}
			DataModel dm = new DataModel();
			dm.setId(_id);
			dm.setPid(_pid);
			dm.setHeadvalue(_headvalue);
			dm.setRs(null);
			dm.setConnection(null);
			dm.setReportId(reportId);
			dm.setLeve(_leve);
			dm.setMoveInfoMap(moveInfoMap);
			listResultSets.add(dm);
		}

		/**
		 * 判断该表的最终级别有几列 说明该表的合并列为多少 所有单元格的合并最终是看当前表头开始它的最终有多少个子表头 也就是最后一行
		 */
		if (listResultSets != null && listResultSets.size() > 0) {

			for (int i = 0; i < listResultSets.size(); i++) {
				DataModel dModel = listResultSets.get(i);

				getMax(dModel.getId(), dModel.getPid(), dModel.getReportId(), dModel.getLeve(), dModel.getMoveInfoMap(),
						currentMaxLeve);

			}

		}

	}

	public List<Map<String, Object>> getDirAfterRetrunPOJO(int id, int pid, int reportid, int leve) {

		String viewSql = "select id,pid, headvalue headervalue,leve\n" + "from headerinfo m\n" + "where m.pid = ?\n"
				+ "     and  ishide = 0\n" + "and report_id=?" + "   \n    order by  order_c";
		ResultSet selectDB = null;
		ResultSetMetaData rsmd;
		DBControl db = new DBControl(request);
		List<Map<String, Object>> _list = new ArrayList<Map<String, Object>>();
		db.prepareDB(viewSql);
		try {
			db.setInt(1, id);
			db.setInt(2, reportid);
			selectDB = db.preparedQuery();
			rsmd = selectDB.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (selectDB.next()) {
				int row = selectDB.getRow();
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
			db.closePrepared();
			db = null;
		}
		return null;
	}

	public Map<String, Integer> getHasCustomCol(int reportId, String isUseDataBaseMegerRule) {
		Map<String, Integer> _map = new HashMap<String, Integer>();
		String sqlCount = "select count(1) from headerinfo h where h.report_id = 5 and h.custom_col <> 0 and h.ismegrewithdata =1";
		String sql = "select h.headvalue,h.custom_col from headerinfo h where h.report_id = ? and h.custom_col <> 0 and h.ismegrewithdata =?";
        int isMegreUseDataBaseRule = 1;
        if(isUseDataBaseMegerRule!=null&&isUseDataBaseMegerRule.equals("false")){
        	isMegreUseDataBaseRule = -1;
        }
		DBControl dbControl = new DBControl(request);
		try {
			dbControl.prepareDB(sql);
			dbControl.setInt(1, reportId);
			dbControl.setInt(2, isMegreUseDataBaseRule);
			ResultSet executeQuery = dbControl.preparedQuery();

			while (executeQuery.next()) {
				_map.put(executeQuery.getString(1).trim(), executeQuery.getInt(2));

			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dbControl.closePrepared();
			dbControl = null;
		}

		return _map;
	}

	public String queryData(String tittleGenerRule) {
		
		tittleGenerRule=SqlReplaceUseSysStrUtil.replaceSql(tittleGenerRule, SqlReplaceUseSysStrUtil.getUserSessionByRequest(request));
	DBControl dbControl = new DBControl(request);
	ResultSet selectDB = dbControl.SelectDB(tittleGenerRule);
	try {
		String string ="";
		while(selectDB.next()){
			string= selectDB.getString(1);
			
			
			
		}
		return string;
	} catch (SQLException e) {
	
		e.printStackTrace();
	}finally{
		dbControl.closeResultSet(selectDB);
		dbControl.close();
		dbControl = null;
	}
		return null;
	}
}
