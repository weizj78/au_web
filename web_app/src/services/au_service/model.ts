import Tool from "@/models/tool";
import Agent from "@/models/agent";

export interface StandResponse{
    success: boolean
    errorMessage : string
    data: Tool[]
}

export interface ToolListResponse{
    success: boolean
    errorMessage : string
    data: Tool[]
}

export interface AgentListResponse{
    success:boolean
    errorMessage : string
    data: Agent[]
}

export interface RegisterResult{
    'service_name':string
}

export interface RegisterServiceResponse{
    success:boolean
    errorMessage : string
    data: RegisterResult
}

export interface AgentInfoResponse{
    success: boolean
    errorMessage: string
    data : Agent
}