package com.ldtec.stpm.export.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.GenericServlet;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.ldtec.base.share.PubFunction;
import com.ldtec.stpm.login.UserSession;

public class ServletToBeanProxy extends GenericServlet {  
	private static final String CONTENT_TYPE = "text/html; charset=GBK";
    private Servlet proxy;//����Servlet  
    private  static  WebApplicationContext wac =   null;
      
    @Override  
    public void init() throws ServletException {  
        super.init();  
        if(wac==null){
         wac =   
            WebApplicationContextUtils.getRequiredWebApplicationContext(getServletContext()); //��ʼ��Spring����  
        }
    
    }  
  
    @Override  
    public void service(ServletRequest arg0, ServletResponse arg1)  
            throws ServletException, IOException {  
    	
    	
    		HttpServletRequest request = (HttpServletRequest) arg0;
    		HttpServletResponse response = (HttpServletResponse) arg1;
    		response.setContentType(CONTENT_TYPE);
    		response.setCharacterEncoding("GBK");
    		HttpSession session = request.getSession();
    		PrintWriter out = null;
    		UserSession info = (UserSession) session.getAttribute("userSession");
    		if ((info == null || "".equals(info))) {
    			out = response.getWriter();
    			out.println("<script language='javascript'>alert('����û�е�½���ʺ����ù��ã������µ�½');parent.parent.location.href='adminlogin.do?action=loginForm';</script>");
    		} else {
    			String ITNO = request.getParameter("ITNO");
    			if ((ITNO == null || ITNO.equals("null"))) {
    				out = response.getWriter();
    				out.println("<script language='javascript'>alert('ȱ�ٲ���ITNO������ϵͳ����Ա��ϵ��');</script>");
    			}
    			PubFunction pf = new PubFunction();
    			out = response.getWriter();
				if (pf.hasPurview(info, ITNO, 2, request)) {
					  String parameter = request.getParameter("urlMapping");
			    		this.proxy = (Servlet)wac.getBean(parameter);
			    	    proxy.init(getServletConfig());//���ó�ʼ��������ServletConfig����Bean  
			            proxy.service(arg0, arg1);//��service�����е���bean��service������servlet����ݿͻ�������ȥ������Ӧ�����󷽷���Get/Post��  
				} else {
					out.println("<script language='javascript'>location.href='adminlogin.do?action=noPurview';</script>");
				}
    		}
    		
    		
    		
    		
    		
    		
    		
    		
    		
    	  
    }  
} 
