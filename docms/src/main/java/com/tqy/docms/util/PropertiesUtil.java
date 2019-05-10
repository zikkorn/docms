package com.tqy.docms.util;

import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtil {
	
	public static String
	getProperties(String key) {
		InputStream is = null;
		Properties p = new Properties();
		try {
			is = PropertiesUtil.class.getClassLoader().getResourceAsStream("path.properties");
			p.load(is);
			return p.get(key).toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		System.out.println(getProperties("path"));
	}

}
