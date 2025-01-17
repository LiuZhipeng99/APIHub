import Footer from '@/components/Footer';

import {
    AlipayCircleOutlined,
    LockOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, { useState } from 'react';
import { history, useModel } from '@umijs/max';
import styles from './index.less';
import LoginPageFooter from "@/pages/User/Login/components/LoginPageFooter";
import {getLoginUser,  userLogin} from "@/services/yuapi-backend/userController";

//函数组件（不带参数）：登录
const Login1: React.FC = () => {
    //通过 useModel 处理初始状态
    const {initialState, setInitialState} = useModel('@@initialState');

    //获取用户信息（获取已登录的用户信息）
    //1.尝试从初始状态中获取
    //2.初始状态中不存在用户信息，则尝试从接口中获取，并将信息保存到初始状态中
    // const fetchUserInfo = async () => {
    //     //尝试从初始状态中获取用户信息
    //     const userInfo = initialState?.currentUser;
    //     console.log("login:fetchUserInfo")
    //     console.log(userInfo)
    //     //初始状态中的用户信息不存在，则通过后端接口获取信息（这里会是已经登陆用户再去登录但不刷新吗）
    //     if (!userInfo) {
    //         console.log("login:getLoginUser")
    //         const msg = await getLoginUser();
    //         console.log(msg)
    //         if (msg.code === 200) {
    //             const res: API.CurrentUser = {
    //                 name: msg.data?.userAccount,
    //                 userid: msg.data?.id?.toString(),
    //                 access: msg.data?.userRole
    //             }
    //             console.log(res)
    //             //设置初始状态，保存获取的用户信息
    //             await setInitialState((s) => ({
    //                 ...s,
    //                 currentUser: res,
    //             }));
    //             //返回用户信息
    //             return userInfo;
    //         }
    //     }
    //     return userInfo;
    // };

    //登录函数，对接自动生成的接口函数
    const handleSubmit = async (values: API.UserLoginRequest) => {
        try {
            const res = await  userLogin({
                ...values, //这种参数和values的key一样，会覆盖掉values
            },{
                timeout: 5000, // 设置超时时间为 5000 毫秒 抛错识别
            });
            // const res = await  userLogin({
            //     需要查看service中的typing知道请求参数UserLoginRequest有哪些字段
            //     userAccount: values.userAccount,
            //     userPassword: values.userAccount
            // });
            //根据后端返回的code判断是否登录成功（这里直接判断data是否为空避免code协商问题，方案都是协商结果 ）
            console.log(res)
            if (res.data) {
                //登录成功，则提示成功信息
                message.success("登录成功");
                // LoginMessage({content: "登录成功"})

                // await fetchUserInfo(); //再通过get请求后端去setInitialState，这样少一次请求
                setInitialState({
                    loginUser: res.data
                });
                //页面跳转
                /** 此方法会跳转到 redirect 参数所在的位置 */
                if (!history) return;
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            } else {
                //data为null的啥情况，后端说了算（可能是密码错误，不存在啥的，都在message）
                message.error(res.message)
            }

        } catch (error) {
            // 捕获并处理请求错误
            if (error.name === 'RequestError' && error.type === 'timeout') {
                message.error("请求超时！");
            } else {
                message.error("内部错误，请联系管理员！");
            }
        }
    }

    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const { status, type: loginType } = userLoginState;

    //页面元素描述，等效于 React 类组件中的 render()
    return (
        //只允许一个根组件
        <div className={styles.container}>
            <div className={styles.content}>

                {/* 登录表单 */}
                <LoginForm
                    logo={<img alt="logo" src="/logo.svg"/>}
                    title="APIHub登录页面"
                    subTitle={'本项目基于 Ant Design Pro 的中后台模板二次修改而来'}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={[
                        '其他登录方式 :',
                        <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
                        <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
                        <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
                    ]}
                    onFinish={async (values) => {
                        await handleSubmit(values as API.UserLoginRequest);
                        //表单字段名对应 API.UserLoginRequest
                    }}
                >
                    <Tabs>
                        <Tabs.TabPane tab={'账户密码登录'}/>
                    </Tabs>
                    <ProFormText
                        name="userAccount"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={styles.prefixIcon}/>,
                        }}
                        placeholder={'admin'}
                        rules={[
                            {
                                required: true,
                                message: '用户名是必填项！',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="userPassword"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={styles.prefixIcon}/>,
                        }}
                        placeholder={'adminadmin'}
                        rules={[
                            {
                                required: true,
                                message: '密码是必填项！',
                            },
                        ]}
                    />
                    <LoginPageFooter/>
                    <div style={{height: "3vh"}}/>
                </LoginForm>
            </div>
            <Footer/>
        </div>
    );
};
export default Login1;
