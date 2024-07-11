import {Avatar, Flex, Space, Typography} from 'antd';
import {PageContainer, ProCard} from '@ant-design/pro-components';
import React, {useEffect, useState} from "react";
import Agent from "@/models/agent";
import {queryAgentList} from "@/services/au_service/AgentController";
import styles from "@/pages/Agent/index.less";
import {DEFAULT_LOGO} from "@/constants";
import Paragraph from "antd/es/typography/Paragraph";
import avatar1 from "@/assets/chat_avatar.svg"
import avatar2 from "@/assets/avatar_agent.svg"
import avatar3 from "@/assets/folder.png"
import {Link} from "@umijs/max";


const avatars = [avatar1, avatar2, avatar3]

function getRandomAvatar() {
    const index = Math.floor(Math.random() * avatars.length);
    return avatars[index];
}

const {Text} = Typography
const App = () => {
    const [agentList, setAgentList] = useState<Agent[]>([])
    useEffect(() => {
        queryAgentList().then(res => {
            setAgentList(res.data)
            console.log(res.data)
        })
    }, []);
    return (
        <PageContainer ghost>
            <ProCard className={styles.container} ghost wrap={true} gutter={[16, 16]}>
                {
                    agentList.map((agent: Agent, index: number) => {
                        return <ProCard className={styles.agent_card_container}
                                        colSpan={{xs: 24, sm: 12, md: 8, lg: 6}}
                                        key={'tool_card' + index} direction={'row'} gutter={0}
                        >
                            <Link to={{pathname: "/chat/" + agent.info?.name}} state={{agent_info:agent}} >
                                <Flex justify={'start'} align={'start'}>
                                    <Avatar size={50} shape="square"
                                        src={getRandomAvatar()}></Avatar>
                                    <Flex justify={'start'} vertical style={{marginLeft: '15px',width: '70%'}}>
                                        <Text className={styles.card_title_font}
                                              ellipsis={true}>{agent.info?.name}</Text>
                                        <Space>
                                            <Avatar size={'small'} src={DEFAULT_LOGO}/>
                                            <Text className={styles.card_font}>aU官方</Text>
                                        </Space>
                                        <Paragraph style={{height: '100%', marginTop: '5px'}}
                                                   className={styles.card_font} ellipsis={{
                                            rows: 3
                                        }}>{agent.info?.description}Agent</Paragraph>
                                    </Flex>
                                </Flex>
                                <br/>
                            </Link>

                        </ProCard>
                    })
                }
            </ProCard>
        </PageContainer>
    );
}

export default App;