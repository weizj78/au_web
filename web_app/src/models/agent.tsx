class Info {
    name: string | undefined
    description: string | undefined
}

class LLMModel {
    name: string | undefined
    model_name: string | undefined
}

class Profile {
    llm: LLMModel | undefined
}

class Planner{
    name : string | undefined
}
class Plan{
    planner: Planner | undefined
}

class Action{
    tool : string[] | undefined
    knowledge : string[] | undefined
}

class Memory{
    name :string|undefined
}

class Agent {
    info: Info | undefined
    profile: Profile | undefined
    plan: Plan | undefined
    action: Action | undefined
    memory:Memory |undefined
    input_keys: string[] | undefined
    output_keys: string[] | undefined
}

export default Agent;