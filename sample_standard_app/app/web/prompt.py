from flask import Blueprint

from sample_standard_app.app.web.service.prompt_service import PromptService
from sample_standard_app.app.web.utils import web_result
from sample_standard_app.app.web.vo.prompt import AddPromptVo

prompt_blueprint = Blueprint('prompt', __name__, url_prefix='/prompt')


@prompt_blueprint.get('/list')
@web_result
def prompt_list():
    result = PromptService.prompt_list()
    return result


@prompt_blueprint.get('/<version>')
@web_result
def prompt_by_version(version: str):
    return PromptService.get_prompt_by_version(version)


@prompt_blueprint.post('/add')
@web_result
def add_prompt(add_vo: AddPromptVo):
    return {
        'version': add_vo.version
    }


@prompt_blueprint.delete('/<version>')
@web_result
def remove_prompt(version: str):
    return {
        'version': version
    }
