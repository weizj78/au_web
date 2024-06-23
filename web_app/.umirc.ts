import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    proxy: {
        '/api/': {
            target: 'http://localhost:8888',
            changeOrigin: true,
            pathRewrite: {'^/server': ''},
        },
        '/service_run': {
            target: 'http://localhost:8888',
            changeOrigin: true,
            pathRewrite: {'^/server': ''},
        },

    },
    layout: {
        title: 'agentUniverse',
    },
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './Home',
        },
        {
            name: 'Agent管理',
            path: '/agent',
            component: './Agent'
        },
        {
            name: '工具商店',
            path: '/tool',
            component: './Tool',
        },
        {
            path: '/chat/:agent_id',
            component: './Chat',
        }
    ],
    npmClient: 'pnpm',
});

