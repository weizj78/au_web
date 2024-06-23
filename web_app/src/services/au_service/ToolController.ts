import {request} from "@@/exports";
import {ToolListResponse} from "@/services/au_service/model";

export async function queryToolList(){
  return request<ToolListResponse>('/api/tool/list', {
    method: 'GET',
    params: {
    }
  })
}
