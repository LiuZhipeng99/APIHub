package com.example.common.service;

import com.example.common.model.domain.InterfaceInfo;

/**
 * @description 针对表【interface_info(接口信息)】的数据库操作Service
 */
public interface InnerInterfaceInfoService {
    /**
     * 从数据库中查询模拟接口是否存在（请求路径、请求方法、请求参数）
     */
    InterfaceInfo getInterfaceInfo(String url);
}
