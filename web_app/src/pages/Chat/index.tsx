import { ProChat } from '@ant-design/pro-chat';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@ant-design/pro-chat/es/types/message';
import { Flex } from 'antd';
import { MockResponse } from '@ant-design/pro-chat/es/ProChat/mocks/streamResponse';
import AddRow from '@/pages/Chat/compoents/InputCompont';
import { useParams } from 'react-router';
import { registerService, sendStreamRequest } from '@/services/au_service/AgentController';
import avatar from '@/assets/chat_avatar.svg';
import user_avatar from '@/assets/user_avatar.svg';
import { useLocation } from '@umijs/max';
import Agent from '@/models/agent';
import ReplyComponent, { ReplyErrorComponent } from '@/pages/Chat/compoents/ReplyComponent';
import AgentInput from '@/pages/Chat/AgentInputs';

type LocationState = {
  agent_info: Agent;
};

function parse_chat_messages(content:any):string {
  if (content === "..."){
    return "..."
  }
  const temp = "[" + content.substring(0, content.length-1) + "]"
  const temp_data = JSON.parse(temp)
  const data = JSON.parse(temp_data[temp_data.length-1].result)
  return  data.output
}

async function send_request(messages: ChatMessage[], inputData: AgentInput, agentInfo: Agent, serviceName: string) {
  let chatHistory: any = [];
  messages.forEach((item) => {
    chatHistory.push({
      'type': item.role === 'user' ? 'human' : 'ai',
      'content': item.role === 'user'?item.content:parse_chat_messages(item.content),
    });
  });
  // 删除最后一个
  if (chatHistory.length > 0) chatHistory.pop();
  try {
    let result = await sendStreamRequest(serviceName, inputData, chatHistory, agentInfo?.input_keys ?? []);
    console.log(result)
    return new Response(result);
  } catch (e) {
    const mockResponse = new MockResponse('' + e, 1000, true);
    return mockResponse.getResponse();
  }
}


export default function ChatPage() {
  const [serviceName, setServiceName] = useState('');
  const { agent_id } = useParams();
  const location = useLocation();
  const agentInfo = (location.state as LocationState)?.agent_info;
  const agentInput = useRef<any>()
  const chatHistory = useRef<any>([]);
  function setAgentInput(inputData: AgentInput){
    agentInput.current = inputData;
  }
  useEffect(() => {
    if (!agent_id) {
      return;
    }
    registerService(agent_id).then((result) => {
      setServiceName(result.data.service_name);
    });
  }, []);
  const InputArea = (_: ReactNode, on_message_send: (message: string) => void | Promise<any>, onClear: () => void) => {
    return <AddRow inputKeys={agentInfo?.input_keys}
                   on_message_send={on_message_send}
                   onClear={onClear}
                   setInputData={setAgentInput}
    />;
  };
  // 初始化agents,只加载一次
  // 定义一个数组来存储每一行的输入框值
  return (
    <div>
      <Flex align={'center'} style={{ justifyContent: 'space-between' }}>
        <h2 style={{ marginLeft: '30px' }}>{agent_id}</h2>
      </Flex>
      <ProChat
        showTitle
        inputAreaRender={InputArea}
        helloMessage={
          '欢迎使用智能翻译 !!!'
        }
        onChatsChange={(chats) => {
          chatHistory.current = chats;
          console.log(chats)
        }}
        userMeta={{ avatar: user_avatar, title: '用户', backgroundColor: '#fafafa' }}
        assistantMeta={{ avatar: avatar, title: serviceName, backgroundColor: '#67dedd' }}
        chatItemRenderConfig={{
          contentRender: (item, defaultContent) => {
            return <ReplyComponent item={item} defaultContent={defaultContent} />;
          },
        }}
        style={{ width: '100%', height: 'calc(96vh - 64px)' }}
        renderErrorMessages={(errorResponse) => {
          return <ReplyErrorComponent errorResponse={errorResponse} />;
        }}
        request={async (messages: ChatMessage[]) => {
          return await send_request(messages, agentInput.current, agentInfo, serviceName);
        }}
      />
    </div>
  );
}

