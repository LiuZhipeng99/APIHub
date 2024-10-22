package com.example.common.model.vo;

import com.example.common.model.domain.InterfaceInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 接口信息封装视图
 *
 * @TableName product
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class InterfaceInfoVO extends InterfaceInfo {

    private static final long serialVersionUID = 1L;

    /**
     * 调用次数
     */
    private Integer totalNum;
}