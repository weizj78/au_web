from typing import List

from agentuniverse.agent.memory.memory import Memory
from agentuniverse.agent.memory.memory_manager import MemoryManager


class MemoryService:
    @staticmethod
    def memory_name_list() -> List[str]:
        memory_name_list = MemoryManager().get_instance_name_list()
        return memory_name_list

    @staticmethod
    def memory_list():
        memory_list: List[Memory] = MemoryManager().get_instance_obj_list()
        result = []
        for memory in memory_list:
            result.append({
                "name": memory.name,
                "description": memory.description,
                "type": memory.type,
                "max_tokens": memory.max_tokens,
                "prompt_version": memory.prompt_version,
                "memory_key": memory.memory_key,
            })
        return result

