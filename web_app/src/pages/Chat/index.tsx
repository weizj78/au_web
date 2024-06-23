import {ProChat} from '@ant-design/pro-chat';
import React, {ReactNode, useEffect, useState} from "react";
import {ChatMessage} from "@ant-design/pro-chat/es/types/message";
import {Card, Flex, Result} from "antd";
import {MockResponse} from "@ant-design/pro-chat/es/ProChat/mocks/streamResponse";
import AddRow from "@/pages/Chat/compoents/InputCompont";
import {useParams} from "react-router";
import {registerService, sendChatRequest} from "@/services/au_service/AgentController";
import avatar from "@/assets/chat_avatar.svg"
import user_avatar from "@/assets/user_avatar.svg"
import {useLocation} from "@umijs/max";
import Agent from "@/models/agent";

type LocationState = {
  agent_info: Agent;
};

export default function ChatPage() {
    const [serviceName, setServiceName] = useState("")
    const {agent_id } = useParams()
    const location = useLocation();
    const agentInfo = (location.state as LocationState)?.agent_info;
    useEffect(() => {
        if (!agent_id) {
            return;
        }
        registerService(agent_id).then((result)=>{
            setServiceName(result.data.service_name)
        })
    }, []);

    const InputArea = (_: ReactNode, on_message_send: (message: string) => void | Promise<any>, onClear: () => void)=>{
        return <AddRow inputKeys={agentInfo?.input_keys}
                       on_message_send ={on_message_send}
                       onClear = {onClear}/>
    }

    // 初始化agents,只加载一次
    // 定义一个数组来存储每一行的输入框值
    return (
        <div>
            <Flex align={'center'} style={{justifyContent: 'space-between'}}>
                <h2 style={{marginLeft: "30px"}}>{agent_id}</h2>
            </Flex>
            <ProChat
                showTitle
                inputAreaRender={InputArea}
                helloMessage={
                    '欢迎使用 AgentUniverse !!!'
                }
                userMeta={{avatar: user_avatar, title: '用户', backgroundColor: '#fafafa'}}
                assistantMeta={{avatar:avatar, title: serviceName, backgroundColor: '#67dedd'}}
                chatItemRenderConfig={{
                    contentRender: (item, defaultContent) => {
                        return (
                            <div
                                style={{
                                    border: '1px solid #1890ff',
                                    borderRadius: '8px',
                                }}
                            >
                                {defaultContent}
                            </div>
                        );
                    },
                }}

                style={{width: '100%', height: 'calc(96vh - 64px)'}}
                renderErrorMessages={(errorResponse) => {
                    return (
                        <Card>
                            <Result
                                status="error"
                                title="Something Error"
                                subTitle={errorResponse.message}
                            />
                        </Card>
                    );
                }}
                request={async (messages: ChatMessage[]) => {
                    let data: React.ReactNode = messages[messages.length - 1].content
                    let chatHistory: any = []
                    messages.forEach((item) => {
                        chatHistory.push({
                            "type": item.role === "user" ? "human" : "ai",
                            "content": item.content
                        })
                    })
                    // 删除最后一个
                    if (chatHistory.length > 0) chatHistory.pop()
                    try {
                        let result = await sendChatRequest(serviceName, data + "", chatHistory)
                        let res = JSON.parse(result.result)
                        return new Response(res.output);
                    } catch (e) {
                        const mockResponse = new MockResponse(''+e, 1000, true);
                        return mockResponse.getResponse();
                    }
                }}
            />
        </div>
    )
}

