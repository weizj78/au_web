from flask import Blueprint

from sample_standard_app.app.web.agent import agent_blueprint
from sample_standard_app.app.web.agent_service import service_blueprint
from sample_standard_app.app.web.memory import memory_blueprint
from sample_standard_app.app.web.plan import plan_blueprint
from sample_standard_app.app.web.tool import tool_blueprint

web_bp = Blueprint('web', __name__, url_prefix='/api')

web_bp.register_blueprint(tool_blueprint)
web_bp.register_blueprint(agent_blueprint)
web_bp.register_blueprint(service_blueprint)
web_bp.register_blueprint(memory_blueprint)
web_bp.register_blueprint(plan_blueprint)
