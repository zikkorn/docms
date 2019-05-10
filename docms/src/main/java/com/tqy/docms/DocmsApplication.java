package com.tqy.docms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@MapperScan("com.tqy.docms.dao")
@ServletComponentScan("com.tqy.docms.filter")
public class DocmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocmsApplication.class, args);
    }

}
