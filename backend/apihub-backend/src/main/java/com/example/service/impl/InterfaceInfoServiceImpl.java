package com.example.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.common.ErrorCode;
import com.example.common.model.domain.InterfaceInfo;
import com.example.exception.BusinessException;
import com.example.mapper.InterfaceInfoMapper;
import com.example.service.InterfaceInfoService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * 接口信息服务实现类
 *
 */
@Service
public class InterfaceInfoServiceImpl extends ServiceImpl<InterfaceInfoMapper, InterfaceInfo>
    implements InterfaceInfoService {

    @Override
    public void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add) {
        if (interfaceInfo == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String name = interfaceInfo.getName();
        // 创建时，not null的字段进行校验，否则抛sql错误
        if (add) {
            if (StringUtils.isAnyBlank(name, interfaceInfo.getUrl(), interfaceInfo.getMethod().toString())) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR);
            }
        }
        // 更新接口时，校验逻辑和add一样也可以
        if (StringUtils.isNotBlank(name) && name.length() > 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "名称过长");
        }
    }
    
}




