package com.ldtec.stpm.fmreport.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtil {
      private static String url="jdbc:sqlserver://localhost:1433; DatabaseName = likename";
	 //  private static String url="jdbc:sqlserver://192.168.31.181:1433; DatabaseName = tabDB";
      private static String user="sa";
      private static String password="Yc123!";
      private static String driverClass = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

	static{
		try {
			Class.forName(driverClass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		}

	public static void main(String [] args ) throws SQLException{
		Connection connection = getConnection();

		System.out.println(connection);
	}
	 public static Connection getConnection() throws SQLException
	 {
	  return DriverManager.getConnection(url,user,password);
	 }

	     /**
	      * ÊÍ·Å×ÊÔ´
	      * @param conn
	      * @param pstmt
	      * @param rs
	      */
	     public static void closeResources(Connection conn,PreparedStatement pstmt,ResultSet rs) {
	         if(null != rs) {
	             try {
	                 rs.close();
	             } catch (SQLException e) {
	                 e.printStackTrace();
	                 throw new RuntimeException(e);
	             } finally {
	                 if(null != pstmt) {
	                     try {
	                         pstmt.close();
	                     } catch (SQLException e) {
	                         e.printStackTrace();
	                         throw new RuntimeException(e);
	                     } finally {
	                         if(null != conn) {
	                             try {
	                                 conn.close();
	                             } catch (SQLException e) {
	                                 e.printStackTrace();
	                                 throw new RuntimeException(e);
	                             }
	                         }
	                     }
	                 }
	             }
	         }
	     }


}
