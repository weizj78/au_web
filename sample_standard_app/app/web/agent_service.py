from agentuniverse.agent_serve.web.web_util import request_param
from flask import Blueprint

from sample_standard_app.app.web.service.service_controller import ServiceController
from sample_standard_app.app.web.utils import web_result

service_blueprint = Blueprint('service', __name__, url_prefix='/service')


@service_blueprint.get('/name_list')
@web_result
def service_list():
    return ServiceController().service_name_list()


@service_blueprint.post('/register')
@web_result
@request_param
def register_service(agent_id: str):
    service_name = ServiceController().register_service(agent_id)
    return {'service_name': service_name}
