package com.ldtec.stpm.fmreport.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.ldtec.stpm.login.UserSession;

public class SqlReplaceUseSysStrUtil {

	
	
	
	
	

public static  String replaceSql(String sql,UserSession session){

		System.out.println("beforeccSql:"+sql);
		System.out.println("getCommunityName:"+session.getCommunityName());
        sql=replace(sql,"$SHORTNAME",session.getCommunityShortName());
        sql=replace(sql,"$COMMUNITYID",String.valueOf(session.getCommunityId()));
        sql=replace(sql,"$COMMUNITYNAME",session.getCommunityName());
        sql=replace(sql,"$COMMUNITYTYPE",String.valueOf(session.getCommunityType()));
        sql=replace(sql,"$WORKGROUPID",String.valueOf(session.getBranchId()));
        sql=replace(sql,"$WORKGROUP",session.getBranchName());
        sql=replace(sql,"$USERID",String.valueOf(session.getUserId()));
        sql=replace(sql,"$USERNAME",String.valueOf(session.getLoginName()));
        sql=replace(sql,"$REALNAME",String.valueOf(session.getRealName()));
        sql=replace(sql,"$ROLEID",String.valueOf(session.getRoleId()));
        sql=replace(sql,"$COMMUNITYTRADETYPE",session.getTradeType());

        System.out.println("afterccSql:"+sql);
      return sql;
	}
	
	
	
	public static UserSession getUserSessionByRequest(HttpServletRequest request){
		HttpSession sessions = request.getSession();
		UserSession session=  (UserSession) sessions.getAttribute("userSession");
		return session;
	}
	
	
	public static String replace(String str, String src, String dest) {

        if (str == null || str.length() == 0 || src == null
            || src.length() == 0 || dest == null
            || str.length() < src.length()) {
            return str;
        }
        StringBuffer sb = new StringBuffer();
        int strL = str.length();
        int srcL = src.length();
        int destL = dest.length();
        int compareL = strL - srcL + 1;
        boolean equals = false;
        int position = 0;
        for (int i = 0; i < compareL; i++) {
            equals = false;
            if (str.charAt(i) == src.charAt(0)) {
                position = i + 1;
                // boolean equals = true ;
                if (srcL == 1) {
                    equals = true;
                }
                for (int j = 1; j < srcL; position++, j++) {
                    if (str.charAt(position) == src.charAt(j)) {
                        equals = true;
                    } else {
                        equals = false;
                        break;
                    }
                }
                if (equals) {
                    sb.append(dest);
                    i += srcL - 1;
                } else {
                    sb.append(str.charAt(i));
                }
            } else {
                sb.append(str.charAt(i));
            }
        }
        if (!equals) {
            for (int i = compareL; i < strL; i++) {
                sb.append(str.charAt(i));
            }
        } else {
            for (int i = position; i < strL; i++) {
                sb.append(str.charAt(i));
            }
        }
        return sb.toString();
    }
	
	
	
}
