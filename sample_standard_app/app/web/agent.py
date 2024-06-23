from flask import Blueprint

from sample_standard_app.app.web.service.agent_service import AgentService
from sample_standard_app.app.web.utils import web_result

agent_blueprint = Blueprint('agent', __name__, url_prefix='/agent')


@agent_blueprint.get('/list')
@web_result
def agent_list():
    return AgentService().agent_list()


@agent_blueprint.get('/<name>')
@web_result
def agent_by_name(name: str):
    return AgentService.agent_by_name(name)
