package com.ldtec.stpm.aop;

import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.Servlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.ldtec.base.share.PubFunction;
import com.ldtec.stpm.login.UserSession;

@Aspect
@Component
public class SecurityAop {
	@Resource
	HttpServletRequest request;
	@Resource
	HttpServletResponse response;
	private static final String CONTENT_TYPE = "text/html; charset=GBK";
//	@Around("execution(* org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(..))")   
	@Around("execution(* com.ldtec.stpm.web.*.*(..))")   
	//@Around("execution(* com.ldtec.stpm.export.servlet.*.*(..))")   
	    public Object doBasicProfiling(ProceedingJoinPoint pjp) throws Throwable{  
		Object obj=null;
		HttpSession session = request.getSession();
		response.setContentType(CONTENT_TYPE);
		response.setCharacterEncoding("GBK");
		PrintWriter out = null;
		UserSession info = (UserSession) session.getAttribute("userSession");
		if ((info == null || "".equals(info))) {
			out = response.getWriter();
			out.println("<script language='javascript'>alert('您还没有登陆或帐号闲置过久！请重新登陆');parent.parent.location.href='/adminlogin.do?action=loginForm';</script>");
		    return null;
		} else {
			String ITNO = request.getParameter("ITNO");
			if ((ITNO == null || ITNO.equals("null"))) {
				out = response.getWriter();
				out.println("<script language='javascript'>alert('缺少参数ITNO！请与系统管理员联系！');</script>");
				return null;
			}
			PubFunction pf = new PubFunction();
			out = response.getWriter();
			if (pf.hasPurview(info, ITNO, 2, request)) {
				  String parameter = request.getParameter("urlMapping");
		    	obj = 	pjp.proceed();
			} else {
				out.println("<script language='javascript'>location.href='adminlogin.do?action=noPurview';</script>");
				return null;
			}
		}
		
		
	        return obj;  
	    }  
	
}
