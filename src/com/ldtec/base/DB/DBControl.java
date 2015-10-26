package com.ldtec.base.DB;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.ldtec.utils.DBCP.ConnectionPool;
import com.ldtec.base.share.PubFunction;

import javax.servlet.ServletContextEvent;

public class DBControl {
    private ConnectionPool APool = null;
    private GetDbPool AgetDbPool = null;
    private PubFunction pf = new PubFunction();
    
    
    
    /**
     * 静态变量
     */
    private static GetDbPool sAgetDbPool = null;
    private static ConnectionPool sAPool = null;
    /* private HttpSession ASession=null;*/

    private ServletContext application = null;
    private Statement Stmt = null;
    private PreparedStatement pstmt = null;
    
    
    
    

    /**
     * 从oracle取数据构造函数
     * @param request HttpServletRequest
     */
    
    
    
    public DBControl(){
    	File f =  new File("res/dbPool.conf");
    	if(sAgetDbPool==null){
    		String sPath = f.getAbsolutePath();
    		 System.out.println(pf.getDateTime() + ":" + sPath);
    		 sAgetDbPool = new GetDbPool(sPath);
    		
    	}
    	sAPool = sAgetDbPool.getDbPool("SISDB");
    	   if (sAPool == null) {
               System.out.println(pf.getDateTime() + ":" + "sAPool is null");
           }
           try {
               Stmt = sAPool.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                       ResultSet.CONCUR_READ_ONLY);
           } catch (Exception e) {
               e.printStackTrace();
           }
    	
    }
    
    
    
    public DBControl(HttpServletRequest request) {
    	this();
    	if(request==null){
    	}else{
        application = request.getSession().getServletContext();
        AgetDbPool = null;
   
        if (application != null) {
            this.AgetDbPool = (GetDbPool) application.getAttribute("SISDB");
        }
        if (this.AgetDbPool == null) {
            String sPath = request.getSession().getServletContext().getRealPath(
                    "/WEB-INF/conf/") + "\\dbPool.conf";
            System.out.println(pf.getDateTime() + ":" + sPath);
            this.AgetDbPool = new GetDbPool(sPath);
            application.setAttribute("SISDB", this.AgetDbPool);
        }
        this.APool = this.AgetDbPool.getDbPool("SISDB");
        if (APool == null) {
            System.out.println(pf.getDateTime() + ":" + "APool is null");
        }
        try {
            Stmt = APool.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    	}
    }

    public DBControl(ServletContextEvent event) {
        application = event.getServletContext();
        AgetDbPool = null;
        if (application != null) {
            this.AgetDbPool = (GetDbPool) application.getAttribute("SISDB");
        }
        if (this.AgetDbPool == null) {
            String sPath = application.getRealPath(
                    "/WEB-INF/conf/") + "\\dbPool.conf";
                       System.out.println(sPath);
            this.AgetDbPool = new GetDbPool(sPath);
            application.setAttribute("SISDB", this.AgetDbPool);
        }
        this.APool = this.AgetDbPool.getDbPool("SISDB");
        if (APool == null) {
            System.out.println("APool is null");
        }
        try {
            Stmt = APool.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                                         ResultSet.CONCUR_READ_ONLY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public boolean delThread(){
      try {
        //this.APool.join();
        this.APool.interrupt();
        return true;
      }catch (Exception e) {
        return false;
      }
    }
    //重载构造函数,两个连接池的情形

    public DBControl(HttpServletRequest request, String poolName) {
        application = request.getSession().getServletContext();
        AgetDbPool = null;
        if (application != null) {
            this.AgetDbPool = (GetDbPool) application.getAttribute(poolName);
        }
        if (this.AgetDbPool == null) {
            String sPath = request.getSession().getServletContext().getRealPath(
                    "/WEB-INF/conf/") + "\\dbPool.conf";
            System.out.println(pf.getDateTime() + ":" + sPath);
            this.AgetDbPool = new GetDbPool(sPath);
            application.setAttribute(poolName, this.AgetDbPool);
        }
        this.APool = this.AgetDbPool.getDbPool(poolName);
        if (APool == null) {
            System.out.println(pf.getDateTime() + ":" + "APool is null");
        }
        try {
            Stmt = APool.createStatement();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /* public Connection getConnection() {
       try {
         return APool.getConnection();
       }catch(Exception e) {
         return null;
       }
     }*/



    /**
     * 用于连接数据库
     * @param sSql 查询的Sql语句;
     * @return 返回一个查询的结果集;
     */
    public ResultSet SelectDB(String sSql) {
        ResultSet aRS = null;
        try {
            System.out.println(pf.getDateTime() + ":" + "SelectDB sql:" + sSql);
            if (Stmt == null) {
                this.getNewStatement();
            }
            aRS = Stmt.executeQuery(sSql);
        } catch (Exception et) {
            System.out.println(pf.getDateTime() + ":" + "Error sql:" + sSql);
            System.out.println(pf.getDateTime() + ":" + "Error In DB SelectDB：" + et.toString());
        }
        return aRS;
    }

    /**
     * 执行SQL语句：update、delete、insert into
     * @param sExceSql 要执行的sExceSql语句
     * @return 如果成功执行，返回true，否则，返回false;
     */
    public boolean ExecuteDB(String sExceSql) {
        boolean bReturn = false;
        try {
            System.out.println(pf.getDateTime() + ":" + "ExecuteDB sql:" + sExceSql);
            if (Stmt == null) {
                this.getNewStatement();
            }
            Stmt.execute(sExceSql);
            bReturn = true;
        } catch (Exception et) {
            System.out.println(pf.getDateTime() + ":" + "Error sql:" + sExceSql);
            System.out.println(pf.getDateTime() + ":" + "Error In DB ExecuteDB：" + et.toString());
        }
        return bReturn;
    }

    /**
     * 专门针对select * from table类型的SQL语句进行统计记录数
     * @param sDB 数据库
     * @param sCountSql 统计的语句
     * @return 记录数
     */
    public int CountDBBySelect(String sCountSql) {
        int iC = 0;
        try {
            if (Stmt == null) {
                this.getNewStatement();
            }
            ResultSet aRS = Stmt.executeQuery(sCountSql);
            aRS.beforeFirst();
            aRS.last();
            iC = aRS.getRow();
            aRS.close();
            aRS = null;
        } catch (Exception et) {
            System.out.println(pf.getDateTime() + ":" + "Error sql:" + sCountSql);
            System.out.println(pf.getDateTime() + ":" + "Error In DB CountDBBySelect：" + et.toString());
        }
        return iC;
    }

    /**
     * 专门针对select count(*) from table类型的SQL语句进行统计记录数
     * @param sDB 数据库
     * @param sCountSql 统计的语句
     * @return 记录数
     */
    public int countRow(String sCountSql) {
        ResultSet aRS = null;
        int iC = 0;
        try {
            System.out.println(pf.getDateTime() + ":" + "countRow sql:" + sCountSql);
            //if(Stmt==null)this.getNewStatement();
            aRS = Stmt.executeQuery(sCountSql);
            if (aRS.next()) {
                iC = aRS.getInt(1);
            }
        } catch (Exception et) {
            try {
                this.getNewStatement();
                aRS = Stmt.executeQuery(sCountSql);
                if (aRS.next()) {
                    iC = aRS.getInt(1);
                }
            } catch (Exception e) {
                System.out.println(pf.getDateTime() + ":" + "Error sql:" + sCountSql + " Stmt = " + Stmt);
                System.out.println(pf.getDateTime() + ":" + "Error In DB CountDBBySelect：" + e.toString());
                e.printStackTrace();
            }
        } finally {
            if (aRS != null) {
                try {
                    aRS.close();
                } catch (Exception e) {}
            }
            aRS = null;
            return iC;
        }
    }

    /** 关闭Statement */
    public void close() {
        if (Stmt != null) {
            try {
                //System.out.println(pf.getDateTime() + ":" + "close Statements !!!!!!!!!!!!!!!");
                Stmt.close();
                Stmt = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void addBatch(String strSql) throws SQLException {
        if (Stmt == null) {
            if (APool != null) {
                try {
                    Stmt = APool.createStatement();
                } catch (Exception et) {
                    et.printStackTrace();
                }
            } else {
                System.out.println(pf.getDateTime() + ":" + " Error:连接池为Null,请检查路径或配置文件是否正确!");
                return;
            }
        }
        Stmt.addBatch(strSql);
    }

    public int[] PreparedExeBatch() {
        int[] iResult = null;
        try {
            System.out.println(pf.getDateTime() + ":" + "PreparedExeBatch !");
            iResult = pstmt.executeBatch();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
//            this.closePrepared();
        }
        return iResult;
    }

    public boolean perExecuteDB(String sExceSql) {
        boolean bReturn = false;
        try {
            System.out.println(pf.getDateTime() + ":" + "perExecuteDB sql:" + sExceSql);
            pstmt.execute(sExceSql);
            bReturn = true;
        } catch (Exception et) {
            System.out.println(pf.getDateTime() + ":" + "***********有异常******************");
            et.printStackTrace();
//	      System.out.println("Error sql:" + sExceSql);
//	      System.out.println("Error In DB ExecuteDB：" + et.toString());
        }
        return bReturn;
    }

    public void prepareDB(String sSql) {
        if (APool != null) {
            try {
                System.out.println(pf.getDateTime() + ":" + "prepareDB sql:" + sSql);
                pstmt = APool.prepareStatement(sSql);
            } catch (Exception et) {
                et.printStackTrace();
            }
        } else if(sAPool!=null){
        	
        	   try {
                   System.out.println(pf.getDateTime() + ":" + "prepareDB sql:" + sSql);
                   pstmt = sAPool.prepareStatement(sSql);
               } catch (Exception et) {
                   et.printStackTrace();
               }
        	
        }else {
            System.out.println(pf.getDateTime() + ":" + " Error:连接池为Null,请检查路径或配置文件是否正确!");
        }
    }

    public void prepareDBCuncurUpdatAble(String sSql) {
        if (APool != null) {
            try {
                System.out.println(pf.getDateTime() + ":" + "prepareDBCuncurUpdatAble sql:" + sSql);
                pstmt = APool.prepareStatement(sSql,
                        ResultSet.TYPE_SCROLL_SENSITIVE,
                        ResultSet.CONCUR_UPDATABLE);
            } catch (Exception et) {
                et.printStackTrace();
            }
        } else {
            System.out.println(pf.getDateTime() + ":" + " Error:连接池为Null,请检查路径或配置文件是否正确!");
        }
    }

    /*
     * 取得默认数据库连接
     */
    public Connection getConnection() {
        Connection conn = null;
        if (APool != null) {
            try {
                System.out.println(pf.getDateTime() + ":" + "getConnection !!!!!!!!!!!!!!!");
                conn = APool.getConnection();
            } catch (Exception et) {
                et.printStackTrace();
            }
        }else if(sAPool!=null){
        	  try {
                  System.out.println(pf.getDateTime() + ":" + "getConnection !!!!!!!!!!!!!!!");
                  conn = sAPool.getConnection();
              } catch (Exception et) {
                  et.printStackTrace();
              }
        } else {
            System.out.println(pf.getDateTime() + ":" + " Error:连接池为Null,请检查路径或配置文件是否正确!");
        }
        return conn;
    }

    public int prepareCount() {
        int i = 0;
        ResultSet rs = null;
        try {
            System.out.println(pf.getDateTime() + ":" + "prepareCount() !!!!!!!!!!!!!!!");
            rs = pstmt.executeQuery();
            if (rs.next()) {
                i = rs.getInt(1);
            }
        } catch (Exception et) {
            et.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
                rs = null;
            }

            this.closePrepared();
        }
        return i;
    }

    public boolean preparedExeDB() {
        boolean isSuc = true;
        try {
            System.out.println(pf.getDateTime() + ":" + "preparedExeDB() !!!!!!!!!!!!!!!");
            pstmt.execute();
        } catch (Exception e) {
            e.printStackTrace();
            isSuc = false;
        } finally {
            this.closePrepared();
        }
        return isSuc;
    }

    public int preparedExeUpdate() {
        int count = 0;
        try {
            System.out.println(pf.getDateTime() + ":" + "preparedExeUpdate() !!!!!!!!!!!!!!!");
            count = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
//	    finally {
//	      this.closePrepared();
//	    }
        return count;
    }

    /**
     * 关闭Statement
     */
    public void closePrepared() {
        if (pstmt != null) {
            try {
                System.out.println(pf.getDateTime() + ":" + "close PreparedStatements !!!!!!!!!!!!!!!");
                pstmt.close();
                pstmt = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 取得结果集
     *
     * @return
     * @throws SQLException
     */
    public ResultSet preparedQuery() throws SQLException {
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public void preparedAddBatch() throws SQLException {
        pstmt.addBatch();
    }

    public void preparedClearBatch() throws SQLException {
        pstmt.clearBatch();
    }

    public void preparedClearParameters() throws SQLException {
        pstmt.clearParameters();
    }

    /**
     * 设置参数
     *
     * @param parameterIndex
     * @param x
     * @throws SQLException
     */
    public void setString(int parameterIndex, String x) throws SQLException {
        pstmt.setString(parameterIndex, x);
    }

    /**
     * 设置Object类型的参数
     *
     * @param parameterIndex
     * @param paramValue
     * @throws SQLException
     *
     * @author guyang 2005-12-02
     */
    public void setObject(int parameterIndex, Object paramValue) throws
            SQLException {
        pstmt.setObject(parameterIndex, paramValue);
    }

    /**
     * 设置short类型的参数
     *
     * @param parameterIndex
     * @param paramValue
     * @throws SQLException
     *
     * @author guyang
     */
    public void setShort(int parameterIndex, short paramValue) throws
            SQLException {
        pstmt.setShort(parameterIndex, paramValue);
    }

    public void setInt(int parameterIndex, int x) throws SQLException {
        pstmt.setInt(parameterIndex, x);
    }

    public void setClob(int parameterIndex, Clob x) throws SQLException {
        pstmt.setClob(parameterIndex, x);
    }

    public void setFloat(int parameterIndex, float x) throws SQLException {
        pstmt.setFloat(parameterIndex, x);
    }

    public void setDate(int parameterIndex, Date x) throws SQLException {
        pstmt.setDate(parameterIndex, x);
    }

    public void setDouble(int parameterIndex, double x) throws SQLException {
        pstmt.setDouble(parameterIndex, x);
    }

    public void setLong(int parameterIndex, long x) throws SQLException {
        pstmt.setLong(parameterIndex, x);
    }

    /** 关闭Statement */
    public void closeStatement(Statement s) {
        if (s != null) {
            try {
                s.close();
                s = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /** 关闭ResultSet */
    public void closeResultSet(ResultSet r) {
        if (r != null) {
            try {
                r.close();
                r = null;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void getNewStatement() {
        try {
            System.out.println(pf.getDateTime() + ":" + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            Stmt = APool.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    /**
	 * 功能：执行带占位符的SQL查询 查询结果为List<Map<String,Object>>
	 * 
	 * @入参： sql：sql查询语句
	 * @入参： args:查询语句中查询条件的值
	 * @出参： List<Map<String, Object>>:List
	 */
	public  List<Map<String, Object>> getMapListBySQL(String sql,
			Object[] args) {
		List<Object> values = null;
		if (args != null) {
			values = new ArrayList<Object>(args.length + 2);
			for (Object arg : args) {
				values.add(arg);
			}
		} else {
			values = new ArrayList<Object>(2);
		}
		// log.error("BaseDao.getMapListBySQL执行的SQL"+sql);
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 300);
		pagingSelect.append(sql);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			
			pstmt = conn.prepareStatement(pagingSelect.toString(),
					ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
			if (values != null) {
				for (int i = 0; i < values.size(); i++) {
					pstmt.setObject(i + 1, values.get(i));
				}
			}
			rs = pstmt.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (rs.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				for (int i = 0; i < columnCount; i++) {
					map.put(rsmd.getColumnName(i + 1), rs.getObject(i + 1));

				}
				mapList.add(map);
			}
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		} finally {
			
			closeResultSet(rs);
			closeStatement(pstmt);
		
		}
		return mapList;
	}
    
    
    
    
    
}
