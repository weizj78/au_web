import Tool from "@/models/tool";
import {ProCard} from "@ant-design/pro-components";

export const ToolCard = ({tool}:{tool:Tool})=>{
    return <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8 }} title={tool.name}>
        <pre>{tool.description}</pre>
    </ProCard>
}