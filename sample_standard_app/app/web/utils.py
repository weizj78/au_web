# 输出包装器
def web_result(func):
    """An annotation used to parse the flask request params."""

    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            return {"success": True, "data": result}
        except Exception as e:
            return {"success": False, "data": {}, "errorMessage": str(e)}

    wrapper.__name__ = func.__name__
    return wrapper
