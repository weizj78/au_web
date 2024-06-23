import threading

from agentuniverse.agent_serve.service import Service
from agentuniverse.agent_serve.service_configer import ServiceConfiger
from agentuniverse.agent_serve.service_manager import ServiceManager
from agentuniverse.base.config.configer import Configer


class ServiceController:

    @staticmethod
    def generate_service_name(agent_id):
        """
            生成service_name
        """
        return f"{agent_id}_service"

    @staticmethod
    def get_service_by_name(service_name):
        """
            根据service_name获取service
        """
        service_instance: Service = ServiceManager().get_instance_obj(service_name)
        return service_instance

    @staticmethod
    def generate_service_config(service_name: str, agent_id: str) -> ServiceConfiger:
        configer = Configer()
        configer.value = {
            'name': service_name,
            'description': 'agent_id test demo',
            'agent': agent_id,
            'metadata': {
                'type': 'SERVICE'
            }
        }
        return ServiceConfiger().load_by_configer(configer)

    @classmethod
    def register_service(cls, agent_id: str) -> str:
        """
            把agent注册为service
        """
        service_name = cls.generate_service_name(agent_id)
        # 1.创建锁
        lock = threading.Lock()
        with lock:
            # 2. 判断service是否存在
            if ServiceManager().get_instance_obj(service_name):
                return service_name
            # 3. 创建service
            service = Service().initialize_by_component_configer(
                cls.generate_service_config(service_name, agent_id)
            )
            ServiceManager().register(service.get_instance_code(), service)
            return service_name

    @staticmethod
    def service_name_list():
        """
            获取所有service_name
        """
        return ServiceManager().get_instance_name_list()
