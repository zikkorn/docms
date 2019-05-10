package com.tqy.docms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	
	/**
	 * 登录
	 * @return
	 */
    @RequestMapping("/login")
    public String login(){
        return "pages/login";
    }

	/**
	 * 首页
	 * @return
	 */
    @RequestMapping("/index")
    public String index(){
        return "pages/index";
    }
    
    /**
     * 项目管理-超级用户
     * @return
     */
    @RequestMapping("/proManage")
    public String proManage(){
        return "pages/proManage";
    }
    
    /**
     * 项目管理-普通用户
     * @return
     */
    @RequestMapping("/commonManage")
    public String commonManage(){
        return "pages/commonManage";
    }
    
    /**
     * 项目查询
     * @return
     */
    @RequestMapping("/proInquiry")
    public String proInquiry(){
        return "pages/proInquiry";
    }
    
    /**
     * 文档查询
     * @return
     */
    @RequestMapping("/docManage")
    public String docManage(){
        return "pages/docManage";
    }
    
    /**
     * 日常办公
     * @return
     */
    @RequestMapping("/dailyOffice")
    public String dailyOffice(){
        return "pages/dailyOffice";
    }
    
    /**
     * 干部个人信息管理
     * @return
     */
    @RequestMapping("/pimoc")
    public String pimoc(){
        return "pages/pimoc";
    }
    
    /**
     * 专家资讯组信息
     * @return
     */
    @RequestMapping("/iotge")
    public String iotge(){
        return "pages/iotge";
    }
    
    /**
     * 配套厂家信息
     * @return
     */
    @RequestMapping("/smi")
    public String smi(){
        return "pages/smi";
    }
    
    /**
     * 装备手册信息
     * @return
     */
    @RequestMapping("/emi")
    public String emi(){
        return "pages/emi";
    }
    
    /**
     * 经费与拨付
     */
    @RequestMapping("/funds")
    public String funds(){
        return "pages/funds";
    }
    
    /**
             * 信息交互
     * @return
     */
    @RequestMapping("/infoMutual")
    public String infoMutual(){
        return "pages/infoMutual";
    }
    
    /**
     * 共享资料
     * @return
     */
    @RequestMapping("/sharingData")
    public String sharingData(){
        return "pages/sharingData";
    }
    
    /**
     * 用户中心
     * @return
     */
    @RequestMapping("/userCente")
    public String userCente(){
        return "pages/userCente";
    }
    
    
    @RequestMapping("/sq")
   	@ResponseBody
       public String test(){
   		return "test success!";
   	}
}
