import threading
from typing import List, Dict

from agentuniverse.base.config.component_configer.configers.prompt_configer import PromptConfiger
from agentuniverse.base.config.configer import Configer
from agentuniverse.base.util.logging.logging_util import LOGGER
from agentuniverse.prompt.prompt import Prompt
from agentuniverse.prompt.prompt_manager import PromptManager

from sample_standard_app.app.web.vo.prompt import AddPromptVo

manager_lock = threading.Lock()


class PromptService:

    @staticmethod
    def prompt_dict(prompt: Prompt):
        return {
            'prompt_version': prompt.prompt_version,
            'prompt_template': prompt.prompt_template,
            'input_variables': prompt.input_variables
        }

    @classmethod
    def prompt_list(cls):
        prompts: List[Prompt] = PromptManager().get_instance_obj_list()
        result = []
        for prompt in prompts:
            result.append(
                cls.prompt_dict(prompt)
            )
        return result

    @classmethod
    def get_prompt_by_version(cls, prompt_version) -> Dict:
        prompt: Prompt = PromptManager().get_instance_obj(prompt_version)
        if not prompt:
            error_info = f"get_prompt_by_version prompt({prompt_version}) is not exist"
            LOGGER.error(error_info)
            raise Exception(error_info)
        return cls.prompt_dict(prompt)

    @classmethod
    def add_prompt(cls, add_prompt_vo: AddPromptVo):
        configer: Configer = Configer()
        configer.value = add_prompt_vo.to_dict()
        prompt_configer = PromptConfiger().load_by_configer(configer)
        with manager_lock:
            prompt: Prompt = PromptManager().get_instance_obj(add_prompt_vo.version)
            if prompt:
                error_info = f"add_prompt version({add_prompt_vo.version}) is already exist"
                LOGGER.error(error_info)
                raise Exception(error_info)
            else:
                prompt = Prompt().initialize_by_component_configer(prompt_configer)
                PromptManager().register(add_prompt_vo.version, prompt)
            return prompt.prompt_version
