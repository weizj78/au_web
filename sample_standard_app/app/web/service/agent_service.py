import threading

from agentuniverse.agent.agent import Agent
from agentuniverse.agent.agent_manager import AgentManager
from agentuniverse.agent.default.executing_agent.executing_agent import ExecutingAgent
from agentuniverse.agent.default.expressing_agent.expressing_agent import ExpressingAgent
from agentuniverse.agent.default.nl2api_agent.nl2api_agent import Nl2ApiAgent
from agentuniverse.agent.default.peer_agent.peer_agent import PeerAgent
from agentuniverse.agent.default.planning_agent.planning_agent import PlanningAgent
from agentuniverse.agent.default.rag_agent.rag_agent import RagAgent
from agentuniverse.agent.default.react_agent.react_agent import ReActAgent
from agentuniverse.agent.default.reviewing_agent.reviewing_agent import ReviewingAgent
from agentuniverse.base.config.component_configer.configers.agent_configer import AgentConfiger
from agentuniverse.base.config.configer import Configer

from sample_standard_app.app.web.vo.agent import AddAgentVO

agent_planner_map = {
    'executing_planner': ExecutingAgent,
    'expressing_planner': ExpressingAgent,
    'nl2api_planner': Nl2ApiAgent,
    'peer_planner': PeerAgent,
    'planning_planner': PlanningAgent,
    'rag_planner': RagAgent,
    'react_planner': ReActAgent,
    'reviewing_planner': ReviewingAgent,
}

agent_manger_lock = threading.Lock


class AgentService:
    @staticmethod
    def agent2dict(agent: Agent):
        result = {
            "info": agent.agent_model.info,
            "profile": agent.agent_model.profile,
            "input_keys": agent.input_keys(),
            "output_keys": agent.output_keys(),
            "memory": agent.agent_model.memory,
            "plan": agent.agent_model.plan
        }
        return result

    @classmethod
    def agent_list(cls) -> list[dict]:
        agents: list[Agent] = AgentManager().get_instance_obj_list()
        result = []
        for agent in agents:
            result.append(cls.agent2dict(agent))
        return result

    @classmethod
    def agent_by_name(cls, name: str) -> dict:
        agent: Agent = AgentManager().get_instance_obj(name)
        if agent is None:
            raise Exception(f"agent {name} is not exist")
        result = cls.agent2dict(agent)
        return result

    @classmethod
    def add_agent(cls, add_agent_vo: AddAgentVO):
        planner_name = add_agent_vo.plan.get('planner').get('name')
        agent_name = add_agent_vo.info.get('name')
        config = Configer()
        config.value = {
            'info': add_agent_vo.info,
            'profile': add_agent_vo.profile,
            'plan': add_agent_vo.plan,
            'memory': add_agent_vo.memory,
            'action': add_agent_vo.action
        }
        agent_configer = AgentConfiger().load_by_configer(config)
        agent_clz = agent_planner_map.get(planner_name)
        if not agent_clz:
            raise Exception(f'planner {planner_name} not support')
        agent = agent_clz.initialize_by_component_configer(agent_configer)
        with threading.Lock:
            if agent_name in AgentManager().get_instance_name_list():
                raise Exception(f"agent {agent_name} aleardy exist")
            AgentManager().register(agent_name, agent)
        return
