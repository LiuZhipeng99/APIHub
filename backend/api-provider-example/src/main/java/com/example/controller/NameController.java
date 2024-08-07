package com.example.controller;


import com.example.common.BaseResponse;
import com.example.common.ResultUtils;
import com.example.model.PostBody;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * API接口用例
 * /api/interface1/name/testget 返回请求参数
 * /api/interface1/name/testpost 返回请求参数
 */
@RestController
@RequestMapping("/name")
public class NameController {

    @GetMapping("/testget")
    public BaseResponse<String> getNameByGet(@RequestParam String var, HttpServletRequest request) {
//        TODO 理解代码含义
        System.out.println(request.getHeader("api-gateway"));

        System.out.println("api testget recive ");
        String result = "GET param:" + var;
        return ResultUtils.success(result);
    }


    @PostMapping("/testpost")
    public BaseResponse<String> getUsernameByPost(@RequestBody PostBody body, HttpServletRequest request) {
        System.out.println("api testpost recive ");
        String result = "POST body:" + body.toString();
        System.out.println(result);
        return ResultUtils.success(result);
    }
}
