class AddPromptVo:
    def __init__(self, introduction: str, target: str, instruction: str, version: str):
        self.introduction = introduction
        self.target = target
        self.instruction = instruction
        self.version = version

    def to_dict(self) -> dict:
        return {
            "introduction": self.introduction,
            "target": self.target,
            "instruction": self.instruction,
            "metadata": {
                "version": self.version
            }
        }
