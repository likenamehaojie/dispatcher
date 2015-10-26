package com.ldtec.stpm.export.servlet;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
@Controller
public class DemoCont {

	
	
	
	
	@RequestMapping("/dispatcher/tem")
	public ModelAndView demo(){
		System.out.println("123");
		ModelAndView mav = new ModelAndView("report1");
		mav.addObject("table", "Œ“≤Ÿƒ„M");
		return mav;
		
	}
	
	
}
