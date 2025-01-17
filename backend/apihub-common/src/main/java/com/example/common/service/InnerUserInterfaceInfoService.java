package com.example.common.service;


/**
 * @description 针对表【user_interface_info(用户调用接口关系)】的数据库操作Service
 */
public interface InnerUserInterfaceInfoService {
    /**
     * 调用接口统计
     *
     * @param interfaceInfoId
     * @param userId
     * @return
     */
    boolean invokeCount(long interfaceInfoId, long userId);


    /**
     * 判断能否调用 By 查询剩余可调用次数 With interfaceInfoId & userId
     *
     * @param interfaceInfoId
     * @param userId
     * @return
     */
    boolean canInvoke(long interfaceInfoId, long userId);
}
