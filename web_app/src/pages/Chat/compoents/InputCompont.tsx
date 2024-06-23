import {Button, Flex, Input} from "antd";
import React, {useState} from "react";
import "./inputCompont.css";
import {ClearOutlined, DeleteTwoTone} from "@ant-design/icons";
import AgentInput from "@/pages/Chat/AgentInputs";
import LineData from "@/pages/Chat/LineData";
import InputQuery from "@/pages/Chat/compoents/InputQuery";


const AddRow = ({inputKeys, on_message_send, onClear}:{
    inputKeys:string[] | undefined,
    on_message_send: (message: string) => void | Promise<any>,
    onClear:() => void
}) => {
    let init_rows :LineData[] = []
    for(let i=0; i<(inputKeys!==undefined?inputKeys?.length:0); i++){
        if(i===0) {continue}
        const row:LineData = new LineData()
        if (inputKeys) {
            row.key = inputKeys[i]
            row.value = ''
            init_rows.push(row)
        }

    }
    const [rows, setRows] = useState<LineData[]>(init_rows);
    const [inputValue, setInputValue] = useState('');

    const handleAddRow = () => {
        setRows([...rows, new LineData()]);
    };

    const handleDeleteRow = (index: number) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const updateValue = (type: string, value: string, index: number) => {
        const updatedRows = rows.map((row, i) => {
            if (i === index) {
                if (type === 'key') {
                    row.key = value;
                } else if (type === 'value') {
                    row.value = value;
                }
            }
            return row;
        });
        setRows(updatedRows);
    };

    const doSend = () => {
        const data = new Map();
        rows.forEach(row => {
            if (row.key && row.value) {
                data.set(row.key, row.value);
            }
        });

        const inputs = new AgentInput(inputValue, data);
        on_message_send(inputs.toMessageDispyString());
        setInputValue("");
        // setRows([]);
    };

    const clearAll = () => {
        setRows(rows.map(row => ({...row, value: ""})));
        setInputValue("");
        onClear();
    };

    return (
        <Flex align={"center"} gap={"small"}
              vertical
        >
            <Flex className="add-row-input-container" gap={ "small"}>
                <Button type={"text"} icon={<ClearOutlined className='input_button' onClick={clearAll}/>}></Button>
                <InputQuery inputValue={inputValue} handleAddRow={handleAddRow} setInputValue={setInputValue}
                            doSend={doSend} keys={inputKeys}></InputQuery>
            </Flex>

            {rows.map((row, index) => (
                <Flex key={index} className="add-row-input-container" gap={"small"}>
                    <Button
                        type={"text"}
                        icon={<DeleteTwoTone className={"input_button"}/>}
                        onClick={() => handleDeleteRow(index)}
                    />
                    <Input
                        size="large"
                        placeholder="请输入key"
                        value={row.key}
                        className="add-row-input"
                        onChange={(e) => updateValue("key", e.target.value, index)}
                    />
                    <Input
                        size="large"
                        placeholder="请输入value"
                        value={row.value}
                        className="add-row-input-value"
                        onChange={(e) => updateValue("value", e.target.value, index)}
                    />
                </Flex>
            ))}
        </Flex>
    );
};
export default AddRow;