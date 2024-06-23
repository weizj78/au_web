import {PageContainer, ProCard} from '@ant-design/pro-components';
import styles from './index.less';
import {queryToolList} from "@/services/au_service/ToolController";
import {Avatar, Space, Typography} from "antd";
import Tool from "@/models/tool";
import React, {useEffect} from "react";
import {DEFAULT_LOGO} from "@/constants";
import tool_image from "@/assets/tool_01.png"

const {Text} = Typography

const ToolPage: React.FC = () => {
    const [tool_list, setToolList] = React.useState<Tool[]>([])
    useEffect(() => {
        queryToolList().then(r => {
            setToolList(r.data);
        });
    }, []);

    return (
        <PageContainer ghost>
            <ProCard className={styles.container} ghost wrap={true} gutter={[16, 16]}>
                {
                    tool_list.map((tool: Tool, index: number) => {
                        return <ProCard className={styles.agent_card_container} colSpan={{xs: 24, sm: 12, md: 8, lg: 6}}
                                        key={'tool_card' + index}>
                            <Space direction='vertical' size={5}>
                                {/*<Avatar size={"large"} shape="square" style={{backgroundColor: getRandomColor()}}*/}
                                {/*        icon={(tool.name?.charAt(0) + "").toUpperCase()}></Avatar>*/}
                                <Avatar size={50} shape="square"
                                        src ={tool_image}></Avatar>
                                <Text className={styles.card_title_font}>{tool.name}</Text>
                                <Space>
                                    <Avatar size={"small"}
                                            src={DEFAULT_LOGO}></Avatar>
                                    <Text className={styles.card_font}>aU官方</Text>
                                </Space>
                            </Space>
                            <br/>
                            <Text className={styles.card_font} ellipsis={true}>
                                {tool.description}
                            </Text>

                        </ProCard>
                    })
                }
            </ProCard>
        </PageContainer>
    );
};

export default ToolPage;