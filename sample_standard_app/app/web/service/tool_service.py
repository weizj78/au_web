from agentuniverse.agent.action.tool.tool import Tool
from agentuniverse.agent.action.tool.tool_manager import ToolManager


class ToolService:

    @staticmethod
    def tool_list() -> list[dict]:
        tools: list[Tool] = ToolManager().get_instance_obj_list()
        result = []
        for tool in tools:
            tool_dict = {
                'name': tool.name,
                'description': tool.description,
                'type': tool.tool_type.value,
                'input_keys': tool.input_keys,
            }
            result.append(tool_dict)
        return result
