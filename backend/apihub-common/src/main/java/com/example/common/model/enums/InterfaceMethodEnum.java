package com.example.common.model.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 接口调用方法枚举
 *
 */
public enum InterfaceMethodEnum {
    GET("get", 0),
    POST("post", 1),
    PUT("put", 2),
    DELETE("delete", 3);
    private final String text;

    private final int value;
    InterfaceMethodEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<Integer> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    public int getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
