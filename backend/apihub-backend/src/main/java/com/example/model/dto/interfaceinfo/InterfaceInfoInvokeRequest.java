package com.example.model.dto.interfaceinfo;

import lombok.Data;

import java.io.Serializable;

/**
 * 接口在线调用请求， 前端表单传过来param和body目前只解析json，分别对应Get/Post
 * 前端表单还可以加上些内容，最多做到Apipost那种配置程度
 * 但前端表单应该根据接口接收哪些些参数展示可填入的内容（如下三个），
 * 或者更细致点在这三类不传str而是前端填表传三种json，如：
 * 接口新增时必要参数是id，在线调用前端只需填入一个框
 *
 */
@Data
public class InterfaceInfoInvokeRequest implements Serializable {

    /**
     * 主键
     */
    private Long id;

    /**
     * 用户请求参数：path参数和query应该都一样用json表示
     */
    private String userRequestParams;

    // body ：SDK目前只支持json格式
    private String userRequestBody;

    private String userRequestHeader;


    private static final long serialVersionUID = 1L;
}