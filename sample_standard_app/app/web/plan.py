from flask import Blueprint

from sample_standard_app.app.web.service.planner_service import PlannerService
from sample_standard_app.app.web.utils import web_result

plan_blueprint = Blueprint('plan', __name__, url_prefix='/plan')


def plan_name_list():

    @plan_blueprint.get("/name_list")
    @web_result
    def planner_name_list():
        return PlannerService.planner_name_list()