package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DataSourceChecker {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void checkDataSource() {
        try {
            jdbcTemplate.execute("SELECT 1");
            System.out.println("************ Database connection is successful.************");
        } catch (Exception e) {
            System.err.println("************ Database connection failed: " + e.getMessage());
            // Optionally, you can terminate the application if the connection fails
            System.exit(1);
        }
    }
}
