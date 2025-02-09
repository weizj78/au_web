# !/usr/bin/env python3
# -*- coding:utf-8 -*-

# @Time    : 2024/4/8 20:58
# @Author  : jerry.zzw 
# @Email   : jerry.zzw@antgroup.com
# @FileName: server_application.py
from agentuniverse.agent_serve.web.flask_server import app

from agentuniverse.agent_serve.web.web_booster import start_web_server
from agentuniverse.base.agentuniverse import AgentUniverse

from sample_standard_app.app.web.web import web_bp


class ServerApplication:
    """
    Server application.
    """

    @classmethod
    def start(cls):
        AgentUniverse().start()
        start_web_server()


if __name__ == "__main__":
    app.register_blueprint(web_bp)
    ServerApplication.start()
