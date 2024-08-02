import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import { Input, Select, Checkbox } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import React, { useRef, useState } from 'react';
import type { SortOrder } from 'antd/es/table/interface';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST
} from '@/services/yuapi-backend/interfaceInfoController';
import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields:  API.InterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  /**
    接口添加表单
   * */
  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '接口名称是必填项',
          },
          {
            max: 50,
            message: '接口名称不能超过50个字符',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入接口名称',
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            max: 200,
            message: '描述不能超过200个字符',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入接口描述',
        autoSize: { minRows: 3, maxRows: 6 },
      },
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请求方法是必填项',
          },
        ],
      },
      fieldProps: {
        placeholder: '请选择请求方法',
      },
      renderFormItem: () => (
          <Select placeholder="请选择请求方法">
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            {/*<Option value="PUT">PUT</Option>*/}
            {/*<Option value="DELETE">DELETE</Option>*/}
            {/*<Option value="PATCH">PATCH</Option>*/}
          </Select>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'URL是必填项',
          },
          {
            type: 'url',
            message: '请输入有效的URL',
          },
        ],
      },
      fieldProps: {
        placeholder: '请输入接口URL',
      },
    },
    // {
    //   title: '请求头',
    //   // dataIndex: 'requestHeader',
    //   valueType: 'checkbox',
    //   fieldProps: {
    //     options: [
    //       { label: 'Content-Type', value: 'Content-Type' },
    //       { label: 'Authorization', value: 'Authorization' },
    //       { label: 'Accept', value: 'Accept' },
    //       // 添加更多预定义的请求头选项
    //     ],
    //   },
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '请求头是必填项',
    //       },
    //     ],
    //   },
    //   renderFormItem: () => (
    //       <Checkbox.Group>
    //         <Checkbox value="Content-Type">Content-Type</Checkbox>
    //         <Checkbox value="Authorization">Authorization</Checkbox>
    //         <Checkbox value="Accept">Accept</Checkbox>
    //         {/* 添加更多预定义的请求头选项 */}
    //       </Checkbox.Group>
    //   ),
    // },
    {
      title: '请求头示例',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      fieldProps: {
        placeholder: '请输入请求参数（JSON格式）',
      },
    },
    {
      title: '请求参数示例',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      fieldProps: {
        placeholder: '请输入请求头（JSON格式）',
      },
    },
    {
      title: '响应体示例',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      fieldProps: {
        placeholder: '请输入响应头（JSON格式）',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ? <a
          key="config"
          onClick={() => {
            handleOnline(record);
          }}
        >
          发布
        </a> : null,
        record.status === 1 ? <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button> : null,
        <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listInterfaceInfoByPageUsingGET({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalVisible}
      />
    </PageContainer>
  );
};
export default TableList;
