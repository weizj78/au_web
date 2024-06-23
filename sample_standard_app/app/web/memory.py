from flask import Blueprint

from sample_standard_app.app.web.agent_service import service_blueprint
from sample_standard_app.app.web.service.memory_service import MemoryService
from sample_standard_app.app.web.utils import web_result

memory_blueprint = Blueprint('memory', __name__, url_prefix='/memory')


@service_blueprint.get('/list')
@web_result
def service_name_list():
    return MemoryService.memory_name_list()


@service_blueprint.post('/register')
@web_result
def memory_list():
    service_name = MemoryService.memory_list()
    return {'service_name': service_name}
