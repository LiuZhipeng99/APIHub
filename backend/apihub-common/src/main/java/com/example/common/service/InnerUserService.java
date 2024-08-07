package com.example.common.service;

import com.example.common.model.domain.User;

/**
 * @description 针对表【user(用户)】的数据库操作Service
 */
public interface InnerUserService {
    /**
     * 根据 accessKey 查 user
     *
     * @param accessKey
     * @return
     */
    User getInvokeUser(String accessKey);
}
