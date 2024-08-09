import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import {getLoginUser} from "@/services/yuapi-backend/userController";
import { requestConfig } from './requestConfig';

const isDev = process.env.NODE_ENV === 'development';

//TODO 放行页面
const loginPath = '/user/login';
const loginPath2 = '/user/login2';
const register = '/user/register'
const forget = '/user/forget'
const paths = [loginPath, loginPath2, register, forget]

/**
 * 全局状态类型
 */
interface InitialState {
  loginUser?: API.UserVO;
}
export type { InitialState };
// API.UserVO在这个api service 里的typing文件里
// type UserVO = {
//   createTime?: string;
//   gender?: number;
//   id?: number;
//   updateTime?: string;
//   userAccount?: string;
//   userAvatar?: string;
//   userName?: string;
//   userRole?: string;
// };

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state 过期
 * @see https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
 * */
export async function getInitialState(): Promise<InitialState> {
  // TODO 当页面首次加载时，获取要全局保存的数据，比如用户登录信息，useModel('@@initialState')获得返回的这个InitialState
  const state: InitialState = { loginUser: undefined,}
  console.log("app:getInitialState")
  if (!paths.includes(history.location.pathname)) {
    // 这里if做一个放行
    try {
      const res = await getLoginUser();
      if (res.data) {
        state.loginUser = res.data;
      }
    } catch (error) {
      history.push(loginPath);
    }
  }
  return state;
}


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    layout: "top",
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.loginUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      console.log('onchange event:'+initialState?.loginUser);
      // TODO 这是页面变化时 如果没有登录，重定向到 login，
      if (!initialState?.loginUser && !paths.includes(location.pathname)){
        console.log('onchange event 2:'+initialState?.loginUser);
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    childrenRender: (children, props) => {
      // 增加一个 loading 的状态
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
