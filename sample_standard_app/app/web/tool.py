from flask import Blueprint

from sample_standard_app.app.web.service.tool_service import ToolService
from sample_standard_app.app.web.utils import web_result

tool_blueprint = Blueprint('tool', __name__, url_prefix='/tool')


@tool_blueprint.get('/list')
@web_result
def tool_list():
    return ToolService.tool_list()
