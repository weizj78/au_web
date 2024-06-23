from typing import List

from agentuniverse.agent.plan.planner.planner_manager import PlannerManager


class PlannerService:

    @staticmethod
    def planner_name_list() -> List[str]:
        """
        获取Planner列表
        """
        planner_list = PlannerManager().get_instance_name_list()
        return planner_list

