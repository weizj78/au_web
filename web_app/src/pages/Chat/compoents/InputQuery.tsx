import {Button, Input, Space} from "antd";
import {SendOutlined} from "@ant-design/icons";
import React from "react";
import "./inputCompont.css";
import {ReactComponent as AddIcon} from "@/assets/add_blue.svg";

export default function InputQuery({inputValue, setInputValue, doSend, handleAddRow, keys}: {
    inputValue: string,
    setInputValue: (value: string) => void,
    doSend: () => void,
    handleAddRow: () => void
    keys: string[] | undefined
}) {
    const InputButton = (
        <Space size={0} style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            fontSize: 16,
        }}>
            <Button type={"text"} icon={<AddIcon className="input_icon"/>}
                    onClick={() => handleAddRow()}
            />
            <Button
                icon={<SendOutlined className="input_icon"/>}
                type='text'
                onClick={() => {
                    doSend()
                }}
            />
        </Space>
    )
    const handleKeyPress = (e: any) => {
        // 检查是否同时按下了Shift键和Enter键
        if (e.shiftKey && e.key === 'Enter') {
            // 阻止默认行为（例如表单提交）
            return
        }
        doSend()
        setInputValue('')
    };
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <Input.TextArea className="input_query"
                            onPressEnter={handleKeyPress}
                            autoSize={{minRows: 1, maxRows: 6}}
                            size={'large'}
                            value={inputValue === '\n' ? '' : inputValue}
                            placeholder={"请输入 " + (keys !== undefined ? keys[0] : '')}
                            onChange={(e) => setInputValue(e.target.value)}
            ></Input.TextArea>
            {InputButton}
        </div>

    )
}