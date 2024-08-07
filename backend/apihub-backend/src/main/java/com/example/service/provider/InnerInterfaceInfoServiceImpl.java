package com.example.service.provider;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.common.ErrorCode;
import com.example.common.model.domain.InterfaceInfo;
import com.example.common.service.InnerInterfaceInfoService;
import com.example.exception.BusinessException;
import com.example.mapper.InterfaceInfoMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;
import java.util.Objects;

/**
 * 内部接口服务实现类
 */
@DubboService
public class InnerInterfaceInfoServiceImpl implements InnerInterfaceInfoService {

    @Resource
    private InterfaceInfoMapper interfaceInfoMapper;

    @Override
    public InterfaceInfo getInterfaceInfo(String url) {
        if (StringUtils.isAnyBlank(url)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<InterfaceInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("url", url);
//        queryWrapper.eq("method", method);
        return interfaceInfoMapper.selectOne(queryWrapper);
    }

}
