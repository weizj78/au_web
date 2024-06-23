import {request} from "@umijs/max";
import {AgentInfoResponse, AgentListResponse, RegisterServiceResponse} from "@/services/au_service/model";
import AgentInput from "@/pages/Chat/AgentInputs";


export function sendChatRequest(serviceName: string, data: string, chatHistory: any[]): Promise<any> {
    // 解析string为json
    let agentInput = AgentInput.parseMessageDispyString(data)
    let inputMap: Map<string, any> = new Map<string, any>();
    if (agentInput.input !== null) {
        inputMap.set('input', agentInput.input)
    }
    if (agentInput.otherInputs !== null) {
        agentInput.otherInputs?.forEach((value, key) => {
            inputMap.set(key, value)
        })
    }
    inputMap.set("chat_history", chatHistory)
    const request_data = {
        'service_id': serviceName,
        'params': Object.fromEntries(inputMap)
    }
    return new Promise((resolve, reject) => {
       agent_chat(request_data).then((response) => response).then((result) => resolve(result)).catch((error) => reject(error))
    });
}


export async function queryAgentList() {
return request<AgentListResponse>('/api/agent/list', {
    method: 'GET',
    params: {
    }
  })
}


export async function queryAgentInfo(agent_name:string){
    return request<AgentInfoResponse>("/api/agent/"+agent_name,{
        method:'GET',
        params:{}
    })
}

export async function registerService(agent_id:string){
    return request<RegisterServiceResponse>('/api/service/register', {
        method: 'POST',
        data: {
            agent_id:agent_id
        }
    })
}

export async function agent_chat(data:any){
    return request<any>('/service_run', {
        method: 'POST',
        data: data
    })
}