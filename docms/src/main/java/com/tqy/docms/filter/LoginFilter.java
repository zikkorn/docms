package com.tqy.docms.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "LoginFilter",urlPatterns = {"/*"})
public class LoginFilter implements Filter {
	
    String NO_LOGIN = "您还未登录";

    String[] includeUrls = new String[]{
    		"/user/login"
    		,"/login.html"};
	
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		HttpSession session = request.getSession(false);
		String uri = request.getRequestURI();
		
		//System.out.println("filter url:"+uri);
		//是否需要过滤
		boolean needFilter = isNeedFilter(uri);
	    if (!needFilter) { //不需要过滤直接传给下一个过滤器
	    	chain.doFilter(req, res);
	    } else { //需要过滤器
	        // session中包含user对象,则是登录状态
	      if(session!=null&&session.getAttribute("user") != null){
	          //System.out.println("user:"+session.getAttribute("user"));
	    	  chain.doFilter(request, response);
	        }else{
	            String requestType = request.getHeader("X-Requested-With");
	            //判断是否是ajax请求
	            if(requestType!=null && "XMLHttpRequest".equals(requestType)){
	                response.getWriter().write(this.NO_LOGIN);
	            }else{
	                //重定向到登录页(需要在static文件夹下建立此html文件)
	                response.sendRedirect(request.getContextPath()+"/login.html");
	            }
	            return;
	        }
	    }
	}
	
	/**
	 * @Description: 是否需要过滤
	 * @param uri
	 */
	public boolean isNeedFilter(String uri) {
	    for (String includeUrl : includeUrls) {
	        if(includeUrl.equals(uri) || uri.startsWith("/assets/page")) {
	            return false;
	        }
	    }
	    return true;
	}
	
}
